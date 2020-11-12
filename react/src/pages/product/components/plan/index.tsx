import * as React from 'react';
import { Select, Input, Icon } from 'antd';
import style from './index.module.less';
import { RiskTypeItem, PlanItem, PlanItemRisk } from '@/types';
import uuidv4 from 'uuid/v4';

const InputGroup = Input.Group;
const Option = Select.Option;

interface State {
  value: PlanItem[];
}

interface Props {
  editable?: boolean;
  riskTypes: RiskTypeItem[];
  value?: PlanItem[];
  onChange?: (value: PlanItem[]) => void;
}

class Plan extends React.Component<Props> {
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: props.value
    };
  }
  state: State;
  constructor(props: Props) {
    super(props);
    // this.state = {
    //   value: props.value || [
    //     {
    //       riskTypes: [{ uniqueId: uuidv4() }],
    //       uniqueId: uuidv4(),
    //     },
    //   ],
    // };
    this.state = {
      value: props.value
    };
  }
  handleAddItem = () => {
    const props = this.props;
    const { value = [] } = this.state;
    value.push({ riskTypes: [{}], uniqueId: uuidv4() });
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleRemoveItem = (index: number) => {
    const props = this.props;
    const { value } = this.state;
    value.splice(index, 1);
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleAddItemRisk = (index: number) => {
    const props = this.props;
    const { value } = this.state;
    value[index].riskTypes.push({});
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleRemoveItemRisk = (i: number, j: number) => {
    const { value } = this.state;
    const props = this.props;
    value[i].riskTypes.splice(j, 1);
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleChangeItem = (key: string, val: string, index: number, isNumber = false) => {
    if (isNumber && !/^(\d+(\.\d*)?)?$/.test(val)) {
      return;
    }
    const props = this.props;
    const { value } = this.state;
    value[index][key] = val;
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleChangeItemRisk = (key: string, val: string, i: number, j: number, isNumber = false) => {
    if (isNumber && !/^(\d+(\.\d*)?)?$/.test(val)) {
      return;
    }
    const props = this.props;
    const { value } = this.state;
    value[i].riskTypes[j][key] = val;
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  setValue(value: RiskTypeItem[]) {
    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }
  }
  render() {
    const { value = [] } = this.state;
    const { riskTypes } = this.props;
    return (
      <div>
        {value.length === 0 ? (
          <Icon type='plus-circle' className={style['add-item']} onClick={this.handleAddItem} />
        ) : null}
        {value.map((item: PlanItem, index: number) => (
          <div key={item.uniqueId} className={style.item}>
            <div>
              <InputGroup compact>
                <Input
                  style={{ width: '33.3%' }}
                  placeholder='方案代码'
                  value={item.planCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.handleChangeItem('planCode', e.target.value, index);
                  }}
                />
                <Input
                  style={{ width: '33.3%' }}
                  placeholder='方案名称'
                  value={item.planName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.handleChangeItem('planName', e.target.value, index);
                  }}
                />
                <Input
                  style={{ width: '33.4%' }}
                  placeholder='方案保费'
                  value={item.planPremium}
                  addonAfter='元'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.handleChangeItem('planPremium', e.target.value, index, true);
                  }}
                />
              </InputGroup>
            </div>
            <div style={{ paddingLeft: '40px' }}>
              {item.riskTypes.map((risk: PlanItemRisk, i: number) => (
                <div key={i} className={style['item-risk']}>
                  <InputGroup compact>
                    <Select
                      style={{ width: '50%' }}
                      placeholder='已配置险别'
                      value={risk.riskCode}
                      onChange={(value: string) => {
                        this.handleChangeItemRisk('riskCode', value, index, i);
                      }}
                    >
                      {riskTypes
                        .filter(type => type.riskCode)
                        .map((type, j) => (
                          <Option key={type.uniqueId} value={type.riskCode}>
                            {type.riskName}
                          </Option>
                        ))}
                    </Select>
                    <Input
                      style={{ width: '50%' }}
                      placeholder='保险金额'
                      value={risk.riskSumAmount}
                      addonAfter='元'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.handleChangeItemRisk('riskSumAmount', e.target.value, index, i, true);
                      }}
                    />
                  </InputGroup>
                  {i === 0 ? (
                    <Icon
                      type='plus'
                      className={style['item-risk-icon']}
                      onClick={() => {
                        this.handleAddItemRisk(index);
                      }}
                    />
                  ) : (
                    <Icon
                      type='minus'
                      className={style['item-risk-icon']}
                      onClick={() => {
                        this.handleRemoveItemRisk(index, i);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              {index === 0 ? (
                <Icon type='plus-circle' className={style['item-icon']} onClick={this.handleAddItem} />
              ) : (
                <Icon
                  type='minus-circle'
                  className={style['item-icon']}
                  onClick={() => {
                    this.handleRemoveItem(index);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Plan;
