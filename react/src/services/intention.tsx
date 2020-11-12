import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, IntentionFormData } from '@/types';

export function fetchIntentionList({ data, pageSize: size, pageNumber: page }: QueryParams<IntentionFormData>) {
  return from(fetch.get(url.intention.list, { ...data, size, page }));
}
