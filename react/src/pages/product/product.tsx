// import * as React from 'react';
// import { connect } from 'react-redux';
// import { Dispatch, bindActionCreators } from 'redux';
// import { Form, Select, Input, Radio, DatePicker, Icon, Button, message, Checkbox } from 'antd';
// import { FormComponentProps } from 'antd/lib/form';
// import * as moment from 'moment';
// import { RiskTypeItem, ProductDetail, Dict, Group, SetKey, Company } from '@/types';
// import style from './product.module.less';
// import { RootState } from '@/stores/reducers';
// import { trim, isNotEmpty, parseDate, parseStrToArray, generateUniqueId } from '@/utils/util';
// import Back from '@/components/back';
// import Editor from './components/editor';
// import { doGetDict, doAddOrModifyProduct, doSetProductShowKey, doCompanyVisible, doCompanySelectedSet } from '@/stores/actions';
// import { HTML } from '@/constans';
// import Plan from './components/plan';
// import Risk from './components/risk';
// import { RadioChangeEvent } from 'antd/lib/radio';

// const FormItem = Form.Item;
// const Option = Select.Option;
// const RadioGroup = Radio.Group;
// const RangePicker = DatePicker.RangePicker;
// const TextArea = Input.TextArea;
// const CheckboxGroup = Checkbox.Group;

// interface Props extends FormComponentProps, ProductDetail {

//     companySelectedName: string | undefined,
//     companySelectedNo: string | undefined,
//     onVisible: (visible: boolean) => void,
//     getProductCategoryList: (data: Group) => void,
//     productCategoryList: Dict[],
//     riskTypeCategoryList: Dict[],
//     onAddOrModify: (data: any) => void,
//     onBack: (data: SetKey) => void,
//     doCompanySelectedSet: (data: Company) => void
// }

// interface State {
//     riskTypes: RiskTypeItem[],
//     isPlan: boolean | number
// }

// class Product extends React.Component<Props> {

//     state: State;
//     constructor(props: Props) {

//         super(props);
//         const arr = parseStrToArray<RiskTypeItem>(props.riskType);
//         const riskTypes = generateUniqueId((arr.length && arr) || [{}]);
//         this.state = {
//             riskTypes,
//             isPlan: false
//         }

//     }
//     componentDidMount() {
//         this.props.doCompanySelectedSet({})
//     }

//     setHtml = () => {
//         const content = window.ueEditor ? window.ueEditor.getContent() : '';
//         // const txt = (window as any).ueEditor.getContentTxt();

//         let newContent = content.replace(/&nbsp;/g, '');

//         const match = newContent.match(/\{%title=([\s\S]*)%\}/);
//         let title: string = '';
//         if (match) {
//             title = match[1];
//             newContent = newContent.replace(/\{%title=[\s\S]*%\}/, '');
//         }
//         return HTML.replace('{%title%}', title).replace('{%content%}', newContent);

//     }
//     handleChange<T>(key: string, value: T) {
//         this.setState({
//             [key]: value
//         })
//     }
//     handleSubmit = () => {

//         const props = this.props;
//         const { id, companySelectedNo, owningCompany } = props;
//         // const { riskTypes } = this.state;
//         // const len = riskTypes.length;
//         props.form.validateFields((err, values: ProductDetail) => {
//             const { riskTypes, time = [], ...data } = values;
//             const len = riskTypes ? riskTypes.length : 0;

//             if (!err) {
//                 //
//                 if (!riskTypes || !len) {
//                     message.warning('请填写险别信息');
//                     return;
//                 } else if (len) {
//                     for (let i = 0; i < len; i++) {
//                         const { riskCode, riskName, riskType } = riskTypes[i];
//                         if (!isNotEmpty(riskCode) || !isNotEmpty(riskName) || !isNotEmpty(riskType)) {
//                             message.warning('请完整填写险别信息');
//                             return;
//                         }

//                     }
//                 }
//                 if (!id && !companySelectedNo) {
//                     message.warning('请选择所属保险公司');
//                     return;
//                 }
//                 // const filterRiskType = riskTypes.map((item: RiskTypeItem) => {
//                 //     const { riskCode, riskName, riskType } = item;
//                 //     return { riskCode, riskName, riskType }
//                 // })

