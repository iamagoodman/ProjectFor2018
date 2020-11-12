import * as React from 'react';
import img403 from '@/assets/forbidden.png';
import style from './index.module.less';

export default function Auth404() {
  return (
    <div className={style.wrapper}>
      <img src={img403} alt="" className={style.img} />
    </div>
  );
}
