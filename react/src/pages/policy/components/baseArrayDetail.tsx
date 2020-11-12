import * as React from 'react';
import BaseDetail from './baseDetail';
import { PolicyDetail, PolicyComponentDetailProps } from '@/types';

function BaseArrayDetail(props: PolicyComponentDetailProps<PolicyDetail[]>) {
  const { data, detail, enumProps } = props;
  return (
    <div>
      {data.map((item: PolicyDetail, index: number) => (
        <BaseDetail key={index} detail={detail} data={item} enumProps={enumProps} />
      ))}
    </div>
  );
}

export default React.memo(BaseArrayDetail);
