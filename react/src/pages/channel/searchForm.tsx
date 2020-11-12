import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { CHANNEL_STATUS } from '@/constans';
import { trim } from '@/utils/util';
import { SubmitFormDefaultProps, QueryParams, ChannelFormData, SetKey, Channel } from '@/types';
import { doSetChannelShowKey, doGetChannelList } from '@/stores/actions';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends SubmitFormDefaultProps<QueryParams<ChannelFormData>> {
  onAdd: (data: SetKey<Channel>) => void;
}

class SearchForm extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const data: ChannelFormData = props.form.getFieldsValue();
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <Form className='form-wrapper'>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label='渠道编号' colon={false}>
              {getFieldDecorator('channelNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='渠道名称' colon={false}>
              {getFieldDecorator('channelName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label='渠道状态' colon={false}>
              {getFieldDecorator('channelStatus')(
                <Select placeholder='请选择' allowClear>
                  {Object.keys(CHANNEL_STATUS).map((item: string) => (
                    <Option key={item} value={item}>
                      {CHANNEL_STATUS[item]}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem className='form-action-wrapper tr'>
              <Button type='primary' onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code='insurance_channel_add'>
                <Button
                  type='primary'
                  onClick={() => {
                    props.onAdd({ show: 'channel', key: 'detail', data: { parentId: 0 } });
                  }}
                >
                  新增渠道
                </Button>
              </AuthButton>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<ChannelFormData>) => doGetChannelList.request(params),
      onAdd: (data: SetKey<Channel>) => doSetChannelShowKey(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
