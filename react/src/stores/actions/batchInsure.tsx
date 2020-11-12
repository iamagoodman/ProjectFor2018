import * as ACTIONTYPE from '@/constans/actionType';
import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  InsureProduct,
  ErrorInfo,
  InsureDeclareImportData,
  InsureDeclareImport,
  QueryParams,
  InsurePolicyData,
  InsureImportPolicy,
  InsureDeclarePolicy,
  List,
  InsurePolicy,
  InsureImportPolicyItem,
  BatchInsureData,
  InsureDeclare,
} from '@/types';

export const doInsureSetStep = createAction(ACTIONTYPE.INSURE_SET_STEP, action => (step: number) =>
  action(step),
);

export const doInsureSetPolicyVisible = createAction(
  ACTIONTYPE.INSURE_SET_POLICY_VISIBLE,
  action => (visible: boolean) => action(visible),
);

export const doInsureSetProduct = createAction(
  ACTIONTYPE.INSURE_SET_PRODUCT,
  action => (data: InsureProduct) => action(data),
);

export const doInsureInit = createAction(ACTIONTYPE.INSURE_INIT);

export const doGetInsureImportInfo = createAsyncAction(
  ACTIONTYPE.INSURE_IMPORT_INFO_REQUEST,
  ACTIONTYPE.INSURE_IMPORT_INFO_SUCCESS,
  ACTIONTYPE.INSURE_IMPORT_INFO_FAILURE,
)<string, InsurePolicy, ErrorInfo>();

export const doPostInsureDeclareImport = createAsyncAction(
  ACTIONTYPE.INSURE_DECLARE_IMPORT_REQUEST,
  ACTIONTYPE.INSURE_DECLARE_IMPORT_SUCCESS,
  ACTIONTYPE.INSURE_DECLARE_IMPORT_FAILURE,
)<InsureDeclareImportData, InsureDeclareImport, ErrorInfo>();

export const doGetInsureImportPolicy = createAsyncAction(
  ACTIONTYPE.INSURE_IMPORT_POLICY_REQUEST,
  ACTIONTYPE.INSURE_IMPORT_POLICY_SUCCESS,
  ACTIONTYPE.INSURE_IMPORT_POLICY_FAILURE,
)<QueryParams<InsurePolicyData>, InsureImportPolicy, ErrorInfo>();

export const doGetInsurePolicy = createAsyncAction(
  ACTIONTYPE.INSURE_POLICY_REQUEST,
  ACTIONTYPE.INSURE_POLICY_SUCCESS,
  ACTIONTYPE.INSURE_POLICY_FAILURE,
)<string, InsureImportPolicy, ErrorInfo>();

export const doGetInsurePolicyList = createAsyncAction(
  ACTIONTYPE.INSURE_POLICY_LIST_REQUEST,
  ACTIONTYPE.INSURE_POLICY_LIST_SUCCESS,
  ACTIONTYPE.INSURE_POLICY_LIST_FAILURE,
)<QueryParams<InsurePolicyData>, List<InsureDeclarePolicy, InsurePolicyData>, ErrorInfo>();

export const doGetInsurePolicyListSingole = createAsyncAction(
  ACTIONTYPE.INSURE_POLICY_LIST_SINGLE_REQUEST,
  ACTIONTYPE.INSURE_POLICY_LIST_SINGLE_SUCCESS,
  ACTIONTYPE.INSURE_POLICY_LIST_SINGLE_FAILURE,
)<QueryParams<InsurePolicyData>, List<InsureDeclarePolicy, InsurePolicyData>, ErrorInfo>();

export const doGetInsurePolicyListGroup = createAsyncAction(
  ACTIONTYPE.INSURE_POLICY_LIST_GROUP_REQUEST,
  ACTIONTYPE.INSURE_POLICY_LIST_GROUP_SUCCESS,
  ACTIONTYPE.INSURE_POLICY_LIST_GROUP_FAILURE,
)<QueryParams<InsurePolicyData>, List<InsureDeclarePolicy, InsurePolicyData>, ErrorInfo>();

export const doGetInsureDeclarePolicyList = createAction(
  ACTIONTYPE.INSURE_DECLARE_IMPORT_POLICY_LIST,
  action => (page: number) => action({ page }),
);

export const doGetInsureDeclarePolicyListSingle = createAction(
  ACTIONTYPE.INSURE_DECLARE_IMPORT_POLICY_LIST_SINGLE,
  action => (page: number) => action({ page }),
);

export const doGetInsureDeclarePolicyListGroup = createAction(
  ACTIONTYPE.INSURE_DECLARE_IMPORT_POLICY_LIST_GROUP,
  action => (page: number) => action({ page }),
);

export const doSetInsurePolicyList = createAction(
  ACTIONTYPE.INSURE_SET_POLICY_LIST,
  action => (list: InsureImportPolicyItem[]) => action(list),
);

export const doInsureBatch = createAsyncAction(
  ACTIONTYPE.INSURE_CONFIRM_REQUEST,
  ACTIONTYPE.INSURE_CONFIRM_SUCCESS,
  ACTIONTYPE.INSURE_CONFIRM_FAILURE,
)<BatchInsureData, string, ErrorInfo>();

export const doInsureStep2Init = createAction(ACTIONTYPE.INSURE_STEP_2_INIT);

export const doInsureStep3Init = createAction(ACTIONTYPE.INSURE_STEP_3_INIT);

export const doInsureSetDeclare = createAction(
  ACTIONTYPE.INSURE_SET_DECLARE,
  action => (data: InsureDeclare) => action(data),
);
