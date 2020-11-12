import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { trim, filterOption } from '@/utils/util';
import {
  SubmitFormDefaultProps,
  QueryParams,
  PolicyMarketFormData,
  SetKey,
  Channel,
  Company,
  ChannelGroup
} from '@/types';
import { doGetPolicyMarketList, doSetPolicyMarketShowKey, doGetPolicyMarketProductList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import * as moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<PolicyMarketFormData>> {
  onImportVisible: (data: SetKey) => void;
  channelList: Channel[];
  productList: string[];
  companyList: Company[];
  doGetProductList: () => void;
  channelGroup: ChannelGroup;
  totalCount: number;
  formData: PolicyMarketFormData;
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
      rangeTime: [moment().subtract(7, 'd'), moment()]
    };
  }
  componentDidMount() {
    this.props.doGetProductList();
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
  handleExport = () => {
    const { formData: data, totalCount } = this.props;

    const params = Object.keys(data)
      .filter(item => data[item])
      .map(item => `${item}=${encodeURIComponent(data[item])}`)
      .join('&');
    this.oIframe.src = `/mkt/getPolicyListByUser?export=true&page=1&size=${totalCount}&v=${Date.now()}&${params}`;
  };
  handleSubmit = () => {
    const props = this.props;
    const {
      rangeTime: [underwritingStartDate, underwritingEndDate] = [undefined, undefined],
      ...resetForm
    } = props.form.getFieldsValue();
    const data: PolicyMarketFormData = {
      ...resetForm,
      underwritingStartDate: underwritingStartDate && underwritingStartDate.format('YYYY-MM-DD 00:00:00'),
      underwritingEndDate: underwritingEndDate && underwritingEndDate.format('YYYY-MM-DD 23:59:59')
    };
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
    const { rangeTime } = this.state;
    return (
      <Form className='form-wrapper'>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label='登录账号' colon={false}>
              {getFieldDecorator('loginId', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label='营销员工号' colon={false}>
              {getFieldDecorator('mktStaffNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col> */}
          <Col span={8}>
            <FormItem {...formItemLayout} label='保单号' colon={false}>
              {getFieldDecorator('policyNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='保险公司名称' colon={false}>
              {getFieldDecorator('insureCompanyName')(
                <Select placeholder='请选择' showSearch filterOption={filterOption} allowClear>
                  {props.companyList.map((item: Company) => (
                    <Option key={item.companyNo} value={item.companyName}>
                      {item.companyName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='渠道名称' colon={false}>
              {getFieldDecorator('channelName')(
                <Select placeholder='请选择' showSearch allowClear filterOption={filterOption}>
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
              {getFieldDecorator('productName')(
                <Select placeholder='请选择' allowClear filterOption={filterOption} showSearch>
                  {props.productList.map((item: string) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label='投保人姓名' colon={false}>
              {getFieldDecorator('applicantName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col> */}
          {/* <Col span={8}>

                        <FormItem {...formItemLayout} label="投保人身份证号" colon={false}>
                            {getFieldDecorator('applicantIdNo', {
                                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
                            })(<Input placeholder="请输入" allowClear />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="投保人手机号" colon={false}>
                            {getFieldDecorator('applicantMobile', {
                                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
                            })(<Input placeholder="请输入" allowClear />)}
                        </FormItem>
                    </Col> */}
          {/* <Col span={8}>
            <FormItem {...formItemLayout} label='被保险人姓名' colon={false}>
              {getFieldDecorator('insuredName', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col> */}
          <Col span={8}>
            <FormItem {...formItemLayout} label='子渠道代码' colon={false}>
              {getFieldDecorator('thirdChannelNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
              })(<Input placeholder='请输入' allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label='承保日期' colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime
              })(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>

          <Col span={7} offset={1}>
            <FormItem className='form-action-wrapper'>
              <Button type='primary' onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code='insurance_policy_market_import'>
                <Button
                  type='primary'
                  onClick={() => {
                    props.onImportVisible({ show: 'import' });
                  }}
                >
                  保单导入
                </Button>
              </AuthButton>
              <AuthButton code='insurance_policy_market_export'>
                <Button type='primary' disabled={!props.totalCount} onClick={this.handleExport}>
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
  const { channelList, companyList, channelGroup } = state.app;
  const {
    productList,
    page: { totalCount },
    formData
  } = state.market;
  return {
    channelList,
    companyList,
    channelGroup,
    productList,
    totalCount,
    formData
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<PolicyMarketFormData>) => doGetPolicyMarketList.request(params),
      onImportVisible: (data: SetKey) => doSetPolicyMarketShowKey(data),
      doGetProductList: () => doGetPolicyMarketProductList.request()
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
