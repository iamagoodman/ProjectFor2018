declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
  __FEDUX_DEVTOOLS_EXTENSION__: <R>(a: R) => R;
  ueEditor: any;
  Prel: any;
  __webpack_public_path__: string;
  permissions: string[];
  routePermissions: string[];
  btnPermissions: string[];
  menus: any[];
  menuPermissions: string[];
  admin: boolean;
  loginUser: any;
  appName: string;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';

declare var asgardTree: any;

declare var isIframe: boolean;

declare var __webpack_public_path__: string;

declare var prefixDomain: string;

declare var permissions: string[];
declare var routePermissions: string[];
declare var btnPermissions: string[];
declare var menus: any[];
declare var menuPermissions: string[];

declare var admin: boolean;
declare var loginId: string;
declare var loginUserInfo: any;
declare var loginUser: any;

declare var isPC: boolean;
declare var env: string;
declare var appName: string;
