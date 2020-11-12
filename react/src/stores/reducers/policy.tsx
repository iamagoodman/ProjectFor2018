import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import {
  Action,
  DefaultTable,
  Policy,
  PolicyFormData,
  PolicyPay,
  PolicyAllDetail,
  PolicyDetailEmployeeItem
} from '@/types';
import {
  doGetPolicyList,
  doGetPolicyAppliDetail,
  doSetPolicyShowKey,
  doGetPolicyFavoreeDetail,
  doGetPolicyRecognizeeDetail,
  doGetPolicyFeeDetail,
  doGetPolicyPayDetail,
  doGetPolicyClauseDetail,
  doGetPolicyBaseDetail,
  doGetPolicySubjectDetail,
  doGetPolicyRiskTypeDetail,
  doSetPolicyPayVisible,
  doGetPolicyPayListDetail,
  doSetPolicyVisible
} from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

const initialPayPage = {
  ...InitialPage,
  pageSize: 5
};

export interface PolicyState extends DefaultTable<Policy, PolicyFormData>, PolicyAllDetail {
  show: string;
  detailPayVisible: boolean;
  detailPay: DefaultTable<PolicyPay, PolicyFormData>;
  detailEmployeeVisible: boolean;
  employeeList: PolicyDetailEmployeeItem[];
}

const initialState: PolicyState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  show: 'list',
  favoreeDetail: undefined,
  baseDetail: {},
  recognizeeDetail: undefined,
  appliDetail: {},
  feeDetail: {},
  payDetail: {},
  clauseDetail: {},
  subjectDetail: { cargo: {}, liability: {}, policyEmployerLiability: {}, isEmpty: true },
  riskTypeDetail: {},
  detailPayVisible: false,
  detailPay: {
    list: [],
    page: { ...initialPayPage }
  },
  detailEmployeeVisible: false,
  employeeList: []
};

export const policyReducer = (state: PolicyState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetPolicyList.request):
      return update(state, {
        formData: { $set: getPayloadData<PolicyFormData>(action.payload.data, state.formData) }
      });
    case getType(doGetPolicyList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount }
        }
      });
    case getType(doGetPolicyList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } }
      });
    case getType(doGetPolicyBaseDetail.success):
      return update(state, {
        baseDetail: { $set: { ...action.payload, isRequest: true } },
        appliDetail: { $set: {} },
        favoreeDetail: { $set: undefined },
        recognizeeDetail: { $set: undefined },
        payDetail: { $set: {} },
        feeDetail: { $set: {} },
        clauseDetail: { $set: {} },
        riskTypeDetail: { $set: {} },
        subjectDetail: {
          cargo: { $set: {} },
          liability: { $set: {} },
          isRequest: { $set: false }
        }
      });
    case getType(doGetPolicySubjectDetail.success):
      return update(state, {
        subjectDetail: {
          isRequest: { $set: true },
          cargo: { $set: action.payload.cargo || {} },
          liability: { $set: action.payload.liability || {} },
          policyEmployerLiability: { $set: action.payload.policyEmployerLiability || {} },
          isEmpty: { $set: action.payload.isEmpty }
        }
      });
    case getType(doGetPolicyAppliDetail.success):
      return update(state, {
        appliDetail: { $set: { ...action.payload, isRequest: true } }
      });
    case getType(doGetPolicyFavoreeDetail.success):
      return update(state, {
        favoreeDetail: { $set: [...action.payload] }
      });
    case getType(doGetPolicyRecognizeeDetail.success):
      return update(state, {
        recognizeeDetail: { $set: [...action.payload] }
      });
    case getType(doGetPolicyFeeDetail.success):
      return update(state, {
        feeDetail: { $set: { ...action.payload, isRequest: true } }
      });
    case getType(doGetPolicyPayDetail.success):
      return update(state, {
        payDetail: { $set: { ...action.payload, isRequest: true } }
      });
    case getType(doGetPolicyPayListDetail.success):
      return update(state, {
        detailPay: {
          list: { $set: action.payload.list || [] },
          page: {
            current: { $set: action.payload.pageNumber },
            pageSize: { $set: action.payload.pageSize },
            totalCount: { $set: action.payload.totalCount }
          }
        }
      });
    case getType(doGetPolicyPayListDetail.failure):
      return update(state, {
        detailPay: {
          list: { $set: [] },
          page: { $set: { ...initialPayPage } }
        }
      });
    case getType(doGetPolicyClauseDetail.success):
      return update(state, {
        clauseDetail: { $set: { ...action.payload, isRequest: true } }
      });
    case getType(doGetPolicyRiskTypeDetail.success):
      return update(state, {
        riskTypeDetail: { $set: { ...action.payload, isRequest: true } }
      });
    case getType(doSetPolicyShowKey):
      return update(state, {
        show: { $set: action.payload.show }
      });
    case getType(doSetPolicyPayVisible):
      return update(state, {
        detailPayVisible: { $set: action.payload.visible }
      });
    case getType(doSetPolicyVisible):
      return update(state, {
        [`${action.payload.type}Visible`]: { $set: action.payload.visible }
      });
    default:
      return state;
  }
};
