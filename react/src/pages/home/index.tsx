import * as React from 'react';
import welcome from '@/assets/welcome.png';
import style from './index.module.less';

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <img src={welcome} alt='' />
        <div className={style.footer}>
          {/* Copyright © 2018.金丰（北京）保险经纪有限公司 All Rights Reserved{' '} */}
          <a href='http://beian.miit.gov.cn/' target='_blank'>
            京ICP备19025860号
          </a>
        </div>
      </div>
    </div>
  );
}
