import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetChannelList,
  doGetChannelDetail,
  doAddOrModifyChannel,
  doUpdateChannelSecretKey,
  doUpdateChannelStatus,
  doSetChannelExpandedRowKeys,
  doGetSubChannelList
} from '@/stores/actions';
import {
  fetchChannelList,
  fetchChannelDetail,
  fetchChannelAddOrModify,
  fetchChannelUpdateSecretKey,
  fetchChannelUpdateStatus,
  fetchSubChannelList
} from '@/services';
import {
  ErrorInfo,
  ChannelFormData,
  Channel,
  DetailRequest,
  ResponseOk,
  ChannelItem,
  ChannelQueryParams
} from '@/types';
import { AxiosResponse } from 'axios';

const getChannelList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetChannelList.request)),
    mergeMap(({ payload: { subPageNumber = 1, subPageSize = 10, ...other } }: { payload: ChannelQueryParams }) => {
      const {
        formData,
        page: { pageSize: size, current }
      } = state$.value.channel;
      const { data = formData, pageSize = size, pageNumber = current } = other;
      return fetchChannelList({ data, pageSize, pageNumber }).pipe(
        mergeMap(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<ChannelItem[]>>) => {
          const expandedRowKeys = state$.value.channel.expandedRowKeys.filter(
            (key: number) => list.findIndex((item: ChannelItem) => item.id === key) > -1
          );
          const newList = list.map((item: ChannelItem) => ({
            ...item,
            pageSize: subPageSize,
            current: subPageNumber,
            totalCount: item.subChannels ? item.subChannels.length : 0
          }));
          return [
            doGetChannelList.success({ list: newList, data, pageNumber, pageSize, totalCount }),
            doSetChannelExpandedRowKeys(expandedRowKeys)
          ];
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetChannelList.failure(error));
        })
      );
    })
  );

const getChannelDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetChannelDetail.request)),
    mergeMap(({ payload: { id, show } }: { payload: DetailRequest }) => {
      return fetchChannelDetail(id).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<Channel>>) =>
          doGetChannelDetail.success({ show, data: { id, ...data } })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetChannelDetail.failure(error));
        })
      );
    })
  );

const addOrModifyChannel: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doAddOrModifyChannel.request)),
    mergeMap(({ payload: { current = 1, pageSize = 10, ...data } }: { payload: Channel }) => {
      return fetchChannelAddOrModify(data).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => {
          const expandedRowKeys = state$.value.channel.expandedRowKeys;
          const { parentId, id } = data;
          if (parentId !== 0 && expandedRowKeys.indexOf(parentId) === -1) {
            expandedRowKeys.push(parentId);
          }
          return [
            doSetChannelExpandedRowKeys(expandedRowKeys),
            doAddOrModifyChannel.success(undefined),
            doGetChannelList.request(
              parentId !== 0 || id ? { subPageSize: pageSize, subPageNumber: current } : { pageSize: 10, pageNumber: 1 }
            )
          ];
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doAddOrModifyChannel.failure(error));
        })
      );
    })
  );

const updateChannelSecretKey: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUpdateChannelSecretKey.request)),
    mergeMap(({ payload }: { payload: number }) => {
      return fetchChannelUpdateSecretKey(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => of(doUpdateChannelSecretKey.success(undefined), doGetChannelList.request({}))),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doUpdateChannelSecretKey.failure(error));
        })
      );
    })
  );

const updateChannelStatus: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUpdateChannelStatus.request)),
    mergeMap(({ payload }: { payload: Channel }) => {
      return fetchChannelUpdateStatus(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => of(doUpdateChannelStatus.success(undefined), doGetChannelList.request({}))),

        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doUpdateChannelStatus.failure(error));
        })
      );
    })
  );

const getSubChannelList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetSubChannelList.request)),
    mergeMap(({ payload }: { payload: ChannelFormData }) => {
      return fetchSubChannelList(payload).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<ChannelItem[]>>) =>
          doGetSubChannelList.success({
            list,
            page: { pageSize: 10, current: 1, totalCount },
            parentId: payload.parentId
          })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetSubChannelList.failure(error));
        })
      );
    })
  );

export default [
  getChannelList,
  getChannelDetail,
  addOrModifyChannel,
  updateChannelSecretKey,
  updateChannelStatus,
  getSubChannelList
];
