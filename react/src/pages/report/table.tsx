import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, ReportFormData, Report, RList, DictObj } from '@/types';
import { doGetReportList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { getTransactionTypeListObj } from '@/stores/selectors/app';

interface Props extends RList<Report, QueryParams<ReportFormData>> {
  onChange: (params: QueryParams<ReportFormData>) => void;
  transcationType: DictObj;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount, transcationType } = props;
  const columns = [
    {
      title: '收付主体',
      key: 'paymentTheme',
      dataIndex: 'paymentTheme',
    },
    {
      title: '收付类型',
      key: 'paymentType',
      dataIndex: 'paymentType',
      render: (type: string) => transcationType[type] || type || '',
    },
    {
      title: '收付时间',
      key: 'paymentTime',
      dataIndex: 'paymentTime',
    },
    {
      title: '汇总金额(税前)',
      key: 'aggregateSum',
      dataIndex: 'aggregateSum',
      render: (sum: string) => `${sum}元`,
    },
    {
      title: '汇总金额(税后)',
      key: 'feeAfterTax',
      dataIndex: 'feeAfterTax',
      render: (sum: string) => `${sum}元`,
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
  const { report, app } = state;
  const { transactionTypeList } = app;
  const { list, page } = report;
  return {
    list,
    transcationType: getTransactionTypeListObj(transactionTypeList),
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<ReportFormData>) => doGetReportList.request(params),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
