import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetCommissionList,
  doGetCommissionDetail,
  doAddOrModifyCommission,
} from '@/stores/actions';
import { fetchCommissionList, fetchCommissionDetail, fetchCommissionAddOrModify } from '@/services';
import {
  QueryParams,
  ErrorInfo,
  CommissionFormData,
  DetailRequest,
  Commission,
  CommissionOperateRequest,
  RateItem,
  ResponseOk,
} from '@/types';
import { AxiosResponse } from 'axios';
import * as moment from 'moment';
import { generateUniqueId } from '@/utils/util';

const getCommissionList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCommissionList.request)),
    mergeMap(({ payload }: { payload: QueryParams<CommissionFormData> }) => {
      const { data = state$.value.commission.formData, pageSize, pageNumber } = payload;
      return fetchCommissionList({ data, pageSize, pageNumber }).pipe(
        map(
          ({
            data: { data: list = [], totalCount = 0 },
          }: AxiosResponse<ResponseOk<Commission[]>>) =>
            doGetCommissionList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCommissionList.failure(error));
        }),
      );
    }),
  );

const getCommissionDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetCommissionDetail.request)),
    mergeMap(({ payload: { channelNo, productNo, show, id } }: { payload: DetailRequest }) => {
      return fetchCommissionDetail({ channelNo, productNo }).pipe(
        map(({ data: { data = [] } }: AxiosResponse<ResponseOk<Commission[]>>) => {
          const len = data ? data.length : 0;
          const rateList = data.map(
            ({ beginTime, endTime, serviceChargeRate }: Commission, index: number) => {
              const obj: RateItem = {
                beginTime: beginTime ? moment(beginTime).valueOf() : '',
                endTime: endTime ? moment(endTime).valueOf() : '',
                beginDate: beginTime ? moment(beginTime) : undefined,
                endDate: endTime ? moment(endTime) : undefined,
                commissionRate: serviceChargeRate,
              };
              if (index === len - 1) {
                obj.isEnded = true;
              }
              return obj;
            },
          );
          const newData = {
            id,
            channelNo,
            productNo,
            remark: data.length > 0 ? data[0].remark : '',
            channelName: data.length > 0 ? data[0].channelName : '',
            productName: data.length > 0 ? data[0].productName : '',
            rateList: generateUniqueId(rateList),
          };
          return doGetCommissionDetail.success({ show, data: { ...newData } });
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCommissionDetail.failure(error));
        }),
      );
    }),
  );

const addOrModifyCommission: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doAddOrModifyCommission.request)),
    mergeMap(({ payload: { id, data } }: { payload: CommissionOperateRequest }) => {
      const type = id ? 'modify' : 'add';
      return fetchCommissionAddOrModify(data, type).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doAddOrModifyCommission.success(undefined),
            doGetCommissionList.request({ pageSize: 10, pageNumber: 1 }),
          ),
        ),

        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doAddOrModifyCommission.failure(error));
        }),
      );
    }),
  );

export default [getCommissionList, getCommissionDetail, addOrModifyCommission];
