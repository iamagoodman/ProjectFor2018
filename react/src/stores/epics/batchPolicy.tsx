import { Epic } from 'redux-observable';
import { filter, mergeMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import {
  doBatchPolicySummary,
  doBatchPolicyUndoSummary,
  doGetBatchPolicyDetail,
  doPostPolicyPay,
  doInsureSetStep,
  doPostPolicyBatchPay,
  doGetBatchPolicyList,
  doSetBatchPolicySelectedKeys,
} from '@/stores/actions';
import {
  QueryParams,
  BatchPolicyFormData,
  ResponseOk,
  ErrorInfo,
  PolicyPayData,
  PolicyBatchPayData,
  PolicyOrderData,
  BatchPolicy,
  BatchPolicyDetail,
} from '@/types';
import {
  fetchBatchPolicy,
  fetchBatchPolicySummary,
  fetchBatchPolicyUndoSummary,
  fetchBatchPolicyDetail,
  fetchPolicyPay,
  fetchPolicyBatchPay,
} from '@/services';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { push } from 'connected-react-router';

const getBatchPolicyList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetBatchPolicyList.request)),
    mergeMap(({ payload }: { payload: QueryParams<BatchPolicyFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.batchPolicy;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchBatchPolicy({ data, pageSize, pageNumber }).pipe(
        map(
          ({
            data: { data: list = [], totalCount = 0 },
          }: AxiosResponse<ResponseOk<BatchPolicy[]>>) =>
            doGetBatchPolicyList.success({ list, data, pageSize, pageNumber, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetBatchPolicyList.failure(error));
        }),
      );
    }),
  );

const summaryPolicy: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doBatchPolicySummary.request)),
    mergeMap(({ payload }: { payload: any }) =>
      fetchBatchPolicySummary(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg || '操作成功');
        }),
        mergeMap(() => [
          doBatchPolicySummary.success(),
          doSetBatchPolicySelectedKeys([]),
          doGetBatchPolicyList.request({ pageSize: 10, pageNumber: 1 }),
        ]),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doBatchPolicySummary.failure(error));
        }),
      ),
    ),
  );

const undoSummaryPolicy: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doBatchPolicyUndoSummary.request)),
    mergeMap(({ payload }: { payload: any }) =>
      fetchBatchPolicyUndoSummary(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg || '操作成功');
        }),
        mergeMap(() => [
          doBatchPolicyUndoSummary.success(),
          doGetBatchPolicyList.request({ pageSize: 10, pageNumber: 1 }),
        ]),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doBatchPolicyUndoSummary.failure(error));
        }),
      ),
    ),
  );

const getBatchPolicyDetail: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetBatchPolicyDetail.request)),
    mergeMap(({ payload }: { payload: string }) =>
      fetchBatchPolicyDetail(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<BatchPolicyDetail>>) =>
          doGetBatchPolicyDetail.success(data),
        ),
        catchError((err: ErrorInfo) => {
          message.error(err.message || '请求失败');
          return of(doGetBatchPolicyDetail.failure(err));
        }),
      ),
    ),
  );

const postPolicyPay: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doPostPolicyPay.request)),
    mergeMap(({ payload: { batch, ...payData } }: { payload: PolicyPayData }) =>
      fetchPolicyPay(payData).pipe(
        mergeMap(({ data: { data } }: AxiosResponse<ResponseOk<PolicyOrderData>>) => [
          push('/batch/insure'),
          doPostPolicyPay.success({ batch, ...payData, ...data }),
          doInsureSetStep(3),
        ]),
        catchError((err: ErrorInfo) => {
          message.error(err.message || '请求失败');
          return of(doPostPolicyPay.failure(err));
        }),
      ),
    ),
  );

const postPolicyBatchPay: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doPostPolicyBatchPay.request)),
    mergeMap(({ payload }: { payload: PolicyBatchPayData }) =>
      fetchPolicyBatchPay(payload).pipe(
        mergeMap(({ data: { data } }: AxiosResponse<ResponseOk<PolicyOrderData>>) => [
          doPostPolicyBatchPay.success({ ...payload, ...data }),
          doInsureSetStep(3),
        ]),
        catchError((err: ErrorInfo) => {
          message.error(err.message || '请求失败');
          return of(doPostPolicyBatchPay.failure(err));
        }),
      ),
    ),
  );

export default [
  getBatchPolicyList,
  summaryPolicy,
  undoSummaryPolicy,
  getBatchPolicyDetail,
  postPolicyPay,
  postPolicyBatchPay,
];
