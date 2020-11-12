import * as React from 'react';
import img404 from '@/assets/notfound.png';
import style from './index.module.less';

export default function Auth404() {
  return (
    <div className={style.wrapper}>
      <img className={style.img} src={img404} alt="" />
    </div>
  );
}
