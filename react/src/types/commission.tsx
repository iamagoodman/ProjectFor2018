import * as moment from 'moment';

export interface CommissionFormData {
  channelName?: string;
  productName?: string;
}

export interface Commission {
  id?: number;
  channelNo?: string;
  channelName?: string;
  productNo?: string;
  productName?: string;
  serviceChargeRate?: number;
  beginTime?: string;
  endTime?: string;
  remark?: string;
}

export interface RateItem {
  commissionRate?: number | string;
  beginTime?: number | string;
  endTime?: number | string;
  beginDate?: moment.Moment;
  endDate?: moment.Moment;
  id?: string;
  isEnded?: boolean;
  isAdd?: boolean;
}

export interface CommissionDetail {
  id?: number;
  channelNo?: string;
  channelName?: string;
  productNo?: string;
  productName?: string;
  remark?: string;
  rateList?: RateItem[];
}

export interface CommissionOperateRequest {
  id?: number | string;
  data?: string;
}
