import axios from 'axios'
import {
  // parseLocationSearch, getLocationSearch,
  getCookie,
  setCookie,
  createUuid,
  parseLocationSearch,
} from './utils'
import CryptoJS from 'crypto-js'
import { EVENT_KEYS } from '@/constants'
import { trackURL } from '@/service/baseUrl'
export default function (event_key) {
  const event = EVENT_KEYS[event_key] || {}
  const url = window.location.href
  const event_order = 1
  if (!getCookie('uuid')) {
    setCookie('uuid', createUuid(), 365)
  }
  const cookie = getCookie('uuid')
  const { utm_campaign, utm_source, utm_medium } = parseLocationSearch(location.search || '?')
  const utmCampaign = utm_campaign
  const utmSource = utm_source
  const utmMedium = utm_medium
  const envent = {
    utmCampaign,
    utmSource,
    utmMedium,
    cookie: cookie,
    action: event.action,
    event_name: event.key,
    event_value: '',
    event_order: event_order,
    event_desc: event.desc,
    url: url,
  }
  return axios({
    method: 'post',
    url: `${trackURL}/openapi/traceEvent`,
    data: envent,
  })
}

export function desEncrypt(message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

//获取URL参数
export function getParam(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
export function applyData({ posturl = '/openapi/channel/apply', name, idNo, phone }) {
  const { utm_campaign, utm_source, utm_medium } = parseLocationSearch(location.search || '?')
  const utmCampaign = utm_campaign
  const utmSource = utm_source
  const utmMedium = utm_medium
  console.log('utmCampaign', utmCampaign, 'utmSource', utmSource, 'utmMedium', utmMedium)
  var secretKey = CryptoJS.MD5(CryptoJS.MD5(utmSource).toString()).toString()
  var desKey = CryptoJS.MD5(secretKey).toString()

  var name_DES = desEncrypt(name, desKey) //SMkOaZyVnc5Y7g4gaSwntA==
  var idNo_DES = desEncrypt(idNo, desKey) //dQbyC5i+PhvlQJa/zsER7x149JSwjKoY
  var phone_DES = desEncrypt(phone, desKey) //Ay1kDe5HGvGTyxOWsWiMGw==

  var dataInput = {
    head: {
      partnerId: utmSource,
      secretKey: secretKey,
      utmCampaign: utmCampaign, //getParam("utm_campaign");
      utmSource: utmSource, //getParam("utm_source");
      utmMedium: utmMedium, //getParam("utm_medium");
      timestamp: new Date().format('yyyyMMddhhmmss.S'),
      serviceName: 'apply',
      format: 'JSON',
      charset: 'UTF-8',
      version: '1.0.0',
    },
    body: {
      seqNO: createUuid(),
      idNo: idNo_DES,
      name: name_DES,
      phone: phone_DES,
    },
  }
  axios({
    method: 'post',
    url: posturl,
    data: dataInput,
  })
}
