import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, PaymentFormData, Policy, RList, DictObj } from '@/types';
import { doGetPaymentList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { getTransactionTypeListObj } from '@/stores/selectors/app';

interface Props extends RList<Policy, QueryParams<PaymentFormData>> {
  onChange: (params: QueryParams<PaymentFormData>) => void;
  transcationType: DictObj;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount, transcationType } = props;
  const columns = [
    {
      title: '保单号',
      key: 'policyNo',
      dataIndex: 'policyNo',
    },
    {
      title: '投保人姓名',
      key: 'appliName',
      dataIndex: 'appliName',
    },
    {
      title: '收付类型',
      key: 'paymentType',
      dataIndex: 'paymentType',
      render: (type: string) => transcationType[type] || type || '',
    },
    {
      title: '收付主体',
      key: 'paymentTheme',
      dataIndex: 'paymentTheme',
    },
    {
      title: '收付时间',
      key: 'chargeTime',
      dataIndex: 'chargeTime',
    },
    {
      title: '收付金额(税前)',
      key: 'fee',
      dataIndex: 'fee',
      render: (fee: string | number) => `${fee}元`,
    },
    {
      title: '收付金额(税后)',
      key: 'feeAfterTax',
      dataIndex: 'feeAfterTax',
      render: (fee: string | number) => `${fee}元`,
    },
  ];
  return (
    <WrapperTable
      data={list}
      columns={columns}
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
  const { payment, app } = state;
  const { transactionTypeList } = app;
  const { list, page } = payment;
  return {
    list,
    transcationType: getTransactionTypeListObj(transactionTypeList),
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<PaymentFormData>) => doGetPaymentList.request(params),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
