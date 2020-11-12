import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { BatchPolicyDetail, DictObj, InsuredInfo } from '@/types';
import { Dispatch, bindActionCreators } from 'redux';
import { doGetBatchPolicyDetail } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { getValueFromKey, generateUniqueId } from '@/utils/util';
import {
  getPolicyStatusListObj,
  getPayStatusListObj,
  getIdentityTypeListObj,
  getRelationTypeListObj,
} from '@/stores/selectors/app';
import style from './index.module.less';
import Back from '@/components/back';

interface Props extends RouteComponentProps, BatchPolicyDetail {
  onDetail: (businessNo: string) => void;
  policyStatus: DictObj;
  payStatus: DictObj;
  idType: DictObj;
  relationType: DictObj;
}

class Detail extends React.Component<Props> {
  componentDidMount() {
    const props = this.props;
    const { search } = props.location;
    const query = new URLSearchParams(search);
    const businessNo = query.get('businessNo');
    props.onDetail(businessNo || '');
  }
  renderColumns() {
    const props = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'insuredName',
        key: 'insuredName',
      },
      {
        title: '证件类型',
        dataIndex: 'identifyType',
        key: 'identifyType',
        render: (idType: string) => getValueFromKey(idType, props.idType),
      },
      {
        title: '证件号码',
        dataIndex: 'identifyNumber',
        key: 'identifyNumber',
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'email',
      },
      {
        title: '邮箱地址',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '与投保人关系',
        dataIndex: 'appliIdentity',
        key: 'appliIdentity',
        render: (relation: string) => getValueFromKey(relation, props.relationType),
      },
    ];
    return columns;
  }
  render() {
    const props = this.props;
    const items = [
      {
        name: 'list',
        displayName: '保单列表',
        onBack: () => {
          props.history.push('/batch/policy');
        },
      },
      {
        name: 'detail',
        displayName: '保单详情',
      },
    ];
    return (
      <div>
        <Back items={items} />
        <div className={style.wrapper}>
          <Row className={style.info}>
            <Col span={8}>
              <span className={style.label}>订单号：</span>
              {props.businessNo}
            </Col>
            <Col span={8}>
              <span className={style.label}>保单号：</span>
              {props.policyNo}
            </Col>
            <Col span={8}>
              <span className={style.label}>产品名称：</span>
              {props.productName}
            </Col>
            <Col span={8}>
              <span className={style.label}>承保保险公司：</span>
              {props.companyName}
            </Col>
            <Col span={8}>
              <span className={style.label}>订单状态：</span>
              {getValueFromKey(props.policyFlag, props.policyStatus)}
            </Col>
          </Row>
          <Row className={style.info}>
            <Col span={8}>
              <span className={style.label}>保额：</span>
              {props.sumAmount}元
            </Col>
            <Col span={8}>
              <span className={style.label}>保费：</span>
              {props.sumPremium}元
            </Col>
            <Col span={8}>
              <span className={style.label}>起保日期：</span>
              {props.beginDate}
            </Col>
            <Col span={8}>
              <span className={style.label}>终保日期：</span>
              {props.endDate}
            </Col>
            <Col span={8}>
              <span className={style.label}>投保日期：</span>
              {props.appliDate}
            </Col>
          </Row>
          <div className={style.applicant}>
            <div className={style.title}>投保人信息</div>
            <Row className={style.info}>
              <Col span={8}>
                <span className={style.label}>姓名：</span>
                {props.appliName}
              </Col>
              <Col span={8}>
                <span className={style.label}>
                  证件类型：{getValueFromKey(props.identifyType, props.idType)}
                </span>
              </Col>
              <Col span={8}>
                <span className={style.label}>证件号码：</span>
                {props.identifyNumber}
              </Col>
              <Col span={8}>
                <span className={style.label}>手机号：</span>
                {props.mobile}
              </Col>
              <Col span={8}>
                <span className={style.label}>出生日期：</span>
                {props.birthday}
              </Col>
            </Row>
          </div>
          <div className={style.insured}>
            <div className={style.title}>被保险人信息</div>
            <div className={style.list}>
              <Table
                rowKey="uniqueId"
                columns={this.renderColumns()}
                dataSource={generateUniqueId<InsuredInfo>(props.recognizeeInfoDTOList)}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { batchPolicy, app } = state;
  const { policyStatusList, payStatusList, identityTypeList, relationTypeList } = app;
  return {
    ...batchPolicy.detail,
    policyStatus: getPolicyStatusListObj(policyStatusList),
    payStatus: getPayStatusListObj(payStatusList),
    idType: getIdentityTypeListObj(identityTypeList),
    relationType: getRelationTypeListObj(relationTypeList),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onDetail: (businessNo: string) => doGetBatchPolicyDetail.request(businessNo),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
