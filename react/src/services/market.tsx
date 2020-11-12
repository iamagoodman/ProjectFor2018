import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, PolicyMarketFormData, PolicyMarketImportData } from '@/types';

export function fetchPolicyMarketList({ data, pageSize: size, pageNumber: page }: QueryParams<PolicyMarketFormData>) {
  return from(
    fetch.get(url.policyMarket.list, {
      ...data,
      page,
      size
    })
  );
}

export function fetchPolicyMarketImportData(data: PolicyMarketImportData) {
  return from(fetch.post(url.policyMarket['import'], { ...data, dataType: 'formData' }));
}

export function fetchPolicyMarketProductList() {
  return from(fetch.get(url.policyMarket.product));
}
