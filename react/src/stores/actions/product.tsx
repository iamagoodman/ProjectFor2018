import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Product,
  List,
  QueryParams,
  ErrorInfo,
  ProductFormData,
  Message,
  SetKey,
  DetailRequest,
  ProductDetail,
  DetailResponse,
  ProductCompanyVisible,
  CompanyFormData,
  Company,
  ModifyProduct,
  AddProduct,
} from '@/types';

export const doGetProductList = createAsyncAction(
  ACTIONTYPE.PRODUCT_REQUEST,
  ACTIONTYPE.PRODUCT_SUCCESS,
  ACTIONTYPE.PRODUCT_FAILURE,
)<QueryParams<ProductFormData>, List<Product, ProductFormData>, ErrorInfo>();

export const doAddOrModifyProduct = createAsyncAction(
  ACTIONTYPE.PRODUCT_ADDORMODIFY_REQUEST,
  ACTIONTYPE.PRODUCT_ADDORMODIFY_SUCCESS,
  ACTIONTYPE.PRODUCT_ADDORMODIFY_FAILURE,
)<AddProduct | ModifyProduct, undefined | Message, undefined | ErrorInfo>();

export const doGetProductDetail = createAsyncAction(
  ACTIONTYPE.PRODUCT_DETAIL_REQUEST,
  ACTIONTYPE.PRODUCT_DETAIL_SUCCESS,
  ACTIONTYPE.PRODUCT_DETAIL_FAILURE,
)<DetailRequest, DetailResponse<ProductDetail>, ErrorInfo>();

export const doSetProductShowKey = createAction(
  ACTIONTYPE.PRODUCT_SHOW_KEY,
  action => (data: SetKey) => action({ ...data }),
);

export const doSetProductCompanyVisible = createAction(
  ACTIONTYPE.PRODUCT_COMPANY_VISIBLE,
  action => (data: ProductCompanyVisible) => action({ ...data }),
);

export const doUpdateProductStatus = createAsyncAction(
  ACTIONTYPE.PRODUCT_UPDATE_STATUS_REQUEST,
  ACTIONTYPE.PRODUCT_UPDATE_STATUS_SUCCESS,
  ACTIONTYPE.PRODUCT_UPDATE_STATUS_FAILURE,
)<Product, undefined | Message, undefined | ErrorInfo>();

export const doUpdateProductHtml = createAsyncAction(
  ACTIONTYPE.PRODUCT_UPDATE_HTML_REQUEST,
  ACTIONTYPE.PRODUCT_UPDATE_HTML_SUCCESS,
  ACTIONTYPE.PRODUCT_UPDATE_HTML_FAILURE,
)<ProductDetail, undefined | Message, undefined | ErrorInfo>();

export const doSetProductPreviewVisible = createAction(
  ACTIONTYPE.PRODUCT_PREVIEW_VISIBLE,
  action => (visible: boolean) => action({ visible }),
);

export const doGetProductCompanyAll = createAsyncAction(
  ACTIONTYPE.PRODUCT_COMPANY_ALL_REQUEST,
  ACTIONTYPE.PRODUCT_COMPANY_ALL_SUCCESS,
  ACTIONTYPE.PRODUCT_COMPANY_ALL_FAILURE,
)<QueryParams<CompanyFormData>, List<Company, CompanyFormData>, ErrorInfo>();

export const doGetProductEditorDetail = createAsyncAction(
  ACTIONTYPE.PRODUCT_EDITOR_DETAIL_REQUEST,
  ACTIONTYPE.PRODUCT_EDITOR_DETAIL_SUCCESS,
  ACTIONTYPE.PRODUCT_EDITOR_DETAIL_FAILURE,
)<DetailRequest, DetailResponse<ProductDetail>, ErrorInfo>();
