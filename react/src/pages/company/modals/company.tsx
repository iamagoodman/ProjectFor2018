import * as React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { trim } from '@/utils/util';
import { Company, SetKey, Dict } from '@/types';
// import Back from '@/components/back';
import { RootState } from '@/stores/reducers';
import { doAddOrModifyCompany, doSetCompanyShowKey } from '@/stores/actions';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

interface Props extends FormComponentProps, Company {
  onSubmit: (data: Company) => void;
  onBack: (data: SetKey) => void;
  level: string;
  businessTypeList: Dict[];
  visible: boolean;
}

class CompanyFirst extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const { id, level, businessType, owningCompanyNo, owningCompanyId } = props;

    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit({
          businessType,
          ...values,
          id,
          owningCompanyNo: level === 'first' ? undefined : owningCompanyNo,
          level,
          owningCompanyId,
        });
      }
    });
  };
  render() {
    const props = this.props;
    const {
      id,
      companyName,
      businessType,
      remark,
      simpleName,
      form,
      level,
      businessTypeList,
      visible,
    } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    // const items: BackItem[] = [{
    //     name: 'companyManage',
    //     displayName: '保险公司管理',
    //     onBack: () => { props.onBack({show: 'list'}); }
    //     // onBack: () => { props.history.push('/insurance/company'); }
    // }, {
    //     displayName: `${id ? '修改' : '添加'}${level === 'first' ? '一' : '二'}级保险机构`,
    //     name: 'company'
    // }]
    const title = `${id ? '修改' : '添加'}${level === 'first' ? '一' : '二'}级保险机构`;
    return (
      <Modal
        title={title}
        visible={visible}
        maskClosable={false}
        onOk={() => {
          this.handleSubmit();
        }}
        onCancel={() => {
          props.onBack({ show: 'list' });
        }}
      >
        <Form className="operate-wrapper">
          <FormItem {...formItemLayout} label="保险公司名称" colon={false}>
            {getFieldDecorator('companyName', {
              initialValue: companyName,
              rules: [
                {
                  required: true,
                  message: '保险公司名称不能为空',
                },
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
            })(<Input placeholder="请输入" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="保险公司简称" colon={false}>
            {getFieldDecorator('simpleName', {
              initialValue: simpleName,
              rules: [
                {
                  required: true,
                  message: '保险公司简称不能为空',
                },
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
            })(<Input placeholder="请输入" autoComplete="off" />)}
          </FormItem>
          {!!(level === 'first') && (
            <FormItem {...formItemLayout} label="业务类型" colon={false}>
              {getFieldDecorator('businessType', {
                initialValue: businessType,
                rules: [
                  {
                    required: true,
                    message: '请选择业务类型',
                  },
                ],
              })(
                <Select placeholder="请选择">
                  {businessTypeList.map((item: Dict) => (
                    <Option value={item.name} key={item.name}>
                      {item.dName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          )}

          <FormItem {...formItemLayout} label="备注" colon={false}>
            {getFieldDecorator('remark', {
              initialValue: remark || '',
              rules: [
                {
                  pattern: /^[\w\W]{0,200}$/,
                  message: '备注长度不能超过200个',
                },
              ],
              getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
            })(<TextArea />)}
          </FormItem>
        </Form>
      </Modal>
      // <div>
      //     <Back items={items}/>
      //     <Form className='operate-wrapper'>
      //         <FormItem {...formItemLayout} label='保险公司编号' colon={false}>
      //             {
      //                 getFieldDecorator('companyNo', {
      //                     initialValue: companyNo,
      //                     rules: [
      //                         {
      //                             required: true,
      //                             message: '保险公司编号不能为空'
      //                         }, {
      //                             pattern: /^[0-9a-zA-Z]*$/,
      //                             message: '保险公司编号只支持字母和数字'
      //                         }
      //                     ],
      //                     getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
      //                 })(
      //                     <Input disabled={!!id} placeholder='请输入' autoComplete='off'/>
      //                 )
      //             }
      //         </FormItem>
      //         <FormItem {...formItemLayout} label='保险公司名称' colon={false}>
      //             {
      //                 getFieldDecorator('companyName', {
      //                     initialValue: companyName,
      //                     rules: [
      //                         {
      //                             required: true,
      //                             message: '保险公司名称不能为空'
      //                         }
      //                     ],
      //                     getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
      //                 })(
      //                     <Input placeholder='请输入' autoComplete='off'/>
      //                 )
      //             }
      //         </FormItem>
      //         <FormItem {...formItemLayout} label='保险公司简称' colon={false}>
      //             {
      //                 getFieldDecorator('simpleName', {
      //                     initialValue: simpleName,
      //                     rules: [
      //                         {
      //                             required: true,
      //                             message: '保险公司简称不能为空'
      //                         }
      //                     ],
      //                     getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
      //                 })(
      //                     <Input placeholder='请输入' autoComplete='off'/>
      //                 )
      //             }
      //         </FormItem>
      //         {
      //             !!(level === 'first') && (
      //                 <FormItem {...formItemLayout} label='业务类型' colon={false}>
      //                     {
      //                         getFieldDecorator('businessType', {
      //                             initialValue: businessType,
      //                             rules: [
      //                                 {
      //                                     required: true,
      //                                     message: '请选择业务类型'
      //                                 }
      //                             ]
      //                         })(
      //                             <Select placeholder='请选择'>

      //                                 {
      //                                     businessTypeList.map((item: Dict) => <Option value={item.name} key={item.name}>{item.dName}</Option>)
      //                                 }
      //                             </Select>
      //                         )
      //                     }
      //                 </FormItem>
      //             )
      //         }

      //         <FormItem {...formItemLayout} label='备注' colon={false}>
      //             {
      //                 getFieldDecorator('remark', {
      //                     initialValue: remark || '',
      //                     getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value)
      //                 })(
      //                     <TextArea />
      //                 )
      //             }
      //         </FormItem>
      //         <FormItem {...formItemLayout} label='&emsp;' colon={false}>
      //             <Button type='primary' onClick={this.handleSubmit}>提交</Button>
      //         </FormItem>
      //     </Form>
      // </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { company, level, show } = state.company;
  return {
    ...company,
    level,
    visible: show === 'company',
    businessTypeList: state.app.businessTypeList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (data: Company) => doAddOrModifyCompany.request(data),
      onBack: (data: SetKey) => doSetCompanyShowKey(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(CompanyFirst));
