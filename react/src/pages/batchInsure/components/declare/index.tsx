import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, DatePicker, Button, Upload, message, Select } from 'antd';
import {
  doInsureSetStep,
  doPostInsureDeclareImport,
  doInsureBatch,
  doGetChannelInfo,
} from '@/stores/actions';
import { Dispatch, bindActionCreators } from 'redux';
import PolicyModal from '../../modals/policy';
import { RootState } from '@/stores/reducers';
import {
  InsureDeclare,
  InsureProduct,
  InsureDeclareImportData,
  BatchInsureData,
  InsureImportPolicyItem,
} from '@/types';
import { FormComponentProps } from 'antd/lib/form';
import * as moment from 'moment';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { GROUP_FLAG } from '@/constans';
import style from './index.module.less';
import { getValueFromKey, trim } from '@/utils/util';
// import AuthSwitch from '@/components/auth/authSwitch';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

interface Props extends FormComponentProps {
  doSetStep: (step: number) => void;
  className: string;
  policyVisible: boolean;
  productInfo: InsureProduct;
  declareInfo: InsureDeclare;
  onUpload: (data: InsureDeclareImportData) => void;
  onBatch: (data: BatchInsureData) => void;
  policyList: InsureImportPolicyItem[];
  channelSec: string;
  fileList: UploadFile[];
  excelKey: string;
  onChannelInfo: (channelNo: string) => void;
}

interface State {
  subject_type?: string;
}

