import { DictObj } from './app';
import { UploadFile } from 'antd/lib/upload/interface';

export interface PolicyFormData {
  businessNo?: string | null;
  policyNo?: string | null;
  channelName?: string | null;
  appliName?: string | null;
  productName?: string | null;
  policyFlag?: string | null;
  testFlag?: string | null | boolean;
  startTime?: string | null;
  endTime?: string | null;
}

export interface Policy {
  businessNo?: string | null;
  policyNo?: string | null;
  id?: number | null | string;
  subjectType?: string | null;
  proposalNo?: string | null;
  productName?: string | null;
  appliName?: string | null;
  channelName?: string | null;
  policyFlag?: string | null;
  recognizeeInfoDTOList?: PolicyInsured[];
}

export interface PolicyInsured {
  insuredType?: string;
  insuredName?: string;
  identifyType?: string;
  identifyNumber?: string;
  mobile?: string;
}

export interface PolicyPay {
  serialNo?: string;
  payType?: string;
  planStartDate?: string;
  planEndDate?: string;
  planFee?: number;
  delinquentFee?: number;
}

export interface PolicyFee {
  type: string;
  fee: number | string;
}

export interface PolicyDetail {
  [field: string]: string | number | boolean | any[];
  insuranceIntentionEmployeeDTOList?: PolicyDetailEmployeeItem[];
}

export interface PolicySubjectDetail {
  liability: PolicyDetail;
  cargo: PolicyDetail;
  policyEmployerLiability: PolicyDetail;
  isEmpty: boolean;
  isRequest?: boolean;
}
// export interface PolicyPayDetail extends PolicyDetail{
//     policyPaymentInfo?: PolicyPay[]
// }
export type PolicyPayDetail = PolicyDetail & { policyPaymentInfoDTO?: PolicyPay[] };

export interface PolicyPayDetailResponse {
  detail: PolicyPayDetail;
  payList: PolicyPay[];
}

export interface PolicyImportData {
  companyNo?: string;
  productNo?: string;
  channelNo?: string;
  file?: any;
  ossId?: string;
  uploadType?: string;
  testFlag?: string | number | boolean;
}

export interface PolicyAllDetail {
  favoreeDetail?: PolicyDetail[];
  baseDetail: PolicyDetail;
  recognizeeDetail?: PolicyDetail[];
  appliDetail: PolicyDetail;
  feeDetail: PolicyDetail;
  payDetail: PolicyDetail;
  clauseDetail: PolicyDetail;
  subjectDetail: PolicySubjectDetail;
  riskTypeDetail: PolicyDetail;
}

export interface PolicyDetailItem {
  [field: string]: PolicyDetailItemObj | string;
}

export interface PolicyComponentDetailProps<T = PolicyDetail> {
  data: T;
  detail: PolicyDetailItem;
  enumProps: PolicyDetailEnumProps;
}

export interface PolicyComponentSubjectDetailProps {
  cargo: PolicyComponentDetailProps & { len: number; title: string };
  liability: PolicyComponentDetailProps & { len: number; title: string };
}

export interface PolicyDetailItemObj {
  type?: string;
  name?: string;
  data?: string;
  unit?: string;
  extra?: boolean;
}

export interface PolicyDetailEnumProps {
  policyStatus: DictObj;
  policyType: DictObj;
  assetType: DictObj;
  customType: DictObj;
  riskTypeCategory: DictObj;
  gender: DictObj;
  benefitFlag: DictObj;
  payStatus: DictObj;
  sendStatus: DictObj;
  groupFlag: DictObj;
  invoiceType: DictObj;
  riskType: DictObj;
  relationType: DictObj;
  identityType: DictObj;
}

export interface PolicyQzImportData {
  file: UploadFile;
  testFlag: string;
}

export interface PolicyDetailEmployeeItem {
  name: string;
  idNumber: string;
  gender: string;
}
