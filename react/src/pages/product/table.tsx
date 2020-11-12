import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon, Switch } from 'antd';
import WrapperTable from '@/components/wrapperTable';
import { ProductFormData, QueryParams, Product, RList, DetailRequest, DictObj } from '@/types';
import { RootState } from '@/stores/reducers';
import {
  doGetProductList,
  doGetProductDetail,
  doUpdateProductStatus,
  doGetProductEditorDetail
} from '@/stores/actions';
import { getProductCategoryListObj } from '@/stores/selectors/app';
import AuthButton from '@/components/auth/authButton';

interface Props extends RList<Product, QueryParams<ProductFormData>> {
  onDetail: (data: DetailRequest) => void;
  onUpdate: (data: Product) => void;
  onEditorDetail: (data: DetailRequest) => void;
  productCategory: DictObj;
}

class Table extends React.Component<Props> {
  render() {
    const props = this.props;
    const { current, pageSize, totalCount, list, productCategory } = props;
    const columns = [
      {
        title: '产品编号',
        key: 'productNo',
        dataIndex: 'productNo'
      },
      {
        title: '产品名称',
        key: 'productName',
        dataIndex: 'productName'
      },
      {
        title: '产品类型',
        key: 'productType',
        dataIndex: 'productType',
        render: (text: string) => productCategory[text] || text
      },
      {
        title: '所属保险公司',
        key: 'companyName',
        dataIndex: 'companyName'
      },
      {
        title: '产品状态',
        key: 'productStatus',
        dataIndex: 'productStatus',
        render: (status: number, { id }: Product) => (
          <AuthButton code='insurance_product_update_status'>
            <Switch
              checked={!!status}
              onChange={(checked: boolean) => {
                props.onUpdate({ id, productStatus: checked ? 1 : 0 });
              }}
            />
          </AuthButton>
        )
      },
      {
        title: '',
        key: 'action',
        dataIndex: 'id',
        render: (id: number, { extensionType }: Product) => (
          <div className='table-action-wrapper'>
            <AuthButton code='insurance_product_detail'>
              <Tooltip placement='bottom' title='查看详情'>
                <Icon
                  type='read'
                  onClick={() => {
                    props.onDetail({ id, show: 'detail' });
                  }}
                />
              </Tooltip>
            </AuthButton>
            <AuthButton code='insurance_product_modify'>
              <Tooltip placement='bottom' title='修改产品信息'>
                <Icon
                  type='form'
                  onClick={() => {
                    props.onDetail({ id, show: 'product' });
                  }}
                />
              </Tooltip>
            </AuthButton>
            {extensionType === 0 ? null : (
              <AuthButton code='insurance_product_modify_h5'>
                <Tooltip placement='bottom' title='修改H5'>
                  <Icon
                    type='edit'
                    onClick={() => {
                      props.onEditorDetail({ id, show: 'editor' });
                    }}
                  />
                </Tooltip>
              </AuthButton>
            )}
          </div>
        )
      }
    ];
    return (
      <WrapperTable
        data={list}
        columns={columns}
        rowKey='id'
        current={current}
        pageSize={pageSize}
        total={totalCount}
        onChange={(pageNumber: number, pageSize: number) => {
          props.onChange({ pageSize, pageNumber });
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, product } = state;
  const { page, list } = product;
  const { productCategoryList } = app;
  return {
    list,
    ...page,
    productCategory: getProductCategoryListObj(productCategoryList)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChange: (params: QueryParams<ProductFormData>) => doGetProductList.request(params),
      onDetail: (data: DetailRequest) => doGetProductDetail.request(data),
      onUpdate: (data: Product) => doUpdateProductStatus.request(data),
      onEditorDetail: (data: DetailRequest) => doGetProductEditorDetail.request(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Table));
