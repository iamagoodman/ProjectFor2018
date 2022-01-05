import { PrimayItem, OptionItem } from '@/types';

export const bg_primary_list: PrimayItem[] = [
  { name: '酷黑', color: '#1a1b1c' },
  { name: '浅色', color: '#f7f8fa' }
];

export const BODY_TYPE: OptionItem[] = [
  {
    label: 'none',
    value: 'none'
  },
  {
    label: 'form-data',
    value: 'form-data'
  },
  {
    label: 'x-www-form-urlencoded',
    value: 'x-www-form-urlencoded'
  },
  {
    label: 'json',
    value: 'json'
  }
];

export const PARAMS_TYPE: OptionItem[] = [
  {
    label: 'string',
    value: 'string'
  },
  {
    label: 'boolean',
    value: 'boolean'
  },
  {
    label: 'number',
    value: 'number'
  }
];

export const TRUEFALSE: OptionItem[] = [
  {
    label: 'true',
    value: true
  },
  {
    label: 'false',
    value: false
  }
];