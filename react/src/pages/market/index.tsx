import * as React from 'react';
import { connect } from 'react-redux';
import Search from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import ImportData from './import';
import { bindActionCreators, Dispatch } from 'redux';
import { SetKey, QueryParams, PolicyMarketFormData } from '@/types';
import {
  doSetPolicyMarketShowKey,
  doGetPolicyMarketList,
  doGetCompanyAll,
  doGetChannelGroupAll
} from '@/stores/actions';
import * as moment from 'moment';

interface Props {
  show: string;
  onSetKey: (data: SetKey) => void;
  getChannelGroupAll: () => void;
  getPolicy: (params: QueryParams<PolicyMarketFormData>) => void;
  getCompanyAll: () => void;
}

class Policy extends React.Component<Props> {
  componentDidMount() {
    const props = this.props;
    props.getChannelGroupAll();
    props.getCompanyAll();
    props.getPolicy({
      pageSize: 10,
      pageNumber: 1,
      data: {
        underwritingStartDate: moment()
          .subtract(7, 'd')
          .format('YYYY-MM-DD 00:00:00'),
        underwritingEndDate: moment().format('YYYY-MM-DD 23:59:59')
      }
    });
  }
  componentWillUnmount() {
    this.props.onSetKey({ show: 'list' });
  }
  render() {
    const props = this.props;

    return (
      <div>
        {!!(props.show === 'list') && [<Search key='search' />, <Table key='table' />]}
        {!!(props.show === 'import') && <ImportData />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  show: state.market.show
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSetKey: (data: SetKey) => doSetPolicyMarketShowKey(data),
      // getChannelAll: () => doGetChannelAll.request(),
      getChannelGroupAll: () => doGetChannelGroupAll.request(),
      getPolicy: (params: QueryParams<PolicyMarketFormData>) => doGetPolicyMarketList.request(params),
      getCompanyAll: () => doGetCompanyAll.request()
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
