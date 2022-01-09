import { v4 as uuidv4 } from 'uuid';
export function setTheme(color: string) {
  const el = document.documentElement;
  const base_color = '#ffffff';
  el.style.setProperty('--el-color-primary', color);
  for (let i = 1; i < 10; i++) {
    console.log(i);
    const ratio = (i * 10) / 100;
    const smallColor = colourBlend(base_color, color, ratio);
    el.style.setProperty(`--el-color-primary-light-${i}`, smallColor);
  }
}

export function colourBlend(c1: string, c2: string, ratio: number | string): string {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  const r1 = parseInt(c1.substring(1, 3), 16);
  const g1 = parseInt(c1.substring(3, 5), 16);
  const b1 = parseInt(c1.substring(5, 7), 16);
  const r2 = parseInt(c2.substring(1, 3), 16);
  const g2 = parseInt(c2.substring(3, 5), 16);
  const b2 = parseInt(c2.substring(5, 7), 16);
  let r: any = Math.round(r1 * (1 - ratio) + r2 * ratio);
  let g: any = Math.round(g1 * (1 - ratio) + g2 * ratio);
  let b: any = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ('0' + (r || 0).toString(16)).slice(-2);
  g = ('0' + (g || 0).toString(16)).slice(-2);
  b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}

export function gotoLogin() {
  location.href = location.origin + '/login';
}

export function isNotEmpty(str?: string | number): boolean {
  return str !== undefined && str !== null && !/^[\s\n]*$/g.test(String(str));
}

export function uuid() {
  return uuidv4();
}

export function createEmpty(type: string) {
  const emptyFolder = {
    name: '',
    baseUrl: '',
    uuid: uuid(),
    level: 2
  };
  const emptyRequest = {
    name: '',
    level: 3,
    uuid: uuid(),
    methodUrl: {
      method: '',
      url: '',
    },
    request: {
      params: undefined,
      headers: undefined,
      body: { json: {} },
      bodyType: 'none',
    },
    response: {}
  };
  if (type === 'folder') {
    return emptyFolder;
  }
  return emptyRequest;

}

export function findByUuid(list: any[], target: any) {
  const current = list.filter(item => JSON.stringify(item).indexOf(target.uuid))[0];
  if (current.uuid === target.uuid) {
    return current;
  } else {
    return findByUuid(current.children, target);
  }
}

export function findParentByUuid(list: any[], target: any) {
  const current = list.filter(item => JSON.stringify(item).indexOf(target.uuid))[0];
  let parent = undefined;
  let index = undefined;
  // if (target.level === 1) {
  //   return { parent: current, index: 0 };
  // }
  current.children.forEach((item, index_) => {
    if (item.uuid === target.uuid) {
      parent = current;
      index = index_;
    }
  });
  if (parent) {
    return { parent, index };
  } else {
    return findParentByUuid(current.children, target);
  }
}