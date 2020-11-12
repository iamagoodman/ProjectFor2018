import { Company } from './company';

export interface ProductFormData {
  productNo?: string;
  productName?: string;
  productStatus?: string | number;
  owningCompany?: string;
  bigClass?: string;
  productType?: string;
}

export interface Product {
  id?: number;
  productName?: string;
  productNo?: string;
  bigClass?: string;
  owningCompanyName?: string;
  productStatus?: string | number;
  productType?: string;
  companyName?: string;
  owningCompany?: string;
  extensionType?: number;
}

export interface ProductDetail {
  id?: number;
  productNo?: string;
  productName?: string;
  bigClass?: string;
  owningCompany?: string;
  owningProductNo?: string;
  isGiftInsurance?: string | number;
  isUnderWriting?: string | number;
  beginTime?: string | number;
  endTime?: string | number;
  // time?: RangePickerValue,
  commissionRate?: number;
  remark?: string;
  h5Sourse?: string;
  isCollectionCharges?: string;
  riskType?: string;
  productType?: string;
  planTypes?: any;
  planType?: string;
  policyTypes?: number;
  policyType?: number;
  incomeType?: string;
  premiumType?: number;
  extensionType?: number;
  externalLink?: string;
}

export interface AddProduct {
  productNo: string;
  productName: string;
  bigClass: string;
  owningCompany: string;
  owningProductNo: string;
  isGiftInsurance: string | number;
  isUnderWriting: string | number;
  beginTime: string | number;
  endTime: string | number;
  commissionRate: number;
  remark?: string;
  h5Sourse?: string;
  isCollectionCharges: string;
  riskType: string;
  productType: string;
  planTypes?: string;
  policyTypes: number;
}

export interface ModifyProduct {
  id: number;
  beginTime: string | number;
  endTime: string | number;
  commissionRate: number;
  remark?: string;
  planTypes?: string;
}

export interface ProductEditor {
  id?: number;
  h5Sourse?: string;
}

export interface RiskTypeItem {
  riskCode?: string;
  riskName?: string;
  riskType?: string;
  id?: string;
  uniqueId?: string;
}

export interface ProductCompanyVisible {
  visible: boolean;
  selectedCompany?: Company;
}

export interface PlanItem {
  planCode?: string;
  planName?: string;
  riskTypes: PlanItemRisk[];
  planPremium?: string;
  uniqueId?: string;
}

export interface PlanItemRisk {
  riskCode?: string;
  amount?: number;
  riskSumAmount?: number;
  uniqueId?: string;
}
