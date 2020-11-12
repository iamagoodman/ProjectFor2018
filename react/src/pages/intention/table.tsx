import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, IntentionFormData, Policy, RList } from '@/types';
import { doGetIntentionList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';

interface Props extends RList<Policy, QueryParams<IntentionFormData>> {
  onChange: (params: QueryParams<IntentionFormData>) => void;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount } = props;
  const columns = [
    {
      title: '流水号',
      key: 'businessNo',
      dataIndex: 'businessNo'
    },
    {
      title: '产品名称',
      key: 'productName',
      dataIndex: 'productName'
    },

    {
      title: '投保/被保险单位名称',
      key: 'unitName',
      dataIndex: 'unitName'
    },
    {
      title: '保险起期',
      key: 'startDate',
      dataIndex: 'startDate',
      render: (date: string) => date && moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '保险止期',
      key: 'endDate',
      dataIndex: 'endDate',
      render: (date: string) => date && moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '销售员姓名',
      key: 'salesmanName',
      dataIndex: 'salesmanName'
    }
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
  const { list, page } = state.intention;
  return {
    list,

    ...page
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<IntentionFormData>) => doGetIntentionList.request(params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
