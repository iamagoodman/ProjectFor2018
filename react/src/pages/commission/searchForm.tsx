import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { QueryParams, SubmitFormDefaultProps, SetKey, CommissionFormData } from '@/types';
import { trim } from '@/utils/util';
import { doSetCommissionShowKey, doGetCommissionList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;

interface Props extends SubmitFormDefaultProps<QueryParams<CommissionFormData>> {
  onAdd: (data: SetKey) => void;
  formData: CommissionFormData;
}

class SearchForm extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const data: CommissionFormData = props.form.getFieldsValue();
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };

  render() {
    const props = this.props;
    const { form, formData } = props;
    const { getFieldDecorator } = form;
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
            <FormItem {...formItemLayout} label='渠道名称' colon={false}>
              {getFieldDecorator('channelName', {
                initialValue: formData.channelName,
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='产品名称' colon={false}>
              {getFieldDecorator('productName', {
                initialValue: formData.productName,
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem className='form-action-wrapper'>
              <Button type='primary' onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code='insurance_commission_add'>
                <Button
                  type='primary'
                  onClick={() => {
                    props.onAdd({ show: 'commission', key: 'detail', data: {} });
                  }}
                >
                  添加渠道费用配置
                </Button>
              </AuthButton>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { formData } = state.commission;
  return {
    formData
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<CommissionFormData>) => doGetCommissionList.request(params),
      onAdd: (data: SetKey) => doSetCommissionShowKey(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
