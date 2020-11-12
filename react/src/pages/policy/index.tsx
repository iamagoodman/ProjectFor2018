import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Search from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import ImportData from './import';
import QzImport from './qzImport';
import { bindActionCreators, Dispatch } from 'redux';
import { SetKey, PolicyFormData, QueryParams } from '@/types';
import {
  doSetPolicyShowKey,
  doGetPolicyList,
  doGetChannelAll,
  doGetProductAll,
  doGetCompanyAll
} from '@/stores/actions';
import * as moment from 'moment';

interface Props extends RouteComponentProps {
  show: string;
  onSetKey: (data: SetKey) => void;
  getChannelAll: () => void;
  getProductAll: () => void;
  getCompanyAll: () => void;
  getPolicy: (params: QueryParams<PolicyFormData>) => void;
}

class Policy extends React.Component<Props> {
  componentDidMount() {
    const props = this.props;
    props.getChannelAll();
    props.getProductAll();
    props.getCompanyAll();
    props.getPolicy({
      pageSize: 10,
      pageNumber: 1,
      data: {
        startTime: moment()
          .subtract(7, 'd')
          .format('YYYY-MM-DD 00:00:00'),
        endTime: moment().format('YYYY-MM-DD 23:59:59')
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
        {!!(props.show === 'qzImport') && <QzImport />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  show: state.policy.show
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSetKey: (data: SetKey) => doSetPolicyShowKey(data),
      getChannelAll: () => doGetChannelAll.request(),
      getProductAll: () => doGetProductAll.request(),
      getCompanyAll: () => doGetCompanyAll.request(),
      getPolicy: (params: QueryParams<PolicyFormData>) => doGetPolicyList.request(params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
