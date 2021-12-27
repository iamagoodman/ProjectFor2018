import http from './http';
import { ServerItem } from '@/types';
export const User = {
  login: {
    url: '/user/login',
    method: 'post'
  },
  register: {
    url: '/user/register',
    method: 'post'
  }
};


export const Server = function (url: ServerItem, data: any) {
  return http[url.method](url.url, url.renderData ? url.renderData(data) : data);
};

// export default {
//   user,
//   server
// };