import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, RList, Commission, CommissionFormData, DetailRequest } from '@/types';
import { RootState } from '@/stores/reducers';
import { doGetCommissionList, doGetCommissionDetail } from '@/stores/actions';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<Commission, QueryParams<CommissionFormData>> {
  onChange: (params: QueryParams<CommissionFormData>) => void;
  onDetail: (data: DetailRequest) => void;
}

class Table extends React.Component<Props> {
  render() {
    const props = this.props;
    const { list, current, totalCount, pageSize } = props;
    const columns = [
      {
        title: '渠道编号',
        key: 'channelNo',
        dataIndex: 'channelNo'
      },
      {
        title: '渠道名称',
        key: 'channelName',
        dataIndex: 'channelName'
      },
      {
        title: '产品编号',
        key: 'productNo',
        dataIndex: 'productNo'
      },
      {
        title: '产品名称',
        key: 'productName',
        dataIndex: 'productName'
      },
      {
        title: '当前渠道费用比例',
        key: 'serviceChargeRate',
        dataIndex: 'serviceChargeRate',
        render: (rate: number) => `${rate !== undefined && rate !== null ? rate : ''}%`
      },
      {
        title: '',
        key: 'action',
        dataIndex: 'id',
        render: (id: number, { channelNo, productNo }: Commission) => (
          <div className='table-action-wrapper'>
            <AuthButton code='insurance_commission_detail'>
              <Tooltip placement='bottom' title='查看详情'>
                <Icon
                  type='read'
                  onClick={() => {
                    props.onDetail({ show: 'detail', id, channelNo, productNo });
                  }}
                />
              </Tooltip>
            </AuthButton>
            <AuthButton code='insurance_commission_modify'>
              <Tooltip placement='bottom' title='修改'>
                <Icon
                  type='edit'
                  onClick={() => {
                    props.onDetail({ show: 'commission', id, channelNo, productNo });
                  }}
                />
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
        // rowKey='id'
        current={current}
        pageSize={pageSize}
        total={totalCount}
        onChange={(pageNumber: number, pageSize: number) => {
          props.onChange({ pageSize, pageNumber });
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { page, list } = state.commission;
  return {
    list,
    ...page
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<CommissionFormData>) => doGetCommissionList.request(params),
      onDetail: (data: DetailRequest) => doGetCommissionDetail.request(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
