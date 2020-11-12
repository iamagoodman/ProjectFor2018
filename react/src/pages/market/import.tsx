import * as React from 'react';
import { Form, Button, Upload, message, Select } from 'antd';
import Back from '@/components/back';
import { BackItem, PolicyMarketImportData, SetKey, Company } from '@/types';
import { FormComponentProps } from 'antd/lib/form';
import { filterOption } from '@/utils/util';
import { bindActionCreators, Dispatch } from 'redux';
import {
  // doGetProductAllByCompany,
  doPolicyMarketImportData,
  doSetPolicyMarketShowKey
} from '@/stores/actions';
import { connect } from 'react-redux';
import { RootState } from '@/stores/reducers';
import { UploadFile } from 'antd/lib/upload/interface';
import findIndex from 'lodash/findIndex';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends FormComponentProps {
  onSubmit: (data: PolicyMarketImportData) => void;
  onBack: (data: SetKey) => void;
  companyList: Company[];
}

interface State {
  handWorkFileList: UploadFile[];
}

class ImportData extends React.Component<Props> {
  state: State = {
    handWorkFileList: []
  };

  // handleCompanyChange = (value: string) => {
  //     const props = this.props;
  //     props.form.setFieldsValue({
  //         productNo: undefined,
  //         channelNo: undefined,
  //     });
  //     props.getProduct({ owningCompany: value });
  // };

  handleChange<T>(key: string, value: T) {
    this.setState({
      [key]: value
    });
  }
  handleSubmit = () => {
    const props = this.props;
    props.form.validateFields((err: any, { file, ...values }) => {
      if (!err) {
        const { handWorkFileList } = this.state;
        if (!handWorkFileList.length) {
          message.warning('文件不能为空');
          return;
        }
        const data: PolicyMarketImportData = {
          ...values,
          file: handWorkFileList[0]
        };
        props.onSubmit(data);
      }
    });
  };
  handleBeforUpload = (file: UploadFile) => {
    this.setState((state: State) => ({
      handWorkFileList: [file]
    }));
    return false;
  };
  handleHandWorkRemove = (file: UploadFile) => {
    this.setState((state: State) => {
      const index = findIndex(state.handWorkFileList, (item: UploadFile) => item === file);
      const newFileList = [...state.handWorkFileList];
      newFileList.splice(index, 1);
      return {
        handWorkFileList: newFileList
      };
    });
  };

  render() {
    const props = this.props;
    const items: BackItem[] = [
      {
        name: ' policyManage',
        displayName: '保单管理',
        onBack: () => {
          props.onBack({ show: 'list' });
        }
      },
      {
        displayName: '保单导入',
        name: 'import'
      }
    ];
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
    const { companyList, form } = props;
    const { getFieldDecorator } = form;
    const { handWorkFileList } = this.state;
    const uploadProps = {
      fileList: handWorkFileList,
      beforeUpload: this.handleBeforUpload,
      onRemove: this.handleHandWorkRemove,
      accept: '.xlsx,.csv,.xls'
    };

    return (
      <div>
        <Back items={items} />
        <Form className='operate-wrapper'>
          <FormItem {...formItemLayout} colon={false} label='保险公司名称'>
            {getFieldDecorator('insureCompanyName', {
              rules: [
                {
                  required: true,
                  message: '保险公司名称不能为空'
                }
              ]
            })(
              <Select showSearch filterOption={filterOption} placeholder='请选择'>
                {companyList.map((item: Company) => (
                  <Option key={item.companyNo} value={item.companyName}>
                    {item.companyName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label='上传保单' required>
            <div className='upload-wrapper'>
              <Upload {...uploadProps}>
                <Button icon='upload'>上传文件</Button>
              </Upload>
              <a
                href='/policy.xlsx'
                className='upload-download'
                download='保险营销活动保单导入模板_v1.xlsx'
                style={{ top: 0 }}
              >
                <Button icon='download'>保单模板</Button>
              </a>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} colon={false} label='&emsp;'>
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
  const { companyList } = state.app;
  return {
    companyList
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (data: PolicyMarketImportData) => doPolicyMarketImportData.request(data),
      onBack: (data: SetKey) => doSetPolicyMarketShowKey(data)
    },
    dispatch
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(ImportData));
