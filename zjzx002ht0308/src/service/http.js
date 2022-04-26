import axios from 'axios'
import { Toast } from 'vant'
// import store from '@/store';
import { ignoreLoadingUrl } from './url'
import { baseURL } from './baseUrl'
const Loading = {
  loadingNum: 0,
  toast: null,
  add() {
    if (this.loadingNum === 0) {
      // this.dispatch(true, type);
      this.toast = Toast.loading({ forbidClick: true, duration: 0 })
    }
    this.loadingNum++
  },
  remove() {
    this.loadingNum = this.loadingNum - 1
    if (this.loadingNum <= 0) {
      this.loadingNum = 0
      // this.dispatch(false);
      this.toast?.clear()
    }
  },
  // dispatch(loading) {
  //     // store.commit('changeLoading', { loading });
  // }
}
const instance = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : `${window.getBaseQueryUrl()}/bxb-broker`,
  baseURL,
  timeout: 0,
  withCredentials: true,
  transformRequest: [
    function (data, headers) {
      if (data && typeof data === 'string') {
        headers['Content-Type'] = 'application/json'
        return data
      }
      return data && !(data instanceof FormData)
        ? Object.keys(data)
            .filter((item) => data[item] !== undefined)
            .map((item) => `${item}=${encodeURIComponent(data[item])}`)
            .join('&')
        : data
    },
  ],
})
instance.interceptors.request.use(
  (config) => {
    if (!ignoreLoadingUrl.includes(config.url)) {
      Loading.add(config.method && config.method.toUpperCase())
    }
    return config
  },
  (err) => Promise.reject(err),
)

instance.interceptors.response.use(
  (response) => {
    if (!ignoreLoadingUrl.includes(response.config.url)) {
      Loading.remove()
    }
    return response
  },
  (error) => {
    Loading.remove()
    return Promise.reject(error)
  },
)

const getFn = instance.get

instance.get = (url, data = {}, config = {}) => {
  config.params = data
  return getFn(url, config)
}

export default instance
