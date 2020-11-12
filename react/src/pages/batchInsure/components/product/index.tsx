import * as React from 'react';
import { connect } from 'react-redux';
import { Select, Form, Button } from 'antd';
import { bindActionCreators, Dispatch } from 'redux';
import {
  doInsureSetStep,
  doInsureSetProduct,
  doGetPlanAndPolicyType,
  doGetProductListByLoginId,
} from '@/stores/actions';
import { FormComponentProps } from 'antd/lib/form';
import { RootState } from '@/stores/reducers';
import { Product as IProduct, InsureProduct, LabelInValue, PlanTypesItem } from '@/types';
import { filterOption } from '@/utils/util';
import find from 'lodash/find';

const Option = Select.Option;
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  className: string | undefined;
  doSetStep: (step: number) => void;
  productList: IProduct[];
  planTypes: PlanTypesItem[];
  policyTypes: number;
  doSetProduct: (data: InsureProduct) => void;
  doGetPlanAndPolicyType: (id: number) => void;
  productInfo: InsureProduct;
  onProductList: (loginId: string) => void;
}

class Product extends React.Component<Props> {
  static defaultProps = {
    className: '',
  };
  componentDidMount() {
    const props = this.props;
    if (!props.productList.length) {
      props.onProductList(loginUser.loginId);
    }
  }
  handleProductChange = (value?: LabelInValue<number>) => {
    const props = this.props;
    value && props.doGetPlanAndPolicyType(value.key);
    props.form.setFieldsValue({
      plan: undefined,
      policyTypes: undefined,
    });
  };
  handleClick = () => {
    const props = this.props;
    props.form.validateFields((err, values) => {
      if (!err) {
        const { plan = {}, product, policyTypes } = values;
        const { key: id, label: productName } = product;
        const { key: planCode, label: planName } = plan;
        const pro = find(props.productList, (item: IProduct) => item.id === id);
        props.doSetProduct({
          productName,
          id,
          planCode,
          planName,
          policyTypes,
          productNo: pro && pro.productNo,
        });
      }
    });
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const btnItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15, offset: 4 },
      },
    };
    const { productInfo, planTypes, policyTypes } = props;
    return (
      <div className={props.className}>
        <Form {...formItemLayout}>
          <FormItem label="产品">
            {getFieldDecorator('product', {
              initialValue: productInfo.id
                ? { key: productInfo.id, label: productInfo.productName }
                : undefined,
              rules: [
                {
                  required: true,
                  message: '产品不能为空',
                },
              ],
            })(
              <Select
                placeholder="请选择"
                showSearch
                labelInValue
                filterOption={filterOption}
                onChange={this.handleProductChange}
              >
                {props.productList.map((item: IProduct) => (
                  <Option key={item.id} value={item.id}>
                    {item.productName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem label="方案">
            {getFieldDecorator('plan', {
              initialValue: productInfo.planCode
                ? { key: productInfo.planCode, label: productInfo.planName }
                : undefined,
              rules: [
                {
                  required: true,
                  message: '方案不能为空',
                },
              ],
            })(
              <Select placeholder="请选择" showSearch labelInValue>
                {planTypes.map((item: PlanTypesItem) => (
                  <Option key={item.planCode} value={item.planCode}>
                    {item.planName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem label="团个单标识">
            {getFieldDecorator('policyTypes', {
              initialValue: productInfo.policyTypes,
              rules: [
                {
                  required: true,
                  message: '类型不能为空',
                },
              ],
            })(
              <Select placeholder="请选择" showSearch>
                {policyTypes !== 1 ? <Option value={0}>个单</Option> : null}
                {policyTypes !== 0 ? <Option value={1}>团单</Option> : null}
              </Select>,
            )}
          </FormItem>
          <FormItem {...btnItemLayout}>
            <Button type="primary" onClick={this.handleClick}>
              下一步
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, insure } = state;
  const { productListByLoginId, planTypes, policyTypes } = app;
  return {
    productList: productListByLoginId,
    planTypes,
    policyTypes,
    productInfo: { ...insure.product },
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doSetStep: (step: number) => doInsureSetStep(step),
      doSetProduct: (data: InsureProduct) => doInsureSetProduct(data),
      doGetPlanAndPolicyType: (id: number) => doGetPlanAndPolicyType.request(id),
      onProductList: (loginId: string) => doGetProductListByLoginId.request(loginId),
    },
    dispatch,
  );

export default Form.create<any>()(connect(mapStateToProps, mapDispatchToProps)(Product));
