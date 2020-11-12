import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, Commission, CommissionFormData, CommissionDetail } from '@/types';
import {
  doGetCommissionList,
  doGetCommissionDetail,
  doAddOrModifyCommission,
  doSetCommissionShowKey,
} from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export interface CommissionState extends DefaultTable<Commission, CommissionFormData> {
  show: string;
  detail: CommissionDetail;
}

const initialState: CommissionState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  show: 'list',
  detail: {},
};

export const commissionReducer = (state: CommissionState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetCommissionList.request):
      return update(state, {
        show: { $set: 'list' },
        formData: { $set: getPayloadData<CommissionFormData>(action.payload.data, state.formData) },
        detail: { $set: {} },
      });
    case getType(doGetCommissionList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetCommissionList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doGetCommissionDetail.success):
      return update(state, {
        detail: { $set: { ...action.payload.data } },
        show: { $set: action.payload.show },
      });
    case getType(doAddOrModifyCommission.success):
      return update(state, {
        show: { $set: 'list ' },
      });

    case getType(doSetCommissionShowKey):
      return update(state, {
        show: { $set: action.payload.show },
        [action.payload.key || 'commission']: { $set: action.payload.data || {} },
      });
    default:
      return state;
  }
};
