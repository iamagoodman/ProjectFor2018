import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { trim } from '@/utils/util';
import { RootState } from '@/stores/reducers';
import { doAddOrModifyChannel, doSetChannelShowKey } from '@/stores/actions';
import { Channel, SetKey } from '@/types';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface Props extends FormComponentProps, Channel {
  onSubmit: (data: Channel) => void;
  onBack: (data: SetKey) => void;
  visible: boolean;
}

class OChannel extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const { id, parentId, pageSize, current } = props;
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit({ ...values, id, parentId, pageSize, current });
      }
    });
  };
  render() {
    const props = this.props;
    const { form, id, channelName, remark, visible } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    const title = `${id ? '修改' : '添加'}渠道`;
    return (
      <Modal
        title={title}
        visible={visible}
        maskClosable={false}
        onCancel={() => {
          props.onBack({ show: 'list' });
        }}
        onOk={() => {
          this.handleSubmit();
        }}
      >
        <Form className='operate-wrapper'>
          {/* <FormItem {...formItemLayout} label='渠道编号' colon={false}>
                        {
                            getFieldDecorator('channelNo', {
                                initialValue: channelNo,
                                rules: [
                                    {
                                        required: true,
                                        message: '渠道编号不能为空'
                                    }, {
                                        pattern: /^[0-9a-zA-Z]*$/,
                                        message: '渠道编号只支持字母和数字'
                                    }
                                ],
                                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
                            })(
                                <Input disabled={!!id} placeholder='请输入'/>
                            )
                        }
                    </FormItem> */}
          <FormItem {...formItemLayout} label='渠道名称' colon={false}>
            {getFieldDecorator('channelName', {
              initialValue: channelName,
              rules: [
                {
                  required: true,
                  message: '渠道名称不能为空'
                }
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
            })(<Input disabled={!!id} placeholder='请输入' />)}
          </FormItem>
          <FormItem {...formItemLayout} label='备注' colon={false}>
            {getFieldDecorator('remark', {
              initialValue: remark,
              rules: [
                {
                  pattern: /^[\w\W]{0,200}$/,
                  message: '备注长度不能超过200个'
                }
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
            })(<TextArea />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const { detail, show } = state.channel;
  return {
    ...detail,
    visible: show === 'channel'
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (data: Channel) => doAddOrModifyChannel.request(data),
      onBack: (data: SetKey) => doSetChannelShowKey(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(OChannel));
