import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction } from 'typesafe-actions';
import { Report, List, QueryParams, ErrorInfo, ReportFormData, ReportCompany } from '@/types';

export const doGetReportList = createAsyncAction(
  ACTIONTYPE.REPORT_REQUEST,
  ACTIONTYPE.REPORT_SUCCESS,
  ACTIONTYPE.REPORT_FAILURE,
)<QueryParams<ReportFormData>, List<Report, ReportFormData>, ErrorInfo>();

export const doGetReportCompanyList = createAsyncAction(
  ACTIONTYPE.REPORT_COMPANY_REQUEST,
  ACTIONTYPE.REPORT_COMPANY_SUCCESS,
  ACTIONTYPE.REPORT_COMPANY_FAILURE,
)<string, ReportCompany[], ErrorInfo>();
