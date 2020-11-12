import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, ReportFormData } from '@/types';

export function fetchReportList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<ReportFormData>) {
  return from(
    fetch.get(url.report.list, {
      ...data,
      page,
      size,
    }),
  );
}

export function fetchReportCompanyList(paymentType: string) {
  return from(fetch.get(url.report.queryCompany, { paymentType }));
}
