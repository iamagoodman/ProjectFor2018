import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  List,
  QueryParams,
  ErrorInfo,
  SetKey,
  Message,
  PolicyMarketFormData,
  PolicyMarket,
  PolicyMarketImportData
} from '@/types';

interface PolicyMarketList extends List<PolicyMarket, PolicyMarketFormData> {
  totalPremium: number;
}

export const doGetPolicyMarketList = createAsyncAction(
  ACTIONTYPE.POLICY_MARKET_LIST_REQUEST,
  ACTIONTYPE.POLICY_MARKET_LIST_SUCCESS,
  ACTIONTYPE.POLICY_MARKET_LIST_FAILURE
)<QueryParams<PolicyMarketFormData>, PolicyMarketList, ErrorInfo>();

export const doSetPolicyMarketShowKey = createAction(ACTIONTYPE.POLICY_MARKET_SHOW_KEY, action => (data: SetKey) =>
  action({ ...data })
);

export const doPolicyMarketImportData = createAsyncAction(
  ACTIONTYPE.POLICY_MARKET_IMPORT_REQUEST,
  ACTIONTYPE.POLICY_MARKET_IMPORT_SUCCESS,
  ACTIONTYPE.POLICY_MARKET_IMPORT_FAILURE
)<PolicyMarketImportData, undefined | Message, ErrorInfo>();

export const doGetPolicyMarketProductList = createAsyncAction(
  ACTIONTYPE.POLICY_MARKET_PRODUCT_LIST_REQUEST,
  ACTIONTYPE.POLICY_MARKET_PRODUCT_LIST_SUCCESS,
  ACTIONTYPE.POLICY_MARKET_PRODUCT_LIST_FAILURE
)<undefined, string[], undefined>();
