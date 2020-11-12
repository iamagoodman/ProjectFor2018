import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  QueryParams,
  BatchPolicyFormData,
  List,
  BatchPolicy,
  ErrorInfo,
  UndoSummaryData,
  SummaryData,
  PolicyPayData,
  PolicyBatchPayData,
  PolicyOrderData,
  BatchPolicyDetail,
} from '@/types';

export const doGetBatchPolicyList = createAsyncAction(
  ACTIONTYPE.BATCH_POLICY_LIST_REQUEST,
  ACTIONTYPE.BATCH_POLICY_LIST_SUCCESS,
  ACTIONTYPE.BATCH_POLICY_LIST_FAILURE,
)<QueryParams<BatchPolicyFormData>, List<BatchPolicy, BatchPolicyFormData>, ErrorInfo>();

export const doBatchPolicySummary = createAsyncAction(
  ACTIONTYPE.BATCH_POLICY_SUMMARY_REQUEST,
  ACTIONTYPE.BATCH_POLICY_SUMMARY_SUCCESS,
  ACTIONTYPE.BATCH_POLICY_SUMMARY_FAILURE,
)<SummaryData, undefined, ErrorInfo>();

export const doBatchPolicyUndoSummary = createAsyncAction(
  ACTIONTYPE.BATCH_POLICY_UNDO_SUMMARY_REQUEST,
  ACTIONTYPE.BATCH_POLICY_UNDO_SUMMARY_SUCCESS,
  ACTIONTYPE.BATCH_POLICY_UNDO_SUMMARY_FAILURE,
)<UndoSummaryData, undefined, ErrorInfo>();

export const doBatchPolicySearchClear = createAction(ACTIONTYPE.BATCH_POLICY_SEARCH_CLEAR);

export const doSetBatchPolicySelectedKeys = createAction(
  ACTIONTYPE.BATCH_POLICY_SELECTED_KEYS,
  action => (keys: string[]) => action(keys),
);

export const doGetBatchPolicyDetail = createAsyncAction(
  ACTIONTYPE.BATCH_POLICY_DETAIL_REQUEST,
  ACTIONTYPE.BATCH_POLICY_DETAIL_SUCCESS,
  ACTIONTYPE.BATCH_POLICY_DETAIL_FAILURE,
)<string, BatchPolicyDetail, ErrorInfo>();

export const doPostPolicyPay = createAsyncAction(
  ACTIONTYPE.POLICY_PAY_REQUEST,
  ACTIONTYPE.POLICY_PAY_SUCCESS,
  ACTIONTYPE.POLICY_PAY_FAILURE,
)<PolicyPayData, PolicyOrderData, ErrorInfo>();

export const doPostPolicyBatchPay = createAsyncAction(
  ACTIONTYPE.POLICY_BATCH_PAY_REQUEST,
  ACTIONTYPE.POLICY_BATCH_PAY_SUCCESS,
  ACTIONTYPE.POLICY_BATCH_PAY_FAILURE,
)<PolicyBatchPayData, PolicyOrderData, ErrorInfo>();
