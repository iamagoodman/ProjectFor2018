import * as React from 'react';
import { Row, Col } from 'antd';
import BaseDetail from './baseDetail';
import { PolicyComponentDetailProps } from '@/types';

interface Props extends PolicyComponentDetailProps {
  title: string;
  extra: any;
}

function SubjectItemDetail(props: Props) {
  const { title, ...resetProps } = props;
  return (
    <Row style={{ padding: 15 }}>
      <Row>
        <Col span={24} style={{ fontWeight: 'bold', fontSize: '16px' }}>
          {title}
        </Col>
      </Row>
      <BaseDetail {...resetProps} />
    </Row>
  );
}

export default React.memo(SubjectItemDetail);
