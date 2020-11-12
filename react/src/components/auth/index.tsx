import * as React from 'react';
import Auth403 from './auth403';
import Auth404 from './auth404';

export default function auth(code: number) {
  return function(
    WrapperComponent:
      | React.ComponentClass
      | React.FunctionComponent
      | React.LazyExoticComponent<any>,
  ) {
    let isAuth = true;
    if (process.env.NODE_ENV === 'production') {
      const origin = window.location.origin;
      const originRe = /^https?:\/\/portal[a-z-]*\.tongbb\.net(:\d{4})?\/?$/;
      if (originRe.test(origin)) {
        isAuth = false;
      }
    }

    return class extends React.Component {
      render() {
        return isAuth ? (
          <WrapperComponent {...this.props} />
        ) : code === 404 ? (
          <Auth404 />
        ) : code === 403 ? (
          <Auth403 />
        ) : null;
      }
    };
  };
}
