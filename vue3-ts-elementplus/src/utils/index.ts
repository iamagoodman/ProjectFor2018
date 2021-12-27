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
  location.href = location.origin;
}

export function isNotEmpty(str?: string | number): boolean {
  return str !== undefined && str !== null && !/^[\s\n]*$/g.test(String(str));
}