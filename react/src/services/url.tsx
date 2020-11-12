import { apiDomain, authDomain } from '@/utils/util';

export default {
  app: {
    partner: '/partner/getPartners',
    dict: '/dict/get',
    dictAll: '/dict/getAll',
    company: '/insureCompany/likeQuery',
    product: '/productManagement/listAll',
    channel: '/baseChannelInfo/listChannelNOAndName',
    productByCompany: '/productManagement/productListByCompany',
    channelByProduct: '/baseChannelInfo/queryByProduceNo',
    datax: '/datax/list',
    companyGlobal: '/insureCompany/queryLike',
    productByLoginId: '/productManagement/getProductListByLoginId',
    planAndPolicyTypeByProduct: '/productManagement/getPlanTypesAndPolicyTypesById',
    getChannel: '/baseChannelInfo/getChannel'
  },

  channel: {
    list: '/baseChannelInfo/getByKeywords',
    detail: '/baseChannelInfo/getDetail',
    add: '/baseChannelInfo/insert',
    modify: '/baseChannelInfo/update',
    updateSec: '/baseChannelInfo/updateChannelSec',
    updateStatus: '/baseChannelInfo/updateChannelStatus',
    subChannel: '/baseChannelInfo/getByKeywords'
  },
  product: {
    list: '/productManagement/list',
    detail: '/productManagement/queryById',
    add: '/productManagement/add',
    modify: '/productManagement/update',
    updateStatus: '/productManagement/updateStatus',
    company: '/insureCompany/queryLike',
    h5: '/productManagement/queryHtmlById',
    updateh5: '/productManagement/updateHtml'
  },
  commission: {
    list: '/channelCommissionInfo/list',
    detail: '/channelCommissionInfo/getDetail',
    add: '/channelCommissionInfo/insert',
    modify: '/channelCommissionInfo/update'
  },
  policy: {
    list: '/policy/list',
    baseDetail: '/basePolicy/queryById',
    applyDetail: '/policy/getApplyDetail',
    favoreeDetail: '/policy/getFavoreeDetail',
    recognizeeDetail: '/policy/getRecognizeeDetail',
    payDetail: '/policy/getPayDetail',
    feeDetail: '/policy/getFeeDetial',
    clauseDetail: '/policy/getClauseInfo',
    subjectDetail: '/policy/getSubjectDetail',
    riskTypeDetail: '/policyType/queryByBusinessNo',
    payDetailList: '/policy/getPaymentDetail',
    employeeDetailList: '',
    // excelImport: {
    //     1: '/file/importExcelSettleAccounts',
    //     0: '/file/importExcel'
    // },
    // dataxImport: {
    //     1: '/file/importDataxSettleAccounts',
    //     0: '/file/importDatax'
    // },
    excelImport: '/file/importPolicyFromExcel',
    dataxImport: '/file/importPolicyFromDatax',
    qzImport: '/file/importPolicyFromQingzhu'
  },

  company: {
    list: '/insureCompany/queryList',
    add: '/insureCompany/save',
    modify: '/insureCompany/save',
    detail: '/insureCompany/queryById',
    delete: '/insureCompany/delete',
    listSecond: '/insureCompany/queryList',
    addSecond: '/insureCompany/save',
    modifySecond: '/insureCompany/save',
    detailSecond: '/insureCompany/queryById',
    deleteSecond: ''
  },
  payment: {
    list: '/policyCharge/queryPayList'
  },
  report: {
    list: '/policyCharge/query',
    queryCompany: '/insureCompany/queryCodeAndName'
  },
  datax: {
    list: '/datax/list'
  },
  user: {
    login: `${authDomain}/login?return=${location.origin}`,
    logout: `${authDomain}/logout?return=${location.origin}`,
    list: '/user/list',
    bindChannel: '/user/updateUser',
    info: '/user/currentUser'
  },
  ncVoucher: {
    list: '/ncVoucher/queryHistory',
    upload: '/ncVoucher/prepareAndUploadVoucher'
  },
  insure: {
    info: '/policy/getPolicyinfoByImportNo',
    import: `${apiDomain}/broker/travel.importExcel/v1`,
    policy: '/policy/pagingAppliAndRecogInfoByImportNo',
    insure: `${apiDomain}/broker/travel.batch/v1`
  },
  batchPolicy: {
    list: '/policy/querylist',
    summary: '/policy/summary',
    undoSummary: '/policy/undoSummary',
    detail: '/policy/getPolicyinfoDetailByBusinessNo',
    batchPay: `${apiDomain}/payment/wxpay.batchTrade/v1`,
    pay: `${apiDomain}/payment/wxpay.trade/v1`
  },
  policyMarket: {
    list: '/mkt/getPolicyInfo',
    import: '/mkt/policy.import/v1',
    product: '/mkt/getProductNameList'
  },
  intention: {
    list: '/insuranceIntention/list'
  }
};
