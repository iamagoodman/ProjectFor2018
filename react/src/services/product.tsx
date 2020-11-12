import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, ProductFormData, ProductDetail, Product, CompanyFormData } from '@/types';

export function fetchProductList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<ProductFormData>) {
  return from(
    fetch.get(url.product.list, {
      ...data,
      page,
      size,
    }),
  );
}

export function fetchProductDetail(id: number) {
  return from(fetch.get(url.product.detail, { id }));
}

export function fetchProductEditorDetail(id: number) {
  return from(fetch.get(url.product.h5, { id }));
}

export function fetchProductAddOrModify(data: any, type: string) {
  return from(fetch.post(url.product[type], data));
}

export function fetchProductAdd(data: ProductDetail) {
  return from(fetch.post(url.product.add, data));
}

export function fetchProductModify(data: ProductDetail) {
  return from(fetch.post(url.product.modify, data));
}

export function fetchProductUpdateStatus(data: Product) {
  return from(fetch.post(url.product.updateStatus, data));
}

export function fetchProductUpdateHtml(data: ProductDetail) {
  return from(fetch.post(url.product.updateh5, data));
}

export function fetchProductCompanyAll({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<CompanyFormData>) {
  return from(
    fetch.get(url.app.company, {
      ...data,
      size,
      page,
    }),
  );
}
