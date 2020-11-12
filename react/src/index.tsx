import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import configureStore from '@/stores/configureStore';
import { history, getPermissions } from '@/utils/util';
import App from './app';
import './styles/index.less';

moment.locale('zh-cn');

const { permissions, menuPermissions, btnPermissions, routePermissions, menus } = getPermissions(
  asgardTree,
);

window.permissions = permissions;
window.menuPermissions = menuPermissions;
window.btnPermissions = btnPermissions;
window.routePermissions = routePermissions;
window.menus = menus;

if (process.env.NODE_ENV === 'production') {
  if (window.Prel) {
    __webpack_public_path__ = window.Prel.config['broker@web'].publicPath;
  }
}

export const store = configureStore();

const render = (Component: React.ComponentClass | React.FunctionComponent) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider locale={zhCN}>
          <Component />
        </LocaleProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app') as HTMLElement,
  );
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./app', () => {
    render(App);
  });
}
