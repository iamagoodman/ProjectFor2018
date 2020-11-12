import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetIntentionList } from '@/stores/actions';
import { fetchIntentionList } from '@/services';
import { QueryParams, ErrorInfo, IntentionFormData, ResponseOk, IntentionItem } from '@/types';
import { AxiosResponse } from 'axios';

const getIntentionList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetIntentionList.request)),
    mergeMap(({ payload }: { payload: QueryParams<IntentionFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current }
      } = state$.value.payment;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchIntentionList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<IntentionItem[]>>) =>
          doGetIntentionList.success({ list, data, pageNumber, pageSize, totalCount })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetIntentionList.failure(error));
        })
      );
    })
  );

export default [getIntentionList];
