import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Icon, Tooltip } from 'antd';
import { User } from '@/types';
import { RootState } from '@/stores/reducers';
import { doGetUserInfo } from '@/stores/actions';
import style from './layout.module.less';
import logo from '@/assets/logo.png';

interface Props extends RouteComponentProps, User {
  onGetUserInfo: () => void;
}

class Header extends React.Component<Props> {
  componentDidMount() {
    this.props.onGetUserInfo();
  }

  render() {
    const props = this.props;
    return (
      <div>
        <div className={style.logo}>
          <img className={style.img} src={logo} alt="同保呗经纪业务系统" />
          <hr></hr>
          <span className={style.text}>经纪业务核心系统</span>
        </div>
        <div className={style['header-right']}>
          <div className={style.exit}>
            <Tooltip placement="bottom" title="退出">
              <a href="/logout">
                <Icon type="logout" />
              </a>
            </Tooltip>
          </div>
          <div className={style.user}>
            <Icon type="user" />
            <span>{props.nickName || props.userName || props.loginId}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { userInfo } = state.user;
  return {
    ...userInfo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetUserInfo: () => doGetUserInfo.request(),
    },
    dispatch,
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
