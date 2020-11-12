import { createSelector } from 'reselect';
// import { AppState } from '../reducers/app';
// import { DICT_TO_LIST } from '@/constans';
import { arrayToObject } from '@/utils/util';
import { Dict } from '@/types';

const businessTypeList = (list: Dict[]) => list;

export const getBusinessTypeObj = createSelector(businessTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const riskTypeList = (list: Dict[]) => list;

export const getRiskTypeObj = createSelector(riskTypeList, (list: Dict[]) => arrayToObject(list));

// productCategoryList: [],
//     businessTypeList: [],
//     riskTypeCategoryList: [],
//     policyStatusList: [],
//     riskTypeList: [],
//     policyTypeList: [],
//     assetTypeList: [],
//     customTypeList: [],
//     payMethodList: [],
//     payTypeList: []

const productCategoryList = (list: Dict[]) => list;

export const getProductCategoryListObj = createSelector(productCategoryList, (list: Dict[]) =>
  arrayToObject(list),
);

const riskTypeCategoryList = (list: Dict[]) => list;

export const getRiskTypeCategoryListObj = createSelector(riskTypeCategoryList, (list: Dict[]) =>
  arrayToObject(list),
);

const payMethodList = (list: Dict[]) => list;

export const getPayMethodListObj = createSelector(payMethodList, (list: Dict[]) =>
  arrayToObject(list),
);

const payTypeList = (list: Dict[]) => list;

export const getPayTypeListObj = createSelector(payTypeList, (list: Dict[]) => arrayToObject(list));

const policyTypeList = (list: Dict[]) => list;

export const getPolicyTypeListObj = createSelector(policyTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const policyStatusList = (list: Dict[]) => list;

export const getPolicyStatusListObj = createSelector(policyStatusList, (list: Dict[]) =>
  arrayToObject(list),
);

const assetTypeList = (list: Dict[]) => list;

export const getAssetTypeListObj = createSelector(assetTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const customTypeList = (list: Dict[]) => list;

export const getCustomTypeListObj = createSelector(customTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const invoiceTypeList = (list: Dict[]) => list;

export const getInvoiceTypeListObj = createSelector(invoiceTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const feeTypeList = (list: Dict[]) => list;

export const getFeeTypeListObj = createSelector(feeTypeList, (list: Dict[]) => arrayToObject(list));

const sendStatusList = (list: Dict[]) => list;

export const getSendStatusListObj = createSelector(sendStatusList, (list: Dict[]) =>
  arrayToObject(list),
);

const payStatusList = (list: Dict[]) => list;

export const getPayStatusListObj = createSelector(payStatusList, (list: Dict[]) =>
  arrayToObject(list),
);

const identityTypeList = (list: Dict[]) => list;

export const getIdentityTypeListObj = createSelector(identityTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const relationTypeList = (list: Dict[]) => list;

export const getRelationTypeListObj = createSelector(relationTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const transactionTypeList = (list: Dict[]) => list;

export const getTransactionTypeListObj = createSelector(transactionTypeList, (list: Dict[]) =>
  arrayToObject(list),
);

const genderList = (list: Dict[]) => list;

export const getGenderListObj = createSelector(genderList, (list: Dict[]) => arrayToObject(list));
