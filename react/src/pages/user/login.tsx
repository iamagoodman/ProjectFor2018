import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import style from './index.module.less';
import { doUserLogin } from '@/stores/actions';
import { User } from '@/types';
import UserLayout from '@/layouts/userLayout';

const FormItem = Form.Item;

interface Props extends FormComponentProps, RouteComponentProps {
  onSubmit: (data: User) => void;
}

class Login extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  handleSubmit = () => {
    const props = this.props;
    const { form } = props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;

    return (
      <UserLayout>
        <div className={style.wrapper}>
          <div className={style.title}>登录</div>
          <Form>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名',
                  },
                ],
              })(
                <Input name="username" placeholder="请输入用户名" prefix={<Icon type="user" />} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码',
                  },
                ],
              })(
                <Input
                  name="password"
                  placeholder="请输入密码"
                  type="password"
                  prefix={<Icon type="lock" />}
                />,
              )}
            </FormItem>
            <FormItem>
              <Button
                className={style.submit}
                type="primary"
                size="large"
                onClick={this.handleSubmit}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: (data: User) => doUserLogin.request(data),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Login));
