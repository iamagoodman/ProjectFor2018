import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { DataXFormData, List, QueryParams, DataX, Attachment } from '@/types';

export const doGetDataX = createAsyncAction(
  ACTIONTYPE.DATAX_LIST_REQUEST,
  ACTIONTYPE.DATAX_LIST_SUCCESS,
  ACTIONTYPE.DATAX_LIST_FAILURE,
)<QueryParams<DataXFormData>, List<DataX, DataXFormData>, Error>();

// export const doUploadDataX = createAsyncAction(
//     ACTIONTYPE.DATAX_UPLOAD_REQUEST,
//     ACTIONTYPE.DATAX_UPLOAD_SUCCESS,
//     ACTIONTYPE.DATAX_UPLOAD_FAILURE
// )<DataXUploadData, undefined, Error>()

export const doDataXVisible = createAction(
  ACTIONTYPE.DATAX_LIST_VISIBLE,
  action => (visible: boolean) => action({ visible }),
);

export const doDataXSelected = createAction(
  ACTIONTYPE.DATAX_SELECTED_LIST,
  action => (file: Attachment, checked: boolean) => action({ file, checked }),
);

export const doDataXSelectedSet = createAction(
  ACTIONTYPE.DATAX_SELECTED_SET,
  action => (list: Attachment[]) => action({ list }),
);
