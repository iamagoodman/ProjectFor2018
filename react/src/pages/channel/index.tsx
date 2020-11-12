import * as React from 'react';
import { connect } from 'react-redux';
import SearchForm from './searchForm';
import Table from './table';
import { RootState } from '@/stores/reducers';
import Detail from './modals/detail';
import RChannel from './modals/channel';
import { QueryParams, ChannelFormData, SetKey } from '@/types';
import { doGetChannelList, doSetChannelShowKey } from '@/stores/actions';
import { bindActionCreators, Dispatch } from 'redux';

interface Props {
  show: string;
  getChannel: (params: QueryParams<ChannelFormData>) => void;
  onSetKey: (data: SetKey) => void;
}

class Channel extends React.Component<Props> {
  componentDidMount() {
    this.props.getChannel({ pageSize: 10, pageNumber: 1, data: {} });
  }
  componentWillUnmount() {
    this.props.onSetKey({ show: 'list' });
  }

  render() {
    const { show } = this.props;
    return (
      <div>
        <SearchForm />
        <Table />
        {!!(show === 'channel') && <RChannel />}
        {!!(show === 'detail') && <Detail />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { show } = state.channel;
  return {
    show
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getChannel: (params: QueryParams<ChannelFormData>) => doGetChannelList.request(params),
      onSetKey: (data: SetKey) => doSetChannelShowKey(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
