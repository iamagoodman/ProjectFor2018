import * as React from 'react';
import { Route } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import Auth403 from '@/components/auth/auth403';
import AuthTip from '@/components/auth/authTip';

interface Props {
  code: string;
  path: string;
  exact?: boolean;
  component: React.LazyExoticComponent<any>;
  title: string;
}

export default function AuthTipRoute({ path, component, code, title, ...props }: Props) {
  const isAuth = admin || findIndex(routePermissions, (permission: string) => permission === code) > -1;

  return isAuth ? (
    isPC ? (
      <Route exact component={component} {...props} />
    ) : (
      <Route exact render={() => <AuthTip title={title} />} />
    )
  ) : isPC ? (
    <Route exact component={Auth403} {...props} />
  ) : (
    <Route exact render={() => <AuthTip title={title} tip='你没权限访问该页面' />} />
  );
}
