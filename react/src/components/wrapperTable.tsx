import * as React from 'react';
import { Table } from 'antd';
import { generateUniqueId } from '@/utils/util';
import omit from 'lodash/omit';

interface Props {
  columns: any[];
  data: any[];
  current: number;
  total: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  onChange: (page: number, pageSize?: number) => void;
  rowKey?: string;
  className?: string;
  size: 'default' | 'middle' | 'small' | undefined;
  scroll?: {
    x?: boolean | number | string;
    y?: boolean | number | string;
  };
  title?: (currentPageData: any[]) => React.ReactNode;
}

export default class WrapperTable extends React.PureComponent<Props> {
  static defaultProps = {
    showQuickJumper: false,
    showSizeChanger: true,
    current: 1,
    total: 0,
    pageSize: 10,
    size: 'default',
    onChange: () => {}
  };
  generateRowKeyData() {
    const { rowKey, data } = this.props;
    let niceData = [];
    if (data && data.length) {
      if (!rowKey) {
        // niceData = data.map((item: any) => ({
        //     ...item,
        //     uniqueRowKey: uuidv4()
        // }))
        niceData = generateUniqueId(data);
      } else {
        niceData = data;
      }
    }
    return niceData;
  }
  generateRowKey() {
    const { rowKey } = this.props;
    return !rowKey ? 'uniqueId' : rowKey;
  }

  renderPagination = () => {
    const props = this.props;
    const { current, total, pageSize, showSizeChanger = false, showQuickJumper = false } = props;
    return {
      current,
      total,
      pageSize,
      showSizeChanger,
      showQuickJumper,
      showTotal: (total: number, range: [number, number]) =>
        `当前显示第${range[0]}条至第${range[1]}条数据，共${total}条数据`,
      onChange: (page: number, pageSize?: number) => {
        props.onChange(page, pageSize);
      },
      onShowSizeChange: (page: number, pageSize: number) => {
        props.onChange(page, pageSize);
      }
    };
  };
  render() {
    const { className, columns, size, ...reset } = this.props;
    return (
      <Table
        className={`${className} wrapperTable`}
        rowKey={this.generateRowKey()}
        dataSource={this.generateRowKeyData()}
        pagination={this.renderPagination()}
        columns={columns}
        size={size}
        {...omit(reset, ['data', 'current', 'pageSize', 'onChange', 'total'])}
      />
    );
  }
}
