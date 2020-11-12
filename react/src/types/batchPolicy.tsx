export interface BatchPolicyFormData {
  businessNo?: string;
  productNo?: string;
  name?: string;
  insuredName?: string;
  payFlag?: string;
  policyFlag?: string;
  batchTradeNo?: string;
  startTime?: string;
  endTime?: string;
}

export interface BatchPolicy {
  id: number;
  businessNo: string;
  policyNo: string;
  productName: string;
  premium: number;
  name: string;
  insuredName: string;
  policyFlag: string;
  payFlag: string;
  batchTradeNo: string;
  appliName: string;
  sumPremium: number;
  recognizeeInfoDTOList: BatchPolicyInsured[];
}

export interface BatchPolicyInsured {
  insuredType: string;
  insuredName: string;
  identifyType: string;
  identifyNumber: string;
  mobile: string;
}

export interface UndoSummaryData {
  undoSummaryList: UndoSummaryItem[];
}

export interface UndoSummaryItem {
  businessNo: string;
  batchTradeNo: string;
}

export interface SummaryData {
  businessNoList: string[];
}

export interface BatchPolicyDetail {
  id?: number;
  businessNo?: string;
  policyNo?: string;
  proposalNo?: string;
  sumPremium?: string | number;
  sumAmount?: string | number;
  beginDate?: string;
  endDate?: string;
  appliDate?: string;
  appliName?: string;
  identifyType?: string;
  identifyNumber?: string;
  mobile?: string;
  email?: string;
  birthday?: string;
  recognizeeInfoDTOList?: BatchPolicyInsuredInfo[];
  productName?: string;
  companyName?: string;
  policyFlag?: string;
  payFlag?: string;
  name?: string;
  idNumber?: string;
}

export interface BatchPolicyInsuredInfo {
  insuredType: string;
  insuredName: string;
  identifyType: string;
  identifyNumber: string;
  sex: string;
  mobile: string;
  email: string;
}

export interface PolicyPayData {
  business_no?: string;
  total_fee?: number;
  payment_no?: string;
  pay_sence?: string;
  batch?: boolean;
}

export interface PolicyBatchPayData {
  import_no?: string;
  product_no?: string;
  total_fee?: number;
  payment_no?: string;
  pay_sence?: string;
  channel_no?: string;
  begin_date?: string;
}

export interface PolicyOrderData extends PolicyPayData, PolicyBatchPayData {
  codeUrl?: string;
  batchTradeNo?: string;
  total?: number;
  totalFee?: number;
  batch: boolean;
}
