import * as React from 'react';
import { Input, DatePicker, Icon } from 'antd';
import * as moment from 'moment';
import style from './index.module.less';
import { RateItem } from '@/types';

const InputGroup = Input.Group;

interface State {
  value: any[];
}

interface Props {
  keyId?: number;
  value?: RateItem[];
  onChange?: (value: any[]) => void;
}

export default class DateGroup extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: props.value || [
        {
          commissionRate: 0,
          beginTime: moment(moment().format('YYYY-MM-DD 00:00:00')).valueOf(),
          beginDate: moment(),
          endTime: moment(moment().format('YYYY-MM-DD 00:00:00'))
            .add(30, 'd')
            .valueOf(),
          endDate: moment().add(30, 'd')
        }
      ]
    };
  }
  state: State;
  currentTime: number;
  disabledTime: number;
  constructor(props: Props) {
    super(props);
    this.currentTime = moment(
      moment()
        .subtract(1, 'd')
        .format('YYYY-MM-DD 23:59:59')
    ).valueOf();
    this.disabledTime = this.currentTime + 1;
    this.state = {
      value: props.value || [
        {
          commissionRate: 0,
          beginTime: this.currentTime,
          beginDate: moment(),
          endTime: moment(moment().format('YYYY-MM-DD 00:00:00'))
            .add(30, 'd')
            .valueOf(),
          endDate: moment().add(30, 'd')
        }
      ]
    };
  }
  handleRateChange = (key: string, val: string, index: number) => {
    const props = this.props;
    const { value } = this.state;
    value[index][key] = val;
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleNumberChange = (key: string, val: string, index: number) => {
    const props = this.props;
    const { value } = this.state;
    if (/^\d*\.?\d*$/.test(val) && Number(val) <= 100) {
      value[index][key] = val;
      this.setValue(value);
      if (props.onChange) {
        props.onChange(value);
      }
    }
  };
  handleStartDateChange = (date: moment.Moment, index: number) => {
    const { value } = this.state;
    value[index].beginTime = moment(date.format('YYYY-MM-DD 00:00:00')).valueOf();
    value[index].beginDate = date;
    this.setValue(value);
  };
  handleEndDateChange = (date: moment.Moment, index: number) => {
    const { value } = this.state;
    value[index].endTime = moment(date.format('YYYY-MM-DD 00:00:00')).valueOf();
    value[index].endDate = date;
    this.setValue(value);
  };

  handleAddRatio = () => {
    const { value } = this.state;
    const len = value.length;
    let lastEndTime = value[len - 1].endTime;
    if (lastEndTime <= this.disabledTime) {
      lastEndTime = this.disabledTime;
    }
    value.push({
      commissionRate: 0,
      beginDate: moment(lastEndTime),
      beginTime: lastEndTime,
      endDate: moment(lastEndTime).add(30, 'd'),
      endTime: moment(lastEndTime)
        .add(30, 'd')
        .valueOf()
    });
    this.setValue([...value]);
  };
  handleRemoveRation = (index: number) => {
    const { value } = this.state;
    value.splice(index, 1);
    this.setValue(value);
  };
  setValue(value: any[]) {
    const props = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }
    if (props.onChange) {
      props.onChange(value);
    }
  }

  disabledStartDate = (cur: moment.Moment | undefined, index: number) => {
    const currentTime = cur && moment(cur.format('YYYY-MM-DD 00:00:00')).valueOf();
    const { keyId } = this.props;
    const { value } = this.state;
    const { endTime } = value[index];
    const lastEndTime: number = index > 0 ? value[index - 1].endTime : undefined;

    if (keyId) {
      return (
        (currentTime &&
          (currentTime <= this.currentTime ||
            (endTime && currentTime >= endTime) ||
            (lastEndTime && currentTime < lastEndTime))) ||
        false
      );
    }

    return (
      (currentTime && ((endTime && currentTime >= endTime) || (lastEndTime && currentTime < lastEndTime))) || false
    );
  };
  disabledEndDate = (cur: moment.Moment | undefined, index: number) => {
    const currentTime = cur && moment(cur.format('YYYY-MM-DD 00:00:00')).valueOf();
    const { keyId } = this.props;
    const { value } = this.state;
    const { beginTime } = value[index];
    const len = value.length;

    const nextBeginTime: number = index === len - 1 ? undefined : value[index + 1].beginTime;

    if (keyId) {
      return (
        (currentTime &&
          (currentTime <= this.currentTime ||
            (beginTime && currentTime <= beginTime) ||
            (nextBeginTime && currentTime > nextBeginTime))) ||
        false
      );
    }

    return (
      (currentTime && ((beginTime && currentTime <= beginTime) || (nextBeginTime && currentTime > nextBeginTime))) ||
      false
    );
  };
  render() {
    const { value = [] } = this.state;
    const { keyId } = this.props;
    return (
      <div>
        {value.map((item: RateItem, index: number) => (
          <div className={style['ratio-wrapper']} key={index}>
            <InputGroup compact>
              <Input
                style={{ width: '33.4%' }}
                placeholder='请输入佣金比例'
                addonAfter='%'
                value={item.commissionRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.handleNumberChange('commissionRate', e.target.value, index);
                }}
                disabled={!!keyId && item.beginTime && item.beginTime <= this.currentTime}
              />
              <DatePicker
                value={item.beginDate}
                style={{ width: '33.3%' }}
                placeholder='请选择生效开始时间'
                disabledDate={(current: moment.Moment | undefined) => this.disabledStartDate(current, index)}
                onChange={(date: moment.Moment) => {
                  this.handleStartDateChange(date, index);
                }}
                disabled={!!keyId && item.beginTime && item.beginTime <= this.currentTime}
                allowClear={false}
              />
              <DatePicker
                value={item.endDate}
                style={{ width: '33.3%' }}
                placeholder='请选择生效截止时间'
                disabledDate={(current: moment.Moment | undefined) => this.disabledEndDate(current, index)}
                onChange={(date: moment.Moment) => {
                  this.handleEndDateChange(date, index);
                }}
                disabled={!!keyId && item.endTime && item.endTime <= this.disabledTime}
                allowClear={false}
              />
            </InputGroup>
            {index === 0 ? (
              <Icon type='plus-circle' className={style['add-commission-ratio']} onClick={this.handleAddRatio} />
            ) : !keyId || (item.beginDate && item.beginTime > this.currentTime) ? (
              <Icon
                type='minus-circle'
                className={style['remove-commission-ratio']}
                onClick={() => {
                  this.handleRemoveRation(index);
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
