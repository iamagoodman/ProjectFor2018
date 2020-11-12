import update from 'immutability-helper';
import { DefaultTable, CompanyFormData, Company, Action } from '@/types';
import { getType } from 'typesafe-actions';
import { doGetCompanyGlobal, doCompanySelectedSet, doCompanyVisible } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

interface CompanyGlobalState extends DefaultTable<Company, CompanyFormData> {
  selectedCompanyNo?: string;
  selectedCompanyName?: string;
  selectedCompany: Company;
  visible: boolean;
}

const initialPage = {
  ...InitialPage,
  pageSize: 5,
};

const initialState: CompanyGlobalState = {
  formData: {},
  list: [],
  page: { ...initialPage },
  selectedCompanyName: '',
  selectedCompanyNo: '',
  visible: false,
  selectedCompany: {},
};

export const companyGlobalReducer = (state: CompanyGlobalState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetCompanyGlobal.request):
      return update(state, {
        formData: { $set: getPayloadData<CompanyFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetCompanyGlobal.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          totalCount: { $set: action.payload.totalCount },
          pageSize: { $set: action.payload.pageSize },
        },
      });
    case getType(doGetCompanyGlobal.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...initialPage } },
      });
    case getType(doCompanyVisible):
      return update(state, {
        visible: { $set: action.payload.visible },
      });

    case getType(doCompanySelectedSet):
      return update(state, {
        visible: { $set: false },
        selectedCompanyName: { $set: action.payload.data.companyName },
        selectedCompanyNo: { $set: action.payload.data.companyNo },
        selectedCompany: { $set: action.payload.data },
      });
    default:
      return state;
  }
};
