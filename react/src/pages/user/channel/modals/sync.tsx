import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Select, Form } from 'antd';
import { Channel, User } from '@/types';
import { filterOption, trim } from '@/utils/util';
import { RootState } from '@/stores/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { FormComponentProps } from 'antd/lib/form';
import { doSetUserSyncVisible, doUserBindChannel } from '@/stores/actions';

const Option = Select.Option;
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  channelList: Channel[];
  visible: boolean;
  onVisible: (visible: boolean) => void;
  onSubmit: (data: User) => void;
}

class SyncModal extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    props.form.validateFields((err, values) => {
      if (!err) {
        const [channelNo, channelName] = values.channel.split('%#%');
        props.onSubmit({ channelNo, channelName, loginId: values.loginId });
      }
    });
  };
  render() {
    const props = this.props;
    const { form } = props;
    const { getFieldDecorator } = form;
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
        title="同步用户"
        visible={props.visible}
        onCancel={() => {
          props.onVisible(false);
        }}
        onOk={this.handleSubmit}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户loginId">
            {getFieldDecorator('loginId', {
              rules: [
                {
                  required: true,
                  message: '用户loginId不能为空',
                },
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
            })(<Input placeholder="请输入同步用户的loginId" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="渠道">
            {getFieldDecorator('channel', {
              rules: [
                {
                  required: true,
                  message: '渠道不能为空',
                },
              ],
            })(
              <Select placeholder="请选择" showSearch filterOption={filterOption}>
                {props.channelList.map((item: Channel) => (
                  <Option key={item.channelNo} value={`${item.channelNo}%#%${item.channelName}`}>
                    {item.channelName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, user } = state;
  return {
    channelList: app.channelList,
    visible: user.syncUserVisible,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doSetUserSyncVisible({ visible }),
      onSubmit: (data: User) => doUserBindChannel.request(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SyncModal));
