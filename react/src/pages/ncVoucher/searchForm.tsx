import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { trim } from '@/utils/util';
import { doGetNcVoucherList, doSetNcVoucherUploadVisible } from '@/stores/actions';
import { SubmitFormDefaultProps, QueryParams, NCVoucherFormData } from '@/types';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;

interface Props extends SubmitFormDefaultProps<QueryParams<NCVoucherFormData>> {
  onVisible: (visible: boolean) => void;
}

class SearchForm extends React.Component<Props> {
  componentDidMount() {
    this.props.onSubmit({ data: {}, pageSize: 10, pageNumber: 1 });
  }

  handleSubmit = () => {
    const props = this.props;
    const data: NCVoucherFormData = props.form.getFieldsValue();
    props.onSubmit({ pageSize: 10, pageNumber: 1, data });
  };
  handleClick = () => {
    const props = this.props;
    props.onVisible(true);
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form className="form-wrapper" {...formItemLayout}>
        <Row>
          <Col span={7}>
            <FormItem label="凭证类型" colon={false}>
              {getFieldDecorator('voucherType', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem {...formItemLayout} label="制表人" colon={false}>
              {getFieldDecorator('prepared', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={9} offset={1}>
            <FormItem className="form-action-wrapper">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code="insurance_ncVoucher_prepare_and_upload">
                <Button type="primary" onClick={this.handleClick}>
                  生成NC凭证并上传
                </Button>
              </AuthButton>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<NCVoucherFormData>) => doGetNcVoucherList.request(params),
      onVisible: (visible: boolean) => doSetNcVoucherUploadVisible(visible),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
