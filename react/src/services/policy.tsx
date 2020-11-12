import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, PolicyFormData, Policy, PolicyImportData, PolicyQzImportData } from '@/types';

export function fetchPolicyList({ data, pageSize: size, pageNumber: page }: QueryParams<PolicyFormData>) {
  return from(
    fetch.get(url.policy.list, {
      ...data,
      page,
      size
    })
  );
}

export function fetchPolicyAppliDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.applyDetail, { businessNo }));
}

export function fetchPolicyFavoreeDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.favoreeDetail, { businessNo }));
}
export function fetchPolicyRecognizeeDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.recognizeeDetail, { businessNo }));
}

export function fetchPolicyPayDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.payDetail, { businessNo }));
}

export function fetchPolicyPayListDetail({ data, pageSize: pageNumber, pageNumber: page }: QueryParams<Policy>) {
  return from(
    fetch.get(url.policy.payDetailList, {
      ...data,
      pageNumber,
      page
    })
  );
}

export function fetchPolicyFeeDetail({ businessNo }: Policy) {
  return from(
    fetch.get(url.policy.feeDetail, {
      businessNo
    })
  );
}

export function fetchPolicyClauseDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.clauseDetail, { businessNo }));
}

export function fetchPolicyBaseDetail(data: Policy) {
  return from(fetch.get(url.policy.baseDetail, { ...data }));
}

export function fetchPolicySubjectDetail({ businessNo, subjectType }: Policy) {
  return from(fetch.get(url.policy.subjectDetail, { businessNo, subjectType }));
}

export function fetchPolicyRiskTypeDetail({ businessNo }: Policy) {
  return from(fetch.get(url.policy.riskTypeDetail, { businessNo }));
}

export function fetchPolicyImportData({ uploadType, ...data }: PolicyImportData) {
  return from(fetch.post(url.policy[`${uploadType}Import`], { ...data, dataType: 'formData' }));
}

export function fetchPolicyQzImportData(data: PolicyQzImportData) {
  return from(fetch.post(url.policy.qzImport, { ...data, dataType: 'formData' }));
}

export function fetchPolicyEmployeeListDetail(id: number) {
  return from(fetch.get(url.policy.employeeDetailList, { id }));
}
