import React from 'react';
import { Row, Col, Button, message, Select } from 'antd';
import Upload from '@/components/upload';
import Back from '@/components/back';
import { BackItem, SetKey, PolicyQzImportData } from '@/types';
import { connect } from 'react-redux';
import { doSetPolicyShowKey, doPolicyQzImportData } from '@/stores/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { UploadFile } from 'antd/lib/upload/interface';

const Option = Select.Option;

interface Props {
  onBack: (data: SetKey) => void;
  onSubmit: (data: PolicyQzImportData) => void;
}

interface State {
  file: UploadFile;
  testFlag: string;
}

class Import extends React.Component<Props> {
  state: State = {
    file: undefined,
    testFlag: undefined
  };
  handleChange<T>(key: string, value: T) {
    this.setState({
      [key]: value
    });
  }
  handleSubmit = () => {
    const { file, testFlag } = this.state;
    if (!file) {
      message.warning('文件不能为空');
      return;
    }
    this.props.onSubmit({ file, testFlag });
  };
  render() {
    const props = this.props;
    const { file, testFlag } = this.state;
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
    return (
      <div>
        <Back items={items} />
        <Row className='detail-wrapper detail-form-wrapper'>
          <Col span={24} className='detail-item-wrapper'>
            <Col span={4} className='tr'>
              是否测试：
            </Col>
            <Col span={10}>
              <Select
                style={{ width: 200 }}
                value={testFlag}
                placeholder='请选择'
                allowClear
                onChange={(value: string) => {
                  this.handleChange<string>('testFlag', value);
                }}
              >
                <Option value='test'>是</Option>
                <Option value=''>否</Option>
              </Select>
            </Col>
          </Col>
          <Col span={24} className='detail-item-wrapper'>
            <Col span={4} className='tr'>
              excel文件：
            </Col>
            <Col span={10}>
              <Upload
                download
                downloadSrc={`/qzPolicy.xlsx?v=${Date.now()}`}
                value={file}
                onChange={(file: UploadFile) => {
                  this.handleChange<UploadFile>('file', file);
                }}
              >
                <Button icon='upload'>上传文件</Button>
              </Upload>
            </Col>
          </Col>
          <Col span={24}>
            <Col offset={4} span={20}>
              <Button type='primary' onClick={this.handleSubmit}>
                确定
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetPolicyShowKey(data),
      onSubmit: (data: PolicyQzImportData) => doPolicyQzImportData.request(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Import);
