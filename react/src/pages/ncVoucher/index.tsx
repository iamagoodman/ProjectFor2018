import * as React from 'react';
import Search from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import { connect } from 'react-redux';
import UploadModal from './modals/upload';

interface Props {
  uploadVisible: boolean;
}

class NCVoucher extends React.Component<Props> {
  render() {
    const props = this.props;
    return (
      <div>
        <Search />
        <Table />
        {props.uploadVisible && <UploadModal />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  uploadVisible: state.ncVoucher.uploadVisible,
});

export default connect(mapStateToProps)(NCVoucher);
