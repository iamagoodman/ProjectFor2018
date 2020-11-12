import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, User, UserFormData, DefaultTable } from '@/types';
import {
  doSetUserInfo,
  doGetUserList,
  doSetUserChannelVisible,
  doUserLogin,
  doSetUserSyncVisible,
  doSetUserDetail,
  doGetUserInfo,
} from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

interface userState extends DefaultTable<User, UserFormData> {
  isLogin: boolean;
  userInfo: User;
  userChannelVisible: boolean;
  syncUserVisible: boolean;
  userId?: number;
  detail: User;
}

const initialState: userState = {
  isLogin: true,
  userInfo: {},
  formData: {},
  page: { ...InitialPage },
  list: [],
  userChannelVisible: false,
  syncUserVisible: false,
  userId: -1,
  detail: {},
};

export const userReducer = (state: userState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doSetUserInfo):
      return update(state, {
        isLogin: { $set: true },
        userInfo: { $set: { ...action.payload } },
      });
    case getType(doGetUserList.request):
      return update(state, {
        formData: { $set: getPayloadData<UserFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetUserList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetUserList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doSetUserChannelVisible):
      return update(state, {
        userChannelVisible: { $set: action.payload.visible },
        userId: { $set: action.payload.id || undefined },
      });
    case getType(doUserLogin.success):
      return update(state, {
        isLogin: { $set: true },
      });
    case getType(doSetUserSyncVisible):
      return update(state, {
        syncUserVisible: { $set: action.payload.visible },
      });
    case getType(doGetUserInfo.success):
      return update(state, {
        userInfo: { $set: action.payload },
      });
    case getType(doSetUserDetail):
      return update(state, {
        detail: { $set: action.payload },
        userChannelVisible: { $set: true },
      });
    default:
      return state;
  }
};
