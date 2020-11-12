import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import {
  doChangeLoadingStatus,
  doGetDict,
  doGetDictAll,
  doGetCompanyAll,
  doGetChannelAll,
  doGetProductAll,
  doGetProductAllByCompany,
  doGetProductChannelAll,
  doGetCompanyChannelAll,
  doGetChannelAllByProduct,
  doGetPlanAndPolicyType,
  doGetChannelInfo,
  doGetProductListByLoginId,
  doGetChannelGroupAll
} from '@/stores/actions';
import { Action, Dict, Company, Product, Channel, PlanTypesItem, ChannelGroup } from '@/types';

export interface AppState {
  loading: boolean;
  loadingText: string;
  productCategoryList: Dict[]; // 产品类型
  businessTypeList: Dict[]; // 业务类型
  riskTypeCategoryList: Dict[]; // 险别类别
  policyStatusList: Dict[]; // 保单状态
  riskTypeList: Dict[];
  policyTypeList: Dict[]; // 保单类型
  assetTypeList: Dict[]; // 标的类型
  customTypeList: Dict[]; // 投保人类型
  payMethodList: Dict[]; // 缴费方式
  payTypeList: Dict[]; // 缴费类型
  feeTypeList: Dict[]; // 费用类型
  invoiceTypeList: Dict[]; // 发票类型
  sendStatusList: Dict[]; // 发送状态
  payStatusList: Dict[]; // 缴费状态
  identityTypeList: Dict[]; // 证件类型
  relationTypeList: Dict[]; // 和投保人关系
  transactionTypeList: Dict[]; // 收付类型
  genderList: Dict[]; // 性别
  companyList: Company[];
  productList: Product[];
  channelList: Channel[];
  productListByCompany: Product[];
  channelListByProduct: Channel[];
  planTypes: PlanTypesItem[];
  policyTypes: number | null;
  channelSec: string | null;
  productListByLoginId: Product[];
  channelGroup: ChannelGroup | {};
}

const initialState: AppState = {
  loading: false,
  loadingText: '加载中',
  productCategoryList: [],
  businessTypeList: [],
  riskTypeCategoryList: [],
  policyStatusList: [],
  riskTypeList: [],
  policyTypeList: [],
  assetTypeList: [],
  customTypeList: [],
  payMethodList: [],
  payTypeList: [],
  feeTypeList: [],
  invoiceTypeList: [],
  sendStatusList: [],
  payStatusList: [],
  companyList: [],
  productList: [],
  channelList: [],
  identityTypeList: [],
  relationTypeList: [],
  transactionTypeList: [],
  genderList: [],
  productListByCompany: [],
  channelListByProduct: [],
  planTypes: [],
  policyTypes: null,
  channelSec: null,
  productListByLoginId: [],
  channelGroup: {}
};

export const appReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doChangeLoadingStatus):
      return update(state, {
        loading: { $set: action.payload.status },
        loadingText: {
          $apply: () => {
            switch (action.payload.type) {
              case 'GET':
                return '加载中';
                break;
              case 'POST':
                return '提交中';
                break;
              case 'DELETE':
                return '删除中';
                break;
              default:
                return '加载中';
                break;
            }
          }
        }
      });
    // case getType(doGetPartner.success):
    //     return update(state, {
    //         partnerList: { $set: action.payload }
    //     })
    case getType(doGetDict.success):
      return update(state, {
        [action.payload.group || '']: { $set: action.payload.dict }
      });
    case getType(doGetDictAll.success):
      return update(state, {
        businessTypeList: { $set: action.payload['BusinessType'] || [] },
        riskTypeList: { $set: action.payload['RiskType'] || [] },
        policyStatusList: { $set: action.payload['PolicyStatus'] || [] },
        productCategoryList: { $set: action.payload['ProductCategory'] || [] },
        riskTypeCategoryList: { $set: action.payload['RiskTypeCategory'] || [] },
        policyTypeList: { $set: action.payload['PolicyType'] || [] },
        assetTypeList: { $set: action.payload['ItemType'] || [] },
        customTypeList: { $set: action.payload['CustomType'] || [] },
        payMethodList: { $set: action.payload['PayMethod'] || [] },
        payTypeList: { $set: action.payload['PayType'] || [] },
        feeTypeList: { $set: action.payload['FeeType'] || [] },
        invoiceTypeList: { $set: action.payload['InvoiceType'] || [] },
        sendStatusList: { $set: action.payload['SendStatus'] || [] },
        payStatusList: { $set: action.payload['PayStatus'] || [] },
        identityTypeList: { $set: action.payload['IdentityType'] || [] },
        relationTypeList: { $set: action.payload['RelationType'] || [] },
        transactionTypeList: { $set: action.payload['TransactionType'] || [] },
        genderList: { $set: action.payload['Gender'] || [] }
      });
    case getType(doGetCompanyAll.success):
      return update(state, {
        companyList: {
          $set: action.payload
        }
      });
    case getType(doGetProductAll.success):
      return update(state, {
        productList: {
          $set: action.payload
        }
      });
    case getType(doGetChannelAll.success):
      return update(state, {
        channelList: {
          $set: action.payload
        }
      });
    case getType(doGetProductAllByCompany.request):
      return update(state, {
        productListByCompany: { $set: [] }
      });
    case getType(doGetProductAllByCompany.success):
      return update(state, {
        productListByCompany: { $set: action.payload }
      });
    case getType(doGetProductChannelAll.success):
      return update(state, {
        channelList: { $set: action.payload.channelList },
        productList: { $set: action.payload.productList }
      });
    case getType(doGetCompanyChannelAll.success):
      return update(state, {
        channelList: { $set: action.payload.channelList },
        companyList: { $set: action.payload.companyList }
      });
    case getType(doGetChannelAllByProduct.request):
      return update(state, {
        channelListByProduct: { $set: [] }
      });
    case getType(doGetChannelAllByProduct.success):
      return update(state, {
        channelListByProduct: { $set: action.payload }
      });
    case getType(doGetProductListByLoginId.success):
      return update(state, {
        productListByLoginId: { $set: action.payload }
      });
    case getType(doGetPlanAndPolicyType.success):
      return update(state, {
        planTypes: { $set: action.payload.planTypes },
        policyTypes: { $set: action.payload.policyTypes }
      });
    case getType(doGetPlanAndPolicyType.failure):
      return update(state, {
        planTypes: { $set: [] },
        policyTypes: { $set: 2 }
      });
    case getType(doGetChannelInfo.success):
      return update(state, {
        channelSec: { $set: action.payload.channelSec }
      });
    case getType(doGetChannelGroupAll.success):
      return update(state, {
        channelGroup: { $set: action.payload }
      });
    default:
      return state;
  }
};
