import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import {
  QueryPage,
  ProductFormData,
  ChannelFormData,
  DataXFormData,
  QueryParams,
  CompanyFormData,
} from '@/types';

export function fetchPartner() {
  return from(fetch.get(url.app.partner));
}

export function fetchDict(group: string) {
  return from(fetch.get(url.app.dict, { group }));
}

export function fetchDictAll({ pageSize: size, pageNumber: page }: QueryPage) {
  return from(fetch.get(url.app.dictAll, { page: 1, size: 10000 }));
}

export function fetchCompanyAll() {
  return from(fetch.get(url.app.company));
}

export function fetchProductAll() {
  return from(fetch.get(url.app.product));
}

export function fetchChannelAll() {
  return from(fetch.get(url.app.channel));
}

export function fetchProductAllByCompany(data: ProductFormData) {
  return from(fetch.get(url.app.productByCompany, { ...data }));
}

export function fetchChannelAllByProduct(data: ChannelFormData) {
  return from(fetch.get(url.app.channelByProduct, { ...data }));
}

export function fetchDataX({ data, pageSize, pageNumber: pageNum }: QueryParams<DataXFormData>) {
  return from(fetch.get(url.app.datax, { ...data, pageSize, pageNum }));
}

export function fetchCompanyGlobal({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<CompanyFormData>) {
  return from(fetch.get(url.app.companyGlobal, { ...data, page, size }));
}

export function fetchProductByLoginId(loginId: string) {
  return from(fetch.get(url.app.productByLoginId, { loginId }));
}

export function fetchPlanAndPolicyType(id: number) {
  return from(fetch.get(url.app.planAndPolicyTypeByProduct, { id }));
}

export function fetchGetChannelInfo(channelNo: string) {
  return from(
    fetch.get(url.app.getChannel, { channelNo }).then((res: any) => {
      if (res.data.reasonCode === 10404) {
        return Promise.reject({
          message: res.data.message,
          reasonCode: res.data.reasonCode,
        });
      }
      return res;
    }),
  );
}
