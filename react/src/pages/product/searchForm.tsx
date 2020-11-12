import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { trim, filterOption } from '@/utils/util';
import {
  SubmitFormDefaultProps,
  QueryParams,
  ProductFormData,
  SetKey,
  Dict,
  Company,
} from '@/types';
import { doGetProductList, doSetProductShowKey } from '@/stores/actions';
import { PRODUCT_STATUS } from '@/constans';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends SubmitFormDefaultProps<QueryParams<ProductFormData>> {
  onAdd: (data: SetKey) => void;
  productCategoryList: Dict[];
  companyList: Company[];
  formData: ProductFormData;
}

class SearchForm extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const data: ProductFormData = props.form.getFieldsValue();
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  render() {
    const props = this.props;
    const { form, formData } = props;
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
      <Form className="form-wrapper">
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="产品编号" colon={false}>
              {getFieldDecorator('productNo', {
                initialValue: formData.productNo,
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="产品名称" colon={false}>
              {getFieldDecorator('productName', {
                initialValue: formData.productName,
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="所属保险公司" colon={false}>
              {getFieldDecorator('owningCompany', {
                initialValue: formData.owningCompany,
              })(
                <Select allowClear placeholder="请选择" showSearch filterOption={filterOption}>
                  {props.companyList.map((item: Company) => (
                    <Option key={item.companyNo} value={item.companyNo}>
                      {item.companyName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="产品类型" colon={false}>
              {getFieldDecorator('productType', {
                initialValue: formData.productType,
              })(
                <Select placeholder="请选择" showSearch allowClear filterOption={filterOption}>
                  {props.productCategoryList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="产品状态" colon={false}>
              {getFieldDecorator('productStatus', {
                initialValue: formData.productStatus,
              })(
                <Select placeholder="请选择" allowClear>
                  {Object.keys(PRODUCT_STATUS).map((item: string) => (
                    <Option value={item} key={item}>
                      {PRODUCT_STATUS[item]}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem className="form-action-wrapper">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code="insurance_product_add">
                <Button
                  type="primary"
                  onClick={() => {
                    props.onAdd({ show: 'product', key: 'detail', data: {} });
                  }}
                >
                  新增产品
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
  const { app, product } = state;
  const { productCategoryList, companyList } = app;
  const { formData } = product;
  return {
    productCategoryList,
    companyList,
    formData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<ProductFormData>) => doGetProductList.request(params),
      onAdd: (data: SetKey) => doSetProductShowKey(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
