import update from 'immutability-helper';
import { DefaultTable, DataXFormData, DataX, Action, Attachment } from '@/types';
import { getType } from 'typesafe-actions';
import { doGetDataX, doDataXVisible, doDataXSelected, doDataXSelectedSet } from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

interface DataXState extends DefaultTable<DataX, DataXFormData> {
  selectedFiles: Attachment[];
  visible: boolean;
}

const initialPage = {
  ...InitialPage,
  pageSize: 5,
};

const initialState: DataXState = {
  formData: {},
  list: [],
  page: { ...initialPage },
  selectedFiles: [],
  visible: false,
};

export const dataXReducer = (state: DataXState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetDataX.request):
      return update(state, {
        formData: { $set: getPayloadData<DataXFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetDataX.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          totalCount: { $set: action.payload.totalCount },
          pageSize: { $set: action.payload.pageSize },
        },
      });
    case getType(doGetDataX.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...initialPage } },
      });
    case getType(doDataXVisible):
      return update(state, {
        visible: { $set: action.payload.visible },
      });

    case getType(doDataXSelected):
      let selectedFiles = [...state.selectedFiles];
      return update(state, {
        selectedFiles: {
          $apply: () => {
            if (action.payload.checked) {
              selectedFiles.push(action.payload.file);
            } else {
              selectedFiles = selectedFiles.filter(
                (item: Attachment) => item.ossId !== action.payload.file.ossId,
              );
            }
            return selectedFiles;
          },
        },
      });
    case getType(doDataXSelectedSet):
      return update(state, {
        visible: { $set: false },
        selectedFiles: { $set: action.payload.list },
      });
    default:
      return state;
  }
};
