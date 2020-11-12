import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuItem } from '@/types';
import * as H from 'history';
import { MENUS } from '@/constans';
import { doInsureInit } from '@/stores/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// const SubMenu = Menu.SubMenu;

interface Props extends RouteComponentProps {
  className: string;
  onStep: () => void;
}

interface State {
  selectedKeys: string[];
  location: H.Location;
}

function getKeyFromLocation(location: H.Location) {
  const arr = location.pathname.split('/').filter((a: string) => a);
  const key = arr.slice(0, 2).join('');
  return {
    selectedKeys: [key],
    openKeys: [arr[0]]
  };
}

class Sider extends React.PureComponent<Props> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.location !== state.location) {
      const { selectedKeys } = getKeyFromLocation(props.location);
      return {
        location: props.location,
        selectedKeys
      };
    }
    return null;
  }
  state: State;
  constructor(props: Props) {
    super(props);
    const { selectedKeys } = getKeyFromLocation(props.location);
    this.state = {
      selectedKeys,
      location: props.location
    };
  }
  renderClick = () => {
    return {
      batch_insure: () => {
        this.props.onStep();
      }
    };
  };
  onClick = (url: string) => {
    const user = { userName: loginUser.userName, loginId: loginUser.loginId };
    localStorage.setItem('user', JSON.stringify(user));
    window.location.replace(url);
  };
  renderMenu(menus: MenuItem[], flag: boolean) {
    return menus.map((item: MenuItem) => {
      /*
            if (flag) {
                if (item.children && item.children.length) {
                    return <SubMenu key={item.key} title={item.name}>{this.renderMenu(item.children, false)}</SubMenu>
                } else {
                    return null;
                }
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.url}>{item.name}</NavLink>
                    </Menu.Item>
                )
            }
            */
      return (
        <Menu.Item key={item.key}>
          {item.isRefresh ? (
            <a
              style={{ paddingLeft: 30 }}
              href='javascript:void(0);'
              onClick={() => {
                this.onClick(item.url);
              }}
            >
              {item.name}
            </a>
          ) : (
            <NavLink onClick={this.renderClick()[item.code]} to={item.url} style={{ paddingLeft: 30 }}>
              {item.name}
            </NavLink>
          )}
        </Menu.Item>
      );
    });
  }

  handleSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    this.setState({
      selectedKeys
    });
  };
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <Menu
        className={props.className}
        selectedKeys={state.selectedKeys}
        theme='light'
        // onSelect={this.handleSelect}
      >
        {this.renderMenu(admin ? MENUS : menus, true)}
      </Menu>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onStep: () => doInsureInit()
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sider));
