import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, Report, ReportFormData, ReportCompany } from '@/types';
import { doGetReportList, doGetReportCompanyList } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export interface ReportState extends DefaultTable<Report, ReportFormData> {
  companyList: ReportCompany[];
}

const initialState: ReportState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  companyList: [],
};

export const reportReducer = (state: ReportState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetReportList.request):
      return update(state, {
        formData: { $set: getPayloadData<ReportFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetReportList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetReportList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doGetReportCompanyList.success):
      return update(state, {
        companyList: { $set: action.payload },
      });
    case getType(doGetReportCompanyList.failure):
      return update(state, {
        companyList: { $set: [] },
      });
    default:
      return state;
  }
};
