import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Commission,
  List,
  QueryParams,
  ErrorInfo,
  CommissionFormData,
  Message,
  SetKey,
  CommissionDetail,
  DetailRequest,
  DetailResponse,
  CommissionOperateRequest,
} from '@/types';

export const doGetCommissionList = createAsyncAction(
  ACTIONTYPE.COMMISSION_REQUEST,
  ACTIONTYPE.COMMISSION_SUCCESS,
  ACTIONTYPE.COMMISSION_FAILURE,
)<QueryParams<CommissionFormData>, List<Commission, CommissionFormData>, ErrorInfo>();

export const doAddOrModifyCommission = createAsyncAction(
  ACTIONTYPE.COMMISSION_ADDORMODIFY_REQUEST,
  ACTIONTYPE.COMMISSION_ADDORMODIFY_SUCCESS,
  ACTIONTYPE.COMMISSION_ADDORMODIFY_FAILURE,
)<CommissionOperateRequest, undefined | Message, undefined | ErrorInfo>();

export const doGetCommissionDetail = createAsyncAction(
  ACTIONTYPE.COMMISSION_DETAIL_REQUEST,
  ACTIONTYPE.COMMISSION_DETAIL_SUCCESS,
  ACTIONTYPE.COMMISSION_DETAIL_FAILURE,
)<DetailRequest, DetailResponse<CommissionDetail>, ErrorInfo>();

export const doSetCommissionShowKey = createAction(
  ACTIONTYPE.COMMISSION_SHOW_KEY,
  action => (data: SetKey) => action({ ...data }),
);
