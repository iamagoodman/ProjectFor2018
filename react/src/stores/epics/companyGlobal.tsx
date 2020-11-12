import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetCompanyGlobal } from '@/stores/actions';
import { fetchCompanyGlobal } from '@/services';
import { QueryParams, CompanyFormData, Company, ErrorInfo, ResponseOk } from '@/types';
import { AxiosResponse } from 'axios';

const getCompanyGlobal: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCompanyGlobal.request)),
    mergeMap(({ payload }: { payload: QueryParams<CompanyFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.companyGlobal;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchCompanyGlobal({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Company[]>>) =>
          doGetCompanyGlobal.success({
            list,
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize,
            totalCount,
          }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanyGlobal.failure(error));
        }),
      );
    }),
  );

export default [getCompanyGlobal];
