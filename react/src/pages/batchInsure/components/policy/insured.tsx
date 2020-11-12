import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import style from './index.module.less';
import { InsuredInfo, DictObj } from '@/types';
import { generateUniqueId, getValueFromKey } from '@/utils/util';
import { getRelationTypeListObj, getIdentityTypeListObj } from '@/stores/selectors/app';
import { RootState } from '@/stores/reducers';

interface Props {
  list: InsuredInfo[];
  groupFlag: boolean;
  current: number;
  total: number;
  pageSize: number;
  onChange: (pageNumber: number, pageSize?: number) => void;
  relationType: DictObj;
  identityType: DictObj;
}

function Insured({
  list,
  groupFlag,
  total,
  current,
  pageSize,
  onChange,
  relationType,
  identityType,
}: Props) {
  const columns = [
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      key: 'idType',
      render: (idType: string) => getValueFromKey(idType, identityType),
    },
    {
      title: '证件号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //     title: 'remark',
    //     dataIndex: 'remark',
    //     key :'remark'
    // },
    // {
    //     title: '手机号',
    //     dataIndex: 'mobile',
    //     key: 'mobile'
    // },
    // {
    //     title: '身故受益人',
    //     dataIndex: 'benefitName',
    //     key: 'benefitName'
    // },
    {
      title: '与投保人关系',
      dataIndex: 'relation',
      key: 'relation',
      render: (relation: string) => getValueFromKey(relation, relationType),
    },
  ];
  // if (groupFlag) {
  //     columns.unshift({
  //         title: '编号',
  //         dataIndex: 'num',
  //         key: 'num'
  //     })
  // }
  const pagination = groupFlag
    ? {
        total,
        current,
        pageSize,
        onChange,
        showTotal: (total: number, range: number[]) =>
          `共${total}条数据，当前显示第${range[0]}至${range[1]}条数据`,
      }
    : false;
  return (
    <div className={style.insured}>
      <div className={style.title}>被保险人信息</div>
      <Table
        rowKey="uniqueId"
        columns={columns}
        dataSource={generateUniqueId<InsuredInfo>(list)}
        pagination={pagination}
        size="middle"
        className={style.iTable}
        bordered
      />
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const { relationTypeList, identityTypeList } = state.app;
  return {
    relationType: getRelationTypeListObj(relationTypeList),
    identityType: getIdentityTypeListObj(identityTypeList),
  };
};

export default connect(mapStateToProps)(Insured);
