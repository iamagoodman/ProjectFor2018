import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import { gotoLogin, isNotEmpty } from '@/utils';
import paths from '@/utils/config';

const isEnv = process.env.NODE_ENV === 'development';

const Loading = {
  loadingNum: 0,
  add(type = 'GET'): void {
    if (this.loadingNum === 0) {
      this.dispatch(true, type);
    }
    this.loadingNum++;
  },
  remove(): void {
    this.loadingNum--;
    if (this.loadingNum <= 0) {
      this.loadingNum = 0;
      this.dispatch(false);
    }
  },
  dispatch(loading: boolean, type = 'GET'): void {
    const loadingInstance = ElLoading.service();
    if (!loading) {
      loadingInstance.close();
    }
  }
};

// interface AxiosInstance {
//   (config: AxiosRequestConfig): AxiosPromise;
//   (url: string, config?: AxiosRequestConfig): AxiosPromise;
//   defaults: AxiosRequestConfig;
//   interceptors: {
//     request: AxiosInterceptorManager<AxiosRequestConfig>;
//     response: AxiosInterceptorManager<AxiosResponse>;
//   };
//   request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
//   get<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
//   delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
//   head(url: string, config?: AxiosRequestConfig): AxiosPromise;
//   post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
//   put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
//   patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
// }

// const instance: AxiosInstance = axios.create({
const instance: any = axios.create({
  baseURL: isEnv ? paths.baseEnvUrl : paths.baseUrl,
  timeout: 0,
  // withCredentials: true,
  xsrfCookieName: '',
  transformRequest: [
    function (data) {
      if (data && typeof data === 'string') {
        return data;
      }
      return data && !(data instanceof FormData)
        ? Object.keys(data)
          .filter((item: string) => data[item] !== undefined)
          .map((item: string) => `${item}=${encodeURIComponent(data[item])}`)
          .join('&')
        : data;
    }
  ]
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authorization = sessionStorage.getItem('authorization') || 'fdsafdsafsdafsda';
    config.headers['authorization'] = authorization;
    if (
      !(
        (config.params && (config.params as any).showLoading === false) ||
        (config.data && (config.data as any).showLoading === false)
      )
    ) {
      Loading.add(config.method && config.method.toUpperCase());
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === '10100') { // 用户未登录
      gotoLogin();
    }
    if (
      !(
        (response.config.params && (response.config.params as any).showLoading === false) ||
        (response.config.data && (response.config.data as any).showLoading === false)
      )
    ) {
      Loading.remove();
    }
    if (response?.config?.params?._redirect) {
      return { success: true, ...response.data };
    }
    const successCode = [200, 10200, '200', '10200'];
    if (successCode.indexOf(response.data.code) === -1) {
      return Promise.reject({ success: false, message: response.data.message || response.data.code });
    }
    return { success: true, ...response.data };
  },
  (error: any) => {
    Loading.remove();
    return Promise.reject(error);
  }
);

const getFn = instance.get;
instance.get = function (url: string, data: any = {}, config: AxiosRequestConfig = {}): AxiosPromise {
  const newData = {};
  for (const d in data) {
    if (isNotEmpty(data[d])) {
      newData[d] = data[d];
    }
  }
  config.params = newData;
  return getFn(url, config);
};

const postFn = instance.post;
instance.post = function (url: string, data: any = {}, config: AxiosRequestConfig = {}): AxiosPromise {
  if (data.dataType === 'formData') {
    const formData = new FormData();
    for (const key in data) {
      if (key !== 'dataType' && data[key] !== undefined && data[key] !== null) {
        if (data[key] instanceof Array) {
          for (const k of data[key]) {
            if (k instanceof Object) {
              formData.append(key, k);
              continue;
            } else {
              formData.append(key, data[key]);
              break;
            }
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    return postFn(url, formData, config);
  } else if (data.dataType === 'json') {
    config.headers = {
      'Content-Type': 'application/json'
    };
    return postFn(url, JSON.stringify(data), config);
  }
  return postFn(url, data, config);
};

export default instance;
