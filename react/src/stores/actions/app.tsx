import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  DictGroup,
  ErrorInfo,
  Group,
  QueryPage,
  Dict,
  DictObj,
  Company,
  Product,
  Channel,
  ProductFormData,
  ChannelFormData,
  PlanTypesItem,
  ChannelInfo,
  ChannelGroup
} from '@/types';

export const doChangeLoadingStatus = createAction(
  ACTIONTYPE.CHANGE_LOADING_STATUS,
  action => (status: boolean, type: string) => action({ type, status })
);

// export const doGetPartner = createAsyncAction(
//     ACTIONTYPE.PARTNER_LIST_REQUEST,
//     ACTIONTYPE.PARTNER_LIST_SUCCESS,
//     ACTIONTYPE.PARTNER_LIST_FAILURE
// )<undefined, Partner[], ErrorInfo>()

export const doGetDict = createAsyncAction(
  ACTIONTYPE.DICT_LIST_REQUEST,
  ACTIONTYPE.DICT_LIST_SUCCESS,
  ACTIONTYPE.DICT_LIST_FAILURE
)<Group, DictGroup, ErrorInfo>();

export const doGetDictAll = createAsyncAction(
  ACTIONTYPE.DICT_LIST_ALL_REQUEST,
  ACTIONTYPE.DICT_LIST_ALL_SUCCESS,
  ACTIONTYPE.DICT_LIST_ALL_FAILURE
)<QueryPage, DictObj<Dict[]>, ErrorInfo>();

export const doGetCompanyAll = createAsyncAction(
  ACTIONTYPE.COMPANY_ALL_REQUEST,
  ACTIONTYPE.COMPANY_ALL_SUCCESS,
  ACTIONTYPE.COMPANY_ALL_FAILURE
)<undefined, Company[], ErrorInfo>();

export const doGetProductAll = createAsyncAction(
  ACTIONTYPE.PRODUCT_ALL_REQUEST,
  ACTIONTYPE.PRODUCT_ALL_SUCCESS,
  ACTIONTYPE.PRODUCT_ALL_FAILURE
)<undefined, Product[], ErrorInfo>();

export const doGetChannelAll = createAsyncAction(
  ACTIONTYPE.CHANNEL_ALL_REQUEST,
  ACTIONTYPE.CHANNEL_ALL_SUCCESS,
  ACTIONTYPE.CHANNEL_ALL_FAILURE
)<undefined, Channel[], ErrorInfo>();

export const doGetProductAllByCompany = createAsyncAction(
  ACTIONTYPE.PRODUCT_ALL_BY_COMPANY_REQUEST,
  ACTIONTYPE.PRODUCT_ALL_BY_COMPANY_SUCCESS,
  ACTIONTYPE.PRODUCT_ALL_BY_COMPANY_FAILURE
)<ProductFormData, Product[], ErrorInfo>();

export const doGetProductChannelAll = createAsyncAction(
  ACTIONTYPE.PRODUCT_CHANNEL_ALL_REQUEST,
  ACTIONTYPE.PRODUCT_CHANNEL_ALL_SUCCESS,
  ACTIONTYPE.PRODUCT_CHANNEL_ALL_FAILURE
)<undefined, { channelList: Channel[]; productList: Product[] }, ErrorInfo>();

export const doGetCompanyChannelAll = createAsyncAction(
  ACTIONTYPE.COMPANY_CHANNEL_ALL_REQUEST,
  ACTIONTYPE.COMPANY_CHANNEL_ALL_SUCCESS,
  ACTIONTYPE.COMPANY_CHANNEL_ALL_FAILURE
)<undefined, { channelList: Channel[]; companyList: Company[] }, ErrorInfo>();

export const doGetChannelAllByProduct = createAsyncAction(
  ACTIONTYPE.CHANNEL_ALL_BY_PRODUCT_REQUEST,
  ACTIONTYPE.CHANNEL_ALL_BY_PRODUCT_SUCCESS,
  ACTIONTYPE.CHANNEL_ALL_BY_PRODUCT_FAILURE
)<ChannelFormData, Channel[], ErrorInfo>();

export const doGetPlanAndPolicyType = createAsyncAction(
  ACTIONTYPE.PLAN_AND_POLICY_TYPE_BY_PRODUCT_REQUEST,
  ACTIONTYPE.PLAN_AND_POLICY_TYPE_BY_PRODUCT_SUCCESS,
  ACTIONTYPE.PLAN_AND_POLICY_TYPE_BY_PRODUCT_FAILURE
)<number, { planTypes: PlanTypesItem[]; policyTypes: number }, ErrorInfo>();

export const doGetChannelInfo = createAsyncAction(
  ACTIONTYPE.GET_CHANNEL_INFO_REQUEST,
  ACTIONTYPE.GET_CHANNEL_INFO_SUCCESS,
  ACTIONTYPE.GET_CHANNEL_INFO_FAILURE
)<string, ChannelInfo, ErrorInfo>();

export const doGetProductListByLoginId = createAsyncAction(
  ACTIONTYPE.PRODUCT_LIST_BY_LOGINID_REQUEST,
  ACTIONTYPE.PRODUCT_LIST_BY_LOGINID_SUCCESS,
  ACTIONTYPE.PRODUCT_LIST_BY_LOGINID_FAILURE
)<string, Product[], ErrorInfo>();

export const doGetChannelGroupAll = createAsyncAction(
  ACTIONTYPE.CHANNEL_GROUP_ALL_REQUEST,
  ACTIONTYPE.CHANNEL_GROUP_ALL_SUCCESS,
  ACTIONTYPE.CHANNEL_GROUP_ALL_FAILURE
)<undefined, ChannelGroup, ErrorInfo>();
