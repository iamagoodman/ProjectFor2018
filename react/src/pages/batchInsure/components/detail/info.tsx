import * as React from 'react';
import { Row, Col } from 'antd';
import style from './index.module.less';
import { InsureDeclare, InsureProduct, InsurePolicy } from '@/types';
import { getValueFromKey, numberToMoney } from '@/utils/util';
import { GROUP_FLAG } from '@/constans';

interface Props {
  productInfo: InsureProduct;
  declareInfo: InsureDeclare;
  policyInfo: InsurePolicy;
}

function Info({ productInfo, declareInfo, policyInfo }: Props) {
  return (
    <Row className={style.wrapper}>
      <Col span={12} className={style.col}>
        <div className={style.label}>保险产品</div>
        <div className={style.value}>{policyInfo.productName}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>保险方案</div>
        <div className={style.value}>{productInfo.planName}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>保单类型</div>
        <div className={style.value}>{getValueFromKey(policyInfo.groupFlag, GROUP_FLAG)}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>承保范围</div>
        <div className={style.value}>{declareInfo['insure_area']}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>线路团号</div>
        <div className={style.value}>{declareInfo['line_group_number']}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>保单备注</div>
        <div className={style.value}>{policyInfo.remark}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>起保时间</div>
        <div className={style.value}>{policyInfo.beginDate}</div>
      </Col>
      <Col span={12} className={style.col}>
        <div className={style.label}>终保时间</div>
        <div className={style.value}>{policyInfo.endDate}</div>
      </Col>
      <Col span={24} className={style.col}>
        <div className={style.label}>总保险费</div>
        <div className={style.value}>RMB {numberToMoney(policyInfo.sumPremium)} 元</div>
      </Col>
    </Row>
  );
}

export default React.memo(Info);
