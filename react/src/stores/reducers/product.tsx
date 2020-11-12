import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import {
  Action,
  DefaultTable,
  Product,
  ProductFormData,
  ProductDetail,
  CompanyFormData,
  Company,
  ProductEditor,
} from '@/types';
import {
  doGetProductList,
  doGetProductDetail,
  doAddOrModifyProduct,
  doSetProductShowKey,
  doSetProductCompanyVisible,
  doGetProductCompanyAll,
  doSetProductPreviewVisible,
  doGetProductEditorDetail,
  doUpdateProductHtml,
} from '@/stores/actions';
import { InitialPage } from '@/constans';
import { getPayloadData } from '@/utils/util';

const initialCompanyPage = {
  ...InitialPage,
  pageSize: 5,
};

export interface ProductState extends DefaultTable<Product, ProductFormData> {
  show: string;
  detail: ProductDetail;
  companyVisible: boolean;
  company: DefaultTable<Company, CompanyFormData>;
  companySelected: Company;
  h5PreviewVisible: boolean;
  editor: ProductEditor;
}

const initialState: ProductState = {
  formData: {},
  page: { ...InitialPage },
  list: [],
  show: 'list',
  detail: {},
  companyVisible: false,
  companySelected: {},
  editor: {},
  company: {
    formData: {},
    list: [],
    page: { ...initialCompanyPage },
  },
  h5PreviewVisible: false,
};

export const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case getType(doGetProductList.request):
      return update(state, {
        detail: { $set: {} },
        formData: { $set: getPayloadData<ProductFormData>(action.payload.data, state.formData) },
      });
    case getType(doGetProductList.success):
      return update(state, {
        list: { $set: action.payload.list },
        page: {
          current: { $set: action.payload.pageNumber },
          pageSize: { $set: action.payload.pageSize },
          totalCount: { $set: action.payload.totalCount },
        },
      });
    case getType(doGetProductList.failure):
      return update(state, {
        list: { $set: [] },
        page: { $set: { ...InitialPage } },
      });
    case getType(doGetProductDetail.success):
      return update(state, {
        detail: { $set: { ...action.payload.data } },
        show: { $set: action.payload.show },
      });
    case getType(doAddOrModifyProduct.success):
      return update(state, {
        show: { $set: 'list' },
      });

    case getType(doSetProductShowKey):
      return update(state, {
        show: { $set: action.payload.show },
        [action.payload.key || 'product']: { $set: action.payload.data || {} },
      });
    case getType(doSetProductCompanyVisible):
      return update(state, {
        companyVisible: { $set: action.payload.visible },
        companySelected: { $set: action.payload.selectedCompany || state.companySelected || {} },
      });
    case getType(doGetProductCompanyAll.request):
      return update(state, {
        company: {
          formData: {
            $set: getPayloadData<CompanyFormData>(action.payload.data, state.company.formData),
          },
        },
      });
    case getType(doGetProductCompanyAll.success):
      return update(state, {
        company: {
          list: { $set: action.payload.list },
          page: {
            current: { $set: action.payload.pageNumber },
            pageSize: { $set: action.payload.pageSize },
            totalCount: { $set: action.payload.totalCount },
          },
        },
      });
    case getType(doGetProductCompanyAll.failure):
      return update(state, {
        company: {
          list: { $set: [] },
          page: { $set: { ...initialCompanyPage } },
        },
      });
    case getType(doSetProductPreviewVisible):
      return update(state, {
        h5PreviewVisible: { $set: action.payload.visible },
      });
    case getType(doGetProductEditorDetail.success):
      return update(state, {
        editor: { $set: { ...action.payload.data } },
        show: { $set: action.payload.show },
      });
    case getType(doUpdateProductHtml.success):
      return update(state, {
        show: { $set: 'list' },
      });
    default:
      return state;
  }
};
