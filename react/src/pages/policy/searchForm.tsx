import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col, message, DatePicker } from 'antd';
import { trim, filterOption } from '@/utils/util';
import {
  SubmitFormDefaultProps,
  QueryParams,
  PolicyFormData,
  Dict,
  SetKey,
  Product,
  Channel,
  ChannelGroup
} from '@/types';
import { doGetPolicyList, doSetPolicyShowKey } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import * as moment from 'moment';
// import RangePicker, { Value } from '@/components/rangePicker';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<PolicyFormData>> {
  policyStatusList: Dict[];
  payStatusList: Dict[];
  onImportVisible: (data: SetKey) => void;
  productList: Product[];
  channelGroup: ChannelGroup;
}

interface State {
  // time: Value
  rangeTime: RangePickerValue;
}

class SearchForm extends React.Component<Props> {
  oIframe: HTMLIFrameElement;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      // time: {
      //     startTime: moment().subtract(7, 'd').format('YYYY-MM-DD 00:00:00'),
      //     endTime: moment().format('YYYY-MM-DD 23:59:59')
      // }
      rangeTime: [moment().subtract(7, 'd'), moment()]
    };
  }
  componentDidMount() {
    if (!this.oIframe) {
      this.oIframe = document.createElement('iframe');
      this.oIframe.style.display = 'none';
      document.body.appendChild(this.oIframe);
    }
  }
  componentWillUnmount() {
    if (this.oIframe) {
      document.body.removeChild(this.oIframe);
    }
  }
  handleSubmit = () => {
    const props = this.props;
    const { rangeTime: [startTime, endTime] = [undefined, undefined], ...resetForm } = props.form.getFieldsValue();
    const start = startTime && startTime.valueOf();
    const end =
      endTime &&
      moment(endTime.valueOf())
        .subtract(31, 'd')
        .valueOf();
    if (start && end && end > start) {
      message.warning('保单创建时间间隔不能超过30天');
      return;
    }
    const data: PolicyFormData = {
      ...resetForm,
      startTime: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
      endTime: endTime && endTime.format('YYYY-MM-DD 23:59:59')
    };
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  handleExport = () => {
    const props = this.props;
    const { rangeTime: [startTime, endTime] = [undefined, undefined], ...resetForm } = props.form.getFieldsValue();
    const start = startTime && startTime.valueOf();
    const end =
      endTime &&
      moment(endTime.valueOf())
        .subtract(31, 'd')
        .valueOf();
    if (start && end && end > start) {
      message.warning('保单创建时间间隔不能超过30天');
      return;
    }
    const data: PolicyFormData = {
      ...resetForm,
      startTime: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
      endTime: endTime && endTime.format('YYYY-MM-DD 23:59:59')
    };
    const search = Object.keys(data)
      .filter(item => data[item] !== null && data[item] !== undefined)
      .map(item => `${item}=${encodeURIComponent(data[item])}`)
      .join('&');
    this.oIframe.src = `/file/exportDataToExcel?${search}&v=${Date.now()}`;
  };
  render() {
    const props = this.props;
    const { form, policyStatusList, payStatusList } = props;
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
    const { rangeTime } = this.state;
    return (
      <Form className='form-wrapper'>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label='流水号' colon={false}>
              {getFieldDecorator('businessNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='投保单号' colon={false}>
              {getFieldDecorator('proposalNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='保单号' colon={false}>
              {getFieldDecorator('policyNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='渠道名称' colon={false}>
              {getFieldDecorator('channelNo')(
                <Select placeholder='请选择' showSearch filterOption={filterOption}>
                  {Object.keys(props.channelGroup).map((item: string) => {
                    const { channelNo, channelName, children } = props.channelGroup[item];
                    if (children.length > 1) {
                      return (
                        <OptGroup key={item} label={`${channelName}`}>
                          {children.map((child: Channel) => (
                            <Option key={child.channelNo} value={child.channelNo}>
                              {child.channelName}
                            </Option>
                          ))}
                        </OptGroup>
                      );
                    } else {
                      return (
                        <Option key={channelNo} value={channelNo}>
                          {channelName}
                        </Option>
                      );
                    }
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='产品名称' colon={false}>
              {getFieldDecorator('productNo')(
                <Select placeholder='请选择' showSearch filterOption={filterOption} allowClear>
                  {props.productList.map((item: Product) => (
                    <Option key={item.productNo} value={item.productNo}>
                      {item.productName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='投保人姓名' colon={false}>
              {getFieldDecorator('appliName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          {/* <Col span={8}>
                        <FormItem {...formItemLayout} label='被保险人姓名' colon={false}>
                            {
                                getFieldDecorator('insuredName',{
                                    getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
                                })(
                                    <Input placeholder='请输入' allowClear/>
                                )
                            }
                        </FormItem>
                    </Col> */}
          <Col span={8}>
            <FormItem {...formItemLayout} label='缴费状态' colon={false}>
              {getFieldDecorator('payFlag')(
                <Select placeholder='请选择' allowClear>
                  {payStatusList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='保单状态' colon={false}>
              {getFieldDecorator('policyFlag')(
                <Select placeholder='请选择' allowClear>
                  {policyStatusList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='保单创建时间' colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime
              })(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='是否测试' colon={false}>
              {getFieldDecorator('testFlag')(
                <Select placeholder='请选择' allowClear>
                  <Option value='test'>是</Option>
                  <Option value=''>否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={15} offset={1}>
            <FormItem className='form-action-wrapper'>
              <Button type='primary' onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code='insurance_policy_qzimport'>
                <Button
                  type='primary'
                  onClick={() => {
                    props.onImportVisible({ show: 'qzImport' });
                  }}
                >
                  保单导入-轻住
                </Button>
              </AuthButton>
              <AuthButton code='insurance_policy_import'>
                <Button
                  type='primary'
                  onClick={() => {
                    props.onImportVisible({ show: 'import' });
                  }}
                >
                  保单导入
                </Button>
              </AuthButton>
              <AuthButton code='insurance_policy_export'>
                <Button type='primary' onClick={this.handleExport}>
                  保单导出
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
  const { policyStatusList, payStatusList, productList, channelGroup } = state.app;
  return {
    policyStatusList,
    payStatusList,
    productList,
    channelGroup
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<PolicyFormData>) => doGetPolicyList.request(params),
      onImportVisible: (data: SetKey) => doSetPolicyShowKey(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
