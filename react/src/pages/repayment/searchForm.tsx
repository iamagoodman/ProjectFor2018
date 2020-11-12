import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Row, Col, message, DatePicker } from 'antd';
import { trim } from '@/utils/util';
import { SubmitFormDefaultProps, QueryParams, PaymentFormData, Dict } from '@/types';
import { doGetPaymentList } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
// import RangePicker, { Value } from '@/components/rangePicker';
import * as moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

interface Props extends SubmitFormDefaultProps<QueryParams<PaymentFormData>> {
  transactionTypeList: Dict[];
}

interface State {
  // time: Value
  rangeTime: RangePickerValue;
}

class SearchForm extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      // time: {
      //     startTime: moment().subtract(7, 'd').format('YYYY-MM-DD 00:00:00'),
      //     endTime: moment().format('YYYY-MM-DD 23:59:59')
      // }
      rangeTime: [moment().subtract(7, 'd'), moment()],
    };
  }
  componentDidMount() {
    const props = this.props;
    // const { time: { startTime, endTime } } = this.state;
    const { rangeTime: [startTime, endTime] = [undefined, undefined] } = this.state;
    const paymentType =
      props.transactionTypeList.length > 0 ? props.transactionTypeList[0].name : undefined;
    props.form.setFieldsValue({ paymentType });

    paymentType &&
      props.onSubmit({
        data: {
          startTimeStr: startTime && startTime.format('YYYY-MM-DD 00:00:00'),
          endTimeStr: endTime && endTime.format('YYYY-MM-DD 23:59:59'),
          paymentType,
        },
        pageSize: 10,
        pageNumber: 1,
      });
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
    const data: PaymentFormData = {
      ...resetForm,
      paymentType,
      startTimeStr: startTime.format('YYYY-MM-DD 00:00:00'),
      endTimeStr: endTime.format('YYYY-MM-DD 23:59:59'),
    };

    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
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
    // const { time } = this.state;
    const { rangeTime } = this.state;
    return (
      <Form className="form-wrapper">
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="保单号" colon={false}>
              {getFieldDecorator('policyNo', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
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
            <FormItem {...formItemLayout} label="收付类型" colon={false}>
              {getFieldDecorator('paymentType')(
                <Select placeholder="请选择">
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
            <FormItem {...formItemLayout} label="收付时间" colon={false}>
              {getFieldDecorator('rangeTime', {
                initialValue: rangeTime,
              })(<RangePicker allowClear={false} />)}
            </FormItem>
          </Col>

          <Col span={8} offset={1}>
            <FormItem>
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
  return {
    transactionTypeList: state.app.transactionTypeList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<PaymentFormData>) => doGetPaymentList.request(params),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
