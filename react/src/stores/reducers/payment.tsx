import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, Payment, PaymentFormData } from '@/types';
import { doGetPaymentList } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export type PaymentState = DefaultTable<Payment, PaymentFormData>;

const initialState: PaymentState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
};

export const paymentReducer = (state: PaymentState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetPaymentList.request):
      return update(state, {
        formData: { $set: getPayloadData<PaymentFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetPaymentList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetPaymentList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });

    default:
      return state;
  }
};
