import * as React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import style from './index.module.less';

interface Pagination {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
}

interface Props extends SelectProps {
  children: any;
  pagination?: Pagination;
}

interface State {
  open: boolean;
  pagination?: Pagination;
}

export default class PaginationSelect extends React.Component<Props> {
  // static getDerivedStateFromProps(props: Props, state: State) {
  //     const { pagination, children } = props;
  //     let statePagination = state.pagination;
  //     if (pagination) {
  //         const { current, pageSize, total } = pagination;
  //         statePagination = {...statePagination, current, pageSize, total: total || children.length }

  //     }
  //     return {
  //         pagination: { ...statePagination }
  //     }
  // }
  state: State;
  timer: any;
  visible: boolean;
  changeVisible: (visible: boolean) => void;
  constructor(props: Props) {
    super(props);
    const { open, pagination, children = [] } = props;
    let initPagination: Pagination = {};
    if (pagination) {
      const { current, defaultCurrent, pageSize, defaultPageSize, total } = pagination;
      initPagination = {
        current: current || defaultCurrent || 1,
        pageSize: pageSize || defaultPageSize || 10,
        total: total || children.length,
      };
    }
    this.state = {
      open: typeof open === 'boolean' ? open : false,
      pagination: initPagination,
    };
    this.timer = null;
    this.visible = false;
    this.changeVisible = (function(self) {
      let cacheVisible = false;
      const that = self;
      return function(visible: boolean) {
        cacheVisible = visible || cacheVisible;
        if (that.timer) {
          window.clearTimeout(that.timer);
        }
        that.timer = setTimeout(() => {
          that.setState({
            open: cacheVisible,
          });
          cacheVisible = false;
        }, 120);
      };
    })(this);
  }

  // changeVisible = (visible: boolean) => {
  //     this.visible = visible || this.visible;
  //     if (this.timer) {
  //         window.clearTimeout(this.timer);
  //     }
  //     this.timer = setTimeout(() => {
  //         this.setState({
  //           open: this.visible
  //         });
  //         this.visible = false;
  //       }, 200);
  // }

  onLastPage = (e: any) => {
    // e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation();
    const { pagination } = this.state;
    if (pagination) {
      this.setState({
        pagination: {
          ...pagination,
          current: pagination.current && pagination.current - 1,
        },
      });
    }
    this.changeVisible(true);
  };

  onNextPage = (e: any) => {
    console.log('page');
    // e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation();
    const { pagination } = this.state;
    if (pagination) {
      this.setState({
        pagination: {
          ...pagination,
          current: pagination.current && pagination.current + 1,
        },
      });
    }
    this.changeVisible(true);
  };

  dropdownRender = (child: any) => {
    const { children } = this.props;
    const { pagination = {} } = this.state;
    const { pageSize = 10, current: lastCurrent = 1 } = pagination;
    const total = child.props.menuItems.length;
    const allTotal = children.length;
    const current = allTotal > total ? 1 : lastCurrent;
    const start = (current - 1) * pageSize;
    const end = current * pageSize > total ? total : current * pageSize;
    const showPaginationBtn = total > pageSize;
    let menuItems = [];
    if (total > child.props.menuItems.length) {
      menuItems = child.props.menuItems;
    } else {
      menuItems = child.props.menuItems.slice(start, end);
    }

    return (
      <div>
        {current > 1 && showPaginationBtn && (
          <div className={style['pagination-btn']} onClick={this.onLastPage}>
            上一页
          </div>
        )}
        {React.cloneElement(child, {
          ...child.props,
          menuItems,
          visible: true,
        })}
        {end < total && showPaginationBtn && (
          <div className={style['pagination-btn']} onClick={this.onNextPage}>
            下一页
          </div>
        )}
      </div>
    );
  };

  render() {
    const { children, ...resetProps } = this.props;
    const { open } = this.state;

    return (
      <Select
        {...resetProps}
        dropdownRender={this.dropdownRender}
        onDropdownVisibleChange={(visible: boolean) => {
          this.changeVisible(visible);
        }}
        open={open}
      >
        {children}
      </Select>
    );
  }
}
