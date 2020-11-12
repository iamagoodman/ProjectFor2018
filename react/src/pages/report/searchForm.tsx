import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Select, Button, Row, Col, DatePicker, message } from 'antd';
import { SubmitFormDefaultProps, QueryParams, ReportFormData, Dict, ReportCompany } from '@/types';
import { doGetReportList, doGetReportCompanyList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { filterOption } from '@/utils/util';
import * as moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<ReportFormData>> {
  transactionTypeList: Dict[];
  companyList: ReportCompany[];
  onTypeChange: (type: string) => void;
}

interface State {
  rangeTime: RangePickerValue;
}

class SearchForm extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      rangeTime: [moment().subtract(7, 'd'), moment()],
    };
  }
  componentDidMount() {
    const props = this.props;
    const { rangeTime: [startTime, endTime] = [undefined, undefined] } = this.state;
    const paymentType =
      props.transactionTypeList.length > 0 ? props.transactionTypeList[0].name : undefined;
    props.form.setFieldsValue({ paymentType });
    if (paymentType) {
      props.onTypeChange(paymentType);
      props.onSubmit({
        data: {
          paymentType,
          startTime: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
          endTime: endTime && endTime.format('YYYY-MM-DD 23:59:59'),
        },
        pageSize: 10,
        pageNumber: 1,
      });
    }
  }
  handleSubmit = () => {
    const props = this.props;
    const {
      rangeTime: [startTime, endTime] = [undefined, undefined],
      paymentType,
      ...resetForm
    } = props.form.getFieldsValue();
    const start = startTime && startTime.valueOf();
    const end =
      endTime &&
      moment(endTime.valueOf())
        .subtract(31, 'd')
        .valueOf();
    if (!paymentType) {
      message.warning('收付类型不能为空');
      return;
    }
    if (start && end && end > start) {
      message.warning('收付时间间隔不能超过30天');
      return;
    }
    const data: ReportFormData = {
      ...resetForm,
      paymentType,
      startTime: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
      endTime: endTime && endTime.format('YYYY-MM-DD 23:59:59'),
    };
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  handleTypeChange = (value: string) => {
    const props = this.props;
    props.onTypeChange(value);
    props.form.setFieldsValue({
      companyNo: undefined,
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
    const { rangeTime } = this.state;
    return (
      <Form className="form-wrapper">
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="收付类型" colon={false}>
              {getFieldDecorator('paymentType')(
                <Select placeholder="请选择" onChange={this.handleTypeChange}>
                  {props.transactionTypeList.map((item: Dict) => (
                    <Option key={item.name} value={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="收付主体名称" colon={false}>
              {getFieldDecorator('companyNo')(
                <Select placeholder="请选择" allowClear showSearch filterOption={filterOption}>
                  {props.companyList.map((item: ReportCompany) => (
                    <Option key={item.companyNo} value={item.companyNo}>
                      {item.companyName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="收付时间" colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime,
              })(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem className="tr">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, report } = state;
  const { policyStatusList, transactionTypeList } = app;
  const { companyList } = report;
  return {
    policyStatusList,
    transactionTypeList,
    companyList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<ReportFormData>) => doGetReportList.request(params),
      onTypeChange: (type: string) => doGetReportCompanyList.request(type),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
