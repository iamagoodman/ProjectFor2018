import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Back from '@/components/back';
import {
  CommissionDetail,
  SetKey,
  BackItem,
  Product,
  Channel,
  RateItem,
  CommissionOperateRequest,
  ChannelGroup
} from '@/types';
import { doSetCommissionShowKey, doAddOrModifyCommission } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { filterOption, isNotEmpty } from '@/utils/util';
import DateGroup from './components/dateGroup';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const TextArea = Input.TextArea;

interface Props extends FormComponentProps, CommissionDetail {
  // onSubmit: (data: CommissionDetail) => void,
  onSubmit: (data: CommissionOperateRequest) => void;
  onBack: (data: SetKey) => void;
  productList: Product[];
  channelGroup: ChannelGroup;
}

class Commission extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const { id } = props;
    props.form.validateFields((err: any, { rateList, ...values }: CommissionDetail) => {
      if (!err) {
        for (const { commissionRate } of rateList) {
          if (!isNotEmpty(commissionRate)) {
            message.warning('请填写佣金比例');
            return;
          }
        }
        const newData: any = rateList.map((item: RateItem, index: number) => ({
          channelNo: values.channelNo,
          productNo: values.productNo,
          beginTime: item.beginDate ? item.beginDate.format('YYYY-MM-DD 00:00:00') : undefined,
          endTime: item.endDate ? item.endDate.format('YYYY-MM-DD 00:00:00') : undefined,
          serviceChargeRate: Number(item.commissionRate),
          remark: values.remark
        }));
        props.onSubmit({ id, data: JSON.stringify(newData) });
      }
    });
  };
  render() {
    const props = this.props;
    const { form, id, productList, channelGroup, channelNo, productNo, remark } = props;
    const { getFieldDecorator } = form;
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
    const items: BackItem[] = [
      {
        name: 'commissionManage',
        displayName: '渠道费用配置',
        onBack: () => {
          props.onBack({ show: 'list' });
        }
      },
      {
        displayName: `${id ? '修改' : '添加'}渠道费用`,
        name: 'commission'
      }
    ];
    return (
      <div>
        <Back items={items} />
        <Form className='operate-wrapper'>
          <FormItem {...formItemLayout} label='渠道方' colon={false}>
            {getFieldDecorator('channelNo', {
              initialValue: channelNo,
              rules: [
                {
                  required: true,
                  message: '请选择渠道方'
                }
              ]
            })(
              <Select placeholder='请选择' showSearch filterOption={filterOption}>
                {Object.keys(channelGroup).map((item: string) => {
                  const { channelNo, channelName, children } = props.channelGroup[item];
                  if (children.length > 1) {
                    return (
                      <OptGroup key={item} label={`${channelName}`}>
                        {children.map((child: Channel) => (
                          <Option key={child.channelNo} value={child.channelNo}>
                            {child.channelName}
                          </Option>
                        ))}
                      </OptGroup>
                    );
                  } else {
                    return (
                      <Option key={channelNo} value={channelNo}>
                        {channelName}
                      </Option>
                    );
                  }
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='产品' colon={false}>
            {getFieldDecorator('productNo', {
              initialValue: productNo,
              rules: [
                {
                  required: true,
                  message: '请选择产品'
                }
              ]
            })(
              <Select disabled={!!id} placeholder='请选择' showSearch filterOption={filterOption}>
                {productList.map((item: Product) => (
                  <Option
                    key={item.productNo}
                    value={item.productNo}
                  >{`(${item.productNo})${item.productName}(${item.owningCompany})`}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='渠道费用比例及生效时间' colon={false} required>
            {getFieldDecorator('rateList', {
              initialValue: props.rateList
            })(<DateGroup keyId={id} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='备注' colon={false}>
            {getFieldDecorator('remark', {
              initialValue: remark,
              rules: [
                {
                  pattern: /^[\w\W]{0,200}$/,
                  message: '备注长度不能超过200个'
                }
              ]
            })(<TextArea />)}
          </FormItem>
          <FormItem {...formItemLayout} label='&emsp;' colon={false}>
            <Button type='primary' onClick={this.handleSubmit}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, commission } = state;
  const { detail } = commission;
  const { productList, channelGroup } = app;
  return {
    productList,
    channelGroup,
    ...detail
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetCommissionShowKey(data),
      onSubmit: (data: CommissionOperateRequest) => doAddOrModifyCommission.request(data)
      // onSubmit: (data: CommissionDetail) => doAddOrModifyCommission.request(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Commission));
