export const BaseDetail = {
  businessNo: '流水号',
  proposalNo: '投保单号',
  policyNo: '保单号',
  groupFlag: {
    type: 'enum',
    name: '团个单标示',
    data: 'groupFlag'
  },
  invoiceType: {
    type: 'enum',
    name: '发票类型',
    data: 'invoiceType'
  },
  policyType: {
    type: 'enum',
    name: '保单类型',
    data: 'policyType'
  },
  policyUrl: '电子保单地址',
  channelNo: '渠道编号',
  channelName: '渠道名称',
  productNo: '产品编号',
  productName: '产品名称',
  sumAmount: {
    type: 'unit',
    name: '保额',
    unit: '元'
  },
  sumPremium: {
    type: 'unit',
    name: '保费',
    unit: '元'
  },
  beginDate: '保险起始时间',
  endDate: '保险结束时间',
  appliDate: '投保时间',
  underWriteDate: '核保时间',
  policyFlag: {
    type: 'enum',
    name: '保单状态',
    data: 'policyStatus'
  },
  sendFlag: {
    type: 'enum',
    name: '发送保险公司状态',
    data: 'sendStatus'
  }
  // assetType: {
  //     type: 'enum',
  //     name: '标的信息',
  //     data: 'assetType'
  // }
};
const SubjectBaseDetail = {
  businessNo: '流水号',
  policyNo: '保单号',
  productNo: '产品编码',
  itemNo: '标的序号',
  conveyanceType: '运输方式',
  conveyance: '运输工具',
  blNo: '运输单号',
  voyageNo: '航次',
  carryBillNo: '货票运单号',
  conveyanceCost: {
    type: 'unit',
    name: '运输费用',
    unit: '元'
  },
  startSiteCode: '起始地编码',
  startSiteName: '起始地名称',
  startSiteAddress: '起始地网点',
  viaSiteCode: '中转地编码',
  viaSiteName: '中转站名称',
  viaSiteAddress: '中转站网点',
  endSiteCode: '目的地编码',
  endSiteName: '目的地名称',
  endSiteAddress: '目的地网点',
  conveyDateDesc: '运载日期描述',
  startSiteDate: '起运时间',
  endSiteDate: '到达日期',
  itemType: '货物类型',
  itemDescription: '货物明细',
  quantity: {
    type: 'unit',
    name: '货物数量及包装',
    unit: '单位'
  },
  value: {
    type: 'unit',
    name: '货物价值',
    unit: '元'
  }
};
export const SubjectCargoDetail = {
  ...SubjectBaseDetail,
  ladingNo: '提单号',
  invoiceNo: '发票号',
  invoiceAmount: '发票金额',
  plusRate: {
    type: 'unit',
    name: '加成比例',
    unit: '%'
  },
  bargainNo: '合同号',
  shipNoteNo: '起运通知书编号',

  tonCount: {
    type: 'unit',
    name: '吨位数',
    unit: '吨'
  }
};
export const SubjectLiabilityDetail = {
  ...SubjectBaseDetail,
  riskType: {
    type: 'enum',
    name: '责任险类别',
    data: 'riskType'
  },
  certificateNo: '证件号码',
  certificateDate: '发证日期',
  certificateDepar: '发证机构',
  practiceDate: '开业日期',
  businessCode: '营业执照编号',
  businessDetail: '营业执照性质',
  businessSite: '营业处所',
  insureArea: '承保区域范围',
  saleArea: '销售区域范围',
  officeType: '机构性质',
  businessSource: '行业',
  bkWardStartDate: '追溯起始日期',
  bkWardEndDate: '追溯结束日期',
  preTurnOver: {
    type: 'unit',
    name: '上年度营业额',
    unit: '元'
  },
  nowTurnOver: {
    type: 'unit',
    name: '本年度营业额',
    unit: '元'
  },
  serialNo: '序列号',
  batchNo: '批次号',
  sumAmount: {
    type: 'unit',
    name: '保额',
    unit: '元'
  },
  rate: {
    type: 'unit',
    name: '费率',
    unit: '%'
  },
  sumPremium: {
    type: 'unit',
    name: '保费',
    unit: '元'
  },
  flag: '标志',
  remark: '备注'
};

export const SubjectPolicyEmployeeDetail = {
  businessNo: '流水号',
  businessAddress: '营业处所地址',
  businessLicenceNumber: '营业执照号码',
  contact: '联系人',
  contactAddress: '联系人地址',
  contactNumber: '联系人号码',
  employeesNumber: {
    type: 'unit',
    name: '雇员人数',
    unit: '人',
    extra: true
  }
};

export const SubjectDetail = {
  ...SubjectBaseDetail,
  ...SubjectCargoDetail,
  ...SubjectLiabilityDetail,
  ...SubjectPolicyEmployeeDetail
};

