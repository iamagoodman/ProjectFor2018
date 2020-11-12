import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, PolicyMarket, PolicyMarketFormData } from '@/types';
import {
  doGetPolicyMarketList,
  doSetPolicyMarketShowKey,
  doPolicyMarketImportData,
  doGetPolicyMarketProductList
} from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export interface PolicyMarketState extends DefaultTable<PolicyMarket, PolicyMarketFormData> {
  show: string;
  totalPremium: number;
  productList: string[];
}

const initialState: PolicyMarketState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  show: 'list',
  totalPremium: 0,
  productList: []
};

export const policyMarketReducer = (state: PolicyMarketState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetPolicyMarketList.request):
      return update(state, {
        formData: { $set: getPayloadData<PolicyMarketFormData>(action.payload.data, state.formData) }
      });
    case getType(doGetPolicyMarketList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount }
        },
        totalPremium: { $set: action.payload.totalPremium }
      });
    case getType(doGetPolicyMarketList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } }
      });

    case getType(doSetPolicyMarketShowKey):
      return update(state, {
        show: { $set: action.payload.show }
      });

    case getType(doPolicyMarketImportData.success):
      return update(state, {
        show: { $set: 'list' }
      });
    case getType(doGetPolicyMarketProductList.success):
      return update(state, {
        productList: { $set: action.payload }
      });
    default:
      return state;
  }
};
