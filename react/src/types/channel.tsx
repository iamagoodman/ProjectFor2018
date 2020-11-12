import { DefaultTable, Page, QueryParams } from './app';

export interface ChannelFormData {
  channelNo?: string;
  channelName?: string;
  channelStatus?: string;
  productNo?: string;
  parentId?: number;
}

export interface Channel {
  id?: number;
  channelNo?: string;
  channelName?: string;
  channelStatus?: string | number;
  channelSec?: string;
  remark?: string;
  parentId?: number;
  pageSize?: number;
  current?: number;
}

export interface ChannelItem {
  id?: number;
  channelNo?: string;
  channelName?: string;
  channelStatus?: string | number;
  channelSec?: string;
  parentId?: number;
  subChannels?: ChannelItem[];
  remark?: string;
  pageSize?: number;
  current?: number;
  totalCount?: number;
}

export interface SubChannel extends DefaultTable<ChannelItem> {
  parentId: number;
}

export interface SubChannelPage extends Page {
  parentId: number;
}

export interface ChannelQueryParams extends QueryParams<ChannelFormData> {
  subPageSize?: number;
  subPageNumber?: number;
}
