import { UploadFile } from 'antd/lib/upload/interface';
import { Page } from './app';

export interface InsureProduct {
  id?: number;
  productNo?: string;
  productName?: string;
  policyTypes?: string | number;
  planCode?: string;
  planName?: string;
  groupFlag?: string | number | null;
}

export interface InsureDetail {
  productName?: string;
  saleman?: string;
  scheme?: string;
  groupFlag?: string;
  remark?: string;
}

export interface InsureDeclare extends InsureProduct {
  remark?: string;
  beginDate?: string;
  endDate?: string;
  groupFlag?: number | string | null;
  file?: UploadFile | null;
  fileList?: UploadFile[];
  insure_area?: string;
  line_group_number?: string;
}

export interface InsurePolicy extends InsureDeclare {
  sumPremium?: number;
  insureArea?: string;
  contractNo?: string;
}

export interface InsureDeclareImportData {
  plan_code: string;
  product_no: string;
  group_flag: boolean;
  file: UploadFile;
}

export interface InsureDeclareImport {
  policy: InsureDeclarePolicy[];
  info: InsureDeclareImportInfo;
  groupFlag: boolean;
  list: InsureDeclarePolicy[];
  page: Page;
  file: UploadFile | null;
  fileList: UploadFile[];
  excelKey: string | null;
}

export interface InsureImportPolicy {
  list: InsureDeclarePolicy[];
  page: Page;
  info: InsurePolicy;
  groupFlag: number | string | null | undefined;
}

export interface InsureDeclareImportInfo {
  total?: number;
  successTotal?: number;
  policyNumber?: number;
  totalPremium?: number;
}
export interface InsureDeclarePolicy {
  applicant?: Info;
  insured?: InsuredInfo[];
  premium?: number;
  num?: number;
  policyNo?: string;
  isGeneratePolicyNo?: boolean;
}

export interface Info {
  name?: string;
  idType?: string;
  idNumber?: string;
  mobile?: string;
  email?: string;
  birthday?: string;
}

export interface InsuredInfo extends Info {
  relation?: string;
  num?: number;
  benefitName?: string;
}

export interface InsurePolicyData {
  importNo?: string;
}

export interface BatchInsureData {
  group_flag: boolean;
  end_date: string;
  begin_date: string;
  channel_sec: string;
  channel_no: string;
  subject_type: string;
  product_no: string;
  list: InsureImportPolicyItem[];
  remark?: string;
  contract_no?: string;
  insure_area?: string;
  excel_key?: string;
}

export interface InsureImportPolicyItem {
  insuredName: string;
  identifyType: string;
  number: number;
  identifyNumber: string;
  identifyBirthday: string;
  appliIdentity: string;
  indentifyEmail: string;
  identifyRemark: string;
  appliName: string;
  insureType: string;
  insureNumber: string;
  birthday: string;
  phoneNumber: string;
  premium: number;
}
