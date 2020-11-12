import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
// import Back from '@/components/back';
import { Channel, SetKey } from '@/types';
import { RootState } from '@/stores/reducers';
import { doSetChannelShowKey } from '@/stores/actions';

interface Props extends Channel {
  onBack: (data: SetKey) => void;
  visible: boolean;
}

function Detail(props: Props) {
  // const items: BackItem[] = [{
  //     name: 'channelManage',
  //     displayName: '渠道管理',
  //     onBack: () => { props.onBack({show: 'list'}); }
  // }, {
  //     displayName: '查看详情',
  //     name: 'detail'
  // }]
  return (
    <Modal
      title="查看详情"
      footer={null}
      maskClosable={false}
      visible={props.visible}
      onCancel={() => {
        props.onBack({ show: 'list' });
      }}
    >
      <Row className="detail-wrapper">
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            渠道编号：
          </Col>
          <Col span={15}>{props.channelNo}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            渠道名称：
          </Col>
          <Col span={15}>{props.channelName}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            渠道密钥：
          </Col>
          <Col span={15}>{props.channelSec}</Col>
        </Col>
        <Col span={24} className="detail-item-wrapper">
          <Col span={8} className="tr">
            备注：
          </Col>
          <Col span={15}>{props.remark}</Col>
        </Col>
      </Row>
    </Modal>
  );
}

const mapStateToProps = (state: RootState) => ({
  ...state.channel.detail,
  visible: state.channel.show === 'detail',
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetChannelShowKey(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Detail));
