/////////////////////////////////////////////////////////////////////////

//日期格式化
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

//对称加密
function desEncrypt (message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString()
}

function uuid () {
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

//获取URL参数
function getParam (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return false;
}

//申请数据
function apply (posturl, utmCampaign, utmSource, utmMedium, name, idNo, phone) {
  //alert(utmSource);
  var secretKey = CryptoJS.MD5(CryptoJS.MD5(utmSource).toString()).toString();
  var desKey = CryptoJS.MD5(secretKey).toString();
  //alert(name);
  // name=escape("小板牙").replace(/%/g, '\\');//unicode转换
  var name_DES = desEncrypt(name, desKey);//SMkOaZyVnc5Y7g4gaSwntA==
  var idNo_DES = desEncrypt(idNo, desKey);//dQbyC5i+PhvlQJa/zsER7x149JSwjKoY
  var phone_DES = desEncrypt(phone, desKey);//Ay1kDe5HGvGTyxOWsWiMGw==

  var dataInput = {
    "head": {
      "partnerId": utmSource,
      "secretKey": secretKey,
      "utmCampaign": utmCampaign,//getParam("utm_campaign");
      "utmSource": utmSource,//getParam("utm_source");
      "utmMedium": utmMedium,//getParam("utm_medium");
      "timestamp": new Date().format("yyyyMMddhhmmss.S"),
      "serviceName": "apply",
      "format": "JSON",
      "charset": "UTF-8",
      "version": "1.0.0"
    },
    "body": {
      "seqNO": uuid(),
      "idNo": idNo_DES,
      "name": name_DES,
      "phone": phone_DES
    }
  };
  $.ajax({
    type: "POST",
    url: posturl,
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(dataInput),
    dataType: "json",
    success: function (message) {
      console.log("apply-success:\n" + message);
    },
    error: function (message) {
      console.log("apply-error:\n" + message);
    }
  });
}

//事件追踪
function traceEvent (reporturl, cookie, action, event_name, event_value = '', event_desc = '',
  url = window.location.href, event_order = 1) {
  var envent = {
    "cookie": cookie,
    "action": action,
    "event_name": event_name,
    "event_value": event_value,
    "event_order": event_order,
    "event_desc": event_desc,
    "url": url
  }
  $.ajax({
    type: "POST",
    url: reporturl,
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(envent),
    dataType: "json",
    success: function (message) {
      console.log("traceEvent-success:\n" + message);
    },
    error: function (message) {
      console.log("traceEvent-error:\n" + message);
    }
  });

}

//申请数据
var utmSource = 'laolai'; //getParam("utm_source");
var utmCampaign = 'camp001';//getParam("utm_campaign");
var utmMedium = '01';// getParam("utm_medium");
var uname = "小板牙";
var idNo = '210111198802020101';
var phone = '13577665544';
var posturl = '/openapi/channel/apply';

function pageload () {
  if (!$.cookie('uuid')) {
    $.cookie('uuid', uuid(), { expires: 365, path: '/' });
  }
  var campaign = getParam("utm_campaign");
  var source = getParam("utm_source");
  var medium = getParam("utm_medium");
  console.log("juchutil-campaign:\n" + campaign);
  console.log("juchutil-source:\n" + source);
  console.log("juchutil-medium:\n" + medium);
  if (source && campaign && medium) {
    $.cookie('utm_source', source, { expires: 1 });
    $.cookie('utm_campaign', campaign, { expires: 1 });
    $.cookie('utm_medium', medium, { expires: 1 });
    console.log("juchutil-cookiename:\n" + campaign + '-' + source + '-' + medium + '-times');
    if (!$.cookie(campaign + '-' + source + '-' + medium + '-times')) {
      $.cookie(campaign + '-' + source + '-' + medium + '-times', 0, { expires: 1 });
    }
  }
  //traceEvent(reporturl,cookie, action, event_name, event_value, event_desc, url);
  //traceEvent(reporturl, $.cookie('uuid'), 'pageload', 'pageload','','',url);
  traceEvent('/jc/openapi/traceEvent', $.cookie('uuid'), 'pageload', 'pageload');
}

pageload();