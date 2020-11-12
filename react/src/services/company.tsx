import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, CompanyFormData, Company } from '@/types';

export function fetchCompanyList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<CompanyFormData>) {
  return from(
    fetch.get(url.company.list, {
      ...data,
      size,
      page,
    }),
  );
}

export function fetchCompanyDetail(id: number | undefined) {
  return from(fetch.get(url.company.detail, { id }));
}

export function fetchCompanyAddOrModify(data: Company) {
  const id = data.id;
  return from(fetch.post(url.company[id ? 'modify' : 'add'], data));
}

export function fetchCompanyAdd(data: Company) {
  return from(fetch.post(url.company.add, data));
}

export function fetchCompanyModify(data: Company) {
  return from(fetch.post(url.company.modify, data));
}

export function fetchCompanyDelete(id: number | undefined) {
  return from(fetch.post(url.company.delete, { id }));
}

export function fetchCompanySecondList(owningCompanyNo: string | undefined) {
  return from(
    fetch
      .get(url.company.listSecond, {
        owningCompanyNo,
      })
      .then((res: any) => {
        if (res.data.totalCount === 0) {
          return Promise.reject({ message: '该保险机构下无二级保险机构' });
        } else {
          return res;
        }
      }),
  );
}

export function fetchCompanySecondDetail(id: number) {
  return from(fetch.get(url.company.detailSecond, { id }));
}

export function fetchCompanySecondAddOrModify(data: Company, type: string) {
  return from(fetch.post(url.company[`${type}Second`], data));
}

export function fetchCompanySecondAdd(data: Company) {
  return from(fetch.post(url.company.addSecond, data));
}

export function fetchCompanySecondModify(data: Company) {
  return from(fetch.post(url.company.modifySecond, data));
}

export function fetchCompanySecondDelete(id: number) {
  return from(fetch.post(url.company.deleteSecond, { id }));
}
