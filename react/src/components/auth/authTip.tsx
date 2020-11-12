import * as React from 'react';
import style from './index.module.less';

interface Props {
  title: string;
  tip?: string;
}

export default function Tip({ title = '', tip = '该页面不支持移动端访问，请在pc上访问' }: Props) {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.back}>
          <a href='/mobile' className={style.home}>
            首页
          </a>
        </div>
        {title}
      </div>
      <div className={style.content}>
        <p>{tip}</p>
      </div>
    </div>
  );
}
