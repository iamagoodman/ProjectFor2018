import * as React from 'react';
import findIndex from 'lodash/findIndex';

interface Props {
  code: string;
  children: any;
}

export default function AuthSwitch({ code, children }: Props) {
  return admin || findIndex(btnPermissions, (item: string) => item === code) > -1
    ? children
    : React.cloneElement(children, { disabled: true });
}
