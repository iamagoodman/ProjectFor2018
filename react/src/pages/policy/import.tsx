import * as React from 'react';
import { Form, Select, Button, Upload, Icon, message, Switch } from 'antd';
import Back from '@/components/back';
import {
  BackItem,
  Product,
  Channel,
  Company,
  ProductFormData,
  ChannelFormData,
  Attachment,
  PolicyImportData,
  SetKey,
} from '@/types';
import { FormComponentProps } from 'antd/lib/form';
import { filterOption } from '@/utils/util';
import { UPLOAD_TYPE } from '@/constans';
import { bindActionCreators, Dispatch } from 'redux';
import {
  doDataXVisible,
  doGetProductAllByCompany,
  doGetChannelAllByProduct,
  doDataXSelected,
  doDataXSelectedSet,
  doPolicyImportData,
  doSetPolicyShowKey,
} from '@/stores/actions';
import { connect } from 'react-redux';
import { RootState } from '@/stores/reducers';
import { UploadFile } from 'antd/lib/upload/interface';
import findIndex from 'lodash/findIndex';
import paths from '@/utils/config';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends FormComponentProps {
  doDataXVisible: (visible: boolean) => void;
  doDataXSelected: (file: Attachment, checked: boolean) => void;
  doDataXSelectedSet: (list: Attachment[]) => void;
  getProduct: (data: ProductFormData) => void;
  getChannel: (data: ChannelFormData) => void;
  productListByCompany: Product[];
  companyList: Company[];
  channelListByProduct: Channel[];
  dataxSelectedFiles: Attachment[];
  onSubmit: (data: PolicyImportData) => void;
  onBack: (data: SetKey) => void;
}

interface State {
  uploadType: string;
  handWorkFileList: UploadFile[];
}

