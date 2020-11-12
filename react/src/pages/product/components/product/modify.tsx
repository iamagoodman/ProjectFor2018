import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, DatePicker, Button, Checkbox, message, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as moment from 'moment';
import { RiskTypeItem, ProductDetail, Dict, SetKey, DictObj, ModifyProduct, PlanItem, PlanItemRisk } from '@/types';
import { RootState } from '@/stores/reducers';
import { parseDate, parseStrToArray, generateUniqueId, isNotEmpty, isFloat } from '@/utils/util';
import Back from '@/components/back';
import { doAddOrModifyProduct, doSetProductShowKey, doCompanyVisible } from '@/stores/actions';
import Plan from '../plan';
import Risk from '../risk';
import { getProductCategoryListObj } from '@/stores/selectors/app';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { RadioChangeEvent } from 'antd/lib/radio';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

interface Props extends FormComponentProps, ProductDetail {
  onVisible: (visible: boolean) => void;
  // productCategoryList: Dict[],
  riskTypeCategoryList: Dict[];
  onModify: (data: ModifyProduct) => void;
  onBack: (data: SetKey) => void;
  productCategory: DictObj;
}

interface State {
  riskTypes: RiskTypeItem[];
  planTypes: PlanItem[];
  isPlan: boolean | number;
}

