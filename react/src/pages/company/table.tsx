import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon, Modal, Table } from 'antd';
import findIndex from 'lodash/findIndex';
// import WrapperTable from '@/components/wrapperTable';
import { RootState } from '@/stores/reducers';
import { RList, QueryParams, CompanyFormData, Company, CompanyListItem, SetKey, CompanyLevel, DictObj } from '@/types';
import {
  doGetCompanyList,
  doSetCompanyShowKey,
  doDeleteCompany,
  doDeleteCompanySecond,
  doGetCompanyDetail,
  doSetCompanyLevel,
  doGetCompanySecondList,
  doSetCompanyExpandedRowKeys
} from '@/stores/actions';
import { getBusinessTypeObj } from '@/stores/selectors/app';
import style from './table.module.less';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<Company, QueryParams<CompanyFormData>> {
  onAddOrModify: (data: SetKey) => void;
  onDelete: (id: number | undefined) => void;
  onDeleteSecond: (id: number) => void;
  onDetail: (id: number | undefined) => void;
  onSetLevel: (data: CompanyLevel) => void;
  onSecond: (data: Company) => void;
  onSetExpandedRowKeys: (expandedRowKeys: number[]) => void;
  businessType: DictObj;
  expandedRowKeys: number[];
}

class CTable extends React.Component<Props> {
  handleDelete = (id: number | undefined, isFirst: boolean) => {
    const props = this.props;
    const content = isFirst ? '删除该保险公司将会删除其下所有的二级保险机构，是否确认删除？' : '是否确认删除？';
    Modal.confirm({
      title: '',
      content,
      onOk: () => {
        props.onDelete(id);
      }
    });
  };
  handleAddOrModifyCompany(level: string, company: Company) {
    this.props.onSetLevel({ level, company, show: 'company' });
    // this.props.history.push('/insurance/company/operate');
  }
  renderColumns = () => {
    const props = this.props;
    const { businessType } = props;
    const columns = [
      {
        title: '保险公司编号',
        dataIndex: 'companyNo',
        key: 'companyNo',
        width: '20%'
      },
      {
        title: '保险公司名称',
        dataIndex: 'companyName',
        key: 'companyName',
        width: '30%'
      },
      {
        title: '保险公司简称',
        dataIndex: 'simpleName',
        key: 'simpleName',
        width: '15%'
      },
      {
        title: '业务类型',
        dataIndex: 'businessType',
        key: 'businessType',
        width: '15%',
        render: (type: string) => businessType[type] || type
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        width: '20%',
        className: 'tr',
        render: (id: number, record: CompanyListItem) => {
          return (
            <div className='table-action-wrapper'>
              <AuthButton code='insurance_company_add2'>
                <Tooltip placement='bottom' title='新增二级保险机构'>
                  <Icon
                    type='plus-circle'
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      this.handleAddOrModifyCompany('second', {
                        owningCompanyNo: record.owningCompanyNo,
                        businessType: record.businessType,
                        owningCompanyId: id
                      });
                    }}
                  />
                </Tooltip>
              </AuthButton>

              <AuthButton code='insurance_company_detail'>
                <Tooltip placement='bottom' title='查看详情'>
                  <Icon
                    type='read'
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      props.onDetail(id);
                    }}
                  />
                </Tooltip>
              </AuthButton>
              <AuthButton code='insurance_company_modify'>
                <Tooltip placement='bottom' title='修改'>
                  <Icon
                    type='edit'
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      this.handleAddOrModifyCompany(record.level || 'first', { ...record });
                    }}
                  />
                </Tooltip>
              </AuthButton>
              <AuthButton code='insurance_company_delete'>
                <Tooltip placement='bottom' title='删除'>
                  <Icon
                    type='delete'
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      this.handleDelete(id, true);
                    }}
                  />
                </Tooltip>
              </AuthButton>
            </div>
          );
        }
      }
    ];
    return columns;
  };
  renderPagination = () => {
    const props = this.props;
    const { current, pageSize, totalCount } = props;

    return {
      current,
      total: totalCount,
      pageSize,
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: (total: number, range: [number, number]) =>
        `当前显示第${range[0]}条至第${range[1]}条数据，共${total}条数据`,
      onChange: (page: number, pageSize?: number) => {
        props.onChange({ pageSize, pageNumber: page });
      },
      onShowSizeChange: (page: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber: page });
      }
    };
  };
  renderExpandedRowRender = (record: Company) => {
    const props = this.props;
    return (
      <div>
        {record.insureCompanyList &&
          record.insureCompanyList.length > 0 &&
          record.insureCompanyList.map((item: Company) => (
            <div className={style['table-row']} key={item.id}>
              <div className={style['table-row-item']} onClick={() => {}}>
                {item.companyNo}
              </div>
              <div className={style['table-row-item']}>{item.companyName}</div>
              <div className={style['table-row-item']}>{item.simpleName}</div>
              <div className={style['table-row-item']}>
                {item.businessType ? props.businessType[item.businessType] : item.businessType}
              </div>
              <div className='table-action-wrapper' style={{ textAlign: 'right' }}>
                <Tooltip placement='bottom' title='查看详情'>
                  <Icon
                    type='read'
                    onClick={() => {
                      props.onDetail(item.id);
                    }}
                  />
                </Tooltip>
                <Tooltip placement='bottom' title='修改'>
                  <Icon
                    type='edit'
                    onClick={() => {
                      this.handleAddOrModifyCompany('second', {
                        ...item,
                        owningCompanyId: record.id
                      });
                    }}
                  />
                </Tooltip>

                <Tooltip placement='bottom' title='删除'>
                  <Icon
                    type='delete'
                    onClick={() => {
                      this.handleDelete(item.id, false);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          ))}
      </div>
    );
  };
  handleExpand = ({ companyNo, id, insureCompanyList }: Company) => {
    const props = this.props;
    const { expandedRowKeys } = props;
    const index = findIndex(expandedRowKeys, (i: number) => i === id);
    if (index === -1) {
      if (!insureCompanyList || !insureCompanyList.length) {
        props.onSecond({ owningCompanyNo: companyNo, id });
      } else {
        id && expandedRowKeys.push(id);
      }
    } else {
      expandedRowKeys.splice(index, 1);
    }
    props.onSetExpandedRowKeys(expandedRowKeys);
  };
  render() {
    const props = this.props;
    const { list, expandedRowKeys } = props;

    return (
      <Table
        dataSource={list}
        columns={this.renderColumns()}
        rowKey='id'
        pagination={this.renderPagination()}
        expandedRowRender={(record: Company) => this.renderExpandedRowRender(record)}
        // expandRowByClick={true}
        // onExpand={this.handleExpanded}
        onExpand={(expanded: boolean, record: Company) => {
          this.handleExpand(record);
        }}
        onRow={(record: Company) => {
          return {
            onClick: (e: Event) => {
              this.handleExpand(record);
            }
          };
        }}
        expandedRowKeys={expandedRowKeys}
        className={`${style.table} wrapperTable`}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { list, page, expandedRowKeys } = state.company;

  return {
    // list: getCompanyList(list),
    list,
    ...page,
    expandedRowKeys,
    businessType: getBusinessTypeObj(state.app.businessTypeList)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<CompanyFormData>) => doGetCompanyList.request(params),
      onAddOrModify: (data: SetKey) => doSetCompanyShowKey(data),
      onDelete: (id: number | undefined) => doDeleteCompany.request(id),
      onDeleteSecond: (id: number) => doDeleteCompanySecond.request(id),
      onDetail: (id: number | undefined) => doGetCompanyDetail.request(id),
      onSetLevel: (data: CompanyLevel) => doSetCompanyLevel(data),
      onSecond: (data: Company) => doGetCompanySecondList.request(data),
      onSetExpandedRowKeys: (expandedRowKeys: number[]) => doSetCompanyExpandedRowKeys(expandedRowKeys)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CTable));

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Table)));