//                 const parseTime = parseDate(time);
//                 if (Number(values.commissionRate) < 1 || Number(values.commissionRate) > 100) {
//                     message.warning('经纪佣金比例应在1-100之间');
//                     return;
//                 }
//                 const h5Sourse = this.setHtml();
//                 const newData: ProductDetail & {dataType: string} = {
//                     id,
//                     owningCompany: companySelectedNo || owningCompany,
//                     riskType: JSON.stringify(riskTypes),
//                     h5Sourse,
//                     dataType: 'formData',
//                     ...data,
//                     ...parseTime,
//                 }

//                 props.onAddOrModify(newData)
//             }
//         })
//     }
//     render() {
//         const props = this.props;
//         const { getFieldDecorator } = props.form;
//         const formItemLayout = {
//             labelCol: {
//               xs: { span: 24 },
//               sm: { span: 4 },
//             },
//             wrapperCol: {
//               xs: { span: 24 },
//               sm: { span: 12 },
//             },
//         };

//         const { riskTypes, isPlan } = this.state;
//         const { id, productNo, productName, productType, owningProductNo, isGiftInsurance, isCollectionCharges, isUnderWriting, commissionRate, remark, productCategoryList, companySelectedName, owningCompany, riskTypeCategoryList, h5Sourse, beginTime, endTime } = props;
//         const items = [{
//             name: 'productManage',
//             displayName: '产品管理',
//             onBack: () => { props.onBack({show: 'list'})}
//         }, {
//             name: 'product',
//             displayName: `${id ? '修改' : '添加'}产品`
//         }]
//         return (
//             <div>
//                 <Back items={items}/>
//                 <Form className='operate-wrapper'>
//                     <FormItem {...formItemLayout} colon={false} label='请填写产品编号'>
//                         {
//                             getFieldDecorator('productNo', {
//                                 initialValue: productNo,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '产品编号不能为空'
//                                     }, {
//                                         pattern: /^[0-9a-zA-Z]*$/,
//                                         message: '产品编号只支持字母和数字'
//                                     }
//                                 ],
//                                 getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
//                             })(
//                                 <Input disabled={!!id} placeholder='请输入' autoComplete='off'/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请填写产品名称'>
//                         {
//                             getFieldDecorator('productName', {
//                                 initialValue: productName,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '产品名称不能为空'
//                                     }
//                                 ],
//                                 getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
//                             })(
//                                 <Input disabled={!!id} placeholder='请输入' autoComplete='off'/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请选择产品类型'>
//                         {
//                             getFieldDecorator('productType', {
//                                 initialValue: productType,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '请选择产品类型'
//                                     }
//                                 ],
//                             })(
//                                 <Select disabled={!!id} placeholder='请选择' allowClear>
//                                     {
//                                         productCategoryList.map((item: Dict) => <Option value={item.name} key={item.name}>{item.dName}</Option>)
//                                     }
//                                 </Select>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请选择所属保险公司' required>
//                         <span>{owningCompany || companySelectedName || ''}</span>
//                         {
//                             !id && <Icon type='plus-circle' className={style['add-company']} onClick={() => { props.onVisible(true); }}/>
//                         }

//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请填写保险公司产品编码'>
//                         {
//                             getFieldDecorator('owningProductNo', {
//                                 initialValue: owningProductNo,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '保险公司产品编码不能为空'
//                                     }
//                                 ],
//                                 getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
//                             })(
//                                 <Input disabled={!!id} placeholder='请输入' autoComplete='off'/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请填写险别信息' required>
//                         {
//                             getFieldDecorator('riskTypes', {
//                                 initialValue: riskTypes
//                             })(
//                                 <Risk dict={riskTypeCategoryList} editable={!id}/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} label='是否需要配置产品方案' colon={false} required>
//                         {
//                             getFieldDecorator('isPlan', {
//                                 initialValue: 0
//                             })(
//                                 <RadioGroup onChange={(e: RadioChangeEvent) => { this.handleChange<number>('isPlan', e.target.value); }}>
//                                     <Radio value={1}>是</Radio>
//                                     <Radio value={0}>否</Radio>
//                                 </RadioGroup>
//                             )
//                         }
//                     </FormItem>
//                     {
//                         isPlan === 1 && (
//                             <FormItem label='请填写方案信息' {...formItemLayout} colon={false} required>
//                                 {
//                                     getFieldDecorator('planTypes')(
//                                         <Plan riskTypes={riskTypes}/>
//                                     )
//                                 }
//                             </FormItem>
//                         )
//                     }

