import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, UserFormData, User } from '@/types';

export function fetchUserList({
  data,
  pageSize: size,
  pageNumber: page,
}: QueryParams<UserFormData>) {
  return from(
    fetch.get(url.user.list, {
      ...data,
      page,
      size,
    }),
  );
}

export function fetchBindUserChannel(data: User) {
  return from(fetch.post(url.user.bindChannel, { ...data }));
}

export function fetchUserLogin(data: User) {
  return from(fetch.post(url.user.login, { ...data }));
}

export function fetchUserLogout() {
  return from(fetch.post(url.user.logout));
}

export function fetchUserInfo() {
  return from(
    fetch.get(url.user.info).then((res: any) => {
      if (!res.data.data) {
        return Promise.reject({
          message: res.data.message,
          reasonCode: res.data.reasonCode,
        });
      }
      return res;
    }),
  );
}
