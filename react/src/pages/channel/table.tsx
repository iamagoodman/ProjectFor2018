import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon, Switch, Modal, Table, message, Pagination } from 'antd';
import findIndex from 'lodash/findIndex';
import { RootState } from '@/stores/reducers';
import {
  QueryParams,
  ChannelFormData,
  RList,
  Channel,
  SetKey,
  DetailRequest,
  ChannelItem,
  SubChannelPage
} from '@/types';
import {
  doGetChannelList,
  doUpdateChannelSecretKey,
  doGetChannelDetail,
  doSetChannelShowKey,
  doUpdateChannelStatus,
  doSetChannelExpandedRowKeys,
  doGetSubChannelList,
  doSetSubChannelListPage
} from '@/stores/actions';
import AuthButton from '@/components/auth/authButton';
import style from './index.module.less';

interface Props extends RList<ChannelItem, QueryParams<ChannelFormData>> {
  onUpdateSecretKey: (id: number) => void;
  onGetChannelDetail: (data: DetailRequest) => void;
  onModify: (data: SetKey) => void;
  onUpdateStatus: (data: Channel) => void;
  onAdd: (data: SetKey<Channel>) => void;
  onSetExpandedRowKeys: (keys: number[]) => void;
  expandedRowKeys: number[];
  onGetSubChannelList: (params: any) => void;
  onSetSubChannelListPage: (data: SubChannelPage) => void;
}

