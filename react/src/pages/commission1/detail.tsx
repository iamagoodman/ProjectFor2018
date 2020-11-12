import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import * as moment from 'moment';
import Back from '@/components/back';
import { CommissionDetail, BackItem, SetKey, RateItem } from '@/types';
import { RootState } from '@/stores/reducers';
import { doSetCommissionShowKey } from '@/stores/actions';

const Column = Table.Column;

interface Props extends CommissionDetail {
  onBack: (data: SetKey) => void;
}

function Detail(props: Props) {
  const items: BackItem[] = [
    {
      name: 'commissionManage',
      displayName: '渠道费用配置',
      onBack: () => {
        props.onBack({ show: 'list' });
      }
      // onBack: () => { props.history.push('/insurance/company'); }
    },
    {
      displayName: '查看详情',
      name: 'detail'
    }
  ];
  return (
    <div>
      <Back items={items} />
      <Row className='detail-wrapper'>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            渠道编号：
          </Col>
          <Col span={20}>{props.channelNo}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            渠道名称：
          </Col>
          <Col span={20}>{props.channelName}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            产品编号：
          </Col>
          <Col span={20}>{props.productNo}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            产品名称：
          </Col>
          <Col span={20}>{props.productName}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            渠道费用比例及生效时间：
          </Col>
          <Col span={20}>
            <Table size='small' dataSource={props.rateList || []} rowKey='uniqueId' pagination={false}>
              <Column
                title='渠道费用比例'
                key='commissionRate'
                dataIndex='commissionRate'
                render={(rate: number) => `${rate !== undefined && rate !== null ? rate : ''}%`}
              />
              <Column
                title='生效开始时间'
                key='beginTime'
                dataIndex='beginTime'
                render={(time: moment.Moment | undefined) => (time ? moment(time).format('YYYY-MM-DD') : '')}
              />
              <Column
                title='生效结束时间'
                key='endTime'
                dataIndex='endTime'
                render={(time: moment.Moment | undefined, record: RateItem) =>
                  time ? moment(time).format('YYYY-MM-DD') : ''
                }
              />
            </Table>
          </Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={4} className='tr'>
            备注：
          </Col>
          <Col span={20}>{props.remark}</Col>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  ...state.commission.detail
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetCommissionShowKey(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Detail));
