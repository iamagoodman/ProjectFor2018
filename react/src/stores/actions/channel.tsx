import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Channel,
  List,
  ErrorInfo,
  ChannelFormData,
  Message,
  SetKey,
  DetailRequest,
  DetailResponse,
  ChannelItem,
  SubChannel,
  SubChannelPage,
  ChannelQueryParams
} from '@/types';

export const doGetChannelList = createAsyncAction(
  ACTIONTYPE.CHANNEL_REQUEST,
  ACTIONTYPE.CHANNEL_SUCCESS,
  ACTIONTYPE.CHANNEL_FAILURE
)<ChannelQueryParams, List<ChannelItem, ChannelFormData>, ErrorInfo>();

export const doAddOrModifyChannel = createAsyncAction(
  ACTIONTYPE.CHANNEL_ADDORMODIFY_REQUEST,
  ACTIONTYPE.CHANNEL_ADDORMODIFY_SUCCESS,
  ACTIONTYPE.CHANNEL_ADDORMODIFY_FAILURE
)<Channel, undefined | Message, undefined | ErrorInfo>();

export const doGetChannelDetail = createAsyncAction(
  ACTIONTYPE.CHANNEL_DETAIL_REQUEST,
  ACTIONTYPE.CHANNEL_DETAIL_SUCCESS,
  ACTIONTYPE.CHANNEL_DETAIL_FAILURE
)<DetailRequest, DetailResponse<Channel>, ErrorInfo>();

export const doSetChannelShowKey = createAction(ACTIONTYPE.CHANNEL_SHOW_KEY, action => (data: SetKey) =>
  action({ ...data })
);

export const doUpdateChannelSecretKey = createAsyncAction(
  ACTIONTYPE.CHANNEL_UPDATE_SECRETKEY_REQUEST,
  ACTIONTYPE.CHANNEL_UPDATE_SECRETKEY_SUCCESS,
  ACTIONTYPE.CHANNEL_UPDATE_SECRETKEY_FAILURE
)<number, undefined | Message, undefined | ErrorInfo>();

export const doUpdateChannelStatus = createAsyncAction(
  ACTIONTYPE.CHANNEL_UPDATE_STATUS_REQUEST,
  ACTIONTYPE.CHANNEL_UPDATE_STATUS_SUCCESS,
  ACTIONTYPE.CHANNEL_UPDATE_STATUS_FAILURE
)<Channel, undefined | Message, undefined | ErrorInfo>();

export const doSetChannelExpandedRowKeys = createAction(
  ACTIONTYPE.CHANNEL_SET_EXPANDED_ROWKEYS,
  action => (expandedRowKeys: number[]) => action(expandedRowKeys)
);

export const doGetSubChannelList = createAsyncAction(
  ACTIONTYPE.CHANNEL_SUB_LIST_REQUEST,
  ACTIONTYPE.CHANNEL_SUB_LIST_SUCCESS,
  ACTIONTYPE.CHANNEL_SUB_LIST_FAILURE
)<ChannelFormData, SubChannel, ErrorInfo>();

export const doSetSubChannelListPage = createAction(
  ACTIONTYPE.SET_SUB_CHANNEL_LIST_PAGE,
  action => (data: SubChannelPage) => action(data)
);
