import * as React from 'react';
import { Layout } from 'antd';
import style from './layout.module.less';
import logo from '@/assets/logo.png';

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function UserLayout(props: Props) {
  return (
    <Layout className={style['layout-wrapper']}>
      <Header className={`${style['header-wrapper']} ${style['header-user-wrapper']}`}>
        <div className={style.logo}>
          <img className={style.img} src={logo} alt="同保呗经纪业务系统" />
          <hr></hr>
          <span className={style.text}>经纪业务核心系统</span>
        </div>
      </Header>
      <Content className={style['content-wrapper']}>{props.children}</Content>
    </Layout>
  );
}
