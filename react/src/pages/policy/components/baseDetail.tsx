import * as React from 'react';
import { Row, Col } from 'antd';
import { getValidData } from '@/utils/util';
import { PolicyDetailItemObj, PolicyComponentDetailProps } from '@/types';

interface Props extends PolicyComponentDetailProps {
  extra?: any;
}

function BaseDetail(props: Props) {
  const { detail, data, enumProps, extra = {} } = props;
  return (
    <Row style={{ padding: '15px' }}>
      {Object.keys(detail).map(d => {
        const col: PolicyDetailItemObj | string = detail[d];
        const itemData = (data && getValidData(data[d])) || '';
        const isObj = !!(typeof col === 'object');
        const item: PolicyDetailItemObj = typeof col === 'string' ? {} : col;
        const { type, extra: iExtra } = item;
        return (
          <Col key={d} span={d === 'clauses' ? 24 : 8} className='detail-item-wrapper'>
            {isObj ? item.name : col}：
            <span>
              {isObj
                ? iExtra
                  ? extra[d]
                  : type === 'enum'
                  ? (item.data && enumProps[item.data] && enumProps[item.data][itemData]) || itemData
                  : type === 'unit'
                  ? `${itemData}${item.unit}`
                  : itemData
                : itemData}
            </span>
          </Col>
        );
      })}
    </Row>
  );
}

export default React.memo(BaseDetail);
