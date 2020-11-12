import * as React from 'react';
import { DatePicker, Row, Col } from 'antd';
import * as moment from 'moment';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

export interface Value {
  startTime?: string;
  endTime?: string;
}

interface State {
  startTime?: moment.Moment;
  endTime?: moment.Moment;
  endOpen: boolean;
}

interface RangePickerProps {
  value?: Value;
  onChange?: (value?: Value) => void;
  formatStart: string;
  formatEnd: string;
  interval?: number;
}

type Props = RangePickerProps & DatePickerProps;

export default class RangePicker extends React.Component<Props> {
  static defaultProps = {
    formatStart: 'YYYY-MM-DD 00:00:00',
    formatEnd: 'YYYY-MM-DD 23:59:59',
  };
  state: State;
  constructor(props: Props) {
    super(props);
    const startTime =
      props.value && props.value.startTime ? moment(props.value.startTime) : undefined;
    const endTime = props.value && props.value.endTime ? moment(props.value.endTime) : undefined;
    this.state = {
      startTime,
      endTime,
      endOpen: false,
    };
  }
  disabledStartDate = (startTime: moment.Moment | undefined) => {
    const { endTime } = this.state;
    const { interval } = this.props;
    if (!startTime || !endTime) {
      return false;
    }
    const intervalTime = moment(startTime.valueOf()).add(interval, 'd');
    return (
      startTime.valueOf() > endTime.valueOf() ||
      (interval ? intervalTime.valueOf() <= endTime.valueOf() : false)
    );
  };

  disabledEndDate = (endTime: moment.Moment | undefined) => {
    const { startTime } = this.state;
    const { interval } = this.props;
    if (!endTime || !startTime) {
      return false;
    }
    const intervalTime = moment(endTime.valueOf()).subtract(interval, 'd');
    return (
      endTime.valueOf() <= startTime.valueOf() ||
      (interval ? intervalTime.valueOf() > startTime.valueOf() : false)
    );
  };
  handleStartOpenChange = (open: boolean) => {
    if (!open) {
      this.setState({
        endOpen: true,
      });
    }
  };
  handleEndOpenChange = (open: boolean) => {
    this.setState({
      endOpen: open,
    });
  };
  onStartChange = (value?: moment.Moment) => {
    const props = this.props;
    const { formatStart, formatEnd } = props;
    const { endTime } = this.state;
    this.setState({
      startTime: value,
    });
    if (props.onChange) {
      props.onChange({
        startTime: value && moment(value).format(formatStart),
        endTime: endTime && moment(endTime).format(formatEnd),
      });
    }
  };
  onEndChange = (value?: moment.Moment) => {
    const props = this.props;
    const { formatStart, formatEnd } = props;
    const { startTime } = this.state;
    this.setState({
      endTime: value,
    });
    if (props.onChange) {
      props.onChange({
        startTime: startTime && moment(startTime).format(formatStart),
        endTime: value && moment(value).format(formatEnd),
      });
    }
  };
  render() {
    const { startTime, endTime, endOpen } = this.state;
    return (
      <Row>
        <Col span={11}>
          <DatePicker
            value={startTime}
            onChange={this.onStartChange}
            allowClear={false}
            onOpenChange={this.handleStartOpenChange}
            disabledDate={this.disabledStartDate}
          />
        </Col>
        <Col span={2} className="tc">
          ~
        </Col>
        <Col span={11}>
          <DatePicker
            value={endTime}
            onChange={this.onEndChange}
            allowClear={false}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
            disabledDate={this.disabledEndDate}
          />
        </Col>
      </Row>
    );
  }
}
