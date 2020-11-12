import * as React from 'react';
import { connect } from 'react-redux';
import { Spin, Modal } from 'antd';
import Routes from '@/routes';
// import Nav from '@/components/nav';
import { RootState } from '@/stores/reducers';
import url from '@/services/url';
import DataX from '@/components/datax';
import Company from '@/components/company';

interface Props {
  loading: boolean;
  loadingText: string;
  dataxVisible: boolean;
  companyVisible: boolean;
}

class App extends React.Component<Props> {
  componentDidMount() {
    if (loginUser.userType !== 2 && appName === 'tbb-broker-portal') {
      Modal.confirm({
        title: '提示',
        content: `当前登录的账号为内部账号${loginUser.loginId},请注意确认`,
        okText: '重新登录',
        cancelText: '确定',
        onOk() {
          window.location.replace(url.user.login);
        }
      });
    }
  }
  render() {
    const { loading, loadingText, dataxVisible, companyVisible } = this.props;
    return (
      <div className='wrapper'>
        <Spin spinning={loading} tip={loadingText} className='loading-wrapper' />
        {/* <Nav /> */}
        <Routes />
        {dataxVisible && <DataX />}
        {companyVisible && <Company />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, datax, companyGlobal } = state;
  const { loading, loadingText } = app;

  return {
    loading,
    loadingText,
    dataxVisible: datax.visible,
    companyVisible: companyGlobal.visible
  };
};

export default connect(mapStateToProps)(App);
