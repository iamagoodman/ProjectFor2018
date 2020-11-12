import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Select, Input, Radio, DatePicker, Icon, Button, message, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RiskTypeItem, ProductDetail, Dict, SetKey, Company, PlanItem, AddProduct, PlanItemRisk } from '@/types';
import style from './index.module.less';
import { RootState } from '@/stores/reducers';
import { trim, isNotEmpty, parseDate, isFloat } from '@/utils/util';
import Back from '@/components/back';
import Editor from '../editor';
import { doAddOrModifyProduct, doSetProductShowKey, doCompanyVisible, doCompanySelectedSet } from '@/stores/actions';
import { HTML } from '@/constans';
import Plan from '../plan';
import Risk from '../risk';
import { RadioChangeEvent } from 'antd/lib/radio';
import uuidv4 from 'uuid/v4';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;

interface Props extends FormComponentProps, ProductDetail {
  companySelectedName: string | undefined;
  companySelectedNo: string | undefined;
  onVisible: (visible: boolean) => void;
  productCategoryList: Dict[];
  riskTypeCategoryList: Dict[];
  onAdd: (data: AddProduct) => void;
  onBack: (data: SetKey) => void;
  doCompanySelectedSet: (data: Company) => void;
}

interface State {
  isPlan: boolean | number;
  riskTypes: RiskTypeItem[];
  extensionType: boolean | number;
}

