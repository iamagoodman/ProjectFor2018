import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip, Icon, Table, Modal } from 'antd';
import { getPolicyStatusListObj, getPayStatusListObj } from '@/stores/selectors/app';
import { RootState } from '@/stores/reducers';
import {
  DictObj,
  RList,
  BatchPolicy,
  QueryParams,
  BatchPolicyFormData,
  UndoSummaryData,
  PolicyPayData,
  PolicyInsured,
} from '@/types';
import { getValueFromKey } from '@/utils/util';
import {
  doGetBatchPolicyList,
  doBatchPolicyUndoSummary,
  doSetBatchPolicySelectedKeys,
  doPostPolicyPay,
} from '@/stores/actions';
import { bindActionCreators, Dispatch } from 'redux';
import style from './index.module.less';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<BatchPolicy, QueryParams<BatchPolicyFormData>> {
  payStatus: DictObj;
  policyStatus: DictObj;
  onUndoSummary: (data: UndoSummaryData) => void;
  selectedRowKeys: string[];
  onSetSelectedKeys: (keys: string[]) => void;
  onPay: (data: PolicyPayData) => void;
}

class CTable extends React.Component<Props> {
  componentDidMount() {
    this.props.onSetSelectedKeys([]);
  }
  onSelectChange = (selectedRowKeys: string[]) => {
    this.props.onSetSelectedKeys(selectedRowKeys);
  };
  onUndoSummary = ({ businessNo, batchTradeNo }: BatchPolicy) => {
    const props = this.props;
    Modal.confirm({
      title: '确认取消汇总?',
      content: '',
      onOk: () => {
        props.onUndoSummary({ undoSummaryList: [{ businessNo, batchTradeNo }] });
      },
    });
  };
  onPay = ({
    businessNo,
    premium,
    batchTradeNo,
  }: {
    businessNo: string;
    premium: number;
    batchTradeNo: string;
  }) => {
    const batch = batchTradeNo ? true : false;
    const data = {
      business_no: batch ? batchTradeNo : businessNo,
      payment_no: 'wxpay',
      pay_sence: 'NATIVE',
      batch,
    };
    if (!batch) {
      data['total_fee'] = premium;
    }
    this.props.onPay(data);
  };
  render() {
    const props = this.props;
    const { list, current, pageSize, totalCount, policyStatus, payStatus, selectedRowKeys } = props;
    const columns = [
      {
        title: '汇总号',
        dataIndex: 'batchTradeNo',
        key: 'batchTradeNo',
        width: 120,
      },
      {
        title: '流水号',
        dataIndex: 'businessNo',
        key: 'businessNo',
        width: 120,
      },
      {
        title: '保单号',
        dataIndex: 'policyNo',
        key: 'policyNo',
        width: 120,
      },
      {
        title: '保险产品',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '保费',
        key: 'sumPremium',
        dataIndex: 'sumPremium',
        render: (premium: number) => `${premium}元`,
      },
      {
        title: '投保人姓名',
        key: 'appliName',
        dataIndex: 'appliName',
      },
      {
        title: '被保险人姓名',
        key: 'insuredName',
        dataIndex: 'insuredName',
        render: (text: string, record: BatchPolicy) => {
          const insuredList = record.recognizeeInfoDTOList || [];
          return (
            <div className={`ellipsis ${style.ellipsis}`}>
              {insuredList.map((item: PolicyInsured) => item.insuredName).join(',')}
            </div>
          );
        },
        width: 120,
      },
      {
        title: '保单状态',
        dataIndex: 'policyFlag',
        key: 'policyFlag',
        render: (flag: string) => getValueFromKey(flag, policyStatus),
      },
      {
        title: '缴费状态',
        dataIndex: 'payFlag',
        key: 'payFlag',
        render: (flag: string) => getValueFromKey(flag, payStatus),
      },
      {
        title: '操作',
        dataIndex: 'businessNo',
        key: 'action',
        render: (businessNo: string, record: BatchPolicy) => (
          <div className="table-action-wrapper">
            <AuthButton code="batch_policy_detail">
              <Tooltip title="保单详情" placement="bottom">
                <Link
                  to={`/batch/policy/detail/?businessNo=${businessNo}`}
                  style={{ marginRight: 10 }}
                >
                  <Icon type="read" />
                </Link>
              </Tooltip>
            </AuthButton>
            <AuthButton code="batch_policy_pay">
              {record.payFlag === 'ToBePaid' ? (
                <Tooltip title="支付" placement="bottom">
                  <Icon
                    style={{ marginRight: 10 }}
                    type="pay-circle"
                    onClick={() => {
                      this.onPay({
                        businessNo,
                        premium: record.sumPremium,
                        batchTradeNo: record.batchTradeNo,
                      });
                    }}
                  />
                </Tooltip>
              ) : null}
            </AuthButton>

            {
              <AuthButton code="batch_policy_undo_summary">
                {record.batchTradeNo ? (
                  <Tooltip title="取消汇总" placement="bottom">
                    <Icon
                      type="undo"
                      onClick={() => {
                        this.onUndoSummary(record);
                      }}
                    />
                  </Tooltip>
                ) : null}
              </AuthButton>
            }
          </div>
        ),
      },
    ];
    const pagination = {
      current,
      pageSize,
      total: totalCount,
      showTotal: (total: number, range: [number, number]) =>
        `当前显示第${range[0]}条至第${range[1]}条数据，共${total}条数据`,
      onChange: (page: number, pageSize?: number) => {
        props.onChange({ pageSize, pageNumber: page });
      },
      onShowSizeChange: (page: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber: page });
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: BatchPolicy) => ({
        disabled: !!(record.payFlag !== 'ToBePaid' || record.batchTradeNo),
      }),
    };
    return (
      <Table
        dataSource={list}
        columns={columns}
        rowKey="businessNo"
        pagination={pagination}
        rowSelection={rowSelection}
        className={`wrapperTable ${style.table}`}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, batchPolicy } = state;
  const { payStatusList, policyStatusList } = app;
  const {
    list,
    page: { pageSize, current, totalCount },
    selectedRowKeys,
  } = batchPolicy;
  return {
    payStatus: getPayStatusListObj(payStatusList),
    policyStatus: getPolicyStatusListObj(policyStatusList),
    list,
    pageSize,
    current,
    totalCount,
    selectedRowKeys,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<BatchPolicyFormData>) => doGetBatchPolicyList.request(params),
      onUndoSummary: (data: UndoSummaryData) => doBatchPolicyUndoSummary.request(data),
      onSetSelectedKeys: (keys: string[]) => doSetBatchPolicySelectedKeys(keys),
      onPay: (data: PolicyPayData) => doPostPolicyPay.request(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CTable);
