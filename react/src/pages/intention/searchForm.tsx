import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Select, Button, Row, Col, DatePicker, message } from 'antd';
import { filterOption } from '@/utils/util';
import { SubmitFormDefaultProps, QueryParams, IntentionFormData, Channel, ChannelGroup } from '@/types';
import { doGetIntentionList, doGetChannelGroupAll } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
// import RangePicker, { Value } from '@/components/rangePicker';
import * as moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;

const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<IntentionFormData>> {
  channelGroup: ChannelGroup;
  totalCount: number;
  formData: IntentionFormData;
  getChannelGroupAll: () => void;
}

interface State {
  // time: Value
  rangeTime: RangePickerValue;
}

class SearchForm extends React.Component<Props> {
  state: State;
  oIframe: HTMLIFrameElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      rangeTime: [moment().subtract(7, 'd'), moment()]
    };
  }

  componentDidMount() {
    this.props.getChannelGroupAll();
    this.handleSubmit();
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
  handleExport = (src: string) => {
    const { formData: data } = this.props;
    const params = Object.keys(data)
      .filter(item => data[item])
      .map(item => `${item}=${encodeURIComponent(data[item])}`)
      .join('&');
    this.oIframe.src = `${src}?v=${Date.now()}&${params}`;
  };
  handleSubmit = () => {
    const props = this.props;
    const {
      rangeTime: [startDate, endDate],
      ...resetForm
    } = props.form.getFieldsValue();
    const start = startDate && startDate.valueOf();
    const end =
      endDate &&
      moment(endDate.valueOf())
        .subtract(31, 'd')
        .valueOf();
    if (start && end && end > start) {
      message.warning('收付时间间隔不能超过30天');
      return;
    }
    const data: IntentionFormData = {
      startDate: startDate && startDate.format('YYYY-MM-DD 00:00:00'),
      endDate: endDate && endDate.format('YYYY-MM-DD 23:59:59'),
      ...resetForm
    };

    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  handleDateChange = (value: [moment.Moment, moment.Moment]) => {
    this.setState({ rangeTime: value });
  };

  render() {
    const props = this.props;
    const { form } = props;
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
            <FormItem {...formItemLayout} label='渠道名称' colon={false}>
              {getFieldDecorator('channelName')(
                <Select placeholder='请选择' allowClear showSearch filterOption={filterOption}>
                  {Object.keys(props.channelGroup).map((item: string) => {
                    const { channelNo, channelName, children } = props.channelGroup[item];
                    if (children.length > 1) {
                      return (
                        <OptGroup key={item} label={`${channelName}`}>
                          {children.map((child: Channel) => (
                            <Option key={child.channelNo} value={child.channelName}>
                              {child.channelName}
                            </Option>
                          ))}
                        </OptGroup>
                      );
                    } else {
                      return (
                        <Option key={channelNo} value={channelName}>
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
            <FormItem {...formItemLayout} label='投保收集时间' colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime
              })(<RangePicker allowClear={false} onChange={this.handleDateChange} />)}
            </FormItem>
          </Col>

          <Col span={24} className='tr'>
            <FormItem className='form-action-wrapper'>
              <Button type='primary' onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code='insurance_intention_export_policy'>
                <Button
                  disabled={!props.totalCount}
                  type='primary'
                  onClick={() => {
                    this.handleExport('/insuranceIntention/exportInsuranceIntentionInfo');
                  }}
                >
                  导出投保清单
                </Button>
              </AuthButton>
              <AuthButton code='insurance_intention_export_employee'>
                <Button
                  type='primary'
                  disabled={!props.totalCount}
                  onClick={() => {
                    this.handleExport('/insuranceIntention/exportInsuranceIntentionEmployeeInfo');
                  }}
                >
                  导出雇员清单
                </Button>
              </AuthButton>
              <AuthButton code='insurance_intention_export_image'>
                <Button
                  type='primary'
                  disabled={!props.totalCount}
                  onClick={() => {
                    this.handleExport('/insuranceIntention/export');
                  }}
                >
                  导出影像资料
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
  const { app, intention } = state;
  const {
    formData,
    page: { totalCount }
  } = intention;
  const { channelGroup } = app;
  return {
    channelGroup,
    totalCount,
    formData
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<IntentionFormData>) => doGetIntentionList.request(params),
      getChannelGroupAll: () => doGetChannelGroupAll.request()
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
