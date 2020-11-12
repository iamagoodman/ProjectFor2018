import { Epic } from 'redux-observable';
import { filter, mergeMap, catchError, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetDict,
  doGetDictAll,
  doGetCompanyAll,
  doGetProductAll,
  doGetChannelAll,
  doGetProductAllByCompany,
  doGetProductChannelAll,
  doGetCompanyChannelAll,
  doGetChannelAllByProduct,
  doGetPlanAndPolicyType,
  doGetChannelInfo,
  doGetProductListByLoginId,
  doGetChannelGroupAll
} from '@/stores/actions';
import {
  fetchDict,
  fetchDictAll,
  fetchCompanyAll,
  fetchProductAll,
  fetchChannelAll,
  fetchProductAllByCompany,
  fetchChannelAllByProduct,
  fetchPlanAndPolicyType,
  fetchGetChannelInfo,
  fetchProductByLoginId
} from '@/services';
import { of, forkJoin } from 'rxjs';
import {
  Dict,
  Group,
  QueryPage,
  DictAll,
  DictObj,
  Company,
  ErrorInfo,
  Product,
  Channel,
  ResponseOk,
  ProductFormData,
  ChannelFormData,
  PlanTypesItem,
  ChannelInfo,
  ChannelItem
} from '@/types';
import { AxiosResponse } from 'axios';
import { parseStrToArray, channelListToGroup } from '@/utils/util';

// const triggerFetchOnLocationChange: Epic = (action$, state$) => state$.pipe(
//     map(state => state.router.location),
//     distinctUntilChanged()
// )

// const getPartner: Epic = (action$) => action$.pipe(
//     filter(isActionOf(doGetPartner.request)),
//     mergeMap(() => fetchPartner().pipe(
//         map(({data: partnerList}: AxiosResponse<Partner[]>) => doGetPartner.success(partnerList)),
//         catchError((error) => of(doGetPartner.failure(error)))
//     ))

// )

const getDict: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetDict.request)),
    mergeMap(({ payload: { group, groupListName } }: { payload: Group }) =>
      fetchDict(group).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<Dict[]>>) =>
          doGetDict.success({ group: groupListName, dict: data })
        ),
        catchError(error => of(doGetDict.failure(error)))
      )
    )
  );

const getDictAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetDictAll.request)),
    mergeMap(({ payload }: { payload: QueryPage }) =>
      fetchDictAll(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<DictAll[]>>) => {
          const obj: DictObj<Dict[]> = {};
          for (const dict of data) {
            obj[dict.group] = parseStrToArray(dict.value);
          }
          return doGetDictAll.success(obj);
        }),
        catchError(error => of(doGetDictAll.failure(error)))
      )
    )
  );

const getCompanyAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetCompanyAll.request)),
    mergeMap(() =>
      fetchCompanyAll().pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Company[]>>) =>
          doGetCompanyAll.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetCompanyAll.failure(error));
        })
      )
    )
  );

const getProductAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetProductAll.request)),
    mergeMap(() =>
      fetchProductAll().pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Product[]>>) =>
          doGetProductAll.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductAll.failure(error));
        })
      )
    )
  );

const getProductChannelAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetProductChannelAll.request)),
    mergeMap(() =>
      forkJoin(fetchProductAll(), fetchChannelAll()).pipe(
        map(
          ([
            {
              data: { data: productList = [] }
            },
            {
              data: { data: channelList = [] }
            }
          ]: [AxiosResponse<ResponseOk<Product[]>>, AxiosResponse<ResponseOk<Channel[]>>]) =>
            doGetProductChannelAll.success({ productList, channelList })
        ),
        catchError((error: ErrorInfo) => of(doGetProductChannelAll.failure(error)))
      )
    )
  );

const getChannelAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetChannelAll.request)),
    mergeMap(() =>
      fetchChannelAll().pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Channel[]>>) =>
          doGetChannelAll.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetChannelAll.failure(error));
        })
      )
    )
  );

const getChannelGroupAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetChannelGroupAll.request)),
    mergeMap(() =>
      fetchChannelAll().pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<ChannelItem[]>>) => {
          const data = channelListToGroup(list);
          return doGetChannelGroupAll.success(data);
        }),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetChannelGroupAll.failure(error));
        })
      )
    )
  );

const getCompanyChannelAll: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetCompanyChannelAll.request)),
    mergeMap(() =>
      forkJoin(fetchCompanyAll(), fetchChannelAll()).pipe(
        map(
          ([
            {
              data: { data: companyList = [] }
            },
            {
              data: { data: channelList = [] }
            }
          ]: [AxiosResponse<ResponseOk<Company[]>>, AxiosResponse<ResponseOk<Channel[]>>]) =>
            doGetCompanyChannelAll.success({ companyList, channelList })
        ),
        catchError((error: ErrorInfo) => of(doGetProductChannelAll.failure(error)))
      )
    )
  );

const getProductAllByCompany: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetProductAllByCompany.request)),
    mergeMap(({ payload }: { payload: ProductFormData }) =>
      fetchProductAllByCompany(payload).pipe(
        map(({ data: { data: list = [] } }: AxiosResponse<ResponseOk<Product[]>>) =>
          doGetProductAllByCompany.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductAllByCompany.failure(error));
        })
      )
    )
  );

const getChannelAllByProduct: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetChannelAllByProduct.request)),
    mergeMap(({ payload }: { payload: ChannelFormData }) =>
      fetchChannelAllByProduct(payload).pipe(
        map(({ data: { data: list = [] } }: AxiosResponse<ResponseOk<Channel[]>>) =>
          doGetChannelAllByProduct.success(list)
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetChannelAllByProduct.failure(error));
        })
      )
    )
  );

export const getPlanAndPolicyType: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetPlanAndPolicyType.request)),
    mergeMap(({ payload }: { payload: number }) =>
      fetchPlanAndPolicyType(payload).pipe(
        map(
          ({
            data: {
              data: { planTypes = [], policyTypes }
            }
          }: AxiosResponse<ResponseOk<{ planTypes: PlanTypesItem[]; policyTypes: number }>>) =>
            doGetPlanAndPolicyType.success({ planTypes, policyTypes })
        ),
        catchError(err => of(doGetPlanAndPolicyType.failure(err)))
      )
    )
  );

export const getChannelInfo: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetChannelInfo.request)),
    mergeMap(({ payload }: { payload: string }) =>
      fetchGetChannelInfo(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<ChannelInfo>>) => doGetChannelInfo.success(data)),
        catchError(err => of(doGetChannelInfo.failure(err)))
      )
    )
  );

export const getProductListByLoginId: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetProductListByLoginId.request)),
    mergeMap(({ payload }: { payload: string }) =>
      fetchProductByLoginId(payload).pipe(
        map(({ data: { data = [] } }: AxiosResponse<ResponseOk<Product[]>>) => doGetProductListByLoginId.success(data)),
        catchError((error: ErrorInfo) => of(doGetProductListByLoginId.failure(error)))
      )
    )
  );

export default [
  getDict,
  getDictAll,
  getCompanyAll,
  getProductAll,
  getChannelAll,
  getProductAllByCompany,
  getProductChannelAll,
  getCompanyChannelAll,
  getChannelAllByProduct,
  getPlanAndPolicyType,
  getChannelInfo,
  getProductListByLoginId,
  getChannelGroupAll
];
