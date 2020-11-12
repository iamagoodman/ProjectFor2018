import * as React from 'react';
import { DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;

export default class Picker extends React.Component {
  render() {
    return <RangePicker />;
  }
}
