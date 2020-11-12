import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col, DatePicker, message } from 'antd';
import { trim, filterOption } from '@/utils/util';
import {
  SubmitFormDefaultProps,
  QueryParams,
  Dict,
  BatchPolicyFormData,
  SummaryData,
  Product,
} from '@/types';
import { RootState } from '@/stores/reducers';
import {
  doGetBatchPolicyList,
  doBatchPolicySearchClear,
  doBatchPolicySummary,
  doGetProductListByLoginId,
} from '@/stores/actions';
import * as moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<BatchPolicyFormData>> {
  policyStatusList: Dict[];
  payStatusList: Dict[];
  onClear: () => void;
  selectedRowKeys: string[];
  onSummary: (data: SummaryData) => void;
  productList: Product[];
  onProductList: (loginId: string) => void;
}

interface State {
  rangeTime: RangePickerValue;
}

class SearchForm extends React.Component<Props> {
  oIframe: HTMLIFrameElement;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      rangeTime: [moment().subtract(7, 'd'), moment()],
    };
  }
  componentDidMount() {
    const props = this.props;
    props.onSubmit({ pageSize: 10, pageNumber: 1, data: {} });
    if (!this.oIframe) {
      this.oIframe = document.createElement('iframe');
      this.oIframe.style.display = 'none';
      document.body.appendChild(this.oIframe);
    }

    if (!props.productList.length) {
      props.onProductList(loginUser.loginId);
    }
  }
  componentWillUnmount() {
    if (this.oIframe) {
      document.body.removeChild(this.oIframe);
    }
  }
  handleSubmit = () => {
    const props = this.props;
    const data = this.getData();
    if (data) {
      props.onSubmit({ pageSize: 10, pageNumber: 1, data });
    }
  };
  handleClear = () => {
    const props = this.props;
    props.form.resetFields();
    props.onClear();
  };
  handleBatch = () => {
    const props = this.props;
    props.onSummary({ businessNoList: props.selectedRowKeys });
  };
  handleExport = () => {
    const data = this.getData();
    if (data) {
      const search = Object.keys(data)
        .filter(item => data[item] !== null && data[item] !== undefined)
        .map(item => `${item}=${encodeURIComponent(data[item])}`)
        .join('&');
      this.oIframe.src = `/file/exportDataToExcel?${search}&v=${Date.now()}`;
    }
  };
  getData() {
    const props = this.props;
    const {
      rangeTime: [startTime, endTime] = [undefined, undefined],
      ...resetForm
    } = props.form.getFieldsValue();
    const start = startTime && startTime.valueOf();
    const end =
      endTime &&
      moment(endTime.valueOf())
        .subtract(31, 'd')
        .valueOf();
    if (start && end && end > start) {
      message.warning('保单创建时间间隔不能超过30天');
      return false;
    } else {
      const data: BatchPolicyFormData = {
        ...resetForm,
        startTime: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
        endTime: endTime && endTime.format('YYYY-MM-DD 23:59:59'),
      };
      return data;
    }
  }
  render() {
    const props = this.props;
    const { form, payStatusList, policyStatusList, selectedRowKeys } = props;
    const { rangeTime } = this.state;
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
            <FormItem {...formItemLayout} label="流水号" colon={false}>
              {getFieldDecorator('businessNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保险产品" colon={false}>
              {getFieldDecorator('productNo')(
                <Select placeholder="请选择" allowClear showSearch filterOption={filterOption}>
                  {props.productList.map((item: Product) => (
                    <Option key={item.productNo} value={item.productNo}>
                      {item.productName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="投保人姓名" colon={false}>
              {getFieldDecorator('appliName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="被保险人姓名" colon={false}>
              {getFieldDecorator('insuredName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="缴费状态" colon={false}>
              {getFieldDecorator('payFlag')(
                <Select placeholder="请选择" allowClear>
                  {payStatusList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保单状态" colon={false}>
              {getFieldDecorator('policyFlag')(
                <Select placeholder="请选择" allowClear>
                  {policyStatusList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="汇总号" colon={false}>
              {getFieldDecorator('batchTradeNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保单创建时间" colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime,
              })(<RangePicker />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="是否测试" colon={false}>
              {getFieldDecorator('testFlag')(
                <Select placeholder="请选择" allowClear>
                  <Option value="test">是</Option>
                  <Option value="">否</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          {/* <Col span={8}>
                        <FormItem {...formItemLayout} label='线路团号' colon={false}>
                            {
                                getFieldDecorator('businessNo',{
                                    getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
                                })(
                                    <Input placeholder='请输入' allowClear/>
                                )
                            }
                        </FormItem>
                    </Col> */}

          <Col span={24}>
            <FormItem className="form-action-wrapper tr">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code="batch_policy_summary">
                <Button
                  type="primary"
                  disabled={selectedRowKeys.length === 0}
                  onClick={this.handleBatch}
                >
                  批量汇总
                </Button>
              </AuthButton>
              <Button type="primary" onClick={this.handleClear}>
                清空
              </Button>
              <AuthButton code="batch_policy_export">
                <Button type="primary" onClick={this.handleExport}>
                  导出
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
  const { policyStatusList, payStatusList, productListByLoginId } = state.app;
  const { selectedRowKeys } = state.batchPolicy;
  return {
    policyStatusList,
    payStatusList,
    productList: productListByLoginId,
    selectedRowKeys,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<any>) => doGetBatchPolicyList.request(params),
      onClear: () => doBatchPolicySearchClear(),
      onSummary: (data: SummaryData) => doBatchPolicySummary.request(data),
      onProductList: (loginId: string) => doGetProductListByLoginId.request(loginId),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
