import { UploadFile } from 'antd/lib/upload/interface';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

export interface PolicyMarket {
  id: number;
  mktStaffNo: string;
  policyNo: string;
  applicantName: string;
  applicantIdNo: string;
  applicantMobile: string;
  insuredName: string;
  insuredIdNo: string;
  insuredMobile: string;
  productName: string;
  paymentPeriod: number;
  paymentFrequency: string;
  renewal: boolean | number;
  policyStatus: string;
  underwritingDate: number | string;
  regularPremium: number;
  channelNo: string;
  thirdChannelNo: string;
  underwritingAnnualPremium: number;
  cancellationDate: string | number;
}

export interface PolicyMarketFormData {
  id?: number;
  mktStaffNo?: string;
  policyNo?: string;
  applicantName?: string;
  applicantIdNo?: string;
  applicantMobile?: string;
  insuredName?: string;
  insuredIdNo?: string;
  insuredMobile?: string;
  productName?: string;
  paymentPeriod?: number;
  paymentFrequency?: string;
  renewal?: boolean;
  policyStatus?: string;
  regularPremium?: number;
  channelNo?: string;
  thirdChannelNo?: string;
  underwritingAnnualPremium?: number;
  cancellationDate?: string | number;
  underwritingStartDate?: string;
  underwritingEndDate?: string;
  rangeTime?: RangePickerValue;
}

export interface PolicyMarketImportData {
  companyNo: string;
  productNo: string;
  file: UploadFile;
}

export interface PolicyMarketList {
  grossUnderwritingAnnualPremium: number;
  mktPolicyInfoDTOList: PolicyMarket[];
}
