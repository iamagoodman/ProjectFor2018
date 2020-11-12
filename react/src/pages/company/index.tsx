import * as React from 'react';
import { connect } from 'react-redux';
import Search from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import RCompany from './modals/company';
import Detail from './modals/detail';
import { bindActionCreators, Dispatch } from 'redux';
import { QueryParams, CompanyFormData, SetKey } from '@/types';
import { doGetCompanyList, doSetCompanyShowKey } from '@/stores/actions';

interface Props {
  show: string;
  getCompany: (params: QueryParams<CompanyFormData>) => void;
  onSetKey: (data: SetKey) => void;
}

class Company extends React.Component<Props> {
  componentDidMount() {
    this.props.getCompany({ pageSize: 10, pageNumber: 1, data: {} });
  }
  componentWillUnmount() {
    this.props.onSetKey({ show: 'list' });
  }
  render() {
    const { show } = this.props;
    return (
      <div>
        <Search />
        <Table />
        {!!(show === 'company') && <RCompany />}

        {!!(show === 'detail') && <Detail />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { show } = state.company;
  return {
    show,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCompany: (params: QueryParams<CompanyFormData>) => doGetCompanyList.request(params),
      onSetKey: (data: SetKey) => doSetCompanyShowKey({ show: 'list' }),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Company);
