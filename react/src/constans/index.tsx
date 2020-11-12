import { MenuItem } from '@/types';

export const AUTH_DOMAIN = {
  dev: 'http://auth-dev.tongbb.net:8088',
  'dev-common': 'http://auth-dev.tongbb.net:8088',
  production: 'http://auth.tongbb.net',
  stging: 'http://authstg.tongbb.net',
  test: 'http://authtest.tongbb.net',
  default: 'http://auth-dev.tongbb.net:8088'
};

export const API_DOMAIN = {
  dev: 'http://api-dev.tongbb.net:8080',
  'dev-common': 'http://api-dev.tongbb.net:8080',
  test: 'http://api-test.tongbb.net:8080',
  'test-common': 'http://api-test.tongbb.net:8080',
  production: 'http://api.tongbb.net',
  stging: 'http://apistg.tongbb.net',
  default: 'http://api-dev.tongbb.net:8080'
};

export const BUSINESS_TYPE = {
  '1': '寿险',
  '2': '财险',
  '3': '再保',
  '4': '互助'
};

export type BUSINESS_TYPE = typeof BUSINESS_TYPE;

export const RISK_TYPE = {
  '1': '主险',
  '2': '附加险'
};

export type RISK_TYPE = typeof RISK_TYPE;

export const CHANNEL_STATUS = {
  '1': '开启',
  '0': '关闭'
};
export type CHANNEL_STATUS = typeof CHANNEL_STATUS;

export const PRODUCT_STATUS = {
  '1': '启用',
  '0': '停用'
};
export type PRODUCT_STATUS = typeof PRODUCT_STATUS;

export const DICT = {
  business_type: '业务类型',
  product_category: '产品大类',
  risk_type_category: '险别类别',
  risk_type: '险别',
  policy_status: '保单状态',
  policy_type: '保单类型',
  asset_type: '标的类型',
  custom_type: '投保人类型',
  pay_method: '缴费方式',
  pay_type: '缴费类型'
};

export const DICT_TO_LIST = {
  business_type: 'businessTypeList',
  product_category: 'productCategoryList',
  risk_type_category: 'riskTypeCategoryList',
  risk_type: 'riskTypeList',
  policy_status: 'policyStatusList',
  policy_type: 'policyTypeList',
  asset_type: 'assetTypeList',
  custom_type: 'customTypeList',
  pay_method: 'payMethodList',
  pay_type: 'payTypeList'
};

export const HTML = `<!DOCTYPE html><html><head>{%meta%}{%link%}</head><body>{%content%}</body>{%script%}</html>`;

export const RELATION = {
  '1': '本人',
  '2': '父母',
  '3': '配偶',
  '4': '子女'
};

export const ID_TYPE = {
  '1': '身份证'
};

export const BENEFIT_FLAG = {
  '1': '第一顺位'
};

export const PAY_FLAG = {
  '1': '初始状态',
  '2': '待核保',
  '3': '下发修改',
  '4': '核保通过',
  '5': '生成保单'
};

export const INVOICE_TYPE = {
  '1': '纸质普票',
  '2': '纸质专票',
  '3': '电子发票'
};

export const SEND_FLAG = {
  '1': '待发送'
};

export const GROUP_FLAG = {
  '0': '个单',
  '1': '团单'
};

export const PAYMENT_TYPE = {
  receipt_advance_premium: '应收账款-垫付保费',
  receipt_paying_fee: '应收账款-代付费用',
  main_business_brokerage_fee: '主营业务收入-经纪佣金收入',
  main_business_consulting_fee: '主营业务收入-咨询费收入',
  payable_collecting_premium: '应付账款-代收保费',
  payable_other_cooperation: '其他应付款-协作业务费用'
};

export const UPLOAD_TYPE = {
  excel: '手工上传保单',
  datax: 'datax上传保单'
};

export const InitialPage = { current: 1, pageSize: 10, totalCount: 0 };

export const POLICY_TYPE = {
  0: '个单',
  1: '团单',
  2: '团/个单'
};

export const MENUS: MenuItem[] = [
  {
    key: 'insurancecompany',
    code: 'insurance_company',
    url: '/insurance/company',
    name: '保险公司管理',
    children: []
  },
  {
    key: 'insuranceproduct',
    code: 'insurance_product',
    url: '/insurance/product',
    name: '产品管理',
    children: []
  },
  {
    key: 'insurancechannel',
    code: 'insurance_channel',
    url: '/insurance/channel',
    name: '渠道管理',
    children: []
  },
  {
    key: 'insurancecommission',
    code: 'insurance_commission',
    url: '/insurance/commission',
    name: '渠道费用配置',
    children: []
  },
  {
    key: 'insurancepolicy',
    code: 'insurance_policy',
    url: '/insurance/policy',
    name: '保单管理',
    children: []
  },
  {
    key: 'insurancemarket',
    code: 'insurance_market',
    url: '/insurance/market',
    name: '保单营销管理',
    children: []
  },
  {
    key: 'insuranceintention',
    code: 'insurance_intention',
    url: '/insurance/intention',
    name: '投保意向查询',
    children: []
  },
  {
    key: 'insurancerepayment',
    code: 'insurance_repayment',
    url: '/insurance/repayment',
    name: '收付列表',
    children: []
  },
  {
    key: 'insurancereport',
    code: 'insurance_report',
    url: '/insurance/report',
    name: '收付日列表',
    children: []
  },
  // {
  //     "key": "insuranceuserChannel",
  //     "code": "insurance_userChannel",
  //     "url": "/insurance/userChannel",
  //     "name": "用户渠道管理",
  //     "children": []
  // },
  {
    key: 'insurancencVoucher',
    code: 'insurance_ncVoucher',
    url: '/insurance/ncVoucher',
    name: 'NC凭证历史记录',
    children: []
  }
];