//                     <FormItem {...formItemLayout} label='请选择保单类型' colon={false}>
//                         {
//                             getFieldDecorator('policyTypes', {
//                                 rules: [{
//                                     required: true,
//                                     message: '请选择保单类型'
//                                 }]
//                             })(
//                                 <CheckboxGroup
//                                     options={[{label: '团单', value: '1'}, {label: '个单', value: '2'}]}
//                                 />
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='是否为赠险'>
//                         {
//                             getFieldDecorator('isGiftInsurance', {
//                                 initialValue: isGiftInsurance,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '请选择是否为赠险'
//                                     }
//                                 ],
//                             })(
//                                 <RadioGroup disabled={!!id}>
//                                     <Radio value={1}>是</Radio>
//                                     <Radio value={0}>否</Radio>
//                                 </RadioGroup>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='是否代收保费'>
//                         {
//                             getFieldDecorator('isCollectionCharges', {
//                                 initialValue: isCollectionCharges,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '请选择是否代收保费'
//                                     }
//                                 ],
//                             })(
//                                 <RadioGroup disabled={!!id}>
//                                     <Radio value={1}>是</Radio>
//                                     <Radio value={0}>否</Radio>
//                                 </RadioGroup>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='是否核保'>
//                         {
//                             getFieldDecorator('isUnderWriting', {
//                                 initialValue: isUnderWriting,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '请选择是否核保'
//                                     }
//                                 ],
//                             })(
//                                 <RadioGroup disabled={!!id}>
//                                     <Radio value={1}>是</Radio>
//                                     <Radio value={0}>否</Radio>
//                                 </RadioGroup>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请选择产品有效时间'>
//                         {
//                             getFieldDecorator('time', {
//                                 initialValue: [beginTime && moment(beginTime), endTime && moment(endTime)],
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '产品有效时间不能为空'
//                                     }
//                                 ],
//                             })(
//                                 <RangePicker showTime style={{width: 400}}/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请填写经纪佣金比例'>
//                         {
//                             getFieldDecorator('commissionRate', {
//                                 initialValue: commissionRate,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '经纪佣金比例不能为空'
//                                     },
//                                     {
//                                         pattern: /^\d+(\.?\d+)?$/,
//                                         message: '经纪佣金比例必须为数值'
//                                     }
//                                 ],
//                             })(
//                                 <Input addonAfter='%' placeholder='请输入' autoComplete='off'/>
//                             )
//                         }
//                     </FormItem>
//                     <FormItem {...formItemLayout} colon={false} label='请填写备注'>
//                         {
//                             getFieldDecorator('remark', {
//                                 initialValue: remark
//                             })(
//                                 <TextArea />
//                             )
//                         }
//                     </FormItem>
//                     {
//                         !id && (
//                             <FormItem {...formItemLayout} colon={false} label='H5页面' className='editor-item'>
//                                 <Editor content={h5Sourse} />
//                             </FormItem>
//                         )
//                     }

//                     <FormItem {...formItemLayout} colon={false} label='&emsp;'>
//                         <Button type='primary' onClick={this.handleSubmit}>确定</Button>
//                     </FormItem>
//                 </Form>
//                 {/* {
//                     visible && <PCompany />
//                 } */}
//             </div>

//         )
//     }
// }

// const mapStateToProps = (state: RootState) => {
//     const { product, app, companyGlobal } = state;
//     const { detail } = product;
//     const { productCategoryList, riskTypeCategoryList } = app;
//     return {
//         productCategoryList,
//         riskTypeCategoryList,
//         companySelectedNo:companyGlobal.selectedCompany.companyNo,
//         companySelectedName: companyGlobal.selectedCompany.companyName,
//         ...detail,
//     }
// }

// const mapDispatchToProps = (dispacth: Dispatch) => bindActionCreators({
//     onVisible: (visible: boolean) => doCompanyVisible(visible),
//     getProductCategoryList: (data: Group) => doGetDict.request(data),
//     onAddOrModify: (data: any) => doAddOrModifyProduct.request(data),
//     onBack: (data: SetKey) => doSetProductShowKey(data),
//     doCompanySelectedSet: (data: Company) => doCompanySelectedSet(data)
// }, dispacth)

// export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Product));
import * as React from 'react';
import { connect } from 'react-redux';
import AddProduct from './components/product/add';
import ModifyProduct from './components/product/modify';
import { RootState } from '@/stores/reducers';

function Product({ id }: { id: number }) {
  return id ? <ModifyProduct /> : <AddProduct />;
}

const mapStateToProps = (state: RootState) => ({
  id: state.product.detail.id,
});
export default connect(mapStateToProps)(Product);
