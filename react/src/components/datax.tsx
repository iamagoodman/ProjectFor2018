import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker, Modal, Form, Button, Row, Col, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import findIndex from 'lodash/findIndex';
import * as moment from 'moment';
import { DataX, Attachment, RList, QueryParams, DataXFormData } from '@/types';
import { doDataXVisible, doGetDataX, doDataXSelectedSet } from '@/stores/actions';
import { RootState } from '@/stores/reducers';
import WrapperTable from './wrapperTable';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

interface Props extends RList<DataX, QueryParams<DataXFormData>>, FormComponentProps {
  visible: boolean;
  doDataXVisible: (visible: boolean) => void;
  selectedFiles: Attachment[];
  // doDataXSelected: (file: Attachment, checked: boolean) => void,
  doDataXSelectedSet: (list: Attachment[]) => void;
}

class List extends React.Component<Props> {
  state: {
    selectedFiles: Attachment[];
    rangeTime: RangePickerValue;
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedFiles: [...props.selectedFiles],
      rangeTime: [moment().subtract(1, 'months'), moment()],
    };
  }
  componentDidMount() {
    const data = this.getTime();
    this.props.onChange({ data: { ...data }, pageSize: 5, pageNumber: 1 });
  }
  handleSubmit = () => {
    const props = this.props;
    const data = this.getTime();
    props.onChange({ data: { ...data }, pageSize: 5, pageNumber: 1 });
  };

  getTime() {
    const rangeTime = this.props.form.getFieldValue('rangeTime');
    if (rangeTime && rangeTime[0] && rangeTime[1]) {
      return {
        startTime: rangeTime[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: rangeTime[1].format('YYYY-MM-DD HH:mm:ss'),
      };
    } else {
      return {};
    }
  }

  handleChange = (file: Attachment, checked: boolean) => {
    // let selectedFiles = [...this.state.selectedFiles];
    // if (checked) {
    //     selectedFiles.push(file);
    // } else {
    //     selectedFiles = selectedFiles.filter((item: Attachment) => item.ossId !== file.ossId);
    // }
    // this.setState({
    //     selectedFiles
    // })
    this.setState({
      selectedFiles: checked ? [file] : [],
    });
  };

  renderColumns() {
    // const props  = this.props;
    const state = this.state;
    const columns = [
      {
        title: '时间',
        dataIndex: 'gmtCreateStr',
        key: 'gmtCreateStr',
      },
      {
        title: '发件方',
        dataIndex: 'sender',
        key: 'sender',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '文件',
        dataIndex: 'attachmentDTOList',
        key: 'attachment',
        render: (list: Attachment[]) =>
          list.map((item: Attachment) => {
            return (
              <p key={item.ossId}>
                <Checkbox
                  onChange={(e: CheckboxChangeEvent) => this.handleChange(item, e.target.checked)}
                  checked={
                    findIndex(state.selectedFiles, (i: Attachment) => i.ossId === item.ossId) !== -1
                  }
                  disabled={+item.displayStatus === 1}
                />

                <span>{`${item.name}(${item.sizeDisplay})`}</span>
              </p>
            );
          }),
      },
    ];
    return columns;
  }
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { selectedFiles, rangeTime } = this.state;
    return (
      <Modal
        width={800}
        title="选择文件"
        visible={props.visible}
        maskClosable={false}
        onCancel={() => {
          props.doDataXVisible(false);
        }}
        onOk={() => {
          props.doDataXSelectedSet([...selectedFiles]);
        }}
      >
        <Form>
          <Row>
            <Col span={14}>
              <FormItem>
                {getFieldDecorator('rangeTime', {
                  initialValue: rangeTime,
                })(
                  <RangePicker
                    allowClear={false}
                    style={{ width: 400 }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />,
                )}
              </FormItem>
            </Col>
            <Col span={6} offset={2}>
              <FormItem>
                <Button type="primary" onClick={this.handleSubmit}>
                  查询
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div>
          <p>只能选择一个文件</p>
          {/* <Table 
                        rowKey='id'
                        size='middle'
                        columns={this.renderColumns()}
                        dataSource={props.list}
                        pagination={{
                            current: props.current,
                            pageSize: props.pageSize,
                            total: props.totalCount
                        }}
                    /> */}
          <WrapperTable
            rowKey="id"
            size="middle"
            data={props.list}
            current={props.current}
            pageSize={props.pageSize}
            total={props.totalCount}
            columns={this.renderColumns()}
            onChange={(pageNumber: number, pageSize: number) => {
              props.onChange({ pageSize, pageNumber });
            }}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { list, page, visible, selectedFiles } = state.datax;
  return {
    list,
    visible,
    ...page,
    selectedFiles,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doDataXVisible: (visible: boolean) => doDataXVisible(visible),
      onChange: (params: QueryParams<DataXFormData>) => doGetDataX.request(params),
      // doDataXSelected: (file: Attachment, checked: boolean) => doDataXSelected(file, checked),
      doDataXSelectedSet: (list: Attachment[]) => doDataXSelectedSet(list),
    },
    dispatch,
  );

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(List));
