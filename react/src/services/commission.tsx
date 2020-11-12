import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, CommissionFormData, Commission } from '@/types';

export function fetchCommissionList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<CommissionFormData>) {
  return from(
    fetch.get(url.commission.list, {
      ...data,
      page,
      size,
    }),
  );
}

export function fetchCommissionDetail(data: Commission) {
  return from(fetch.get(url.commission.detail, { ...data }));
}

export function fetchCommissionAddOrModify(data: string = '[]', type: string) {
  return from(fetch[type === 'add' ? 'post' : 'put'](`${url.commission[type]}`, data));
}

export function fetchCommissionAdd(data: Commission) {
  return from(fetch.post(url.commission.add, data));
}

export function fetchCommissionModify(data: Commission) {
  return from(fetch.post(url.commission.modify, data));
}
