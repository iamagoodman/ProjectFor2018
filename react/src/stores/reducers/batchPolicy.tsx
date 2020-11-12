import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import {
  Action,
  DefaultTable,
  BatchPolicy,
  PolicyOrderData,
  BatchPolicyDetail,
  BatchPolicyFormData,
} from '@/types';
import {
  doGetBatchPolicyList,
  doBatchPolicySearchClear,
  doSetBatchPolicySelectedKeys,
  doGetBatchPolicyDetail,
  doPostPolicyBatchPay,
  doPostPolicyPay,
} from '@/stores/actions';
import { getPayloadData } from '@/utils/util';

export interface BatchPolicyState extends DefaultTable<BatchPolicy, BatchPolicyFormData> {
  selectedRowKeys: string[];
  detail: BatchPolicyDetail;
  order: PolicyOrderData;
}

const initialState: BatchPolicyState = {
  list: [],
  page: {
    totalCount: 0,
    current: 1,
    pageSize: 10,
  },
  formData: {},
  selectedRowKeys: [],
  detail: {},
  order: {
    batch: false,
  },
};

export const batchPolicyReducer = (state: BatchPolicyState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetBatchPolicyList.request):
      return update(state, {
        formData: {
          $set: getPayloadData<BatchPolicyFormData>(action.payload.data, state.formData),
        },
      });
    case getType(doGetBatchPolicyList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetBatchPolicyList.failure):
      return update(state, {
        list: { $set: [] },
        page: {
          current: { $set: 1 },
          pageSize: { $set: 10 },
          totalCount: { $set: 0 },
        },
      });
    case getType(doBatchPolicySearchClear):
      return update(state, {
        formData: { $set: {} },
      });
    case getType(doSetBatchPolicySelectedKeys):
      return update(state, {
        selectedRowKeys: { $set: action.payload },
      });
    case getType(doGetBatchPolicyDetail.success):
      return update(state, {
        detail: { $set: action.payload },
      });
    case getType(doPostPolicyBatchPay.success):
      return update(state, {
        order: {
          $set: {
            batch: true,
            ...action.payload,
          },
        },
      });
    case getType(doPostPolicyPay.success):
      return update(state, {
        order: {
          $set: {
            batch: action.payload.batch,
            ...action.payload,
          },
        },
      });
    default:
      return state;
  }
};
