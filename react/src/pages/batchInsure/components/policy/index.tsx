import * as React from 'react';
import { Pagination } from 'antd';
import PolicyItem from './policyItem';
import style from './index.module.less';
import { InsureDeclarePolicy } from '@/types';

interface Props {
  list: InsureDeclarePolicy[];
  groupFlag: boolean;
  totalCount: number;
  current: number;
  pageSize: number;
  onChange: (pageNumber: number, pageSize?: number) => void;
}

export default function Policy({
  list,
  groupFlag,
  current,
  pageSize,
  totalCount,
  onChange,
}: Props) {
  return (
    <div className={style.wrapper}>
      <div>
        {list.map((item: InsureDeclarePolicy, index: number) => (
          <PolicyItem
            groupFlag={groupFlag}
            key={index}
            current={current}
            total={totalCount}
            pageSize={pageSize}
            onChange={onChange}
            {...item}
          />
        ))}
      </div>

      {groupFlag ? null : (
        <div className={style.pagination}>
          <Pagination
            current={current}
            total={totalCount}
            pageSize={pageSize}
            onChange={onChange}
            showTotal={(total, range) =>
              `共${total}条数据，当前显示第${range[0]}至${range[1]}条数据`
            }
          />
        </div>
      )}
    </div>
  );
}