class Product extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      isPlan: 0,
      riskTypes: [],
      extensionType: 1
    };
  }
  componentDidMount() {
    this.props.doCompanySelectedSet({});
  }

  setHtml = () => {
    const content = window.ueEditor ? window.ueEditor.getContent() : '';
    const metaRe = /<meta [\s\S]*?>/g,
      linkRe = /<link [\s\S]*?>/g,
      scriptRe = /<script[^>]*>[^<>]*<\/script>/g;
    // bodyRe = /<body[^>]*>(.*)<\/body>/;
    const metas = content.match(metaRe) || [];
    const links = content.match(linkRe) || [];
    const scripts = content.match(scriptRe) || [];
    const newContent = content
      .replace(metaRe, '')
      .replace(scriptRe, '')
      .replace(linkRe, '')
      .replace(/&nbsp;|\n|<!--!doctype-->/g, '');
    return HTML.replace('{%meta%}', metas.join(''))
      .replace('{%link%}', links.join(''))
      .replace('{%script%}', scripts.join(''))
      .replace('{%content%}', newContent);
  };
  handleChange<T = string>(key: string, value: T) {
    this.setState({
      [key]: value
    });
  }
  handleSubmit = () => {
    const props = this.props;
    props.form.validateFields((err, values) => {
      const { riskTypes = [], time = [], isPlan, planTypes = [], policyTypes = [], ...data } = values;

      if (!err) {
        // 险别信息
        if (riskTypes) {
          for (const item of riskTypes) {
            const { riskCode, riskName, riskType } = item;

            if (!isNotEmpty(riskCode) || !isNotEmpty(riskName) || !isNotEmpty(riskType)) {
              message.warning('请完整填写险别信息');
              return;
            }
          }
        }

        if (Number(values.commissionRate) < 1 || Number(values.commissionRate) > 100) {
          message.warning('经纪佣金比例应在1-100之间');
          return;
        }

        // 方案信息
        if (isPlan === 1 && planTypes) {
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

        const parseTime = parseDate(time);
        const h5Sourse = this.setHtml();
        const filterRiskType: RiskTypeItem[] = riskTypes.map((item: RiskTypeItem) => {
          const { riskCode, riskName, riskType } = item;
          return { riskCode, riskName, riskType };
        });
        const filterPlanType: PlanItem[] = planTypes.map((item: PlanItem) => {
          const { planCode, planName, planPremium, riskTypes } = item;
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
        const newData: AddProduct & { dataType: string } = {
          riskType: JSON.stringify(filterRiskType),
          planTypes: isPlan === 1 ? JSON.stringify(filterPlanType) : '[]',
          policyTypes: policyTypes.length > 1 ? 2 : policyTypes[0],
          dataType: 'formData',
          h5Sourse,
          owningCompany: props.companySelectedNo,
          ...data,
          ...parseTime
        };

        props.onAdd(newData);
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
    const { productCategoryList, companySelectedName, riskTypeCategoryList } = props;
    const { isPlan, riskTypes, extensionType } = this.state;
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
        displayName: `添加产品`
      }
    ];
    const prefixSelectorIncomeType = getFieldDecorator('incomeType', {
      initialValue: 'MainBusinessBrokerageFee'
    })(
      <Select style={{ width: 200 }} placeholder='请选择'>
        <Option value='MainBusinessBrokerageFee'>经纪佣金</Option>
        <Option value='MainBusinessConsultingFee'>咨询费</Option>
      </Select>
    );
    const isRequired = extensionType === 0 ? false : true;
    return (
      <div>
        <Back items={items} />
        <Form className='operate-wrapper' {...formItemLayout}>
          <FormItem colon={false} label='请填写产品编号'>
            {getFieldDecorator('productNo', {
              rules: [
                {
                  required: true,
                  message: '产品编号不能为空'
                },
                {
                  pattern: /^[0-9a-zA-Z]*$/,
                  message: '产品编号只支持字母和数字'
                }
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
            })(<Input placeholder='请输入' autoComplete='off' />)}
          </FormItem>
          <FormItem colon={false} label='请填写产品名称'>
            {getFieldDecorator('productName', {
              rules: [
                {
                  required: true,
                  message: '产品名称不能为空'
                }
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
            })(<Input placeholder='请输入' autoComplete='off' />)}
          </FormItem>
          <FormItem colon={false} label='请选择产品类型'>
            {getFieldDecorator('productType', {
              rules: [
                {
                  required: true,
                  message: '请选择产品类型'
                }
              ]
            })(
              <Select placeholder='请选择' allowClear>
                {productCategoryList.map((item: Dict) => (
                  <Option value={item.name} key={item.name}>
                    {item.dName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem colon={false} label='请选择所属保险公司' required>
            <span>{companySelectedName}</span>
            <Icon
              type='plus-circle'
              className={style['add-company']}
              onClick={() => {
                props.onVisible(true);
              }}
            />
          </FormItem>
          <FormItem colon={false} label='是否为特殊产品' required>
            {getFieldDecorator('extensionType', {
              initialValue: extensionType
            })(
              <RadioGroup
                onChange={(e: RadioChangeEvent) => {
                  this.handleChange<number>('extensionType', e.target.value);
                }}
              >
                <Radio value={1}>否</Radio>
                <Radio value={0}>是(特殊产品将直接使用保险公司提供的产品的H5页面，录入URL即可)</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {!extensionType && (
            <FormItem colon={false} label='请填写产品H5的URL'>
              {getFieldDecorator('externalLink', {
                rules: [
                  {
                    required: true,
                    message: '产品H5的URL不能为空'
                  }
                ]
              })(<Input placeholder='请输入' />)}
            </FormItem>
          )}
          <FormItem colon={false} label='请填写保险公司产品编码'>
            {getFieldDecorator('owningProductNo', {
              rules: [
                {
                  required: isRequired,
                  message: '保险公司产品编码不能为空'
                }
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
            })(<Input placeholder='请输入' autoComplete='off' />)}
          </FormItem>
          <FormItem colon={false} label='请填写险别信息'>
            {getFieldDecorator('riskTypes', {
              initialValue: riskTypes,
              rules: [
                {
                  required: isRequired,
                  message: '险别信息不能为空'
                }
              ]
            })(
              <Risk
                dict={riskTypeCategoryList}
                editable
                onChange={(value: RiskTypeItem[]) => {
                  this.handleChange<RiskTypeItem[]>('riskTypes', value);
                }}
              />
            )}
          </FormItem>
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
            colon={false}
            required={isRequired}
            className={`${isPlan === 1 ? 'show' : 'hide'}`}
            style={{ display: `${isPlan === 1 ? 'block' : 'none'}` }}
          >
            {getFieldDecorator('planTypes', {
              initialValue: [{ riskTypes: [{ uniqueId: uuidv4() }], uniqueId: uuidv4() }],
              rules: [
                {
                  required: isRequired,
                  message: '方案信息不能为空'
                }
              ]
            })(<Plan riskTypes={riskTypes} editable />)}
          </FormItem>

          <FormItem label='请选择团个单类型' colon={false}>
            {getFieldDecorator('policyTypes', {
              rules: [
                {
                  required: isRequired,
                  message: '请选择团个单类型'
                }
              ]
            })(
              <CheckboxGroup
                options={[
                  { label: '团单', value: 1 },
                  { label: '个单', value: 0 }
                ]}
              />
            )}
          </FormItem>
          <FormItem colon={false} label='是否为赠险'>
            {getFieldDecorator('isGiftInsurance', {
              rules: [
                {
                  required: isRequired,
                  message: '请选择是否为赠险'
                }
              ]
            })(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem colon={false} label='是否代收保费'>
            {getFieldDecorator('isCollectionCharges', {
              rules: [
                {
                  required: isRequired,
                  message: '请选择是否代收保费'
                }
              ]
            })(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem colon={false} label='是否核保'>
            {getFieldDecorator('isUnderWriting', {
              rules: [
                {
                  required: isRequired,
                  message: '请选择是否核保'
                }
              ]
            })(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem colon={false} label='请选择产品有效时间'>
            {getFieldDecorator('time', {
              rules: [
                {
                  required: true,
                  message: '产品有效时间不能为空'
                }
              ]
            })(<RangePicker showTime style={{ width: 400 }} />)}
          </FormItem>
          <FormItem colon={false} label='请填写佣金比例'>
            {getFieldDecorator('commissionRate', {
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
          <FormItem label='请选择佣金计算保费类型' colon={false}>
            {getFieldDecorator('premiumType', {
              rules: [
                {
                  required: true,
                  message: '请选择佣金计算保费类型'
                }
              ]
            })(
              <RadioGroup>
                <Radio value={1}>保费(含税)</Radio>
                <Radio value={0}>保费(不含税)</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem colon={false} label='请填写备注'>
            {getFieldDecorator('remark', {
              rules: [
                {
                  pattern: /^[\w\W]{0,200}$/,
                  message: '备注长度不能超过200个'
                }
              ]
            })(<TextArea />)}
          </FormItem>
          <FormItem
            colon={false}
            label='H5页面'
            className={`editor-item ${extensionType === 0 ? 'hide' : 'show'}`}
            style={{ display: `${extensionType === 0 ? 'none' : 'show'}` }}
          >
            <Editor content={undefined} />
          </FormItem>

          <FormItem colon={false} label='&emsp;'>
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
  const { product, app, companyGlobal } = state;
  const { detail } = product;
  const { productCategoryList, riskTypeCategoryList } = app;
  return {
    productCategoryList,
    riskTypeCategoryList,
    companySelectedNo: companyGlobal.selectedCompany.companyNo,
    companySelectedName: companyGlobal.selectedCompany.companyName,
    ...detail
  };
};

const mapDispatchToProps = (dispacth: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doCompanyVisible(visible),
      onAdd: (data: AddProduct) => doAddOrModifyProduct.request(data),
      onBack: (data: SetKey) => doSetProductShowKey(data),
      doCompanySelectedSet: (data: Company) => doCompanySelectedSet(data)
    },
    dispacth
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Product));
