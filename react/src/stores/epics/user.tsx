import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetUserList,
  doUserBindChannel,
  doSetUserChannelVisible,
  doUserLogin,
  doUserLogout,
  doGetUserInfo,
  doSetUserSyncVisible,
} from '@/stores/actions';
import {
  fetchUserList,
  fetchBindUserChannel,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserInfo,
} from '@/services';
import { QueryParams, ErrorInfo, UserFormData, User, ResponseOk } from '@/types';
import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { store } from '../../index';

const getUserList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetUserList.request)),
    mergeMap(({ payload }: { payload: QueryParams<UserFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.user;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchUserList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<User[]>>) =>
          doGetUserList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetUserList.failure(error));
        }),
      );
    }),
  );

const userBindChannel: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUserBindChannel.request)),
    mergeMap(({ payload }: { payload: User }) =>
      fetchBindUserChannel(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doSetUserChannelVisible({ visible: false }),
            doSetUserSyncVisible({ visible: false }),
            doGetUserList.request({ pageSize: 10, pageNumber: 1 }),
          ),
        ),
        catchError((err: ErrorInfo) => {
          message.warning(err.message || '请求失败');
          return of(doUserBindChannel.failure(err));
        }),
      ),
    ),
  );

const doLogin: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUserLogin.request)),
    mergeMap(({ payload }: { payload: User }) =>
      fetchUserLogin(payload).pipe(
        map(doUserLogin.success),
        tap(() => {
          store.dispatch(push('/insurence/company'));
        }),
        catchError((err: ErrorInfo) => {
          message.warning(err.message || '登录失败');
          return of(doUserLogin.failure(err));
        }),
      ),
    ),
  );

const doLogout: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUserLogout.request)),
    mergeMap(() =>
      fetchUserLogout().pipe(
        map(doUserLogout.success),
        tap(() => {
          window.location.replace('/user/login');
        }),
        catchError((err: ErrorInfo) => {
          message.warning(err.message || '退出登录失败');
          return of(doUserLogout.failure(err));
        }),
      ),
    ),
  );

const getUserInfo: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetUserInfo.request)),
    mergeMap(() =>
      fetchUserInfo().pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<User>>) => doGetUserInfo.success(data)),
        catchError((err: ErrorInfo) => {
          window.location.replace('/login');
          return of(doGetUserInfo.failure(err));
        }),
      ),
    ),
  );

export default [getUserList, userBindChannel, doLogin, doLogout, getUserInfo];
