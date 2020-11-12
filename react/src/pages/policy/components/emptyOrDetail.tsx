import * as React from 'react';
import { Empty } from 'antd';
import { Dict, PolicyDetailItem, PolicyDetailEnumProps } from '@/types';

interface Props {
  isEmpty: boolean;
  C: React.MemoExoticComponent<any> | React.ComponentType;
  feeTypeList?: Dict[];
  data?: any;
  detail?: PolicyDetailItem;
  enumProps?: PolicyDetailEnumProps;
  extra?: React.ReactNode;
}

function EmptyOrDetail(props: Props) {
  const { isEmpty, C, ...resetProps } = props;
  return isEmpty ? <Empty /> : <C {...resetProps} />;
}

export default React.memo(EmptyOrDetail);
