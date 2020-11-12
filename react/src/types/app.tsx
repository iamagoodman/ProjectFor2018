import { ActionType } from 'typesafe-actions';
import * as actions from '@/stores/actions';
import { FormComponentProps } from 'antd/lib/form';
import { Channel } from './channel';

export type Action = ActionType<typeof actions>;

export interface ActionAny {
  type: string;
  payload?: any;
}

export interface FormDefaultData {
  partnerCode?: string;
}

export interface SubmitFormDefaultProps<T = QueryParams> extends FormComponentProps {
  onSubmit: (params: T) => void;
}

// state
export interface Page {
  pageSize?: number;
  totalCount?: number;
  current?: number;
}

export interface QueryPage {
  pageNumber?: number;
  pageSize?: number;
}

// form http request
export interface QueryParams<T = FormDefaultData> extends QueryPage {
  data?: T;
}

// table http response
export interface List<T, D = FormDefaultData> extends QueryParams<D> {
  totalCount: number;
  list: T[];
}

// table component
export interface RList<T, Q = QueryParams> extends Page {
  list: T[];
  onChange: (params: Q) => void;
}

// table state
export interface DefaultTable<T, F = FormDefaultData> {
  list: T[];
  page: Page;
  formData?: F;
}

// http response
export interface ResponseOk<T = any> {
  data: T;
  message?: string;
  totalCount?: number;
}

export interface BackItem {
  name: string;
  displayName: string;
  onBack?: () => void;
}

export interface Group {
  group: string;
  groupListName: string;
}

export interface DictGroup {
  group: string;
  dict: Dict[];
}
export interface Dict {
  dName: string;
  name: string;
}

export interface DictObj<T = string> {
  [field: string]: T;
}

export interface DictAll {
  group: string;
  groupName: string;
  id: string;
  value: any;
}
/** */

export interface Message {
  message: string;
}
export interface ErrorInfo extends Error, Message {}

export interface KindItem {
  kindCode?: string;
  kindName?: string;
  kindType?: string;
  id?: string;
}

export interface Asgard {
  code: string;
  name: string;
  url: string;
  resourceBos: Asgard[];
}

export interface SetKey<T = any> {
  key?: string;
  show: string;
  data?: T;
}

export interface DetailRequest {
  id: number;
  show: string;
  channelNo?: string;
  productNo?: string;
}

export interface DetailResponse<D> {
  show: string;
  data: D;
}

export interface Permissions {
  permissions: string[];
  menuPermissions: string[];
  btnPermissions: string[];
  routePermissions: string[];
  menus: MenuItem[];
}

export interface MenuItem {
  key: string;
  code: string;
  url: string;
  name: string;
  isRefresh?: boolean;
  children: MenuItem[];
}

export interface SetVisibleData {
  visible: boolean;
  type: string;
}

export interface PlanTypesItem {
  planPremium: number;
  planName: string;
  planCode: string;
  riskTypes: RiskTypesItem[];
}

export interface RiskTypesItem {
  riskName: string;
  riskSumAmount: number;
  riskType: string;
  riskCode: string;
}

export interface LabelInValue<T = string> {
  key: T;
  label: string;
}

export interface ChannelInfo {
  channelSec: string;
  channelNo: string;
}

export interface RouteItem {
  key: string;
  code: string;
  path: string;
  component: React.LazyExoticComponent<any>;
  auth?: boolean;
  tip?: boolean;
  title?: string;
}

export interface ChannelGroup {
  [field: string]: ChannelGroupItem;
}
export interface ChannelGroupItem extends Channel {
  children: Channel[];
}
