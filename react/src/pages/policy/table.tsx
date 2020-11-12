import * as React from 'react';
import { Link } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, PolicyFormData, Policy, RList, DictObj } from '@/types';
import { doGetPolicyList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { getPolicyStatusListObj, getPayStatusListObj } from '@/stores/selectors/app';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<Policy, QueryParams<PolicyFormData>> {
  onChange: (params: QueryParams<PolicyFormData>) => void;
  policyStatus: DictObj;
  payStatus: DictObj;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount, policyStatus, payStatus } = props;
  const columns = [
    {
      title: '流水号',
      key: 'businessNo',
      dataIndex: 'businessNo',
      width: 180
    },
    {
      title: '投保单号',
      key: 'proposalNo',
      dataIndex: 'proposalNo',
      width: 180
    },
    {
      title: '保单号',
      key: 'policyNo',
      dataIndex: 'policyNo'
    },
    {
      title: '渠道名称',
      key: 'channelName',
      dataIndex: 'channelName'
    },
    {
      title: '产品名称',
      key: 'productName',
      dataIndex: 'productName'
    },
    {
      title: '保费',
      key: 'sumPremium',
      dataIndex: 'sumPremium',
      render: (premium: number) => `${premium}元`
    },
    {
      title: '投保人姓名',
      key: 'appliName',
      dataIndex: 'appliName',
      width: 120
    },
    // {
    //     title: '被保险人姓名',
    //     key: 'insuredName',
    //     dataIndex: 'insuredName',
    //     render: (text: string, record: Policy) => {
    //         const insuredList = record.recognizeeInfoDTOList || [];
    //         return insuredList.map((item: PolicyInsured) => item.insuredName).join(',')
    //     },
    //     width: 120
    // },
    {
      title: '保单状态',
      key: 'policyFlag',
      dataIndex: 'policyFlag',
      render: (flag: string) => policyStatus[flag] || flag
    },
    {
      title: '缴费状态',
      key: 'payFlag',
      dataIndex: 'payFlag',
      render: (flag: string) => payStatus[flag] || flag
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'id',
      render: (id: number, { businessNo, policyNo, subjectType }: Policy) => (
        <div className='table-action-wrapper'>
          <AuthButton code='insurance_policy_detail'>
            <Tooltip placement='bottom' title='详情'>
              <Link to={`/insurance/policy/detail?businessNo=${businessNo}&policyNo=${policyNo}&id=${id}`}>
                <Icon type='read' />
              </Link>
            </Tooltip>
          </AuthButton>
        </div>
      )
    }
  ];
  return (
    <WrapperTable
      data={list}
      columns={columns}
      rowKey='id'
      current={current}
      pageSize={pageSize}
      total={totalCount}
      onChange={(pageNumber: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber });
      }}
    />
  );
}

const mapStateToProps = (state: RootState) => {
  const { policy, app } = state;
  const { list, page } = policy;
  const { policyStatusList, payStatusList } = app;
  return {
    list,
    ...page,
    policyStatus: getPolicyStatusListObj(policyStatusList),
    payStatus: getPayStatusListObj(payStatusList)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<PolicyFormData>) => doGetPolicyList.request(params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
