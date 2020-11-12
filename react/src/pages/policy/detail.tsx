import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import {
  PolicyDetail,
  SubjectCargoDetail,
  SubjectLiabilityDetail,
  SubjectPolicyEmployeeDetail
} from '@/constans/policy';
import {
  PolicyDetail as PPolicyDetail,
  DictObj,
  Policy,
  Dict,
  BackItem,
  PolicyAllDetail,
  SetVisibleData
} from '@/types';
import {
  doGetPolicyAppliDetail,
  doGetPolicyFavoreeDetail,
  doGetPolicyRecognizeeDetail,
  doGetPolicyPayDetail,
  doGetPolicyFeeDetail,
  doGetPolicyClauseDetail,
  doGetPolicyRiskTypeDetail,
  doGetPolicyBaseDetail,
  doGetPolicyDetail,
  doGetPolicySubjectDetail,
  doSetPolicyPayVisible,
  doSetPolicyVisible
} from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import {
  getPolicyTypeListObj,
  getPolicyStatusListObj,
  getAssetTypeListObj,
  getCustomTypeListObj,
  getPayMethodListObj,
  getPayTypeListObj,
  getRiskTypeCategoryListObj,
  getInvoiceTypeListObj,
  getSendStatusListObj,
  getPayStatusListObj,
  getRiskTypeObj,
  getRelationTypeListObj,
  getIdentityTypeListObj,
  getGenderListObj
} from '@/stores/selectors/app';
import { GROUP_FLAG, BENEFIT_FLAG } from '@/constans';
import PayModal from './modals/pay';
import EmployeeModal from './modals/employee';
import Back from '@/components/back';
import {
  BaseDetail,
  FeeDetail,
  SubjectDetail,
  EmptyOrDetail,
  BaseArrayDetail,
  FavoreeDetail
} from './components/detail';

const TabPane = Tabs.TabPane;

interface Props extends RouteComponentProps, PolicyAllDetail {
  getBaseDetail: (data: Policy) => void;
  getAppliDetail: (data: Policy) => void;
  getFavoreeDetail: (data: Policy) => void;
  getRecognizeeDetail: (data: Policy) => void;
  getPayDetail: (data: Policy) => void;
  getFeeDetail: (data: Policy) => void;
  getClauseDetail: (data: Policy) => void;
  getRiskTypeDetail: (data: Policy) => void;
  getDetail: (data: Policy) => void;
  getSubjectDetail: (data: Policy) => void;
  setPayVisible: (visible: boolean) => void;
  setPolicyVisible: (data: SetVisibleData) => void;
  policyStatus: DictObj;
  policyType: DictObj;
  assetType: DictObj;
  customType: DictObj;
  riskTypeCategory: DictObj;
  gender: DictObj;
  benefitFlag: DictObj;
  payStatus: DictObj;
  sendStatus: DictObj;
  groupFlag: DictObj;
  invoiceType: DictObj;
  riskType: DictObj;
  relationType: DictObj;
  identityType: DictObj;
  feeTypeList: Dict[];
  detailPayVisible: boolean;
  detailEmployeeVisible: boolean;
}
class Detail extends React.Component<Props> {
  policyNo: string | null;
  businessNo: string | null;
  componentDidMount() {
    const props = this.props;
    const data = this.getData();
    props.getBaseDetail(data);
  }
  getData = () => {
    const props = this.props;
    const { search } = props.location;
    const query = new URLSearchParams(search);
    const businessNo = query.get('businessNo');
    const id = query.get('id');
    const data: Policy = {
      businessNo,
      id,
      subjectType: 'cargo,liability'
    };
    // this.policyNo = policyNo;
    this.businessNo = businessNo;
    return data;
  };

