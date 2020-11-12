import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Table, Form, Select, Row, Col } from 'antd';
import { RootState } from '@/stores/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import find from 'lodash/find';
import { doSetProductCompanyVisible, doGetProductCompanyAll } from '@/stores/actions';
import { RList, QueryParams, CompanyFormData, Company, ProductCompanyVisible } from '@/types';

const Option = Select.Option;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Column = Table.Column;

interface Props extends RList<Company, QueryParams<CompanyFormData>> {
  visible: boolean;
  onVisible: (data: ProductCompanyVisible) => void;
  onChange: (params: QueryParams<CompanyFormData>) => void;
}

interface State {
  key: string;
  value?: string;
  selectedRowKeys: number[];
  selectedRow: Company;
}

class PCompany extends React.Component<Props> {
  state: State = {
    key: 'companyNo',
    selectedRowKeys: [],
    selectedRow: {},
  };

  componentDidMount() {
    this.props.onChange({ data: {}, pageSize: 5, pageNumber: 1 });
  }
  handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value,
    });
  };
  handleOk = () => {};
  handleClick = () => {
    const { key, value } = this.state;
    this.props.onChange({
      pageSize: 5,
      pageNumber: 1,
      data: {
        [key]: value,
      },
    });
  };
  handleSelectedChange = (keys: number[], rows: Company[]) => {
    const len = keys.length;
    const selectedRowKeys = len > 1 ? [keys[len - 1]] : keys;
    const row =
      selectedRowKeys.length > 0
        ? find(rows, (row: Company) => row.id === selectedRowKeys[0]) || {}
        : {};
    this.setState({
      selectedRowKeys,
      selectedRow: row,
    });
  };
  render() {
    const props = this.props;
    const { key, value, selectedRowKeys, selectedRow } = this.state;
    const { list, current, totalCount, pageSize } = props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectedChange,
    };
    const pagination = {
      current,
      pageSize,
      total: totalCount,
      onChange: (pageNumber: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber });
      },
      onShowSizeChange: (pageNumber: number, pageSize: number) => {
        props.onChange({ pageSize, pageNumber });
      },
    };
    return (
      <Modal
        title="选择所属保险公司"
        visible={props.visible}
        maskClosable={false}
        onOk={() => {
          props.onVisible({ visible: false, selectedCompany: selectedRow });
        }}
        onCancel={() => {
          props.onVisible({ visible: false });
        }}
      >
        <Form>
          <Row>
            <Col span={18}>
              <FormItem>
                <InputGroup compact>
                  <Select
                    style={{ width: '40%' }}
                    placeholder="请选择"
                    value={key}
                    onChange={(value: string) => {
                      this.handleChange('key', value);
                    }}
                  >
                    <Option value="companyNo">编号</Option>
                    <Option value="companyName">公司名称</Option>
                  </Select>
                  <Input
                    value={value}
                    style={{ width: '60%' }}
                    placeholder="请输入"
                    autoComplete="off"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      this.handleChange('value', e.target.value);
                    }}
                  />
                </InputGroup>
              </FormItem>
            </Col>
            <Col span={4} offset={2}>
              <FormItem>
                <Button type="primary" onClick={this.handleClick}>
                  查询
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          rowSelection={rowSelection}
          dataSource={list}
          pagination={pagination}
          rowKey="id"
          size="middle"
          className="check-one-table"
        >
          <Column title="保险公司编号" key="companyNo" dataIndex="companyNo" />
          <Column title="保险公司名称" key="companyName" dataIndex="companyName" />
        </Table>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { company } = state.product;
  return {
    visible: state.product.companyVisible,
    list: company.list,
    ...company.page,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onVisible: (data: ProductCompanyVisible) => doSetProductCompanyVisible(data),
      onChange: (params: QueryParams<CompanyFormData>) => doGetProductCompanyAll.request(params),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PCompany);
