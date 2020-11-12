import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { trim } from '@/utils/util';
import { SubmitFormDefaultProps, QueryParams, UserFormData } from '@/types';
import { doGetUserList, doSetUserSyncVisible } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import AuthButton from '@/components/auth/authButton';

const FormItem = Form.Item;

interface Props extends SubmitFormDefaultProps<QueryParams<UserFormData>> {
  onVisible: (visible: boolean) => void;
}

class SearchForm extends React.Component<Props> {
  componentDidMount() {
    this.props.onSubmit({ data: {}, pageSize: 10, pageNumber: 1 });
  }
  handleSubmit = () => {
    const props = this.props;
    const data: UserFormData = props.form.getFieldsValue();

    props.onSubmit({ pageSize: 10, pageNumber: 1, data: { ...data } });
  };
  render() {
    const props = this.props;
    const { form } = props;
    const { getFieldDecorator } = form;
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
      <Form className="form-wrapper">
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="用户loginId" colon={false}>
              {getFieldDecorator('loginId', {
                getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => trim(e.target.value),
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>

          <Col span={7} offset={1}>
            <FormItem className="form-action-wrapper">
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              <AuthButton code="insurance_userChannel_bind">
                <Button
                  type="primary"
                  onClick={() => {
                    props.onVisible(true);
                  }}
                >
                  同步用户
                </Button>
              </AuthButton>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (params: QueryParams<UserFormData>) => doGetUserList.request(params),
      onVisible: (visible: boolean) => doSetUserSyncVisible({ visible }),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
