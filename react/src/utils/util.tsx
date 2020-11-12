import { createBrowserHistory } from 'history';
import { OptionProps } from 'antd/lib/select';
import * as moment from 'moment';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { Dict, DictObj, Permissions, ChannelGroup, Channel } from '@/types';
import uuidv4 from 'uuid/v4';
import { AUTH_DOMAIN, API_DOMAIN } from '@/constans';

interface Domain {
  [field: string]: string;
}

function getDomain(env: string): (domain: Domain) => string {
  return function(DOMAIN: Domain): string {
    return DOMAIN[env] || DOMAIN.default;
  };
}

const domain: (data: Domain) => string = getDomain(env);

export const authDomain = domain(AUTH_DOMAIN);

export const apiDomain = domain(API_DOMAIN);

export const history = createBrowserHistory();

export const filterOption = (input: string, option: React.ReactElement<OptionProps>) =>
  (option.props.children &&
    String(option.props.children)
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0) ||
  (option.props.value &&
    String(option.props.value)
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0);

export function isTrue(str: string | undefined | null, reg: RegExp): boolean {
  return str !== undefined && str !== null && reg.test(str);
}

export function isNotEmpty(str?: string | number): boolean {
  return str !== undefined && str !== null && !/^[\s\n]*$/g.test(String(str));
}

export function isFloat(str?: string): boolean {
  return str !== undefined && str !== null && /^\d+(\.\d+)?$/.test(str);
}

export function isNumber(str?: string): boolean {
  return str !== undefined && /^\d*$/g.test(str);
}

export function isMobile(str?: string): boolean {
  return str !== undefined && /^1[3-9]\d{9}$/.test(str);
}

export function isExist(arg?: any): boolean {
  return arg;
}

export function compareThan(numberA: number | string = 0, numberB: number | string = 0): number {
  if (typeof numberA === 'string') {
    numberA = parseInt(numberA, 10);
  }
  if (typeof numberB === 'string') {
    numberB = parseInt(numberB, 10);
  }
  return numberA - numberB;
}

export function disabledDate(current: moment.Moment | undefined) {
  return (
    (current &&
      (current >
        moment()
          .subtract(1, 'day')
          .endOf('day') ||
        current <
          moment()
            .subtract(32, 'day')
            .endOf('day'))) ||
    false
  );
}

export function parseDate(date: RangePickerValue, format: string = 'YYYY-MM-DD HH:mm:ss') {
  const data: { beginTime?: string; endTime?: string } = {};
  if (date && date[0]) {
    // data.beginTime = date[0].valueOf();
    data.beginTime = date[0].format(format).valueOf();
  }
  if (date && date[1]) {
    // data.endTime = date[1].valueOf();
    data.endTime = date[1].format(format).valueOf();
  }

  return data;
}

export function parseStrToArray<T>(data: string | T[] = ''): T[] {
  return data ? (typeof data === 'string' ? JSON.parse(data) : data) : [];
}

export function trim(str: string | undefined) {
  return str && str.replace(/^\s*|\s*$/g, '');
}

export function arrayToObject(arr: Dict[] = []) {
  const obj: DictObj = {};
  for (const d of arr) {
    obj[d.name] = d.dName;
  }

  return obj;
}

export function generateUniqueId<T = any[]>(data: T[] = []) {
  const newData = data.map((item: T) => ({
    ...item,
    uniqueId: uuidv4()
  }));
  return newData;
}

export function underlineToHump(str: string) {
  return str
    .replace(/_([a-z])/g, function($0, $1) {
      return $1.toUpperCase();
    })
    .replace(/^([a-z])/, function($0, $1) {
      return $1.toUpperCase();
    });
}

export function getPayloadData<T>(data: T | undefined, defaultData: T | undefined) {
  return data ? { ...data } : { ...defaultData };
}

export function getValidData<T>(data: T) {
  return data !== undefined && data !== null ? data : '';
}

export function getPermission(code: string, arr: any[] = []) {
  return findIndex(arr, item => item.code === code) > -1;
}

export function isType(obj: any) {
  return function(type: string) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
}

export function getDname(name: string = '', arr: Dict[] = []) {
  const dict = find(arr, item => item.name === name);
  return dict ? dict.dName || name : name;
}

export function getPermissions(
  resources: any[] = [],
  { permissions = [], menuPermissions = [], btnPermissions = [], routePermissions = [], menus = [] }: Permissions = {
    permissions: [],
    menuPermissions: [],
    btnPermissions: [],
    routePermissions: [],
    menus: []
  },
  flag = true
): Permissions {
  for (const item of resources) {
    permissions.push(item.code);
    if (item.menu && item.resourceBos && item.resourceBos.length) {
      menuPermissions.push(item.code);
      routePermissions.push(item.code);
      const url = item.url.split('/').slice(3);
      menus.push({
        key: url.join(''),
        code: item.code,
        url: '/' + url.join('/'),
        name: item.name,
        children: [],
        isRefresh:
          item.code === 'order_collect' ||
          item.code === 'order_query' ||
          item.code === 'order_market_query' ||
          item.code === 'agent_manage' ||
          item.code === 'order_qzcollect'
      });
    } else {
      if (item.resourceBos && item.resourceBos.length > 0) {
        routePermissions.push(item.code);
      }
      btnPermissions.push(item.code);
    }
    if (item.resourceBos && item.resourceBos.length > 0) {
      const len = menus.length - 1;
      getPermissions(
        item.resourceBos,
        {
          permissions,
          menuPermissions,
          btnPermissions,
          routePermissions,
          menus: len >= 0 ? menus[len].children : []
        },
        false
      );
    }
  }
  return { permissions, menuPermissions, btnPermissions, routePermissions, menus };
}

export function getValueFromKey<T = { [field: string]: string }>(key: string | number | undefined | null, obj: T) {
  return key !== undefined && key !== null ? obj[key] || key : key;
}

export function numberToMoney(num: number = 0) {
  const numberToStr = typeof num === 'number' ? num.toFixed(2) + '' : typeof num === 'string' ? num : '';

  const str = numberToStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return str;
}

export function channelListToGroup(list: Channel[]): ChannelGroup | {} {
  const data: ChannelGroup | {} = {};
  list.forEach((item: Channel) => {
    if (item.parentId === 0) {
      // 一级渠道
      if (!data[item.id]) {
        data[item.id] = {
          ...item,
          children: [
            {
              ...item
            }
          ]
        };
      } else {
        data[item.id].children.push({ ...item });
      }
    } else if (item.parentId !== 0) {
      // 子渠道
      if (data[item.parentId]) {
        data[item.parentId].children.push({
          ...item
        });
      } else {
        data[item.parentId] = {
          ...item,
          children: [
            {
              ...item
            }
          ]
        };
      }
    }
  });
  return data;
}
