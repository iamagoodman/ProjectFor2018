import * as React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
// import Back from '@/components/back';
import { Company, SetKey, DictObj } from '@/types';
import { RootState } from '@/stores/reducers';
import { doSetCompanyShowKey } from '@/stores/actions';
import { getBusinessTypeObj } from '@/stores/selectors/app';

interface Props extends Company {
  onBack: (data: SetKey) => void;
  businessTypeObj: DictObj;
  visible: boolean;
}

function Detail(props: Props) {
  const { visible } = props;
  // const items: BackItem[] = [{
  //     name: 'companyManage',
  //     displayName: '保险公司管理',
  //     onBack: () => { props.onBack({show: 'list'}); }
  //     // onBack: () => { props.history.push('/insurance/company'); }
  // }, {
  //     displayName: '查看详情',
  //     name: 'detail'
  // }]
  return (
    // <div>
    //     <Back items={items}/>
    //     <Row className='detail-wrapper'>
    //         <Col span={24} className='detail-item-wrapper'>
    //             <Col span={4} className='tr'>保险公司编号：</Col>
    //             <Col span={20}>{props.companyNo}</Col>
    //         </Col>
    //         <Col span={24} className='detail-item-wrapper'>
    //             <Col span={4} className='tr'>保险公司名称：</Col>
    //             <Col span={20}>{props.companyName}</Col>
    //         </Col>
    //         <Col span={24} className='detail-item-wrapper'>
    //             <Col span={4} className='tr'>保险公司简称：</Col>
    //             <Col span={20}>{props.simpleName}</Col>
    //         </Col>
    //         <Col span={24} className='detail-item-wrapper'>
    //             <Col span={4} className='tr'>业务类型：</Col>
    //             <Col span={20}>{props.businessType ? props.businessTypeObj[props.businessType] : props.businessType}</Col>
    //         </Col>
    //         <Col span={24} className='detail-item-wrapper'>
    //             <Col span={4} className='tr'>备注：</Col>
    //             <Col span={20}>{props.remark || ''}</Col>
    //         </Col>
    //     </Row>
    // </div>
    <Modal
      title="查看详情"
      visible={visible}
      footer={null}
      maskClosable={false}
      onCancel={() => {
        props.onBack({ show: 'list' });
      }}
    >
      <Row className="detail-wrapper">
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            保险公司编号：
          </Col>
          <Col span={15}>{props.companyNo}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            保险公司名称：
          </Col>
          <Col span={15}>{props.companyName}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            保险公司简称：
          </Col>
          <Col span={15}>{props.simpleName}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            业务类型：
          </Col>
          <Col span={15}>
            {props.businessType
              ? props.businessTypeObj[props.businessType] || props.businessType
              : props.businessType}
          </Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            备注：
          </Col>
          <Col span={15}>{props.remark || ''}</Col>
        </Col>
      </Row>
    </Modal>
  );
}

const mapStateToProps = (state: RootState) => ({
  ...state.company.detail,
  visible: state.company.show === 'detail',
  businessTypeObj: getBusinessTypeObj(state.app.businessTypeList),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetCompanyShowKey(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Detail));
