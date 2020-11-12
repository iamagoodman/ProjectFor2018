import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { trim } from '@/utils/util';
import { doGetCompanyList, doSetCompanyShowKey, doSetCompanyLevel } from '@/stores/actions';
import {
  SubmitFormDefaultProps,
  CompanyFormData,
  QueryParams,
  SetKey,
  CompanyLevel,
  Dict,
} from '@/types';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends SubmitFormDefaultProps<QueryParams<CompanyFormData>> {
  onAdd: (data: SetKey) => void;
  onSetLevel: (data: CompanyLevel) => void;
  businessTypeList: Dict[];
}

class SearchForm extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const data: CompanyFormData = props.form.getFieldsValue();
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  handleClick = () => {
    const props = this.props;
    props.onSetLevel({ level: 'first', company: {}, show: 'company' });
  };
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
      <Form className="form-wrapper">
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保险公司编号" colon={false}>
              {getFieldDecorator('companyNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保险公司名称" colon={false}>
              {getFieldDecorator('companyName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保险公司简称" colon={false}>
              {getFieldDecorator('simpleName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="业务类型" colon={false}>
              {getFieldDecorator('businessType')(
                <Select placeholder="请选择" allowClear>
                  {props.businessTypeList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8} offset={1}>
            <FormItem className="form-action-wrapper">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code="insurance_company_add1">
                <Button type="primary" onClick={this.handleClick}>
                  新建一级保险机构
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
  const { businessTypeList } = state.app;
  return {
    businessTypeList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<CompanyFormData>) => doGetCompanyList.request(params),
      onAdd: (data: SetKey) => doSetCompanyShowKey(data),
      onSetLevel: (data: CompanyLevel) => doSetCompanyLevel(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
