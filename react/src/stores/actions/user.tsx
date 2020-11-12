import * as ACTIONTYPE from '@/constans/actionType';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { User, UserFormData, QueryParams, List, ErrorInfo } from '@/types';

// export const doUserLogin = createAction(
//     ACTIONTYPE.USER_LOGIN_MOCK,
//     action => (data: User) => action({...data})
// )

export const doUserLogin = createAsyncAction(
  ACTIONTYPE.USER_LOGIN_REQUEST,
  ACTIONTYPE.USER_LOGIN_SUCCESS,
  ACTIONTYPE.USER_LOGIN_FAILURE,
)<User, undefined, ErrorInfo>();

export const doSetUserInfo = createAction(ACTIONTYPE.USER_INFO_MOCK, action => (data: User) =>
  action({ ...data }),
);

export const doGetUserList = createAsyncAction(
  ACTIONTYPE.USER_LIST_REQUEST,
  ACTIONTYPE.USER_LIST_SUCCESS,
  ACTIONTYPE.USER_LIST_FAILURE,
)<QueryParams<UserFormData>, List<User, UserFormData>, ErrorInfo>();

export const doSetUserChannelVisible = createAction(
  ACTIONTYPE.USER_CHANNEL_VISIBLE,
  action => (data: { visible: boolean; id?: number }) => action({ ...data }),
);

export const doSetUserSyncVisible = createAction(
  ACTIONTYPE.USER_SYNC_VISIBLE,
  action => (data: { visible: boolean; id?: number }) => action({ ...data }),
);

export const doSetUserDetail = createAction(ACTIONTYPE.USER_DETAIL, action => (data: User) =>
  action({ ...data }),
);
export const doUserBindChannel = createAsyncAction(
  ACTIONTYPE.USER_BIND_CHANNEL_REQUEST,
  ACTIONTYPE.USER_BIND_CHANNEL_SUCCESS,
  ACTIONTYPE.USER_BIND_CHANNEL_FAILURE,
)<User, undefined, ErrorInfo>();

export const doUserLogout = createAsyncAction(
  ACTIONTYPE.USER_LOGOUT_REQUEST,
  ACTIONTYPE.USER_LOGOUT_SUCCESS,
  ACTIONTYPE.USER_LOGOUT_FAILURE,
)<undefined, undefined, ErrorInfo>();

export const doGetUserInfo = createAsyncAction(
  ACTIONTYPE.USER_INFO_REQUEST,
  ACTIONTYPE.USER_INFO_SUCCESS,
  ACTIONTYPE.USER_INFO_FAILURE,
)<undefined, User, ErrorInfo>();
