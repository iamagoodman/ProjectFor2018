export interface CompanyFormData {
  companeyNo?: string;
  companyName?: string;
  simpleName?: string;
  businessType?: string;
}

export interface Company {
  id?: number;
  companyNo?: string;
  companyName?: string;
  businessType?: string;
  simpleName?: string;
  remark?: string;
  owningCompanyNo?: string;
  level?: string;
  insureCompanyList?: Company[];
  owningCompanyId?: number;
}

export interface CompanyLevel {
  level: string;
  company: Company;
  show?: string;
}

export interface CompanySecond {
  list: Company[];
  companyNo?: string;
  id?: number;
}

export interface CompanyListItem extends Company {
  children?: Company[];
  insureCompanyList?: Company[];
}
