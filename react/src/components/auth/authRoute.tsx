import * as React from 'react';
import { Route } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import Auth403 from '@/components/auth/auth403';

interface Props {
  code: string;
  path: string;
  exact?: boolean;
  component: React.LazyExoticComponent<any>;
}

export default function AuthRoute({ path, component, code, ...props }: Props) {
  const isAuth =
    admin || findIndex(routePermissions, (permission: string) => permission === code) > -1;

  return isAuth ? (
    <Route exact component={component} {...props} />
  ) : (
    <Route exact component={Auth403} {...props} />
  );
}
