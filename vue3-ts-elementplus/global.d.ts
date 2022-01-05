declare module '*.svg' {
  interface Svg {
    content: string;
    id: string;
    viewBox: string;
    node: any;
  }
  const svg: Svg;
  export default svg;
}

declare module '*.png' {
  const png: string;
  export default png;
}

declare module '*.mp3' {
  const mp3: string;
  export default mp3;
}

declare module '*.gif' {
  const png: string;
  export default png;
}

declare module '*.ts' {
  const ts: string;
  export default ts;
}

interface MyWindow extends Window {
  clipboardData: any;
}

declare var window: MyWindow;

export { };