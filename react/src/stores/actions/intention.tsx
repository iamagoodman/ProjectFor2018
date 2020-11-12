import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction } from 'typesafe-actions';
import { QueryParams, IntentionFormData, List, IntentionItem, ErrorInfo } from '@/types';

export const doGetIntentionList = createAsyncAction(
  ACTIONTYPE.INTENTION_LIST_REQUEST,
  ACTIONTYPE.INTENTION_LIST_SUCCESS,
  ACTIONTYPE.INTENTION_LIST_FAILURE
)<QueryParams<IntentionFormData>, List<IntentionItem, IntentionFormData>, ErrorInfo>();
