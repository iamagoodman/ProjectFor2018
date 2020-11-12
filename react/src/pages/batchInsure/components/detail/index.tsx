import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Policy from '../policy';
import Info from './info';
import { Dispatch, bindActionCreators } from 'redux';
import {
  doInsureSetStep,
  doGetInsurePolicy,
  doGetInsurePolicyList,
  doPostPolicyBatchPay,
} from '@/stores/actions';
import style from './index.module.less';
import {
  InsureProduct,
  InsureDeclare,
  InsureDeclarePolicy,
  InsurePolicy,
  RList,
  QueryParams,
  InsurePolicyData,
  PolicyBatchPayData,
} from '@/types';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<InsureDeclarePolicy, QueryParams<InsurePolicyData>> {
  className: string;
  doSetStep: (step: number) => void;
  policyInfo: InsurePolicy;
  groupFlag: boolean;
  onDetail: (importNo: string) => void;
  declareInfo: InsureDeclare;
  productInfo: InsureProduct;
  importNo: string;
  onPay: (data: PolicyBatchPayData) => void;
}

class Detail extends React.Component<Props> {
  componentDidMount() {
    const props = this.props;
    props.onDetail(props.importNo);
  }
  onChange = (pageNumber: number = 1) => {
    const props = this.props;
    props.onChange({ pageNumber });
  };
  onPay = () => {
    const props = this.props;
    const { policyInfo, productInfo, importNo } = props;
    const { sumPremium, beginDate } = policyInfo;
    const { productNo } = productInfo;
    const data = {
      import_no: importNo,
      product_no: productNo,
      total_fee: sumPremium,
      payment_no: 'wxpay',
      pay_sence: 'NATIVE',
      channel_no: loginUser.channelNo,
      begin_date: beginDate,
    };
    props.onPay(data);
  };
  render() {
    const props = this.props;
    return (
      <div className={props.className}>
        <Info
          policyInfo={props.policyInfo}
          productInfo={props.productInfo}
          declareInfo={props.declareInfo}
        />
        <Policy
          groupFlag={props.groupFlag}
          list={props.list}
          totalCount={props.totalCount || 0}
          current={props.current || 1}
          pageSize={props.pageSize || 10}
          onChange={this.onChange}
        />
        <div className={style.btn}>
          <AuthButton code="batch_policy_pay_batch">
            <Button type="primary" onClick={this.onPay}>
              批量支付
            </Button>
          </AuthButton>
          <AuthButton code="batch_policy_pay_link">
            <Button type="primary">
              <Link to="/batch/policy">单笔支付</Link>
            </Button>
          </AuthButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    policy: { info = {}, groupFlag = null, list = [], page = {} },
    declare,
    product,
    importNo,
  } = state.insure;
  return {
    policyInfo: info,
    groupFlag: !!(typeof groupFlag === 'number'
      ? groupFlag
      : typeof groupFlag === 'string'
      ? groupFlag === '1'
      : false),
    list,
    declareInfo: declare,
    productInfo: product,
    importNo,
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doSetStep: (step: number) => doInsureSetStep(step),
      onDetail: (importNo: string) => doGetInsurePolicy.request(importNo),
      onChange: (params: QueryParams<InsurePolicyData>) => doGetInsurePolicyList.request(params),
      onPay: (data: PolicyBatchPayData) => doPostPolicyBatchPay.request(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
