import { RangePickerValue } from 'antd/lib/date-picker/interface';

export interface ReportFormData {
  paymentTheme?: string;
  paymentType?: string;
  startTime?: string;
  endTime?: string;
  time?: RangePickerValue;
  companyNo?: string;
}

export interface Report {
  paymentTheme?: string;
  id?: number;
  paymentType?: string;
  paymentTime?: string;
  aggregateSum?: string;
}

export interface ReportCompany {
  companyNo: string;
  companyName: string;
}
