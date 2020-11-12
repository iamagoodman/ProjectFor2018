import * as React from 'react';
import { connect } from 'react-redux';
import Search from './searchForm';
import Table from './table';
import { bindActionCreators, Dispatch } from 'redux';
import { doGetChannelAll } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import ChannelModal from './modals/channel';
import SyncModal from './modals/sync';

interface Props {
  getChannelAll: () => void;
  userChannelVisible: boolean;
  syncUserVisible: boolean;
}

class Channel extends React.Component<Props> {
  componentDidMount() {
    this.props.getChannelAll();
  }
  render() {
    const { userChannelVisible, syncUserVisible } = this.props;
    return (
      <div>
        <Search />
        <Table />
        {userChannelVisible && <ChannelModal />}
        {syncUserVisible && <SyncModal />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { userChannelVisible, syncUserVisible } = state.user;
  return {
    userChannelVisible,
    syncUserVisible,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getChannelAll: () => doGetChannelAll.request(),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
