import * as React from 'react';
import { Input, Icon, Select } from 'antd';
import { RiskTypeItem, Dict } from '@/types';
import uuidv4 from 'uuid/v4';
import style from './index.module.less';

const InputGroup = Input.Group;
const Option = Select.Option;

interface State {
  value: RiskTypeItem[];
}

interface Props {
  editable: boolean;
  value?: RiskTypeItem[];
  onChange?: (value: RiskTypeItem[]) => void;
  dict: Dict[];
}

export default class Risk extends React.Component<Props> {
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: props.value
    };
  }
  state: State;
  constructor(props: Props) {
    super(props);
    // this.state = {
    //   value: props.value || [{ uniqueId: uuidv4() }],
    // };
    this.state = {
      value: props.value
    };
  }
  handleAddKind = () => {
    const { value = [] } = this.state;
    const props = this.props;
    value.push({
      uniqueId: uuidv4()
    });
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleRemoveKind = (index: number) => {
    const { value = [] } = this.state;
    const props = this.props;
    value.splice(index, 1);
    this.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  handleKindChange = (key: string, val: string, index: number) => {
    const { value } = this.state;
    const props = this.props;
    value[index][key] = val;
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
    const { dict, editable } = this.props;
    return (
      <div>
        {value.length === 0 ? (
          <Icon type='plus-circle' className={style['add-risk']} onClick={this.handleAddKind} />
        ) : null}
        {value.map((item: RiskTypeItem, index: number) => (
          <div key={item.uniqueId} className={style['kind-wrapper']}>
            <InputGroup compact>
              <Input
                disabled={!editable}
                autoComplete='off'
                style={{ width: '33.3%' }}
                value={item.riskCode}
                placeholder='险别代码'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.handleKindChange('riskCode', e.target.value, index);
                }}
              />
              <Input
                disabled={!editable}
                autoComplete='off'
                style={{ width: '33.3%' }}
                value={item.riskName}
                placeholder='险别名称'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.handleKindChange('riskName', e.target.value, index);
                }}
              />
              <Select
                disabled={!editable}
                style={{ width: '33.4%' }}
                value={item.riskType}
                placeholder='险别类别'
                onChange={(value: string) => {
                  this.handleKindChange('riskType', value, index);
                }}
              >
                {dict.map((item: Dict) => (
                  <Option value={item.name} key={item.name}>
                    {item.dName}
                  </Option>
                ))}
              </Select>
            </InputGroup>
            {/* {editable ? (
              index === 0 ? (
                <Icon
                  type="plus-circle"
                  className={style['add-kind']}
                  onClick={this.handleAddKind}
                />
              ) : (
                  <Icon
                    type="minus-circle"
                    className={style['remove-kind']}
                    onClick={() => {
                      this.handleRemoveKind(index);
                    }}
                  />
                )
            ) : null} */}
            {editable ? (
              <div className={style.action}>
                <Icon
                  type='minus-circle'
                  className={style['remove-kind']}
                  onClick={() => {
                    this.handleRemoveKind(index);
                  }}
                />
                {index === 0 ? (
                  <Icon type='plus-circle' className={style['add-kind']} onClick={this.handleAddKind} />
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
