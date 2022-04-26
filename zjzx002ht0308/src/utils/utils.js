import dayjs from 'dayjs';

export const getFeeKey = (age, feeMap) => {
  const currentKey = Object.keys(feeMap).filter((key) => {
    const arr = key.split('~');
    return age >= arr[0] && age <= arr[1];
  });
  return currentKey[0];
};

export function getFee (age, data) {
  const key = getFeeKey(age, data);
  return data[key];
}

export const getPaymentListYear = (planFee) => {
  const current = dayjs().format('YYYY-MM-DD');
  return [
    {
      payNo: 1,
      planFee,
      planStartDate: current + ' 00:00:00',
      planEndDate: current + ' 23:59:59'
    }
  ];
};

export const INIT_ITEM_INFO = {
  name: undefined,
  idNumber: undefined,
  mobile: undefined,
  birthday: undefined,
  gender: undefined, // 1 -> 男性， 2 -> 女性
  age: -1
};

export const INIT_INSUREDS_INFO = {
  Self: { ...INIT_ITEM_INFO },
  Mate: { ...INIT_ITEM_INFO },
  Parent: { ...INIT_ITEM_INFO },
  Child: { ...INIT_ITEM_INFO }
};

export function getItem () {
  const insure_info = localStorage.getItem('__INSURE_INFO__');
  return insure_info
    ? JSON.parse(insure_info)
    : {
      appliIdentity: 'Self',
      insureds: { ...INIT_INSUREDS_INFO },
      socialSecurityType: 1,
      payMode: '',
      mobile: '',
      renewal: ''
    };
}

export function setItem (value) {
  const localData = getItem();
  const data = {
    ...localData,
    ...value
  };
  localStorage.setItem('__INSURE_INFO__', JSON.stringify(data));
}

export function setCookie (name, value, iDay) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
};
export function getCustomerIp () {
  return {
    cookie: getCookie('uuid'),
    ip: returnCitySN['cip']
  }
}
export function getCookie (name) {
  var arr = document.cookie.split('; ');
  const has = arr.filter(item => item.indexOf(name) > -1)[0];
  if (!has) {
    return '';
  }
  return has.split('=')[1];
};

export function removeCookie (name) {
  setCookie(name, 1, -1);
};

export function createUuid () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid.replace(/-/g, "");
}

export function parseLocationSearch (search) {
  var param = {};
  search.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
    param[v] = decodeURIComponent(k);
    return k + '=' + v;
  });
  return param;
}