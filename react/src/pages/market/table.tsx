import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, PolicyFormData, Policy, RList } from '@/types';
import { doGetPolicyMarketList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import * as moment from 'moment';

interface Props extends RList<Policy, QueryParams<PolicyFormData>> {
  onChange: (params: QueryParams<PolicyFormData>) => void;
  totalPremium: number;
  underwritingStartDate: string;
  underwritingEndDate: string;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount, totalPremium, underwritingEndDate, underwritingStartDate } = props;
  const columns = [
    {
      title: '营销员工',
      key: 'mktStaffNo',
      dataIndex: 'mktStaffNo',
      fixed: 'left',
      width: 120
    },
    {
      title: '登录账号',
      key: 'loginId',
      dataIndex: 'loginId',
      width: 120,
      fixed: 'left'
    },
    {
      title: '渠道名称',
      key: 'channelName',
      dataIndex: 'channelName'
    },
    {
      title: '保险公司名称',
      key: 'insureCompanyName',
      dataIndex: 'insureCompanyName'
    },

    {
      title: '保单号',
      key: 'policyNo',
      dataIndex: 'policyNo'
    },
    {
      title: '投保人姓名',
      key: 'applicantName',
      dataIndex: 'applicantName'
    },
    {
      title: '投保人身份证',
      key: 'applicantIdNo',
      dataIndex: 'applicantIdNo'
    },
    {
      title: '投保人手机',
      key: 'applicantMobile',
      dataIndex: 'applicantMobile'
    },
    {
      title: '被保险人姓名',
      key: 'insuredName',
      dataIndex: 'insuredName'
    },
    {
      title: '产品名称',
      key: 'productName',
      dataIndex: 'productName'
    },
    {
      title: '缴费年期',
      key: 'paymentPeriod',
      dataIndex: 'paymentPeriod'
    },
    {
      title: '缴费频率',
      key: 'paymentFrequency',
      dataIndex: 'paymentFrequency'
    },
    {
      title: '是否续保',
      key: 'renewal',
      dataIndex: 'renewal',
      render: (flag: boolean) => (flag ? '是' : '否')
    },
    {
      title: '保单状态',
      key: 'policyStatus',
      dataIndex: 'policyStatus'
    },
    {
      title: '承保日期',
      key: 'underwritingDate',
      dataIndex: 'underwritingDate',
      render: (date: string) => date && moment(date).format('YYYY-MM-DD')
    },
    {
      title: '期缴保费',
      key: 'regularPremium',
      dataIndex: 'regularPremium',
      render: (premium: number) => `${premium}元`
    },
    {
      title: '子渠道代码',
      key: 'thirdChannelNo',
      dataIndex: 'thirdChannelNo'
    },
    {
      title: '承保年化保费',
      key: 'underwritingAnnualPremium',
      dataIndex: 'underwritingAnnualPremium',
      render: (premium: number) => `${premium}元`
    },
    {
      title: '解约日期',
      key: 'cancellationDate',
      dataIndex: 'cancellationDate',
      render: (date: string) => date && moment(date).format('YYYY-MM-DD')
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
      scroll={{ x: 2400 }}
      onChange={(pageNumber: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber });
      }}
      title={() =>
        `承保日期: ${underwritingStartDate && underwritingStartDate.substring(0, 10)} 至 ${underwritingEndDate &&
          underwritingEndDate.substring(0, 10)} / 成单量: ${totalCount}单 / 总保费: ${totalPremium}元`
      }
    />
  );
}

const mapStateToProps = (state: RootState) => {
  const { list, page, totalPremium, formData } = state.market;
  return {
    list,
    ...page,
    totalPremium,
    underwritingStartDate: formData.underwritingStartDate,
    underwritingEndDate: formData.underwritingEndDate
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<PolicyFormData>) => doGetPolicyMarketList.request(params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
