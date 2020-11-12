import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetPolicyList,
  doGetPolicyAppliDetail,
  doGetPolicyFavoreeDetail,
  doGetPolicyRecognizeeDetail,
  doGetPolicyPayDetail,
  doGetPolicyFeeDetail,
  doGetPolicyClauseDetail,
  doGetPolicyBaseDetail,
  doGetPolicySubjectDetail,
  doGetPolicyRiskTypeDetail,
  doGetPolicyDetail,
  doGetPolicyPayListDetail,
  doPolicyImportData,
  doPolicyQzImportData,
  doSetPolicyShowKey,
  doGetPolicyEmployeeListDetail
} from '@/stores/actions';
import {
  fetchPolicyList,
  fetchPolicyAppliDetail,
  fetchPolicyFavoreeDetail,
  fetchPolicyRecognizeeDetail,
  fetchPolicyPayDetail,
  fetchPolicyFeeDetail,
  fetchPolicyClauseDetail,
  fetchPolicyBaseDetail,
  fetchPolicySubjectDetail,
  fetchPolicyRiskTypeDetail,
  fetchPolicyPayListDetail,
  fetchPolicyImportData,
  fetchPolicyQzImportData,
  fetchPolicyEmployeeListDetail
} from '@/services';
import {
  QueryParams,
  ErrorInfo,
  PolicyFormData,
  Policy,
  PolicyDetail,
  PolicyPay,
  PolicyFee,
  ResponseOk,
  PolicyImportData,
  PolicyQzImportData,
  PolicyDetailEmployeeItem
} from '@/types';
import { AxiosResponse } from 'axios';

const getPolicyList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyList.request)),
    mergeMap(({ payload }: { payload: QueryParams<PolicyFormData> }) => {
      const { data = state$.value.policy.formData, pageSize, pageNumber } = payload;
      return fetchPolicyList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Policy[]>>) =>
          doGetPolicyList.success({ list, data, pageNumber, pageSize, totalCount })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyList.failure(error));
        })
      );
    })
  );

const getPolicyAppliDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyAppliDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyAppliDetail(payload).pipe(
        map(({ data: { data = {} } }: AxiosResponse<ResponseOk<PolicyDetail>>) => doGetPolicyAppliDetail.success(data)),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyAppliDetail.failure(error));
        })
      );
    })
  );

const getPolicyFavoreeDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyFavoreeDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyFavoreeDetail(payload).pipe(
        map(({ data: { data = [] } }: AxiosResponse<ResponseOk<PolicyDetail[]>>) =>
          doGetPolicyFavoreeDetail.success(data)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyFavoreeDetail.failure(error));
        })
      );
    })
  );

const getPolicyRecognizeeDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyRecognizeeDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyRecognizeeDetail(payload).pipe(
        map(({ data: { data = [] } }: AxiosResponse<ResponseOk<PolicyDetail[]>>) =>
          doGetPolicyRecognizeeDetail.success(data)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyRecognizeeDetail.failure(error));
        })
      );
    })
  );

const getPolicyFeeDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyFeeDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyFeeDetail(payload).pipe(
        map(({ data: { data = [] } }: AxiosResponse<ResponseOk<PolicyFee[]>>) => {
          const obj = {};
          data &&
            data.forEach((item: PolicyFee) => {
              obj[item.type] = item.fee;
            });
          return doGetPolicyFeeDetail.success(obj);
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyFeeDetail.failure(error));
        })
      );
    })
  );

const getPolicyPayDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyPayDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyPayDetail(payload).pipe(
        map(({ data: { data = {} } }: AxiosResponse<ResponseOk<PolicyDetail>>) => {
          return doGetPolicyPayDetail.success({ policyPaymentInfoDTO: 'extra', ...data });
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyPayDetail.failure(error));
        })
      );
    })
  );

const getPolicyClauseDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyClauseDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyClauseDetail(payload).pipe(
        map(({ data: { data = {} } }: AxiosResponse<ResponseOk<PolicyDetail>>) =>
          doGetPolicyClauseDetail.success(data)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyClauseDetail.failure(error));
        })
      );
    })
  );

const getPolicyBaseDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyBaseDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyBaseDetail(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<PolicyDetail>>) => doGetPolicyBaseDetail.success(data)),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyBaseDetail.failure(error));
        })
      );
    })
  );

const getPolicyDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return forkJoin(fetchPolicyBaseDetail(payload), fetchPolicySubjectDetail(payload)).pipe(
        map(
          ([
            {
              data: { data: baseDetail }
            },
            {
              data: { data: subjectDetail }
            }
          ]) => {
            return doGetPolicyDetail.success({});
          }
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyDetail.failure(error));
        })
      );
    })
  );

const getPolicySubjectDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicySubjectDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicySubjectDetail(payload).pipe(
        map(
          ({
            data: {
              data: { cargoInfoDTO, liabilityDetailDTO, policyEmployerLiabilityItemInfoDTO }
            }
          }: AxiosResponse<
            ResponseOk<{
              cargoInfoDTO: PolicyDetail;
              liabilityDetailDTO: PolicyDetail;
              policyEmployerLiabilityItemInfoDTO: PolicyDetail;
            }>
          >) =>
            doGetPolicySubjectDetail.success({
              cargo: { ...cargoInfoDTO },
              liability: { ...liabilityDetailDTO },
              policyEmployerLiability: { ...policyEmployerLiabilityItemInfoDTO },
              isEmpty: !cargoInfoDTO && !liabilityDetailDTO && !policyEmployerLiabilityItemInfoDTO && true
            })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicySubjectDetail.failure(error));
        })
      );
    })
  );

const getPolicyRiskTypeDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyRiskTypeDetail.request)),
    mergeMap(({ payload }: { payload: Policy }) => {
      return fetchPolicyRiskTypeDetail(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<PolicyDetail>>) => doGetPolicyRiskTypeDetail.success(data)),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyRiskTypeDetail.failure(error));
        })
      );
    })
  );

const getPolicyPayListDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyPayListDetail.request)),
    mergeMap(({ payload: { data, pageSize, pageNumber } }: { payload: QueryParams<Policy> }) =>
      fetchPolicyPayListDetail({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<PolicyPay[]>>) =>
          doGetPolicyPayListDetail.success({ list, totalCount, pageSize, pageNumber })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyPayListDetail.failure(error));
        })
      )
    )
  );

const policyImportData: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doPolicyImportData.request)),
    mergeMap(({ payload }: { payload: PolicyImportData }) =>
      fetchPolicyImportData(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => [
          doPolicyImportData.success(undefined),
          doSetPolicyShowKey({ show: 'list' }),
          doGetPolicyList.request({ pageSize: 10, pageNumber: 1 })
        ]),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doPolicyImportData.failure(error));
        })
      )
    )
  );

const policyQzImportData: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doPolicyQzImportData.request)),
    mergeMap(({ payload }: { payload: PolicyQzImportData }) =>
      fetchPolicyQzImportData(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => [
          doPolicyQzImportData.success(),
          doSetPolicyShowKey({ show: 'list' }),
          doGetPolicyList.request({ pageSize: 10, pageNumber: 1 })
        ]),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doPolicyQzImportData.failure(error));
        })
      )
    )
  );
const getPolicyEmployeeListDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyEmployeeListDetail.request)),
    mergeMap(({ payload }: { payload: number }) =>
      fetchPolicyEmployeeListDetail(payload).pipe(
        map(({ data: { data: list = [] } }: AxiosResponse<ResponseOk<PolicyDetailEmployeeItem[]>>) =>
          doGetPolicyEmployeeListDetail.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyEmployeeListDetail.failure(error));
        })
      )
    )
  );
export default [
  getPolicyList,
  getPolicyAppliDetail,
  getPolicyFavoreeDetail,
  getPolicyRecognizeeDetail,
  getPolicyFeeDetail,
  getPolicyPayDetail,
  getPolicyClauseDetail,
  getPolicyBaseDetail,
  getPolicySubjectDetail,
  getPolicyRiskTypeDetail,
  getPolicyDetail,
  getPolicyPayListDetail,
  policyImportData,
  policyQzImportData,
  getPolicyEmployeeListDetail
];
