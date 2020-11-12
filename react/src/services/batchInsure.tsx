import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { InsureDeclareImportData, InsurePolicyData, QueryParams, BatchInsureData } from '@/types';

export function fetchInsureInfo(importNo: string) {
  return from(fetch.get(url.insure.info, { importNo }));
}

export function fetchInsureImport(data: InsureDeclareImportData) {
  return from(
    fetch.post(url.insure.import, {
      ...data,
      dataType: 'formData',
    }),
  );
}

export function fetchInsurePolicy({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<InsurePolicyData>) {
  return from(fetch.get(url.insure.policy, { ...data, page, size }));
}

export function fetchBatchInsure(data: BatchInsureData) {
  return from(fetch.post(url.insure.insure, JSON.stringify(data)));
}
