import * as React from 'react';
import BaseArrayDetail from './baseArrayDetail';
import { PolicyComponentDetailProps } from '@/types';

function FavoreeDetail(props: PolicyComponentDetailProps<any>) {
  const { data, detail, enumProps } = props;
  return data && data.length ? (
    <BaseArrayDetail data={data} detail={detail} enumProps={enumProps} />
  ) : (
    <div style={{ fontSize: '18px', padding: '10px' }}>法定受益人</div>
  );
}

export default React.memo(FavoreeDetail);
