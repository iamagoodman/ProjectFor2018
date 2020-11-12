import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Company,
  List,
  QueryParams,
  ErrorInfo,
  CompanyFormData,
  Message,
  SetKey,
  CompanyLevel,
  CompanySecond,
} from '@/types';

export const doGetCompanyList = createAsyncAction(
  ACTIONTYPE.COMPANY_REQUEST,
  ACTIONTYPE.COMPANY_SUCCESS,
  ACTIONTYPE.COMPANY_FAILURE,
)<QueryParams<CompanyFormData>, List<Company, CompanyFormData>, ErrorInfo>();

export const doAddOrModifyCompany = createAsyncAction(
  ACTIONTYPE.COMPANY_ADDORMODIFY_REQUEST,
  ACTIONTYPE.COMPANY_ADDORMODIFY_SUCCESS,
  ACTIONTYPE.COMPANY_ADDORMODIFY_FAILURE,
)<Company, undefined | Message, undefined | ErrorInfo>();

export const doGetCompanyDetail = createAsyncAction(
  ACTIONTYPE.COMPANY_DETAIL_REQUEST,
  ACTIONTYPE.COMPANY_DETAIL_SUCCESS,
  ACTIONTYPE.COMPANY_DETAIL_FAILURE,
)<number | undefined, Company, ErrorInfo>();

export const doDeleteCompany = createAsyncAction(
  ACTIONTYPE.COMPANY_DELETE_REQUEST,
  ACTIONTYPE.COMPANY_DELETE_SUCCESS,
  ACTIONTYPE.COMPANY_DELETE_FAILURE,
)<number | undefined, undefined | Message, undefined | ErrorInfo>();

export const doSetCompanyShowKey = createAction(
  ACTIONTYPE.COMPANY_SHOW_KEY,
  action => (data: SetKey) => action({ ...data }),
);

export const doSetCompanyLevel = createAction(
  ACTIONTYPE.COMPANY_SET_LEVEL,
  action => (data: CompanyLevel) => action({ ...data }),
);

export const doGetCompanySecondList = createAsyncAction(
  ACTIONTYPE.COMPANY_SECOND_REQUEST,
  ACTIONTYPE.COMPANY_SECOND_SUCCESS,
  ACTIONTYPE.COMPANY_SECOND_FAILURE,
)<Company, CompanySecond, ErrorInfo>();

export const doAddOrModifyCompanySecond = createAsyncAction(
  ACTIONTYPE.COMPANY_SECOND_ADDORMODIFY_REQUEST,
  ACTIONTYPE.COMPANY_SECOND_ADDORMODIFY_SUCCESS,
  ACTIONTYPE.COMPANY_SECOND_ADDORMODIFY_FAILURE,
)<Company, undefined | Message, undefined | ErrorInfo>();

export const doGetCompanySecondDetail = createAsyncAction(
  ACTIONTYPE.COMPANY_SECOND_DETAIL_REQUEST,
  ACTIONTYPE.COMPANY_SECOND_DETAIL_SUCCESS,
  ACTIONTYPE.COMPANY_SECOND_DETAIL_SUCCESS,
)<number, Company, ErrorInfo>();

export const doDeleteCompanySecond = createAsyncAction(
  ACTIONTYPE.COMPANY_SECOND_DELETE_REQUEST,
  ACTIONTYPE.COMPANY_SECOND_DELETE_SUCCESS,
  ACTIONTYPE.COMPANY_SECOND_DELETE_SUCCESS,
)<number, undefined | Message, undefined | ErrorInfo>();

export const doSetCompanyExpandedRowKeys = createAction(
  ACTIONTYPE.COMPANY_SET_EXPANDED_ROWKEYS,
  action => (expandedRowKeys: number[]) => action(expandedRowKeys),
);
