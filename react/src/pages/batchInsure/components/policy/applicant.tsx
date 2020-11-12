import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import style from './index.module.less';
import { Info, DictObj } from '@/types';
import { RootState } from '@/stores/reducers';
import { getIdentityTypeListObj } from '@/stores/selectors/app';
import { getValueFromKey } from '@/utils/util';

interface Props extends Info {
  identityType: DictObj;
}

function Applicant(props: Props) {
  return (
    <div className={style.applicant}>
      <div className={style.title}>投保人信息</div>
      <Row className={style.table}>
        <Row className={style.thead}>
          <Col className={style.th} span={4}>
            姓名
          </Col>
          <Col className={style.th} span={4}>
            证件类型
          </Col>
          <Col className={style.th} span={6}>
            证件号码
          </Col>
          <Col className={style.th} span={5}>
            出生日期
          </Col>
          <Col className={style.th} span={5}>
            手机号
          </Col>
        </Row>
        <Row className={style.tbody}>
          <Row className={style.tr}>
            <Col className={style.td} span={4}>
              {props.name}
            </Col>
            <Col className={style.td} span={4}>
              {getValueFromKey(props.idType, props.identityType)}
            </Col>
            <Col className={style.td} span={6}>
              {props.idNumber}
            </Col>
            <Col className={style.td} span={5}>
              {props.birthday}
            </Col>
            <Col className={style.td} span={5}>
              {props.mobile}
            </Col>
          </Row>
        </Row>
      </Row>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const { identityTypeList } = state.app;
  return {
    identityType: getIdentityTypeListObj(identityTypeList),
  };
};

export default connect(mapStateToProps)(Applicant);
