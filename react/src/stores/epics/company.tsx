import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
// import { push } from 'connected-react-router';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetCompanyList,
  doGetCompanyDetail,
  doAddOrModifyCompany,
  doGetCompanySecondList,
  doGetCompanySecondDetail,
  doAddOrModifyCompanySecond,
  doDeleteCompany,
  doDeleteCompanySecond,
} from '@/stores/actions';
import {
  fetchCompanyList,
  fetchCompanyDetail,
  fetchCompanyAddOrModify,
  fetchCompanySecondList,
  fetchCompanySecondDetail,
  fetchCompanySecondAddOrModify,
  fetchCompanyDelete,
  fetchCompanySecondDelete,
} from '@/services';
import { QueryParams, ErrorInfo, CompanyFormData, Company, ResponseOk } from '@/types';
import { AxiosResponse } from 'axios';

const getCompanyList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCompanyList.request)),
    mergeMap(({ payload }: { payload: QueryParams<CompanyFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.company;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchCompanyList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Company[]>>) =>
          doGetCompanyList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanyList.failure(error));
        }),
      );
    }),
  );

const getCompanyDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCompanyDetail.request)),
    mergeMap(({ payload }: { payload: number | undefined }) => {
      return fetchCompanyDetail(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<Company>>) =>
          doGetCompanyDetail.success(data),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanyDetail.failure(error));
        }),
      );
    }),
  );

const addOrModifyCompany: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doAddOrModifyCompany.request)),
    mergeMap(({ payload: { level, owningCompanyId, ...data } }: { payload: Company }) => {
      return fetchCompanyAddOrModify(data).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doAddOrModifyCompany.success(undefined),
            (() =>
              level === 'first'
                ? doGetCompanyList.request({ pageSize: 10, pageNumber: 1 })
                : doGetCompanySecondList.request({
                    owningCompanyNo: data.owningCompanyNo,
                    id: owningCompanyId,
                  }))(),
          ),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doAddOrModifyCompany.failure(error));
        }),
      );
    }),
  );

const deleteCompany: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doDeleteCompany.request)),
    mergeMap(({ payload }: { payload: number | undefined }) => {
      return fetchCompanyDelete(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doDeleteCompany.success(undefined),
            doGetCompanyList.request({ pageSize: 10, pageNumber: 1 }),
          ),
        ),

        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doDeleteCompany.failure(error));
        }),
      );
    }),
  );

const deleteCompanySecond: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doDeleteCompanySecond.request)),
    mergeMap(({ payload }: { payload: number }) => {
      return fetchCompanySecondDelete(payload).pipe(
        map(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
          return doDeleteCompanySecond.success(undefined);
        }),
        map(() => doGetCompanyList.request({ pageSize: 10, pageNumber: 1 })),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doDeleteCompanySecond.failure(error));
        }),
      );
    }),
  );

const getCompanySecondList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCompanySecondList.request)),
    mergeMap(({ payload: { id, owningCompanyNo } }: { payload: Company }) => {
      return fetchCompanySecondList(owningCompanyNo).pipe(
        map(({ data: { data: list = [] } }: AxiosResponse<ResponseOk<Company[]>>) =>
          doGetCompanySecondList.success({ list, companyNo: owningCompanyNo, id }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanySecondList.failure(error));
        }),
      );
    }),
  );

const getCompanySecondDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCompanySecondDetail.request)),
    mergeMap(({ payload }: { payload: number }) => {
      return fetchCompanySecondDetail(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<Company>>) =>
          doGetCompanySecondDetail.success(data),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanySecondDetail.failure(error));
        }),
      );
    }),
  );

const addOrModifyCompanySecond: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doAddOrModifyCompanySecond.request)),
    mergeMap(({ payload }: { payload: Company }) => {
      const type = payload.id ? 'modify' : 'add';
      return fetchCompanySecondAddOrModify(payload, type).pipe(
        map(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
          return doAddOrModifyCompanySecond.success(undefined);
        }),
        map(() => doGetCompanyList.request({ pageSize: 10, pageNumber: 1 })),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doAddOrModifyCompanySecond.failure(error));
        }),
      );
    }),
  );

export default [
  getCompanyList,
  getCompanyDetail,
  addOrModifyCompany,
  deleteCompany,
  deleteCompanySecond,
  getCompanySecondList,
  getCompanySecondDetail,
  addOrModifyCompanySecond,
];
