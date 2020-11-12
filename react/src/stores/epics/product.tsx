import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import {
  doGetProductList,
  doGetProductDetail,
  doAddOrModifyProduct,
  doUpdateProductStatus,
  doGetProductCompanyAll,
  doGetProductEditorDetail,
  doUpdateProductHtml,
} from '@/stores/actions';
import {
  fetchProductList,
  fetchProductDetail,
  fetchProductAddOrModify,
  fetchProductUpdateStatus,
  fetchProductCompanyAll,
  fetchProductEditorDetail,
  fetchProductUpdateHtml,
} from '@/services';
import {
  QueryParams,
  ErrorInfo,
  ProductFormData,
  Product,
  DetailRequest,
  ProductDetail,
  CompanyFormData,
  Company,
  ResponseOk,
} from '@/types';
import { AxiosResponse } from 'axios';

const getProductList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetProductList.request)),
    mergeMap(({ payload }: { payload: QueryParams<ProductFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.product;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchProductList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Product[]>>) =>
          doGetProductList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductList.failure(error));
        }),
      );
    }),
  );

const getProductDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetProductDetail.request)),
    mergeMap(({ payload: { id, show } }: { payload: DetailRequest }) => {
      return fetchProductDetail(id).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<ProductDetail>>) =>
          doGetProductDetail.success({ data: { id, ...data }, show }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductDetail.failure(error));
        }),
      );
    }),
  );

const getProductEditorDetail: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetProductEditorDetail.request)),
    mergeMap(({ payload: { id, show } }: { payload: DetailRequest }) => {
      return fetchProductEditorDetail(id).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<string>>) =>
          doGetProductEditorDetail.success({ data: { id, h5Sourse: data }, show }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductEditorDetail.failure(error));
        }),
      );
    }),
  );

const addOrModifyProduct: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doAddOrModifyProduct.request)),
    mergeMap(({ payload }: { payload: Product }) => {
      const type = payload.id ? 'modify' : 'add';
      return fetchProductAddOrModify(payload, type).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() =>
          of(
            doAddOrModifyProduct.success(undefined),
            doGetProductList.request({ pageSize: 10, pageNumber: 1 }),
          ),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doAddOrModifyProduct.failure(error));
        }),
      );
    }),
  );

const updateProductStatus: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doUpdateProductStatus.request)),
    mergeMap(({ payload: { productStatus, id } }: { payload: Product }) =>
      fetchProductUpdateStatus({ id, productStatus }).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => of(doUpdateProductStatus.success(undefined), doGetProductList.request({}))),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doUpdateProductStatus.failure(error));
        }),
      ),
    ),
  );

const updateProductHtml: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doUpdateProductHtml.request)),
    mergeMap(({ payload }: { payload: ProductDetail }) =>
      fetchProductUpdateHtml(payload).pipe(
        tap(({ data: { message: msg } }: AxiosResponse<ResponseOk>) => {
          message.info(msg);
        }),
        mergeMap(() => of(doUpdateProductHtml.success(undefined), doGetProductList.request({}))),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doUpdateProductHtml.failure(error));
        }),
      ),
    ),
  );

const getProductCompanyAll: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetProductCompanyAll.request)),
    mergeMap(({ payload }: { payload: QueryParams<CompanyFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.product.company;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchProductCompanyAll({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Company[]>>) =>
          doGetProductCompanyAll.success({
            list,
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize,
            totalCount,
          }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetProductCompanyAll.failure(error));
        }),
      );
    }),
  );

export default [
  getProductList,
  getProductDetail,
  addOrModifyProduct,
  updateProductStatus,
  getProductCompanyAll,
  getProductEditorDetail,
  updateProductHtml,
];
