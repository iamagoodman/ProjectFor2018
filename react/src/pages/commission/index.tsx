import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchForm from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import { QueryParams, CommissionFormData } from '@/types';
import { doGetCommissionList, doGetProductChannelAll } from '@/stores/actions';

const RCommission = React.lazy(() => import('./commission'));
const Detail = React.lazy(() => import('./detail'));

interface Props {
  show: string;
  getCommission: (params: QueryParams<CommissionFormData>) => void;
  // getProductAll: () => void,
  // getChannelAll: () => void,
  getProductChannelAll: () => void;
}

class Commission extends React.Component<Props> {
  componentDidMount() {
    this.props.getCommission({ pageSize: 10, pageNumber: 1, data: {} });
    // this.props.getProductAll();
    // this.props.getChannelAll();
    this.props.getProductChannelAll();
  }
  render() {
    const { show } = this.props;
    return (
      <div>
        {!!(show === 'list') && [<SearchForm key='search' />, <Table key='table' />]}
        {!!(show === 'commission') && <RCommission />}
        {!!(show === 'detail') && <Detail />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  show: state.commission.show
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCommission: (params: QueryParams<CommissionFormData>) => doGetCommissionList.request(params),
      // getProductAll: () => doGetProductAll.request(),
      // getChannelAll: () => doGetChannelAll.request(),
      getProductChannelAll: () => doGetProductChannelAll.request()
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Commission);