// 被保险人信息
export const RecognizeeDetail = {
  insuredType: {
    type: 'enum',
    name: '被保险人类型',
    data: 'customType'
  },
  appliIdentity: {
    type: 'enum',
    name: '与投保人关系',
    data: 'relationType'
  },
  insuredName: '被保险人姓名',
  identifyType: {
    type: 'enum',
    name: '证件类型',
    data: 'identityType'
  },
  identifyNumber: '证件号码',
  sex: {
    type: 'enum',
    name: '性别',
    data: 'gender'
  },
  birthday: '出生日期',
  mobile: '电话号码',
  email: '电子邮箱',
  postAddress: '通讯地址',
  occupationCode: '个人职业代码',
  occupationGrade: '个人职业风险等级',

  health: '个人健康状况',
  linkerName: '企业联系人名称'
};

export const FavoreeDetail = {
  benefitName: '受益人姓名',
  identifyType: {
    type: 'enum',
    name: '证件类型',
    data: 'identityType'
  },
  identifyNumber: '证件号码',
  sex: {
    type: 'enum',
    name: '性别',
    data: 'gender'
  },
  birthday: '出生日期',
  mobile: '电话号码',
  email: '电子邮箱',
  postAddress: '通讯地址',
  insuredIdentity: {
    type: 'enum',
    name: '与被保险人关系',
    data: 'relationType'
  },
  benefitFlag: '收益顺序',
  benefitRate: '收益份额'
};

export const RiskTypeDetail = {
  kindType: {
    type: 'enum',
    name: '险别类型',
    data: 'riskTypeCategory'
  },
  typeCode: '险别代码',
  typeName: '险别名称',
  itemNo: '标的序号',
  startDate: '起保时间',
  endDate: '终保时间',
  unitAmount: {
    type: 'unit',
    name: '单位保险金额',
    unit: '元'
  },
  unit: '份数',
  amount: {
    type: 'unit',
    name: '保险金额',
    unit: '元'
  },
  rate: {
    type: 'unit',
    name: '费率',
    unit: '%'
  },
  shortRate: {
    type: 'unit',
    name: '短期费率',
    unit: '%'
  },
  premium: {
    type: 'unit',
    name: '含税保费',
    unit: '元'
  },
  noTaxPremium: {
    type: 'unit',
    name: '不含税保费',
    unit: '元'
  },
  tax: {
    type: 'unit',
    name: '税额',
    unit: '元'
  },
  deductibleRate: {
    type: 'unit',
    name: '免赔率',
    unit: '%'
  },
  deductible: {
    type: 'unit',
    name: '免赔额',
    unit: '元'
  },
  currency: '币别'
};

export const AppliDetail = {
  appliType: {
    type: 'enum',
    name: '投保人类型',
    data: 'customType'
  },
  insuredIdentity: {
    type: 'enum',
    name: '与被保险人关系',
    data: 'relationType'
  },
  appliName: '姓名',
  sex: {
    type: 'enum',
    name: '性别',
    data: 'gender'
  },
  birthday: '出生日期',
  identifyType: {
    type: 'enum',
    name: '证件类型',
    data: 'identityType'
  },
  identifyNumber: '证件号码',

  mobile: '电话号码',
  email: '电子邮箱',
  postAddress: '通讯地址',
  occupationCode: '个人职业代码',
  linkerName: '企业联系人名称'
};

export const PayDetail = {
  payFlag: {
    type: 'enum',
    name: '缴费状态',
    data: 'payStatus'
  },
  bank: '开户银行',
  account: '银行账号',
  payType: {
    type: 'enum',
    name: '缴费方式',
    data: 'payMethod'
  },
  payTimes: {
    type: 'unit',
    name: '缴费期次',
    unit: '次'
  },
  payMode: {
    type: 'enum',
    name: '缴费类型',
    data: 'payType'
  },
  policyPaymentInfoDTO: {
    name: '缴费计划',
    extra: true
  }
};

export const FeeDetail = {
  AgencyFee: {
    type: 'unit',
    name: '经纪费费用总额',
    unit: '元'
  },
  ChannelFee: {
    type: 'unit',
    name: '渠道费用总额',
    unit: '元'
  }
};

export const ClauseDetail = {
  clauseCode: '特约编码',
  clausesTitle: '特约标题',
  clauses: '特约内容'
};

export const PolicyDetail = {
  base: {
    name: '基本信息',
    detail: BaseDetail,
    dataStr: 'baseDetail'
  },
  subject: {
    name: '标的信息',
    detail: SubjectDetail,
    dataStr: 'subjectDetail'
  },
  riskType: {
    name: '险别信息',
    detail: RiskTypeDetail,
    dataStr: 'riskTypeDetail'
  },
  appli: {
    name: '投保人信息',
    detail: AppliDetail,
    dataStr: 'appliDetail'
  },
  recognizee: {
    name: '被保险人信息',
    detail: RecognizeeDetail,
    dataStr: 'recognizeeDetail'
  },
  favoree: {
    name: '受益人信息',
    detail: FavoreeDetail,
    dataStr: 'favoreeDetail'
  },

  pay: {
    name: '缴费信息',
    detail: PayDetail,
    dataStr: 'payDetail'
  },
  fee: {
    name: '费用信息',
    detail: FeeDetail,
    dataStr: 'feeDetail'
  },
  clause: {
    name: '特别约定',
    detail: ClauseDetail,
    dataStr: 'clauseDetail'
  }
};

export interface PolicyDetailItem {
  name: string;
  detail: any;
  dataStr: string;
}
