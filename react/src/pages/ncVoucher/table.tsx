import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, NCVoucherFormData, NCVoucherItem, RList } from '@/types';
import { doGetNcVoucherList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';

interface Props extends RList<NCVoucherItem, QueryParams<NCVoucherFormData>> {
  onChange: (params: QueryParams<NCVoucherFormData>) => void;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount } = props;
  const columns = [
    {
      title: '凭证类型',
      key: 'voucherType',
      dataIndex: 'voucherType',
    },
    {
      title: '制表人',
      key: 'prepared',
      dataIndex: 'prepared',
    },
    {
      title: '制表时间',
      key: 'preparedDate',
      dataIndex: 'preparedDate',
    },
    {
      title: '状态',
      key: 'uploadStatus',
      dataIndex: 'uploadStatus',
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
  const { list, page } = state.ncVoucher;
  return {
    list,
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<NCVoucherFormData>) => doGetNcVoucherList.request(params),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
