import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Layout } from 'antd';
import CSider from './sider';
// import CHeader from './header';
import style from './layout.module.less';
import { doGetDictAll } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import { QueryPage } from '@/types';

const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
  getAllDict: (params: QueryPage) => void;
}

class CoreLayout extends React.Component<Props> {
  componentDidMount() {
    this.props.getAllDict({ pageSize: 99999999, pageNumber: 1 });
  }
  render() {
    const props = this.props;
    return (
      <Layout className={style['layout-wrapper']}>
        {/* <Header className={style['header-wrapper']}>
                    <CHeader />
                </Header> */}
        <Layout>
          <Sider className={style['sider-wrapper']}>
            <CSider className={style['sider-menu']} />
          </Sider>

          <Content className={style['content-wrapper']}>
            <div className={style['content-main']}>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllDict: (params: QueryPage) => doGetDictAll.request(params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
