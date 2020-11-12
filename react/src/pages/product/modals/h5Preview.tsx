import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { RootState } from '@/stores/reducers';
import { getProductPreviewContent } from '@/stores/selectors/product';
import { doSetProductPreviewVisible } from '@/stores/actions';

interface Props {
  content: string;
  visible: boolean;
  onVisible: (visible: boolean) => void;
  id: number | undefined;
}

function Preview(props: Props) {
  return (
    <Modal
      title="h5预览"
      visible={props.visible}
      footer={null}
      onCancel={() => {
        props.onVisible(false);
      }}
      maskClosable={false}
    >
      {/* <div dangerouslySetInnerHTML={{__html: props.content}}></div> */}
      <iframe
        style={{ border: 'none' }}
        width="100%"
        height="400px"
        src={`/productManagement/queryHtmlPageById?id=${props.id}`}
      />
    </Modal>
  );
}

const mapStateToProps = (state: RootState) => {
  const {
    h5PreviewVisible: visible,
    detail: { h5Sourse },
  } = state.product;
  return {
    visible,
    content: getProductPreviewContent(h5Sourse),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doSetProductPreviewVisible(visible),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
