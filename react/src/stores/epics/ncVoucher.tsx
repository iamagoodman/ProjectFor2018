import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetNcVoucherList,
  doUploadNcVoucher,
  doSetNcVoucherUploadVisible,
} from '@/stores/actions';
import { fetchNcVoucherList, fetchUploadNcVoucher } from '@/services';
import {
  QueryParams,
  ErrorInfo,
  NCVoucherFormData,
  ResponseOk,
  NCVoucherItem,
  NCVoucherUploadData,
} from '@/types';
import { AxiosResponse } from 'axios';

const getNcVoucherList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetNcVoucherList.request)),
    mergeMap(({ payload }: { payload: QueryParams<NCVoucherFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.ncVoucher;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchNcVoucherList({ data, pageSize, pageNumber }).pipe(
        map(
          ({
            data: { data: list = [], totalCount = 0 },
          }: AxiosResponse<ResponseOk<NCVoucherItem[]>>) =>
            doGetNcVoucherList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetNcVoucherList.failure(error));
        }),
      );
    }),
  );

const uploadNcVoucher: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doUploadNcVoucher.request)),
    mergeMap(({ payload }: { payload: NCVoucherUploadData }) => {
      return fetchUploadNcVoucher(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doUploadNcVoucher.success(),
            doSetNcVoucherUploadVisible(false),
            doGetNcVoucherList.request({ pageSize: 10, pageNumber: 1 }),
          ),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doUploadNcVoucher.failure(error));
        }),
      );
    }),
  );

export default [getNcVoucherList, uploadNcVoucher];
