import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetReportList, doGetReportCompanyList } from '@/stores/actions';
import { fetchReportList, fetchReportCompanyList } from '@/services';
import { QueryParams, ErrorInfo, ReportFormData, Report, ResponseOk, ReportCompany } from '@/types';
import { AxiosResponse } from 'axios';

const getReportList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetReportList.request)),
    mergeMap(({ payload }: { payload: QueryParams<ReportFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.report;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchReportList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Report[]>>) =>
          doGetReportList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetReportList.failure(error));
        }),
      );
    }),
  );

const getReportCompanyList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetReportCompanyList.request)),
    mergeMap(({ payload }: { payload: string }) =>
      fetchReportCompanyList(payload).pipe(
        map(({ data: { data: list = [] } }: AxiosResponse<ResponseOk<ReportCompany[]>>) =>
          doGetReportCompanyList.success(list),
        ),
        catchError((error: ErrorInfo) => of(doGetReportCompanyList.failure(error))),
      ),
    ),
  );

export default [getReportList, getReportCompanyList];
