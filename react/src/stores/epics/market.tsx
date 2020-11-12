import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetPolicyMarketList, doPolicyMarketImportData, doGetPolicyMarketProductList } from '@/stores/actions';
import { fetchPolicyMarketList, fetchPolicyMarketImportData, fetchPolicyMarketProductList } from '@/services';
import {
  QueryParams,
  ErrorInfo,
  PolicyMarketFormData,
  ResponseOk,
  PolicyMarketImportData,
  PolicyMarketList
} from '@/types';
import { AxiosResponse } from 'axios';

const getPolicyMarketList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPolicyMarketList.request)),
    mergeMap(({ payload }: { payload: QueryParams<PolicyMarketFormData> }) => {
      const { data = state$.value.market.formData, pageSize, pageNumber } = payload;
      return fetchPolicyMarketList({ data, pageSize, pageNumber }).pipe(
        map(
          ({
            data: {
              data: { grossUnderwritingAnnualPremium = 0, mktPolicyInfoDTOList = [] } = {
                grossUnderwritingAnnualPremium: 0,
                mktPolicyInfoDTOList: []
              },
              totalCount = 0
            }
          }: AxiosResponse<ResponseOk<PolicyMarketList>>) =>
            doGetPolicyMarketList.success({
              list: mktPolicyInfoDTOList,
              data,
              pageNumber,
              pageSize,
              totalCount,
              totalPremium: grossUnderwritingAnnualPremium
            })
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPolicyMarketList.failure(error));
        })
      );
    })
  );

const policyMarketImportData: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doPolicyMarketImportData.request)),
    mergeMap(({ payload }: { payload: PolicyMarketImportData }) =>
      fetchPolicyMarketImportData(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doPolicyMarketImportData.success(undefined),
            doGetPolicyMarketList.request({ pageSize: 10, pageNumber: 1 })
          )
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doPolicyMarketImportData.failure(error));
        })
      )
    )
  );

const policyMarketProductList: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetPolicyMarketProductList.request)),
    mergeMap(() =>
      fetchPolicyMarketProductList().pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<string[]>>) => doGetPolicyMarketProductList.success(data)),
        catchError(error => of(doGetPolicyMarketProductList.failure()))
      )
    )
  );
export default [getPolicyMarketList, policyMarketImportData, policyMarketProductList];
