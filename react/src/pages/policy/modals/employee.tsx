import React from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'antd';
import { RootState } from '@/stores/reducers';
import { PolicyDetailEmployeeItem, SetVisibleData } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doSetPolicyVisible } from '@/stores/actions';

interface Props {
  visible: boolean;
  list: PolicyDetailEmployeeItem[];
  setPolicyVisible: (data: SetVisibleData) => void;
}

class EmployeeModal extends React.Component<Props> {
  render() {
    const props = this.props;
    const { visible, list } = props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '身份证号',
        dataIndex: 'idNumber',
        key: 'idNumber'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      }
    ];
    return (
      <Modal
        title='雇员信息'
        visible={visible}
        footer={null}
        maskClosable={false}
        onCancel={() => {
          props.setPolicyVisible({ type: 'detailEmployee', visible: false });
        }}
      >
        <Table dataSource={list} rowKey='idNumber' columns={columns} pagination={false} />
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  visible: state.policy.detailEmployeeVisible
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setPolicyVisible: (data: SetVisibleData) => doSetPolicyVisible(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);
