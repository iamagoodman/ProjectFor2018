import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, Company, CompanyFormData, CompanyListItem } from '@/types';
import {
  doGetCompanyList,
  doAddOrModifyCompany,
  doSetCompanyShowKey,
  doGetCompanyDetail,
  doSetCompanyLevel,
  doGetCompanySecondList,
  doSetCompanyExpandedRowKeys,
} from '@/stores/actions';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export interface CompanyState extends DefaultTable<CompanyListItem, CompanyFormData> {
  show: string;
  detail: Company;
  company: Company;
  companySecond: Company;
  level: string | undefined;
  expandedRowKeys: number[];
}

const initialState: CompanyState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  show: 'list',
  detail: {},
  company: {},
  companySecond: {},
  level: undefined,
  expandedRowKeys: [],
};

export const companyReducer = (state: CompanyState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetCompanyList.request):
      return update(state, {
        expandedRowKeys: { $set: [] },
        company: { $set: {} },
        detail: { $set: {} },
        companySecond: { $set: {} },
        formData: { $set: getPayloadData<CompanyFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetCompanyList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetCompanyList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doGetCompanyDetail.success):
      return update(state, {
        show: { $set: 'detail' },
        detail: { $set: { ...action.payload } },
      });
    case getType(doAddOrModifyCompany.success):
      return update(state, {
        show: { $set: 'list' },
        company: { $set: {} },
        companySecond: { $set: {} },
      });

    case getType(doSetCompanyShowKey):
      return update(state, {
        show: { $set: action.payload.show },
        [action.payload.key || 'company']: { $set: action.payload.data || {} },
      });
    case getType(doSetCompanyLevel):
      return update(state, {
        level: { $set: action.payload.level },
        company: { $set: action.payload.company },
        show: { $set: action.payload.show || '' },
      });
    case getType(doGetCompanySecondList.success):
      const companyNo = action.payload.companyNo;
      const { list, expandedRowKeys } = state;
      const index = findIndex(list, (item: Company) => item.companyNo === companyNo);
      const currentCompany: Company =
        find(list, (item: Company) => item.companyNo === companyNo) || {};
      currentCompany.insureCompanyList = action.payload.list;
      const eIndex = findIndex(expandedRowKeys, (e: number) => e === action.payload.id);

      if (eIndex === -1 && action.payload.id !== undefined) {
        expandedRowKeys.push(action.payload.id);
      }
      return update(state, {
        list: {
          [index]: { $set: currentCompany },
        },
        expandedRowKeys: { $set: [...expandedRowKeys] },
        show: { $set: 'list' },
      });
    case getType(doSetCompanyExpandedRowKeys):
      return update(state, {
        expandedRowKeys: { $set: [...action.payload] },
      });
    default:
      return state;
  }
};
