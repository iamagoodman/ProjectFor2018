import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, NCVoucherFormData, NCVoucherUploadData } from '@/types';

export function fetchNcVoucherList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<NCVoucherFormData>) {
  return from(
    fetch.get(url.ncVoucher.list, {
      ...data,
      page,
      size,
    }),
  );
}

export function fetchUploadNcVoucher(data: NCVoucherUploadData) {
  return from(fetch.post(url.ncVoucher.upload, data));
}
