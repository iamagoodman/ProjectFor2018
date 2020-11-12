import * as React from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import Product from './components/product';
import Declare from './components/declare';
import Pay from './components/pay';
import Detail from './components/detail';
import { RootState } from '@/stores/reducers';
import style from './index.module.less';
import { bindActionCreators, Dispatch } from 'redux';
import { doInsureSetStep, doInsureInit } from '@/stores/actions';

const { Step } = Steps;

interface Props {
  step: number;
  doSetStep: (step: number) => void;
  onInit: () => void;
}

class Insure extends React.Component<Props> {
  componentDidMount() {
    // this.props.onInit();
  }
  handleChange = (current: number) => {
    const props = this.props;
    if (current < props.step) {
      props.doSetStep(current);
    }
  };
  render() {
    const steps = {
      0: <Product className={style.wrapper} />,
      1: <Declare className={style.wrapper} />,
      2: <Detail className={style.wrapper} />,
      3: <Pay className={style.wrapper} />,
    };
    const { step } = this.props;
    return (
      <div>
        <Steps current={step} size="small">
          <Step title="产品选择"></Step>
          <Step title="新增申报"></Step>
          <Step title="投保详情"></Step>
          <Step title="支付"></Step>
        </Steps>
        <div>{steps[step]}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  step: state.insure.step,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doSetStep: (step: number) => doInsureSetStep(step),
      onInit: () => doInsureInit(),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Insure);
