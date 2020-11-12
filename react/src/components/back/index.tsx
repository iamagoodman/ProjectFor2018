import * as React from 'react';
import { Breadcrumb } from 'antd';
import { BackItem } from '@/types';
import style from './index.module.less';

const BreadcrumbItem = Breadcrumb.Item;

interface Props {
  items: BackItem[];
}

export default function Back({ items }: Props) {
  return (
    <div className={style.wrapper}>
      <Breadcrumb>
        {items.map((item: BackItem) => (
          <BreadcrumbItem key={item.name}>
            {item.onBack ? (
              <a href="javascript:void(0);" onClick={item.onBack}>
                {item.displayName}
              </a>
            ) : (
              item.displayName
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
}
