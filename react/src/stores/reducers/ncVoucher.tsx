import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, NCVoucherFormData, NCVoucherItem } from '@/types';
import { doGetReportList, doGetNcVoucherList, doSetNcVoucherUploadVisible } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export interface NCVoucherState extends DefaultTable<NCVoucherItem, NCVoucherFormData> {
  uploadVisible: boolean;
}

const initialState: NCVoucherState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  uploadVisible: false,
};

export const ncVoucherReducer = (state: NCVoucherState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetNcVoucherList.request):
      return update(state, {
        formData: { $set: getPayloadData<NCVoucherFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetNcVoucherList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetReportList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doSetNcVoucherUploadVisible):
      return update(state, {
        uploadVisible: { $set: action.payload },
      });
    default:
      return state;
  }
};
