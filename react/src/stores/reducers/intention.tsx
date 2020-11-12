import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, DefaultTable, IntentionItem, IntentionFormData } from '@/types';
import { doGetIntentionList } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

export type IntentionState = DefaultTable<IntentionItem, IntentionFormData>;

const initialState: IntentionState = {
  formData: {},
  page: { ...InitialPage },
  list: []
};

export const intentionReducer = (state: IntentionState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetIntentionList.request):
      return update(state, {
        formData: { $set: getPayloadData<IntentionFormData>(action.payload.data, state.formData) }
      });
    case getType(doGetIntentionList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount }
        }
      });
    case getType(doGetIntentionList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } }
      });

    default:
      return state;
  }
};