class CTable extends React.PureComponent<Props> {
  handleClick = (id: number) => {
    const props = this.props;
    Modal.confirm({
      title: '',
      content: '确认更新密钥？',
      onOk: () => {
        props.onUpdateSecretKey(id);
      }
    });
  };
  handleExpand = ({ id, subChannels }: ChannelItem) => {
    const props = this.props;
    const { expandedRowKeys } = props;
    const index = findIndex(expandedRowKeys, (i: number) => i === id);
    if (index === -1) {
      if (!subChannels || !subChannels.length) {
        message.warning('该渠道下面无子渠道');
        return;
      } else {
        id && expandedRowKeys.push(id);
      }
    } else {
      expandedRowKeys.splice(index, 1);
    }
    props.onSetExpandedRowKeys(expandedRowKeys);
  };
  renderExpandedRowRender = (record: ChannelItem) => {
    const props = this.props;
    const { totalCount, pageSize, current, subChannels = [], id } = record;
    const start = (current - 1) * pageSize;
    const end = Math.min(pageSize * current, totalCount);
    return (
      <div>
        {subChannels.length > 0 &&
          subChannels.slice(start, end).map((item: ChannelItem) => (
            <div className={style['table-row']} key={item.id}>
              <div className={style['table-row-item']} onClick={() => {}}>
                {item.channelNo}
              </div>
              <div className={style['table-row-item']}>{item.channelName}</div>
              <div className={style['table-row-item']}>
                <AuthButton code='insurance_channel_update_status'>
                  <Switch
                    checked={!!item.channelStatus}
                    onChange={(checked: boolean) => {
                      props.onUpdateStatus({ id: item.id, channelStatus: checked ? 1 : 0 });
                    }}
                  />
                </AuthButton>
              </div>
              <div className={style['table-row-item']}>{item.channelSec}</div>
              <div className='table-action-wrapper' style={{ textAlign: 'right' }}>
                <AuthButton code='insurance_channel_update_sec'>
                  <Tooltip placement='bottom' title='更新渠道密钥'>
                    <Icon
                      type='reload'
                      onClick={() => {
                        this.handleClick(item.id);
                      }}
                    />
                  </Tooltip>
                </AuthButton>
                <AuthButton code='insurance_channel_detail'>
                  <Tooltip placement='bottom' title='查看详情'>
                    <Icon
                      type='read'
                      onClick={() => {
                        props.onGetChannelDetail({ id: item.id, show: 'detail' });
                      }}
                    />
                  </Tooltip>
                </AuthButton>
                <AuthButton code='insurance_channel_modify'>
                  <Tooltip placement='bottom' title='修改'>
                    <Icon
                      type='edit'
                      onClick={() => {
                        props.onGetChannelDetail({ id: item.id, show: 'channel' });
                      }}
                    />
                  </Tooltip>
                </AuthButton>
              </div>
            </div>
          ))}
        {totalCount > pageSize && (
          <Pagination
            size='small'
            total={totalCount}
            pageSize={pageSize}
            current={current}
            className={style.pagination}
            onChange={(page: number, pageSize: number) => {
              props.onSetSubChannelListPage({ current: page, pageSize, totalCount, parentId: id });
            }}
            showTotal={(total: number, range: [number, number]) =>
              `共${total}条数据，当前显示第${range[0]}条数据至${range[1]}条数据`
            }
          />
        )}
      </div>
    );
  };
  render() {
    const props = this.props;
    const { list, expandedRowKeys, current, pageSize, totalCount } = props;
    const columns = [
      {
        title: '渠道编号',
        key: 'channelNo',
        dataIndex: 'channelNo',
        width: '15%'
      },
      {
        title: '渠道名称',
        key: 'channelName',
        dataIndex: 'channelName',
        width: '20%'
      },
      {
        title: '状态',
        key: 'channelStatus',
        dataIndex: 'channelStatus',
        width: '15%',
        render: (status: number, { id }: Channel) => (
          <AuthButton code='insurance_channel_update_status'>
            <Switch
              checked={!!status}
              onChange={(checked: boolean, e: MouseEvent) => {
                e.stopPropagation();
                props.onUpdateStatus({ id, channelStatus: checked ? 1 : 0 });
              }}
            />
          </AuthButton>
        )
      },
      {
        title: '渠道秘钥',
        key: 'channelSec',
        dataIndex: 'channelSec',
        width: '30%'
      },
      // {
      //     title: '备注',
      //     key: 'remark',
      //     dataIndex: 'remark'
      // },
      {
        title: '',
        key: 'action',
        dataIndex: 'id',
        width: '20%',
        render: (id: number, record: ChannelItem) => (
          <div className='table-action-wrapper tr'>
            <AuthButton code='insurance_sub_channel_add'>
              <Tooltip placement='bottom' title='添加子渠道'>
                <Icon
                  type='plus-circle'
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    e.stopPropagation();
                    props.onAdd({ show: 'channel', key: 'detail', data: { parentId: id } });
                  }}
                />
              </Tooltip>
            </AuthButton>

            <AuthButton code='insurance_channel_update_sec'>
              <Tooltip placement='bottom' title='更新渠道密钥'>
                <Icon
                  type='reload'
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    e.stopPropagation();
                    this.handleClick(id);
                  }}
                />
              </Tooltip>
            </AuthButton>
            <AuthButton code='insurance_channel_detail'>
              <Tooltip placement='bottom' title='查看详情'>
                <Icon
                  type='read'
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    e.stopPropagation();
                    props.onGetChannelDetail({ id, show: 'detail' });
                  }}
                />
              </Tooltip>
            </AuthButton>
            <AuthButton code='insurance_channel_modify'>
              <Tooltip placement='bottom' title='修改'>
                <Icon
                  type='edit'
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    e.stopPropagation();
                    props.onGetChannelDetail({ id, show: 'channel' });
                  }}
                />
              </Tooltip>
            </AuthButton>
          </div>
        )
      }
    ];
    const pagination = {
      current,
      total: totalCount,
      pageSize,
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: (total: number, range: [number, number]) =>
        `当前显示第${range[0]}条至第${range[1]}条数据，共${total}条数据`,
      onChange: (page: number, pageSize?: number) => {
        props.onChange({ pageSize, pageNumber: page });
      },
      onShowSizeChange: (page: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber: page });
      }
    };
    return (
      <Table
        dataSource={list}
        columns={columns}
        rowKey='id'
        pagination={pagination}
        expandedRowRender={(record: ChannelItem) => this.renderExpandedRowRender(record)}
        onExpand={(expanded: boolean, record: ChannelItem) => {
          this.handleExpand(record);
        }}
        onRow={(record: ChannelItem) => {
          return {
            onClick: (e: Event) => {
              this.handleExpand(record);
            }
          };
        }}
        expandedRowKeys={expandedRowKeys}
        className={`${style.table} wrapperTable`}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { list, page, expandedRowKeys } = state.channel;
  return {
    list,
    expandedRowKeys,
    ...page
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<ChannelFormData>) => doGetChannelList.request(params),
      onUpdateSecretKey: (id: number) => doUpdateChannelSecretKey.request(id),
      onGetChannelDetail: (data: DetailRequest) => doGetChannelDetail.request(data),
      onModify: (data: SetKey) => doSetChannelShowKey(data),
      onUpdateStatus: (data: Channel) => doUpdateChannelStatus.request(data),
      onAdd: (data: SetKey<Channel>) => doSetChannelShowKey(data),
      onSetExpandedRowKeys: (keys: number[]) => doSetChannelExpandedRowKeys(keys),
      onGetSubChannelList: (params: any) => doGetSubChannelList.request(params),
      onSetSubChannelListPage: (data: SubChannelPage) => doSetSubChannelListPage(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CTable));
