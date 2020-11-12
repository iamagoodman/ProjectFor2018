import * as React from 'react';
import { Modal, DatePicker, Form } from 'antd';
import { connect } from 'react-redux';
import { RootState } from '@/stores/reducers';
import { NCVoucherUploadData, SubmitFormDefaultProps } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doSetNcVoucherUploadVisible, doUploadNcVoucher } from '@/stores/actions';

interface Props extends SubmitFormDefaultProps<NCVoucherUploadData> {
  visible: boolean;
  onVisible: (visible: boolean) => void;
}

const FormItem = Form.Item;

class UploadModal extends React.Component<Props> {
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        visible={props.visible}
        title="上传凭证"
        maskClosable={false}
        onCancel={() => {
          props.onVisible(false);
        }}
        onOk={() => {
          props.form.validateFields((err, { preparedDate }) => {
            if (!err) {
              props.onSubmit({
                preparedDate: preparedDate.format('YYYY-MM-DD HH:mm:ss'),
              });
            }
          });
        }}
      >
        <Form {...formItemLayout}>
          <FormItem label="制表日期">
            {getFieldDecorator('preparedDate', {
              rules: [
                {
                  required: true,
                  message: '制表日期不能为空',
                },
              ],
            })(<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  visible: state.ncVoucher.uploadVisible,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doSetNcVoucherUploadVisible(visible),
      onSubmit: (data: NCVoucherUploadData) => doUploadNcVoucher.request(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(UploadModal));
