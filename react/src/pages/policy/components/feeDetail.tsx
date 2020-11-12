import * as React from 'react';
import { Row, Col } from 'antd';
import { Dict, PolicyDetail } from '@/types';
import { getValidData } from '@/utils/util';

interface Props {
  feeTypeList: Dict[];
  data: PolicyDetail;
}

function FeeDetail(props: Props) {
  return (
    <Row style={{ padding: 15 }}>
      {props.feeTypeList.map((list: Dict) => (
        <Col key={list.name} span={8} className="detail-item-wrapper">
          {`${list.dName}：${getValidData(props.data[list.name])}元`}
        </Col>
      ))}
    </Row>
  );
}

export default React.memo(FeeDetail);