  renderMap = (data: Policy) => {
    const props = this.props;
    return {
      appli: {
        execute: () => {
          props.getAppliDetail(data);
        },
        isRequest: props.appliDetail.isRequest
      },
      recognizee: {
        execute: () => {
          props.getRecognizeeDetail(data);
        },
        isRequest: props.recognizeeDetail && props.recognizeeDetail.length
      },

      favoree: {
        execute: () => {
          props.getFavoreeDetail(data);
        },
        isRequest: props.favoreeDetail && props.favoreeDetail.length
      },
      pay: {
        execute: () => {
          props.getPayDetail(data);
        },
        isRequest: props.payDetail.isRequest
      },
      fee: {
        execute: () => {
          props.getFeeDetail(data);
        },
        isRequest: props.feeDetail.isRequest
      },
      clause: {
        execute: () => {
          props.getClauseDetail(data);
        },
        isRequest: props.clauseDetail.isRequest
      },
      riskType: {
        execute: () => {
          props.getRiskTypeDetail(data);
        },
        isRequest: props.riskTypeDetail.isRequest
      },
      base: {
        execute: () => {
          props.getBaseDetail(data);
        },
        isRequest: props.baseDetail.isRequest
      },
      subject: {
        execute: () => {
          props.getSubjectDetail(data);
        },
        isRequest: props.subjectDetail.isRequest
      }
    };
  };
  renderChange = (key: string) => {
    return (data: Policy) => {
      const detailMap = this.renderMap(data);
      const currentTab = detailMap[key];

      !currentTab.isRequest && currentTab.execute();
    };
  };
  handleChange = (activeKey: string) => {
    const data = this.getData();

    this.renderChange(activeKey)(data);
  };
  handleBack = () => {
    this.props.history.push('/insurance/policy');
  };
  renderTabPane = (item: string) => {
    const props = this.props;
    const {
      policyStatus,
      policyType,
      assetType,
      customType,
      riskTypeCategory,
      gender,
      benefitFlag,
      payStatus,
      sendStatus,
      groupFlag,
      invoiceType,
      riskType,
      relationType,
      identityType
    } = props;
    const { detail, dataStr } = PolicyDetail[item];
    const data: PPolicyDetail | PPolicyDetail[] = props[dataStr];
    const {
      cargo: subjectCargoDetail,
      liability: subjectLiabilityDetail,
      policyEmployerLiability: subjectPolicyEmployerLiabilityDetail,
      isEmpty: subjectIsEmpty
    } = props.subjectDetail;
    const cargoLen = Object.keys(subjectCargoDetail).length;
    const liabilityLen = Object.keys(subjectLiabilityDetail).length;
    const policyEmployerLiabilityLen = Object.keys(subjectPolicyEmployerLiabilityDetail).length;
    const subjectCargoDetailProps = {
      title: '货运险',
      data: subjectCargoDetail,
      detail: SubjectCargoDetail,
      enumProps: props
    };
    const subjectLiabilityDetailProps = {
      title: '责任险',
      data: subjectLiabilityDetail,
      detail: SubjectLiabilityDetail,
      enumProps: props
    };
    const subjectPolicyEmployerLiabilityProps = {
      title: '雇主责任险',
      data: subjectPolicyEmployerLiabilityDetail,
      detail: SubjectPolicyEmployeeDetail,
      enumProps: props
    };
    const subjectDetailProps = {
      cargo: { len: cargoLen, ...subjectCargoDetailProps },
      liability: { len: liabilityLen, ...subjectLiabilityDetailProps },
      policyEmployerLiability: { len: policyEmployerLiabilityLen, ...subjectPolicyEmployerLiabilityProps }
    };
    const isArray = !!(data instanceof Array);
    const isEmpty = !!(!data || (isArray ? data.length === 0 : Object.keys(data).length <= 1));
    const enumProps = {
      policyStatus,
      policyType,
      assetType,
      customType,
      riskTypeCategory,
      gender,
      benefitFlag,
      payStatus,
      sendStatus,
      groupFlag,
      invoiceType,
      riskType,
      relationType,
      identityType
    };
    const employeesNumber = subjectPolicyEmployerLiabilityDetail.employeesNumber;
    switch (item) {
      case 'subject':
        return (
          <EmptyOrDetail
            C={SubjectDetail}
            isEmpty={subjectIsEmpty}
            data={subjectDetailProps}
            extra={{
              policyEmployerLiability: {
                employeesNumber: (
                  <>
                    {employeesNumber}人
                    {employeesNumber ? (
                      <a
                        href='javascript:void(0);'
                        onClick={() => {
                          props.setPolicyVisible({ type: 'detailEmployee', visible: true });
                        }}
                      >
                        点击查看
                      </a>
                    ) : null}
                  </>
                )
              }
            }}
          />
        );
      case 'fee':
        return <EmptyOrDetail C={FeeDetail} isEmpty={isEmpty} feeTypeList={props.feeTypeList} data={data} />;
      case 'pay':
        return (
          <EmptyOrDetail
            C={BaseDetail}
            isEmpty={isEmpty}
            detail={detail}
            data={data}
            enumProps={enumProps}
            extra={{
              policyPaymentInfoDTO: (
                <a
                  href='javascript:void(0);'
                  onClick={() => {
                    props.setPayVisible(true);
                  }}
                >
                  点击查看
                </a>
              )
            }}
          />
        );
      case 'favoree':
        return <FavoreeDetail detail={detail} data={data} enumProps={enumProps} />;
      default:
        return (
          <EmptyOrDetail
            C={isArray ? BaseArrayDetail : BaseDetail}
            isEmpty={isEmpty}
            detail={detail}
            data={data}
            enumProps={enumProps}
          />
        );
    }
  };
  render() {
    const props = this.props;
    const items: BackItem[] = [
      {
        name: ' policyManage',
        displayName: '保单管理',
        onBack: () => {
          this.handleBack();
        }
      },
      {
        displayName: '保单详情',
        name: 'detail'
      }
    ];
    // const permissions = {
    //     base: 'insurance_policy_detail_base',
    //     subject: 'insurance_policy_detail_subject',
    //     riskType: 'insurance_policy_detail_riskType',
    //     appli: 'insurance_policy_detail_appli',
    //     recognizee: 'insurance_policy_detail_recognizee',
    //     favoree: 'insurance_policy_detail_favoree',
    //     pay: 'insurance_policy_detail_pay',
    //     fee: 'insurance_policy_detail_fee',
    //     clause: 'insurance_policy_detail_clause'
    // }
    return (
      <div>
        <Back items={items} />
        <div className='detail-wrapper'>
          <Tabs onChange={this.handleChange} defaultActiveKey='base'>
            {Object.keys(PolicyDetail).map((item: string) => {
              const { name } = PolicyDetail[item];
              return (
                <TabPane
                  tab={name}
                  key={item}
                  disabled={!admin && btnPermissions.indexOf(`insurance_policy_detail_${item}`) === -1}
                >
                  {this.renderTabPane(item)}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        {props.detailPayVisible && <PayModal businessNo={this.businessNo || ''} />}
        {props.detailEmployeeVisible && (
          <EmployeeModal list={props.subjectDetail.policyEmployerLiability.insuranceIntentionEmployeeDTOList || []} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    policyTypeList,
    policyStatusList,
    assetTypeList,
    customTypeList,
    payMethodList,
    payTypeList,
    riskTypeCategoryList,
    invoiceTypeList,
    sendStatusList,
    payStatusList,
    riskTypeList,
    identityTypeList,
    relationTypeList,
    genderList,
    feeTypeList
  } = state.app;
  const {
    appliDetail,
    recognizeeDetail,
    favoreeDetail,
    payDetail,
    feeDetail,
    clauseDetail,
    riskTypeDetail,
    baseDetail,
    subjectDetail,
    detailPayVisible,
    detailEmployeeVisible
  } = state.policy;

  return {
    appliDetail,
    recognizeeDetail,
    favoreeDetail,
    payDetail,
    feeDetail,
    clauseDetail,
    riskTypeDetail,
    baseDetail,
    subjectDetail,
    policyType: getPolicyTypeListObj(policyTypeList),
    policyStatus: getPolicyStatusListObj(policyStatusList),
    assetType: getAssetTypeListObj(assetTypeList),
    customType: getCustomTypeListObj(customTypeList),
    riskTypeCategory: getRiskTypeCategoryListObj(riskTypeCategoryList),
    payMethod: getPayMethodListObj(payMethodList),
    payType: getPayTypeListObj(payTypeList),
    payStatus: getPayStatusListObj(payStatusList),
    riskType: getRiskTypeObj(riskTypeList),
    invoiceType: getInvoiceTypeListObj(invoiceTypeList),
    sendStatus: getSendStatusListObj(sendStatusList),
    identityType: getIdentityTypeListObj(identityTypeList),
    relationType: getRelationTypeListObj(relationTypeList),
    gender: getGenderListObj(genderList),
    feeTypeList,
    groupFlag: GROUP_FLAG,
    benefitFlag: BENEFIT_FLAG,
    detailPayVisible,
    detailEmployeeVisible
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAppliDetail: (data: Policy) => doGetPolicyAppliDetail.request(data),
      getFavoreeDetail: (data: Policy) => doGetPolicyFavoreeDetail.request(data),
      getRecognizeeDetail: (data: Policy) => doGetPolicyRecognizeeDetail.request(data),
      getPayDetail: (data: Policy) => doGetPolicyPayDetail.request(data),
      getFeeDetail: (data: Policy) => doGetPolicyFeeDetail.request(data),
      getClauseDetail: (data: Policy) => doGetPolicyClauseDetail.request(data),
      getRiskTypeDetail: (data: Policy) => doGetPolicyRiskTypeDetail.request(data),
      getBaseDetail: (data: Policy) => doGetPolicyBaseDetail.request(data),
      getDetail: (data: Policy) => doGetPolicyDetail.request(data),
      getSubjectDetail: (data: Policy) => doGetPolicySubjectDetail.request(data),
      setPayVisible: (visible: boolean) => doSetPolicyPayVisible(visible),
      setPolicyVisible: (data: SetVisibleData) => doSetPolicyVisible(data)
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
