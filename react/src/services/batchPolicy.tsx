import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import {
  QueryParams,
  BatchPolicyFormData,
  UndoSummaryData,
  SummaryData,
  PolicyPayData,
  PolicyBatchPayData,
} from '@/types';

export function fetchBatchPolicy({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<BatchPolicyFormData>) {
  return from(fetch.get(url.batchPolicy.list, { ...data, size, page }));
}

export function fetchBatchPolicySummary(data: SummaryData) {
  return from(fetch.post(url.batchPolicy.summary, JSON.stringify(data)));
}

export function fetchBatchPolicyUndoSummary(data: UndoSummaryData) {
  return from(fetch.post(url.batchPolicy.undoSummary, JSON.stringify(data)));
}

export function fetchBatchPolicyDetail(businessNo: string) {
  return from(fetch.get(url.batchPolicy.detail, { businessNo }));
}

export function fetchPolicyPay(data: PolicyPayData) {
  return from(fetch.post(url.batchPolicy.pay, JSON.stringify(data)));
}

export function fetchPolicyBatchPay(data: PolicyBatchPayData) {
  return from(fetch.post(url.batchPolicy.batchPay, JSON.stringify(data)));
}
