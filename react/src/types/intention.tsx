import { RangePickerValue } from 'antd/lib/date-picker/interface';

export interface IntentionItem {
  businessNo: string;
  productName: string;
  companyName: string;
}

export interface IntentionFormData {
  channelNo?: string;
  channelName?: string;
  startDate?: string;
  endDate?: string;
  rangeTime?: RangePickerValue;
}
