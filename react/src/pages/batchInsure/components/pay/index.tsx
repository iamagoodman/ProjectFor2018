import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio } from 'antd';
import * as QrCode from 'qrcode.react';
// import alipayImg from '@/assets/alipay.png';
import wxpayImg from '@/assets/wxpay.png';
import style from './index.module.less';
import { RootState } from '@/stores/reducers';
import { PolicyOrderData } from '@/types';
import { numberToMoney } from '@/utils/util';

const { TabPane } = Tabs;
const RadioGroup = Radio.Group;

interface Props {
  className: string;
  order: PolicyOrderData;
  totalCount: number;
}

class Pay extends React.Component<Props> {
  render() {
    const props = this.props;
    const batch = props.order.batch;
    return (
      <div className={props.className}>
        <div className={style.info}>
          <div className={style.item}>
            渠道方：<span className="bold">{loginUser.channelName}</span>
          </div>
          <div className={style.item}>
            {batch ? '汇总号：' : '流水号：'}
            <span className="bold">
              {batch ? props.order.batchTradeNo : props.order.business_no}
            </span>
          </div>

          {batch ? (
            <div className={style.item}>
              投保单数量：<span className="bold">{props.order.total}单</span>
            </div>
          ) : null}
          <div className={style.item}>
            应缴费金额：
            <span className="bold">
              {numberToMoney(batch ? props.order.totalFee : props.order.total_fee)}元
            </span>
          </div>
        </div>
        <div className={style.pay}>
          <div className={style.select}>
            选择支付方式<span>(请您在保单生效前完成支付，否则可能需要重新报价)</span>
          </div>
          <Tabs>
            <TabPane tab="在线支付" key="online">
              <div>
                <RadioGroup defaultValue="wxpay">
                  <Radio value="wxpay">
                    <img style={{ width: 100 }} src={wxpayImg} alt="微信支付" />
                  </Radio>
                  {/* <Radio value='alipay'>
                                        <img style={{width: 100}} src={alipayImg} alt='支付宝支付'/>
                                    </Radio> */}
                </RadioGroup>
              </div>
              <div className={style.qrcode}>
                <QrCode value={props.order.codeUrl || ''} />
              </div>
            </TabPane>
            <TabPane tab="转账支付" key="transfer">
              <div className={style.transfer}>
                <div className={style.concact}>请联系对应业务员索要银行账户信息！</div>
                <p className={style.note}>
                  注：转账时请一定将汇总号和订单号作为备注信息填写，并在转账成功后告知业务员，否则可能影响保单生成！
                </p>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { batchPolicy, insure } = state;
  return {
    order: batchPolicy.order,
    totalCount: insure.policy.page.totalCount,
  };
};

export default connect(mapStateToProps)(Pay);
