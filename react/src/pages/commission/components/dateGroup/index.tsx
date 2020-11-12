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
    const currentDate = moment().format('YYYY-MM-DD 00:00:00');
    return {
      value: props.value || [
        {
          commissionRate: 0,
          beginTime: moment(currentDate).valueOf(),
          beginDate: moment(),
          endTime: moment(currentDate)
            .add(30, 'd')
            .valueOf(),
          endDate: moment().add(30, 'd')
        }
      ]
    };
  }
  state: State;
  currentTime: number;
  currentDisabledTime: number;
  isCoverToday: boolean;
  constructor(props: Props) {
    super(props);
    const currentDate = moment().format('YYYY-MM-DD 00:00:00');
    this.currentTime = moment(currentDate).valueOf();
    this.currentDisabledTime = this.currentTime + 24 * 60 * 60 * 1000;
    const currentValue = props.value || [
      {
        commissionRate: 0,
        beginTime: this.currentTime,
        beginDate: moment(),
        endTime: moment(currentDate)
          .add(30, 'd')
          .valueOf(),
        endDate: moment().add(30, 'd')
      }
    ];
    this.isCoverToday = currentValue[0].beginTime >= this.currentDisabledTime ? false : true;
    this.state = {
      value: currentValue
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
    const dateTime = moment(date.format('YYYY-MM-DD 00:00:00')).valueOf();
    value[index].beginTime = dateTime;
    value[index].beginDate = date;
    if (index > 0) {
      // 上一个佣金比例生效日期的结束时间与当前佣金比例生效开始时间连续
      value[index - 1].endTime = dateTime;
      value[index - 1].endDate = date;
    }
    this.setValue(value);
  };
  handleEndDateChange = (date: moment.Moment, index: number) => {
    const { value } = this.state;
    const dateTime = moment(date.format('YYYY-MM-DD 00:00:00')).valueOf();
    value[index].endTime = dateTime;
    value[index].endDate = date;
    if (index < value.length - 1) {
      // 下一个佣金比例生效开始时间与当前佣金比例生效结束时间连续
      value[index + 1].beginTime = date.valueOf();
      value[index + 1].beginDate = date;
    }

    this.setValue(value);
  };

  handleAddRatio = () => {
    const { value } = this.state;
    const { keyId } = this.props;
    const len = value.length;
    const { beginTime, beginDate } = value[0];
    const newBeginDate = moment(beginTime).subtract(30, 'd');
    if (!keyId) {
      value.unshift({
        commissionRate: 0,
        beginDate: newBeginDate,
        beginTime: newBeginDate.valueOf(),
        endDate: beginDate,
        endTime: beginTime
      });
    } else {
      let temp = -1;
      const index = len - 1 < 0 ? 0 : len - 1;
      for (let i = 0; i < len; i++) {
        const item = value[i];
        if (item.beginTime && item.beginTime > this.currentTime) {
          temp = i;
          break;
        }
      }
      const endDate = temp === -1 ? moment(this.currentTime).add(30, 'd') : moment(value[index].beginTime).add(30, 'd');

      value.splice(index, 0, {
        commissionRate: value[index] ? value[index].commissionRate : 0,
        beginTime: value[index] ? value[index].beginTime : this.currentTime,
        beginDate: value[index] ? moment(value[index].beginTime) : moment(this.currentTime),
        endTime: endDate.valueOf(),
        endDate
      });
      value[value.length - 1] = {
        commissionRate: 0,
        beginTime: endDate.valueOf(),
        beginDate: endDate
      };
    }
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

  disabledStartDate = (current: moment.Moment | undefined, index: number) => {
    const currentTime = current && moment(current.format('YYYY-MM-DD 00:00:00')).valueOf();
    const { keyId } = this.props;

    // 当前佣金比例生效开始时间不能小于上一个佣金比例生效开始时间
    const { value } = this.state;
    const len = value.length;
    const endTime = index === len - 1 ? undefined : value[index].endTime;
    const lastBeginTime: number = index > 0 ? value[index - 1].beginTime : undefined;

    if (keyId) {
      return (
        (currentTime &&
          (currentTime < (this.isCoverToday ? this.currentDisabledTime : this.currentTime) ||
            (endTime && currentTime >= endTime) ||
            (lastBeginTime && currentTime <= lastBeginTime))) ||
        false
      );
    }

    return (
      (currentTime && ((endTime && currentTime >= endTime) || (lastBeginTime && currentTime <= lastBeginTime))) || false
    );
  };
  disabledEndDate = (current: moment.Moment | undefined, index: number) => {
    const currentTime = current && moment(current.format('YYYY-MM-DD 00:00:00')).valueOf();
    const { keyId } = this.props;
    // 当前佣金比例生效结束时间不能大于下一个佣金比例生效结束时间
    const { value } = this.state;
    const { beginTime } = value[index];
    const len = value.length;
    const nextEndTime: number | undefined = index === len - 2 ? undefined : value[index + 1].endTime;

    if (keyId) {
      return (
        (currentTime &&
          (currentTime < this.currentDisabledTime ||
            (beginTime && currentTime <= beginTime) ||
            (nextEndTime && currentTime >= nextEndTime))) ||
        false
      );
    }

    return (
      (currentTime && ((beginTime && currentTime <= beginTime) || (nextEndTime && currentTime >= nextEndTime))) || false
    );
  };
  render() {
    const { value = [] } = this.state;
    const { keyId } = this.props;
    const len = value.length;
    return (
      <div>
        {value.map((item: any, index: number) => (
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
                disabled={
                  !!keyId &&
                  item.beginTime &&
                  item.beginTime <= (this.isCoverToday ? this.currentTime : this.currentTime - 1)
                }
              />
              <DatePicker
                value={item.beginDate}
                style={{ width: '33.3%' }}
                placeholder='请选择生效开始时间'
                disabledDate={(current: moment.Moment | undefined) => this.disabledStartDate(current, index)}
                onChange={(date: moment.Moment) => {
                  this.handleStartDateChange(date, index);
                }}
                disabled={
                  !!keyId &&
                  item.beginTime &&
                  item.beginTime <= (this.isCoverToday ? this.currentTime : this.currentTime - 1)
                }
                allowClear={false}
              />
              {index === len - 1 ? (
                <Input style={{ width: '33.3%' }} value='永久' disabled />
              ) : (
                <DatePicker
                  value={item.endDate}
                  style={{ width: '33.3%' }}
                  placeholder='请选择生效截止时间'
                  disabledDate={(current: moment.Moment | undefined) => this.disabledEndDate(current, index)}
                  onChange={(date: moment.Moment) => {
                    this.handleEndDateChange(date, index);
                  }}
                  disabled={!!keyId && item.endTime && item.endTime <= this.currentTime}
                  allowClear={false}
                />
              )}
            </InputGroup>
            {index === 0 ? (
              <Icon type='plus-circle' className={style['add-commission-ratio']} onClick={this.handleAddRatio} />
            ) : (!keyId || (item.beginDate && item.beginTime > this.currentTime)) && index !== len - 1 ? (
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
