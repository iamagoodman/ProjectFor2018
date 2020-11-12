import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, message } from 'antd';
import { RootState } from '@/stores/reducers';
import { Channel, User } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doSetUserChannelVisible, doUserBindChannel } from '@/stores/actions';
import { filterOption, isNotEmpty } from '@/utils/util';

const Option = Select.Option;

interface Props extends User {
  visible: boolean;
  channelList: Channel[];
  onVisible: (visible: boolean) => void;
  onSubmit: (data: User) => void;
}

interface State {
  channel?: string;
}

class ChannelModal extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      channel: `${props.channelNo}%#%${props.channelName}`,
    };
  }

  handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value,
    });
  };
  handleSubmit = () => {
    const { loginId } = this.props;
    const { channel = '' } = this.state;
    const [channelNo, channelName] = channel.split('%#%');
    if (!isNotEmpty(channel)) {
      message.warning('请选择渠道');
      return;
    }
    this.props.onSubmit({ channelNo, channelName, loginId });
  };
  render() {
    const props = this.props;
    const { channelList, visible } = props;
    const { channel } = this.state;
    return (
      <Modal
        title="绑定渠道"
        visible={visible}
        onCancel={() => {
          props.onVisible(false);
        }}
        onOk={this.handleSubmit}
      >
        <Select
          showSearch
          placeholder="请选择"
          style={{ width: '100%' }}
          filterOption={filterOption}
          value={channel}
          onChange={(value: string) => {
            this.handleChange('channel', value);
          }}
        >
          {channelList.map((item: Channel) => (
            <Option key={item.channelNo} value={`${item.channelNo}%#%${item.channelName}`}>
              {item.channelName}
            </Option>
          ))}
        </Select>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { app, user } = state;
  return {
    channelList: app.channelList,
    visible: user.userChannelVisible,
    ...user.detail,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (visible: boolean) => doSetUserChannelVisible({ visible }),
      onSubmit: (data: User) => doUserBindChannel.request(data),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChannelModal);
