import findIndex from 'lodash/findIndex';

interface Props {
  code: string;
  children: any;
}

export default function AuthButton({ code, children }: Props) {
  return admin || findIndex(btnPermissions, (item: string) => item === code) > -1 ? children : null;
}
