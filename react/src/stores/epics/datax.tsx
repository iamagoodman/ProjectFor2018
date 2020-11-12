import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetDataX } from '@/stores/actions';
import { fetchDataX } from '@/services';
import { QueryParams, DataXFormData, DataX, ErrorInfo, ResponseOk } from '@/types';
import { AxiosResponse } from 'axios';

interface List {
  list: DataX[];
  total: string;
}

const getDataX: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetDataX.request)),
    mergeMap(({ payload }: { payload: QueryParams<DataXFormData> }) =>
      fetchDataX({
        data: payload.data || state$.value.datax.formData,
        pageSize: payload.pageSize,
        pageNumber: payload.pageNumber,
      }).pipe(
        map(({ data: { data = { list: [], total: '0' } } }: AxiosResponse<ResponseOk<List>>) =>
          doGetDataX.success({
            list: data.list,
            data: payload.data || {},
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize,
            totalCount: Number(data.total) || 0,
          }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetDataX.failure(error));
        }),
      ),
    ),
  );

export default [getDataX];
