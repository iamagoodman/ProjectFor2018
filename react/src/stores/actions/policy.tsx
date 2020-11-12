import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Policy,
  List,
  QueryParams,
  ErrorInfo,
  PolicyFormData,
  PolicyDetail,
  PolicySubjectDetail,
  PolicyPay,
  SetKey,
  PolicyImportData,
  Message,
  PolicyQzImportData,
  SetVisibleData,
  PolicyDetailEmployeeItem
} from '@/types';

export const doGetPolicyList = createAsyncAction(
  ACTIONTYPE.POLICY_REQUEST,
  ACTIONTYPE.POLICY_SUCCESS,
  ACTIONTYPE.POLICY_FAILURE
)<QueryParams<PolicyFormData>, List<Policy, PolicyFormData>, ErrorInfo>();

export const doGetPolicyDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doSetPolicyShowKey = createAction(ACTIONTYPE.POLICY_SHOW_KEY, action => (data: SetKey) =>
  action({ ...data })
);

export const doGetPolicyAppliDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_APPLI_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_APPLI_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_APPLI_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doGetPolicyRecognizeeDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_RECOGNIZEE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_RECOGNIZEE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_RECOGNIZEE_FAILURE
)<Policy, PolicyDetail[], ErrorInfo>();

export const doGetPolicyFavoreeDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_FAVOREE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_FAVOREE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_FAVOREE_FAILURE
)<Policy, PolicyDetail[], ErrorInfo>();

export const doGetPolicyPayDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_PAY_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_PAY_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_PAY_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doGetPolicyFeeDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_FEE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_FEE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_FEE_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doGetPolicyClauseDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_CLAUSE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_CLAUSE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_CLAUSE_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doGetPolicyBaseDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_BASE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_BASE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_BASE_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doGetPolicySubjectDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_SUBJECT_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_SUBJECT_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_SUBJECT_FAILURE
)<Policy, PolicySubjectDetail, ErrorInfo>();

export const doGetPolicyRiskTypeDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_RISKTYPE_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_RISKTYPE_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_RISKTYPE_FAILURE
)<Policy, PolicyDetail, ErrorInfo>();

export const doSetPolicyPayVisible = createAction(ACTIONTYPE.POLICY_DETAIL_PAY_VISIBLE, action => (visible: boolean) =>
  action({ visible })
);

export const doSetPolicyVisible = createAction(ACTIONTYPE.SET_POLICY_VISIBLE, action => (data: SetVisibleData) =>
  action(data)
);

export const doGetPolicyPayListDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_PAY_LIST_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_PAY_LIST_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_PAY_LIST_FAILURE
)<QueryParams<Policy>, List<PolicyPay, Policy>, ErrorInfo>();

export const doPolicyImportData = createAsyncAction(
  ACTIONTYPE.POLICY_IMPORT_REQUEST,
  ACTIONTYPE.POLICY_IMPORT_SUCCESS,
  ACTIONTYPE.POLICY_IMPORT_FAILURE
)<PolicyImportData, undefined | Message, ErrorInfo>();

export const doPolicyQzImportData = createAsyncAction(
  ACTIONTYPE.POLICY_QZIMPORT_REQUEST,
  ACTIONTYPE.POLICY_QZIMPORT_SUCCESS,
  ACTIONTYPE.POLICY_QZIMPORT_FAILURE
)<PolicyQzImportData, undefined, ErrorInfo>();

export const doGetPolicyEmployeeListDetail = createAsyncAction(
  ACTIONTYPE.POLICY_DETAIL_EMPLOYEE_LIST_REQUEST,
  ACTIONTYPE.POLICY_DETAIL_EMPLOYEE_LIST_SUCCESS,
  ACTIONTYPE.POLICY_DETAIL_BASE_SUCCESS
)<number, PolicyDetailEmployeeItem[], ErrorInfo>();
