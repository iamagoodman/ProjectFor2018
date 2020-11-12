import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import {
  Action,
  InsureProduct,
  InsureDeclare,
  InsureDeclareImport,
  InsureImportPolicy,
  InsureImportPolicyItem,
} from '@/types';
import {
  doInsureSetStep,
  doInsureSetPolicyVisible,
  doInsureSetProduct,
  doInsureInit,
  doGetInsureImportInfo,
  doPostInsureDeclareImport,
  doGetInsurePolicy,
  doGetInsurePolicyList,
  doGetInsureDeclarePolicyList,
  doSetInsurePolicyList,
  doInsureBatch,
  doInsureStep2Init,
  doInsureStep3Init,
  doInsureSetDeclare,
} from '@/stores/actions';

export interface InsureState {
  step: number;
  policyVisible: boolean;
  product: InsureProduct;
  declare: InsureDeclare;
  declareImport: InsureDeclareImport;
  policy: InsureImportPolicy;
  importPolicyList: InsureImportPolicyItem[];
  importNo: string | null;
}

const initialState: InsureState = {
  step: 0,
  policyVisible: false,
  product: {},
  declare: {},
  declareImport: {
    policy: [],
    info: {},
    groupFlag: false,
    list: [],
    page: { current: 1, pageSize: 10, totalCount: 0 },
    file: null,
    fileList: [],
    excelKey: null,
  },
  policy: {
    list: [],
    page: {
      current: 1,
      pageSize: 10,
      totalCount: 0,
    },
    info: {},
    groupFlag: null,
  },
  importPolicyList: [],
  importNo: null,
};

export const insureReducer = (state: InsureState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doInsureSetStep):
      return update(state, {
        step: { $set: action.payload },
      });
    case getType(doInsureSetPolicyVisible):
      return update(state, {
        policyVisible: { $set: action.payload },
      });
    case getType(doInsureSetProduct):
      return update(state, {
        product: { $set: action.payload },
      });
    case getType(doInsureInit):
      return update(state, {
        step: { $set: 0 },
        product: { $set: {} },
      });
    case getType(doGetInsureImportInfo.success):
      return update(state, {
        policy: {
          info: { $set: action.payload },
        },
      });
    case getType(doPostInsureDeclareImport.success):
      return update(state, {
        declareImport: {
          info: { $set: action.payload.info },
          policy: { $set: action.payload.policy },
          groupFlag: { $set: action.payload.groupFlag },
          list: { $set: action.payload.list },
          page: { $set: action.payload.page },
          fileList: { $set: action.payload.fileList },
          excelKey: { $set: action.payload.excelKey },
        },
      });
    case getType(doGetInsurePolicy.success):
      return update(state, {
        policy: {
          groupFlag: { $set: action.payload.groupFlag },
          list: { $set: action.payload.list },
          page: { $set: action.payload.page },
          info: { $set: action.payload.info },
        },
      });
    case getType(doGetInsurePolicyList.success):
      return update(state, {
        policy: {
          list: { $set: action.payload.list },
          page: {
            current: { $set: action.payload.pageNumber },
            pageSize: { $set: action.payload.pageSize },
            totalCount: { $set: action.payload.totalCount },
          },
        },
      });
    case getType(doGetInsureDeclarePolicyList):
      const current = action.payload.page;
      const {
        policy = [],
        page: { totalCount = 0, pageSize = 10 },
        groupFlag,
      } = state.declareImport;
      const end = current * pageSize > totalCount ? totalCount : current * pageSize;
      const list = groupFlag
        ? policy[0] && policy[0].insured
          ? [{ ...policy[0], insured: policy[0].insured.slice((current - 1) * pageSize, end) }]
          : []
        : policy.slice((current - 1) * pageSize, end);
      return update(state, {
        declareImport: {
          list: { $set: list },
          page: {
            current: { $set: current },
          },
        },
      });
    case getType(doSetInsurePolicyList):
      return update(state, {
        importPolicyList: { $set: action.payload },
      });
    case getType(doInsureBatch.success):
      return update(state, {
        importNo: { $set: action.payload },
      });
    case getType(doInsureStep2Init):
      return update(state, {
        declare: { $set: {} },
        declareImport: {
          policy: { $set: [] },
          info: { $set: {} },
          groupFlag: { $set: false },
          list: { $set: [] },
          page: {
            current: { $set: 1 },
            pageSize: { $set: 10 },
            totalCount: { $set: 0 },
          },
          file: { $set: null },
          fileList: { $set: [] },
        },
        importPolicyList: { $set: [] },
        importNo: { $set: null },
      });
    case getType(doInsureStep3Init):
      return update(state, {
        policy: {
          list: { $set: [] },
          page: {
            current: { $set: 1 },
            pageSize: { $set: 10 },
            totalCount: { $set: 0 },
          },
          info: { $set: {} },
          groupFlag: { $set: null },
        },
      });
    case getType(doInsureSetDeclare):
      return update(state, {
        declare: { $set: action.payload },
      });
    default:
      return state;
  }
};
