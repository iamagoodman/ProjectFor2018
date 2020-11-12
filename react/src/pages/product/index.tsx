import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchForm from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import { QueryParams, ProductFormData, SetKey } from '@/types';
import { doGetProductList, doGetCompanyAll, doSetProductShowKey } from '@/stores/actions';

const RProduct = React.lazy(() => import('./product'));
const Detail = React.lazy(() => import('./detail'));
const Editor = React.lazy(() => import('./editorProduct'));

interface Props {
  show: string;
  getProduct: (params: QueryParams<ProductFormData>) => void;
  getCompanyAll: () => void;
  onSetKey: (data: SetKey) => void;
}

class Product extends React.Component<Props> {
  componentDidMount() {
    this.props.getProduct({ pageSize: 10, pageNumber: 1, data: {} });
    this.props.getCompanyAll();
  }
  componentWillUnmount() {
    this.props.onSetKey({ show: 'list', key: 'formData', data: {} });
  }
  render() {
    const { show } = this.props;
    return (
      <div>
        {!!(show === 'list') && [<SearchForm key="search" />, <Table key="table" />]}
        {!!(show === 'product') && <RProduct />}
        {!!(show === 'detail') && <Detail />}
        {!!(show === 'editor') && <Editor />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  show: state.product.show,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getProduct: (params: QueryParams<ProductFormData>) => doGetProductList.request(params),
      getCompanyAll: () => doGetCompanyAll.request(),
      onSetKey: (data: SetKey) => doSetProductShowKey(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
