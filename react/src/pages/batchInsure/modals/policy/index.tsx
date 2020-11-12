import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { bindActionCreators, Dispatch } from 'redux';
import { doInsureSetPolicyVisible, doGetInsureDeclarePolicyList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import Policy from '../../components/policy';
import { InsureDeclareImportInfo, InsureDeclarePolicy, RList, QueryParams } from '@/types';
import style from './index.module.less';
import { numberToMoney } from '@/utils/util';

interface Props extends RList<InsureDeclarePolicy> {
  visible: boolean;
  doSetVisible: () => void;
  info: InsureDeclareImportInfo;
  groupFlag: boolean;
}

class PolicyModal extends React.Component<Props> {
  onChange = (pageNumber: number) => {
    const props = this.props;
    props.onChange({ pageNumber });
  };
  render() {
    const props = this.props;
    return (
      <Modal
        title="数据导入完成"
        width={1000}
        visible={props.visible}
        footer={null}
        onCancel={props.doSetVisible}
        maskClosable={false}
      >
        <div>
          <div className={style.summary}>
            导入清单共计<span className={style.number}>{props.info.total}</span>条数据，成功导入
            <span className={style.number}>{props.info.successTotal}</span>条数据，共生成
            <span className={style.number}>{props.info.policyNumber}</span>个投保单，保费合计：RMB{' '}
            <span className={style.number}>{numberToMoney(props.info.totalPremium || 0)}</span>元
          </div>
          <Policy
            list={props.list}
            groupFlag={props.groupFlag}
            totalCount={props.totalCount || 0}
            current={props.current || 1}
            pageSize={props.pageSize || 10}
            onChange={this.onChange}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    policyVisible,
    declareImport: { list = [], page, info = {}, groupFlag },
  } = state.insure;
  return {
    visible: policyVisible,
    list,
    info,
    groupFlag,
    ...page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doSetVisible: () => doInsureSetPolicyVisible(false),
      onChange: ({ pageNumber = 1 }: QueryParams) => doGetInsureDeclarePolicyList(pageNumber),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PolicyModal);
