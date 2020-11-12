import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  List,
  QueryParams,
  ErrorInfo,
  NCVoucherFormData,
  NCVoucherItem,
  NCVoucherUploadData,
} from '@/types';

export const doGetNcVoucherList = createAsyncAction(
  ACTIONTYPE.NCVOUCHER_LIST_REQUEST,
  ACTIONTYPE.NCVOUCHER_LIST_SUCCESS,
  ACTIONTYPE.NCVOUCHER_LIST_FAILURE,
)<QueryParams<NCVoucherFormData>, List<NCVoucherItem, NCVoucherFormData>, ErrorInfo>();

export const doUploadNcVoucher = createAsyncAction(
  ACTIONTYPE.NCVOUCHER_PREPARE_AND_UPLOAD_REQUEST,
  ACTIONTYPE.NCVOUCHER_PREPARE_AND_UPLOAD_SUCCESS,
  ACTIONTYPE.NCVOUCHER_PREPARE_AND_UPLOAD_FAILURE,
)<NCVoucherUploadData, undefined, ErrorInfo>();

export const doSetNcVoucherUploadVisible = createAction(
  ACTIONTYPE.NCVOUCHER_UPLOAD_VISIBLE,
  action => (visible: boolean) => action(visible),
);
