const api = {
  captcha: {
    url: '/sms/send/v2',
    method: 'post',
  },
  receive: {
    url: '/sms/verify/v2',
    method: 'post',
  },
  activate: {
    url: '/tk/insure/gift/v1',
    method: 'post',
  },
  track: {
    url: `${window.getBaseQueryUrl()}/openapi/traceEvent`,
    method: 'post',
    showLoading: false,
  },
  forward: {
    url: '/common/relation',
    method: 'get',
  },
  save: {
    url: '/stalker/save',
    method: 'post',
    showLoading: false,
  },
}

export default api

export const ignoreLoadingUrl = Object.keys(api)
  .filter((item) => api[item].showLoading === false)
  .map((item) => api[item].url)
