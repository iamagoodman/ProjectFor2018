import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { RootState } from '@/stores/reducers';
import { doSetPolicyPayVisible, doGetPolicyPayListDetail } from '@/stores/actions';
import { PolicyPay, Policy, QueryParams, RList } from '@/types';
import WrapperTable from '@/components/wrapperTable';

interface Props extends RList<PolicyPay, QueryParams<Policy>> {
  visible: boolean;
  // policyNo: string | null,
  businessNo: string | null;
  onVisible: (visible: boolean) => void;
  onChange: (params: QueryParams<Policy>) => void;
}

class PayModal extends React.Component<Props> {
  componentDidMount() {
    const props = this.props;
    props.onChange({
      data: { businessNo: props.businessNo },
      pageSize: 5,
      pageNumber: 1,
    });
  }
  renderColumns() {
    const columns = [
      {
        title: '缴费次数序号',
        key: 'serialNo',
        dataIndex: 'serialNo',
      },
      {
        title: '缴费方式',
        key: 'payType',
        dataIndex: 'payType',
      },
      {
        title: '缴费计划开始时间',
        key: 'planStartDate',
        dataIndex: 'planStartDate',
      },
      {
        title: '缴费计划截止时间',
        key: 'planEndDate',
        dataIndex: 'planEndDate',
      },
      {
        title: '应缴费金额(含税)',
        key: 'planFee',
        dataIndex: 'planFee',
        render: (fee: string | number) => `${fee}元`,
      },
      {
        title: '拖欠金额(含税)',
        key: 'delinquentFee',
        dataIndex: 'delinquentFee',
        render: (fee: string | number) => `${fee}元`,
      },
    ];
    return columns;
  }
  render() {
    const props = this.props;
    const { current, totalCount, pageSize, businessNo, list } = props;
    return (
      <Modal
        title="缴费计划"
        visible={props.visible}
        footer={null}
        maskClosable={false}
        width={900}
        onCancel={() => {
          props.onVisible(false);
        }}
      >
        {/* <Table 
                    columns={this.renderColumns()}
                    dataSource={generateUniqueId(props.list)}
                    rowKey='uniqueId'
                    pagination={false}
                /> */}
        <WrapperTable
          columns={this.renderColumns()}
          current={current}
          pageSize={pageSize}
          total={totalCount}
          data={list}
          onChange={(pageNumber: number, pageSize: number) => {
            props.onChange({ pageSize, pageNumber, data: { businessNo } });
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    detailPayVisible,
    detailPay: { list, page },
  } = state.policy;
  return {
    visible: detailPayVisible,
    list,
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doSetPolicyPayVisible(visible),
      onChange: (params: QueryParams<Policy>) => doGetPolicyPayListDetail.request(params),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PayModal);
