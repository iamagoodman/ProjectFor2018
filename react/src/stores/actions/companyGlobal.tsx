import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { List, QueryParams, Company, ErrorInfo, CompanyFormData } from '@/types';

export const doGetCompanyGlobal = createAsyncAction(
  ACTIONTYPE.COMPANY_GLOBAL_LIST_REQUEST,
  ACTIONTYPE.COMPANY_GLOBAL_LIST_SUCCESS,
  ACTIONTYPE.COMPANY_GLOBAL_LIST_FAILURE,
)<QueryParams<CompanyFormData>, List<Company, CompanyFormData>, ErrorInfo>();

export const doCompanyVisible = createAction(
  ACTIONTYPE.COMPANY_LIST_VISIBLE,
  action => (visible: boolean) => action({ visible }),
);

export const doCompanySelectedSet = createAction(
  ACTIONTYPE.COMPANY_SELECTED_SET,
  action => (data: Company) => action({ data }),
);
