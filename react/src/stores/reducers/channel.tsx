import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { InitialPage } from '@/constans';
import { Action, DefaultTable, Channel, ChannelFormData, ChannelItem } from '@/types';
import {
  doGetChannelList,
  doGetChannelDetail,
  doAddOrModifyChannel,
  doSetChannelShowKey,
  doSetChannelExpandedRowKeys,
  doSetSubChannelListPage
} from '@/stores/actions';
import { getPayloadData } from '@/utils/util';

export interface ChannelState extends DefaultTable<ChannelItem, ChannelFormData> {
  show: string;
  detail: Channel;
  channel: Channel;
  expandedRowKeys: number[];
}

const initialState: ChannelState = {
  formData: {},
  page: { ...InitialPage },

  list: [],
  show: 'list',
  detail: {},
  channel: {},
  expandedRowKeys: []
};

export const channelReducer = (state: ChannelState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetChannelList.request):
      return update(state, {
        formData: { $set: getPayloadData<ChannelFormData>(action.payload.data, state.formData) },
        channel: { $set: {} },
        detail: { $set: {} }
      });
    case getType(doGetChannelList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount }
        }
      });
    case getType(doGetChannelList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } }
      });
    case getType(doGetChannelDetail.success):
      return update(state, {
        detail: { $set: action.payload.data },
        show: { $set: action.payload.show }
      });
    case getType(doAddOrModifyChannel.success):
      return update(state, {
        show: { $set: 'list' }
      });

    case getType(doSetChannelShowKey):
      return update(state, {
        show: { $set: action.payload.show },
        [action.payload.key || 'channel']: { $set: action.payload.data || {} }
      });
    // case getType(doGetSubChannelList.success):
    //   const id = action.payload.parentId;
    //   const { list, expandedRowKeys } = state;
    //   const index = findIndex(list, (item: ChannelItem) => item.id === id);
    //   const currentChannel: ChannelItem =
    //     find(list, (item: ChannelItem) => item.id === id) || {};
    //   currentChannel.subChannels = action.payload.list;
    //   const eIndex = findIndex(expandedRowKeys, (e: number) => e === id);

    //   if (eIndex === -1 && id !== undefined) {
    //     expandedRowKeys.push(id);
    //   }
    //   return update(state, {
    //     list: {
    //       [index]: { $set: currentChannel },
    //     },
    //     expandedRowKeys: { $set: [...expandedRowKeys] },
    //     show: { $set: 'list' },
    //   });
    case getType(doSetSubChannelListPage):
      const { parentId: id, pageSize, totalCount, current } = action.payload;
      const index = findIndex(state.list, (item: ChannelItem) => item.id === id);
      const currentChannel: ChannelItem = find(state.list, (item: ChannelItem) => item.id === id) || {};
      currentChannel.current = current;
      currentChannel.pageSize = pageSize;
      currentChannel.totalCount = totalCount;

      return update(state, {
        list: {
          [index]: { $set: { ...currentChannel } }
        },

        show: { $set: 'list' }
      });
    case getType(doSetChannelExpandedRowKeys):
      return update(state, {
        expandedRowKeys: { $set: [...action.payload] }
      });
    default:
      return state;
  }
};
