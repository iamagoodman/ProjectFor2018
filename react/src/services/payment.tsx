import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, PaymentFormData } from '@/types';

export function fetchPaymentList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<PaymentFormData>) {
  return from(
    fetch.get(url.payment.list, {
      ...data,
      page,
      size,
    }),
  );
}
