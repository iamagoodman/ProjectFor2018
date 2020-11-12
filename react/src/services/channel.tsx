import fetch from './http';
import { from } from 'rxjs';
import url from './url';
import { QueryParams, ChannelFormData, Channel } from '@/types';

export function fetchChannelList({ data, pageSize: size, pageNumber: page }: QueryParams<ChannelFormData>) {
  return from(
    fetch.get(url.channel.list, {
      ...data,
      parentId: 0,
      size,
      page
    })
  );
}

export function fetchChannelDetail(id: number) {
  return from(fetch.get(url.channel.detail, { id }));
}

export function fetchChannelAddOrModify(data: Channel) {
  const id = data.id;
  return from(fetch[!id ? 'post' : 'put'](`${url.channel[id ? 'modify' : 'add']}`, data));
}

export function fetchChannelAdd(data: Channel) {
  return from(fetch.post(url.channel.add, data));
}

export function fetchChannelModify(data: Channel) {
  return from(fetch.post(url.channel.modify, data));
}

export function fetchChannelUpdateSecretKey(id: number) {
  return from(fetch.put(url.channel.updateSec, { id }));
}

export function fetchChannelUpdateStatus(data: Channel) {
  return from(fetch.put(url.channel.updateStatus, data));
}

export function fetchSubChannelList(data: ChannelFormData) {
  return from(
    fetch.get(url.channel.subChannel, data).then((res: any) => {
      if (res.data.totalCount === 0) {
        return Promise.reject({ message: '该渠道下面无子渠道' });
      } else {
        return res;
      }
    })
  );
}
