import * as React from 'react';
import Applicant from './applicant';
import Insured from './insured';
import style from './index.module.less';
import { InsureDeclarePolicy } from '@/types';
import { numberToMoney } from '@/utils/util';

// type Props = InsureDeclarePolicy;

interface Props extends InsureDeclarePolicy {
  groupFlag: boolean;
  current: number;
  total: number;
  pageSize: number;
  onChange: (pageNumber: number, pageSize?: number) => void;
}

export default function PolicyItem({
  applicant = {},
  insured = [],
  num,
  premium,
  groupFlag,
  isGeneratePolicyNo,
  policyNo,
  total,
  pageSize,
  current,
  onChange,
}: Props) {
  return (
    <div className={style.policy}>
      <div className={`${style.topic} clearfix`}>
        <div className={style.left}>
          {/* <span className={style.index}>保单{groupFlag ? null : num}</span> */}
          {isGeneratePolicyNo ? (
            <span className={style.no}>
              投保单号：<span className="bold">{policyNo}</span>
            </span>
          ) : null}
        </div>
        <div className={style.right}>
          <span className={style.insured}>
            被保险人：<span className="bold">{groupFlag ? total : insured.length}</span>
          </span>
          <span className={style.premium}>
            总保费：<span className="bold">{numberToMoney(premium || 0)}</span>元
          </span>
          {/* <span className={style.status}>投保成功</span> */}
        </div>
      </div>
      <div className={style.content}>
        <Applicant {...applicant} />
        <Insured
          list={insured}
          groupFlag={groupFlag}
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