class Declare extends React.Component<Props> {
  oIframe: HTMLIFrameElement;
  state: State = {};
  componentDidMount() {
    const props = this.props;
    if (!this.oIframe) {
      this.oIframe = document.createElement('iframe');
      this.oIframe.style.display = 'none';
      document.body.appendChild(this.oIframe);
    }
    if (loginUser.channelNo) {
      props.onChannelInfo(loginUser.channelNo || '');
    }
  }
  componentWillUnmount() {
    if (this.oIframe) {
      document.body.removeChild(this.oIframe);
    }
  }
  handleChange = (key: string, value: string | undefined) => {
    this.setState({
      [key]: value,
    });
  };
  handleDownload = () => {
    this.oIframe.src = `/excel/download?name=portal&v=${Date.now()}`;
  };
  handleFileChange = ({ file }: UploadChangeParam) => {
    if (file && file.size > 10 * 1000 * 1000) {
      message.warning('上传文件大小不能超过10M');
      return;
    }
    const props = this.props;
    const {
      productInfo: { productNo = '', planCode = '', policyTypes = 1 },
    } = props;
    props.onUpload({
      product_no: productNo,
      plan_code: planCode,
      group_flag: !!policyTypes,
      file,
    });
  };
  handleSubmit = () => {
    const props = this.props;
    const {
      productInfo: { productNo = '', policyTypes },
      channelSec = '',
      fileList,
      excelKey,
    } = props;
    if (!fileList.length) {
      message.warning('请先上传文件');
      return;
    }

    props.form.validateFields((err, values) => {
      const { time: [beginDate, endDate] = [undefined, undefined], ...resetForm } = values;
      props.onBatch({
        salesman: loginUser.loginId,
        channel_no: loginUser.channelNo,
        channel_sec: channelSec,
        product_no: productNo,
        excel_key: excelKey,
        group_flag: !!policyTypes,
        begin_date: beginDate.format('YYYY-MM-DD 00:00:00'),
        end_date: endDate.format('YYYY-MM-DD 23:59:59'),
        ...resetForm,
      });
    });
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { productName, planName, policyTypes } = props.productInfo;
    const { remark, beginDate, endDate } = props.declareInfo;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const btnItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 3 },
      },
    };
    const uploadProps = {
      accept: '.xlsx',
      fileList: props.fileList,
      className: style.upload,
      beforeUpload: () => {
        return false;
      },
      onChange: this.handleFileChange,
      onRemove: () => {
        return false;
      },
    };
    const { subject_type } = this.state;
    return (
      <div className={props.className}>
        <Form {...formItemLayout}>
          <Row>
            {/* <Col span={8}>
                            <FormItem label='订单号'>
                                <p>12345</p>
                            </FormItem>
                        </Col> */}
            <Col span={8}>
              <FormItem label="所选产品">
                <p className={style.text}>{productName}</p>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="销售人员">
                <p className={style.text}>{loginUser.userName}</p>
              </FormItem>
            </Col>

            {/* <Col span={8}>
                            <FormItem label='经办人员'>
                                <Input placeholder='请输入'/>
                            </FormItem>
                        </Col> */}
            <Col span={8}>
              <FormItem label="产品方案">
                <p className={style.text}>{planName}</p>
              </FormItem>
            </Col>
            {/* <Col span={8}>
                            <FormItem label='联系方式'>
                                <Input placeholder='请输入'/>
                            </FormItem>
                        </Col> */}
            <Col span={8}>
              <FormItem label="团个单标识">
                <p className={style.text}>{getValueFromKey(policyTypes, GROUP_FLAG)}</p>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="标的类型">
                {getFieldDecorator('subject_type', {
                  initialValue: subject_type,
                })(
                  <Select
                    allowClear
                    placeholder="请选择"
                    onChange={(value: string | undefined) => {
                      this.handleChange('subject_type', value);
                    }}
                  >
                    <Option value="travel">旅游意外险</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            {subject_type && [
              <Col span={8} key="insureArea">
                <FormItem label="承保范围">
                  {getFieldDecorator('insure_area', {
                    getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) =>
                      trim(e.target.value),
                  })(<Input placeholder="输入" />)}
                </FormItem>
              </Col>,
              <Col span={8} key="lineGroupNumber">
                <FormItem label="线路团号">
                  {getFieldDecorator('line_group_number', {
                    getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) =>
                      trim(e.target.value),
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>,
            ]}
            <Col span={24}>
              <FormItem label="保单备注" {...formItemLayout1}>
                {getFieldDecorator('remark', {
                  initialValue: remark,
                })(<Input.TextArea placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="保险期间" {...formItemLayout1}>
                {getFieldDecorator('time', {
                  initialValue: [
                    (beginDate && moment(beginDate)) || moment().add(1, 'd'),
                    (endDate && moment(endDate)) || moment().add(1, 'd'),
                  ],
                  rules: [
                    {
                      required: true,
                      message: '保险期间不能为空',
                    },
                  ],
                })(<RangePicker />)}
              </FormItem>
            </Col>
            {/* <Col span={24}>
                            <FormItem label='人均保费' {...formItemLayout1}>
                                <p>RMB<em>0.00元/人</em></p>
                            </FormItem>
                        </Col> */}

            <Col span={24}>
              <FormItem
                label="模板下载"
                {...formItemLayout1}
                extra="请下载批量申报模板，按要求填写后在这里上传"
              >
                {/* <AuthSwitch code='batch_policy_template_download'>
                                    <Button type='primary' icon='download' onClick={this.handleDownload}>模板下载</Button>
                                </AuthSwitch> */}
                <Button type="primary" icon="download" onClick={this.handleDownload}>
                  模板下载
                </Button>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="文件上传" {...formItemLayout1}>
                <Upload {...uploadProps}>
                  {/* <AuthSwitch code='batch_policy_upload'>
                                        <Button type='primary' icon='file'>选择文件</Button>
                                    </AuthSwitch> */}
                  <Button type="primary" icon="file">
                    选择文件
                  </Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="是否测试">
                {getFieldDecorator('test_flag')(
                  <Select placeholder="请选择">
                    <Option value="test">是</Option>
                    <Option value="">否</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...btnItemLayout} className="form-action-wrapper">
                {/* <Button type='primary' onClick={this.handleUpload}>上传</Button> */}
                <Button
                  onClick={() => {
                    props.doSetStep(0);
                  }}
                >
                  取消
                </Button>
                <AuthButton code="batch_policy_insure">
                  <Button type="primary" onClick={this.handleSubmit}>
                    确认投保
                  </Button>
                </AuthButton>
              </FormItem>
            </Col>
          </Row>
        </Form>
        {props.policyVisible && <PolicyModal />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { insure, app } = state;
  return {
    productInfo: { ...insure.product },
    declareInfo: { ...insure.declare },
    policyVisible: insure.policyVisible,
    policyList: [...insure.importPolicyList],
    channelSec: app.channelSec,
    fileList: insure.declareImport.fileList,
    excelKey: insure.declareImport.excelKey,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doSetStep: (step: number) => doInsureSetStep(step),
      onUpload: (data: InsureDeclareImportData) => doPostInsureDeclareImport.request(data),
      onBatch: (data: BatchInsureData) => doInsureBatch.request(data),
      onChannelInfo: (channelNo: string) => doGetChannelInfo.request(channelNo),
    },
    dispatch,
  );

export default Form.create<any>()(connect(mapStateToProps, mapDispatchToProps)(Declare));
