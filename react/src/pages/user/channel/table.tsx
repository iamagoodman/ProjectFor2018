import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import WrapperTable from '@/components/wrapperTable';
import { QueryParams, UserFormData, User, RList } from '@/types';
import { doGetUserList, doSetUserDetail } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<User, QueryParams<UserFormData>> {
  onChange: (params: QueryParams<UserFormData>) => void;

  // onVisible: (visible: boolean, id: number) => void
  onDetail: (data: User) => void;
}

function Table(props: Props) {
  const { list, current, pageSize, totalCount } = props;
  const columns = [
    {
      title: '用户名称',
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: '用户loginId',
      key: 'loginId',
      dataIndex: 'loginId',
    },
    {
      title: '渠道方',
      key: 'channelName',
      dataIndex: 'channelName',
      render: (channel: string) => channel || '未分配渠道方，请去分配',
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'id',
      render: (id: number, record: User) => (
        <div className="table-action-wrapper">
          <AuthButton code="insurance_userChannel_modify">
            <Tooltip placement="bottom" title="分配渠道方">
              <Icon
                type="edit"
                onClick={() => {
                  props.onDetail(record);
                }}
              />
            </Tooltip>
          </AuthButton>
        </div>
      ),
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
  const { list, page } = state.user;
  return {
    list,
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<UserFormData>) => doGetUserList.request(params),
      onDetail: (data: User) => doSetUserDetail(data),
      // onVisible: (visible: boolean, id: number) => doSetUserChannelVisible({ visible, id })
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Table);