class ImportData extends React.Component<Props> {
  state: State = {
    uploadType: 'excel',
    handWorkFileList: [],
  };
  oIframe: HTMLIFrameElement;
  componentDidMount() {
    this.props.doDataXSelectedSet([]);
    if (!this.oIframe) {
      this.oIframe = document.createElement('iframe');
      this.oIframe.style.display = 'none';
      document.body.appendChild(this.oIframe);
    }
  }
  componentWillUnmount() {
    if (this.oIframe) {
      document.body.removeChild(this.oIframe);
    }
  }
  handleCompanyChange = (value: string) => {
    const props = this.props;
    props.form.setFieldsValue({
      productNo: undefined,
      channelNo: undefined,
    });
    props.getProduct({ owningCompany: value });
  };
  handleProductChange = (value: string) => {
    const props = this.props;
    props.form.setFieldsValue({
      channelNo: undefined,
    });
    props.getChannel({ productNo: value });
  };
  handleChange<T>(key: string, value: T) {
    this.setState({
      [key]: value,
    });
  }
  handleSubmit = () => {
    const props = this.props;
    props.form.validateFields((err: any) => {
      if (!err) {
        const formData = props.form.getFieldsValue();
        const { uploadType, handWorkFileList } = this.state;
        const { dataxSelectedFiles } = props;
        if (
          (uploadType === 'excel' && handWorkFileList.length === 0) ||
          (uploadType === 'datax' && dataxSelectedFiles.length === 0)
        ) {
          // 手工上传
          message.warning('上传文件不能为空');
          return;
        }
        const data: PolicyImportData = {
          ...formData,
        };
        data.testFlag = data.testFlag ? 'test' : undefined;
        if (uploadType === 'excel') {
          data.file = handWorkFileList;
        } else if (uploadType === 'datax') {
          data.ossId = dataxSelectedFiles.map((item: Attachment) => item.ossId).join(',');
        }
        props.onSubmit(data);
      }
    });
  };
  handleBeforUpload = (file: UploadFile) => {
    this.setState((state: State) => ({
      handWorkFileList: [file],
    }));
    return false;
  };
  handleHandWorkRemove = (file: UploadFile) => {
    this.setState((state: State) => {
      const index = findIndex(state.handWorkFileList, (item: UploadFile) => item === file);
      const newFileList = [...state.handWorkFileList];
      newFileList.splice(index, 1);
      return {
        handWorkFileList: newFileList,
      };
    });
  };
  handleDownload = () => {
    this.oIframe.src = `${paths.baseUrl}excel/download?name=web&v=${Date.now()}`;
  };
  render() {
    const props = this.props;
    const items: BackItem[] = [
      {
        name: ' policyManage',
        displayName: '保单管理',
        onBack: () => {
          props.onBack({ show: 'list' });
        },
      },
      {
        displayName: '保单导入',
        name: 'import',
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const {
      productListByCompany,
      companyList,
      form,
      channelListByProduct,
      dataxSelectedFiles,
    } = props;
    const { getFieldDecorator } = form;
    const { uploadType, handWorkFileList } = this.state;
    const uploadProps = {
      fileList: handWorkFileList,
      beforeUpload: this.handleBeforUpload,
      onRemove: this.handleHandWorkRemove,
      accept: '.xlsx,.csv,.xls',
    };
    return (
      <div>
        <Back items={items} />
        <Form className="operate-wrapper">
          {/* <FormItem {...formItemLayout} colon={false} label='是否结算'>
                        {
                            getFieldDecorator('type', {
                                initialValue: '1'
                            })(
                                <Radio.Group>
                                    <Radio value='1'>是</Radio>
                                    <Radio value='0'>否</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem> */}
          <FormItem {...formItemLayout} colon={false} label="请选择所属保险机构">
            {getFieldDecorator('companyNo', {
              rules: [
                {
                  required: true,
                  message: '所属保险机构不能为空',
                },
              ],
            })(
              <Select
                showSearch
                filterOption={filterOption}
                onChange={this.handleCompanyChange}
                placeholder="请选择"
              >
                {companyList.map((item: Company) => (
                  <Option key={item.companyNo} value={item.companyNo}>
                    {item.companyName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label="请选择产品">
            {getFieldDecorator('productNo', {
              rules: [
                {
                  required: true,
                  message: '产品不能为空',
                },
              ],
            })(
              <Select
                showSearch
                filterOption={filterOption}
                placeholder="请选择"
                onChange={this.handleProductChange}
              >
                {productListByCompany.map((item: Product) => (
                  <Option key={item.productNo} value={item.productNo}>
                    {item.productName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label="请选择所属渠道">
            {getFieldDecorator('channelNo', {
              rules: [
                {
                  required: true,
                  message: '渠道不能为空',
                },
              ],
            })(
              <Select showSearch filterOption={filterOption} placeholder="请选择">
                {channelListByProduct.map((item: Channel) => (
                  <Option key={item.channelNo} value={item.channelNo}>
                    {item.channelName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label="是否测试">
            {getFieldDecorator('testFlag')(<Switch />)}
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label="上传方式">
            {getFieldDecorator('uploadType', {
              initialValue: uploadType,
            })(
              <Select
                onChange={(value: string) => {
                  this.handleChange<string>('uploadType', value);
                }}
              >
                {Object.keys(UPLOAD_TYPE).map((item: number | string) => (
                  <Option key={item} value={item}>
                    {UPLOAD_TYPE[item]}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          {!!(uploadType === 'excel') && (
            <FormItem {...formItemLayout} colon={false} label="手工上传保单">
              <div className="upload-wrapper">
                <Upload {...uploadProps}>
                  <Button icon="upload">上传文件</Button>
                </Upload>
                <Button onClick={this.handleDownload} icon="download" className="upload-download">
                  保单模板
                </Button>
              </div>
            </FormItem>
          )}
          {!!(uploadType === 'datax') && (
            <FormItem {...formItemLayout} colon={false} label="datax上传保单">
              <Button
                icon="plus-circle"
                onClick={() => {
                  props.doDataXVisible(true);
                }}
              >
                选择
              </Button>
              <ul className="datax-file-wrapper">
                {dataxSelectedFiles.map((item: Attachment) => (
                  <li className="datax-file-item" key={item.ossId}>
                    <span>
                      <Icon type="paper-clip" />
                      {item.name}({item.size})
                    </span>
                    <Icon
                      className="close"
                      type="close"
                      onClick={() => {
                        props.doDataXSelected(item, false);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </FormItem>
          )}
          <FormItem {...formItemLayout} colon={false} label="&emsp;">
            <Button type="primary" onClick={this.handleSubmit}>
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, datax } = state;
  return {
    productListByCompany: app.productListByCompany,
    companyList: app.companyList,
    channelListByProduct: app.channelListByProduct,
    dataxSelectedFiles: datax.selectedFiles,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doDataXVisible: (visible: boolean) => doDataXVisible(visible),
      getProduct: (data: ProductFormData) => doGetProductAllByCompany.request(data),
      getChannel: (data: ChannelFormData) => doGetChannelAllByProduct.request(data),
      doDataXSelected: (file: Attachment, checked) => doDataXSelected(file, checked),
      doDataXSelectedSet: (list: Attachment[]) => doDataXSelectedSet(list),
      onSubmit: (data: PolicyImportData) => doPolicyImportData.request(data),
      onBack: (data: SetKey) => doSetPolicyShowKey(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(ImportData));