class Product extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    const arr = parseStrToArray<RiskTypeItem>(props.riskType);
    const brr = parseStrToArray<PlanItem>(props.planTypes);
    const riskTypes = generateUniqueId(arr);
    const planTypes = generateUniqueId(brr);
    this.state = {
      riskTypes,
      planTypes,
      isPlan: brr.length > 0 ? 1 : 0
    };
  }
  handleChange<T>(key: string, value: T) {
    this.setState({
      [key]: value
    });
  }
  handleSubmit = () => {
    const props = this.props;
    const { id } = props;
    const { riskTypes } = this.state;
    props.form.validateFields((err, values) => {
      const { time = [], planTypes = [], isPlan, ...data } = values;
      if (!err) {
        if (isPlan === 1) {
          for (const item of planTypes) {
            const { planCode, planName, planPremium } = item;
            if (!isNotEmpty(planCode) || !isNotEmpty(planName) || !isFloat(planPremium)) {
              message.warning('请完整填写方案信息');
              return;
            }
            for (const i of item.riskTypes) {
              if (!isNotEmpty(i.riskCode) || !isFloat(i.riskSumAmount)) {
                message.warning('请完整填写方案信息的险别信息');
                return;
              }
              const index = findIndex(riskTypes, (j: RiskTypeItem) => j.riskCode === i.riskCode);
              if (index < 0) {
                message.warning('方案信息里的已配置险别不正确');
                return;
              }
            }
          }
        }
        const filterRiskType: RiskTypeItem[] = riskTypes.map((item: RiskTypeItem) => {
          const { riskCode, riskName, riskType } = item;
          return { riskCode, riskName, riskType };
        });
        const filterPlanType: PlanItem[] = planTypes.map((item: PlanItem) => {
          const { planCode, planName, riskTypes, planPremium } = item;
          return {
            planCode,
            planName,
            planPremium,
            riskTypes: riskTypes.map((item: PlanItemRisk) => {
              const risk = find(filterRiskType, (i: RiskTypeItem) => i.riskCode === item.riskCode) || {};
              return { ...risk, riskSumAmount: Number(item.riskSumAmount) };
            })
          };
        });
        const parseTime = parseDate(time);
        const newData: ModifyProduct & { dataType: string } = {
          id,
          dataType: 'formData',
          planTypes: isPlan === 1 ? JSON.stringify(filterPlanType) : '[]',
          ...data,
          ...parseTime
        };

        props.onModify(newData);
      }
    });
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    const { riskTypes, planTypes, isPlan } = this.state;
    const {
      productNo,
      productName,
      productType,
      owningProductNo,
      isGiftInsurance,
      isCollectionCharges,
      isUnderWriting,
      commissionRate,
      remark,
      owningCompany,
      riskTypeCategoryList,
      beginTime,
      endTime,
      policyTypes,
      productCategory,
      incomeType,
      premiumType,
      extensionType,
      externalLink
    } = props;
    const items = [
      {
        name: 'productManage',
        displayName: '产品管理',
        onBack: () => {
          props.onBack({ show: 'list' });
        }
      },
      {
        name: 'product',
        displayName: `修改产品`
      }
    ];
    const prefixSelectorIncomeType = (
      <Select style={{ width: 200 }} defaultValue={incomeType} placeholder='请选择' disabled>
        <Option value='MainBusinessBrokerageFee'>经纪佣金</Option>
        <Option value='MainBusinessConsultingFee'>咨询费</Option>
      </Select>
    );
    const isRequired = extensionType === 0 ? false : true;
    return (
      <div>
        <Back items={items} />
        <Form className='operate-wrapper' {...formItemLayout}>
          <FormItem label='产品编号'>
            <span>{productNo}</span>
          </FormItem>
          <FormItem label='产品名称'>
            <span>{productName}</span>
          </FormItem>
          <FormItem label='产品类型'>
            <span>{productCategory[productType || ''] || productType}</span>
          </FormItem>
          <FormItem label='所属保险公司'>
            <span>{owningCompany || ''}</span>
          </FormItem>
          <FormItem label='是否为特殊产品'>
            <span>{extensionType === 0 ? '是' : '否'}</span>
          </FormItem>
          {extensionType === 0 ? (
            <FormItem label='产品H5的URL'>
              {getFieldDecorator('externalLink', {
                initialValue: externalLink
              })(<Input placeholder='请输入' />)}
            </FormItem>
          ) : null}
          <FormItem label='保险公司产品编码'>
            <span>{owningProductNo}</span>
          </FormItem>
          {riskTypes && riskTypes.length ? (
            <FormItem label='险别信息'>
              <Risk value={riskTypes} dict={riskTypeCategoryList} editable={false} />
            </FormItem>
          ) : null}
          <FormItem label='是否需要配置产品方案' colon={false} required={isRequired}>
            {getFieldDecorator('isPlan', {
              initialValue: isPlan
            })(
              <RadioGroup
                onChange={(e: RadioChangeEvent) => {
                  this.handleChange<number>('isPlan', e.target.value);
                }}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label='请填写方案信息'
            className={`${isPlan === 1 ? 'show' : 'hide'}`}
            style={{ display: `${isPlan === 1 ? 'block' : 'none'}` }}
          >
            {getFieldDecorator('planTypes', {
              initialValue: planTypes,
              rules: [
                {
                  required: isRequired && isPlan === 1,
                  message: '方案信息不能为空'
                }
              ]
            })(<Plan riskTypes={riskTypes} />)}
          </FormItem>
          <FormItem label='保单类型'>
            <CheckboxGroup
              value={policyTypes === 2 ? [1, 0] : [policyTypes || 0]}
              options={[
                { label: '团单', value: 1 },
                { label: '个单', value: 0 }
              ]}
            />
          </FormItem>
          <FormItem label='是否为赠险'>
            <span>{isGiftInsurance ? '是' : '否'}</span>
          </FormItem>
          <FormItem label='是否代收保费'>
            <span>{isCollectionCharges ? '是' : '否'}</span>
          </FormItem>
          <FormItem label='是否核保'>
            <span>{isUnderWriting ? '是' : '否'}</span>
          </FormItem>
          <FormItem label='请选择产品有效时间'>
            {getFieldDecorator('time', {
              initialValue: [beginTime && moment(beginTime), endTime && moment(endTime)],
              rules: [
                {
                  required: true,
                  message: '产品有效时间不能为空'
                }
              ]
            })(<RangePicker showTime style={{ width: 400 }} />)}
          </FormItem>
          <FormItem label='请填写佣金比例'>
            {getFieldDecorator('commissionRate', {
              initialValue: commissionRate,
              rules: [
                {
                  required: true,
                  message: '经纪佣金比例不能为空'
                },
                {
                  pattern: /^\d+(\.?\d+)?$/,
                  message: '经纪佣金比例必须为数值'
                }
              ]
            })(<Input addonBefore={prefixSelectorIncomeType} addonAfter='%' placeholder='请输入' autoComplete='off' />)}
          </FormItem>
          <FormItem label='佣金计算保费类型'>
            <span>{premiumType ? '保费(含税)' : '保费(不含税)'}</span>
          </FormItem>
          <FormItem label='请填写备注'>
            {getFieldDecorator('remark', {
              initialValue: remark,
              rules: [
                {
                  pattern: /^[\w\W]{0,200}$/,
                  message: '备注长度不能超过200个'
                }
              ]
            })(<TextArea placeholder='请输入' />)}
          </FormItem>

          <FormItem label='&emsp;' colon={false}>
            <Button type='primary' onClick={this.handleSubmit}>
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { product, app } = state;
  const { detail } = product;
  const { productCategoryList, riskTypeCategoryList } = app;
  return {
    // productCategoryList,
    riskTypeCategoryList,
    productCategory: getProductCategoryListObj(productCategoryList),
    ...detail
  };
};

const mapDispatchToProps = (dispacth: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doCompanyVisible(visible),
      onModify: (data: ModifyProduct) => doAddOrModifyProduct.request(data),
      onBack: (data: SetKey) => doSetProductShowKey(data)
    },
    dispacth
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Product));
