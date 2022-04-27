export const STORAGE_KEY = {
    SEARCH: '__search__',
    MOBILE: '__mobile__',
    DATA: '__data__',
    POLICY: 'prePolicyData',
    COUNT: '__count__'
};

export const FEE = {
  "18~20": { amount: 600, premium: 0.24 },
  "21~25": { amount: 600, premium: 0.34 },
  "26~30": { amount: 600, premium: 0.53 },
  "31~35": { amount: 600, premium: 0.91 },
  "36~40": { amount: 600, premium: 1.57 },
  "41~45": { amount: 600, premium: 2.62 },
  "46~50": { amount: 600, premium: 3.89 },
  "51~55": { amount: 600, premium: 5.56 },
  "56~60": { amount: 600, premium: 8.2 }
};

export const EVENT_KEYS = {
  freePage: {
    action: 'pageload',
    key: 'freePage',
    desc: '赠险页面加载'
  },
  mobile: {
    action: 'click',
    key: 'mobile',
    desc: '手机号录入'
  },
  captcha: {
    action: 'click',
    key: 'captcha',
    desc: '验证码录入'
  },
  applicantName: {
    action: 'click',
    key: 'applicantName',
    desc: '投保人姓名录入'
  },
  applicantId: {
    action: 'click',
    key: 'applicantId',
    desc: '投保人身份证号录入'
  },
  activationGuarantee: {
    action: 'click',
    key: 'activationGuarantee',
    desc: '立即投保按钮点击'
  }
};
