import * as React from 'react';
import SubjectItemDetail from './subjectItemDetail';
import { PolicyComponentSubjectDetailProps } from '@/types';

interface Props {
  data: PolicyComponentSubjectDetailProps;
  extra: any;
}

function SubjectDetail({ data, extra }: Props) {
  return (
    <div>
      {Object.keys(data).map(s => {
        const { len, ...resetProps } = data[s];
        return len > 0 ? <SubjectItemDetail key={s} extra={extra[s]} {...resetProps} /> : null;
      })}
    </div>
  );
}

export default React.memo(SubjectDetail);
