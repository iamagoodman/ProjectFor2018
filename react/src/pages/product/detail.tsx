import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import * as moment from 'moment';
import Back from '@/components/back';
import { ProductDetail, BackItem, SetKey, RiskTypeItem, DictObj, PlanItem, PlanItemRisk } from '@/types';
import { RootState } from '@/stores/reducers';
import { doSetProductShowKey, doSetProductPreviewVisible } from '@/stores/actions';
import { parseStrToArray, generateUniqueId } from '@/utils/util';
import Preview from './modals/h5Preview';
import { getProductCategoryListObj, getRiskTypeCategoryListObj } from '@/stores/selectors/app';
import { POLICY_TYPE } from '@/constans';
import style from './product.module.less';

const Column = Table.Column;

interface Props extends ProductDetail {
  onBack: (data: SetKey) => void;
  onVisible: (visible: boolean) => void;
  visible: boolean;
  productCategory: DictObj;
  riskTypeCatogory: DictObj;
}

function Detail(props: Props) {
  const items: BackItem[] = [
    {
      name: ' productManage',
      displayName: '产品管理',
      onBack: () => {
        props.onBack({ show: 'list' });
      }
    },
    {
      displayName: '查看详情',
      name: 'detail'
    }
  ];
  const expandedRowRender = (data: PlanItemRisk[]) => {
    const columns = [
      {
        title: '已配置险别代码',
        dataIndex: 'riskCode',
        key: 'riskCode'
      },
      {
        title: '保险金额',
        dataIndex: 'riskSumAmount',
        key: 'riskSumAmount',
        render: (amount: number) => `${amount}元`
      }
    ];
    return (
      <Table
        size='small'
        className={style['table-expand-table']}
        bordered={false}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey='uniqueId'
      />
    );
  };
  const planTypeList = generateUniqueId(parseStrToArray<PlanItem>(props.planTypes) || []);
  const riskList = generateUniqueId(parseStrToArray<RiskTypeItem>(props.riskType) || []);
  const isSpecial = props.extensionType === 0;
  return (
    <div>
      <Back items={items} />
      <Row className='detail-wrapper'>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            产品编号：
          </Col>
          <Col span={18}>{props.productNo}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            产品名称：
          </Col>
          <Col span={18}>{props.productName}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            产品类型：
          </Col>
          <Col span={18}>{props.productType && (props.productCategory[props.productType] || props.productType)}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            所属保险公司：
          </Col>
          <Col span={18}>{props.owningCompany}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            是否特殊产品：
          </Col>
          <Col span={18}>{isSpecial ? '是' : '否'}</Col>
        </Col>
        {isSpecial && (
          <Col span={24} className='detail-item-wrapper'>
            <Col span={6} className='tr'>
              产品H5的url：
            </Col>
            <Col span={18}>{props.externalLink}</Col>
          </Col>
        )}
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            保险公司产品编码：
          </Col>
          <Col span={18}>{props.owningProductNo}</Col>
        </Col>
        {riskList.length > 0 && (
          <Col span={24} className='detail-item-wrapper'>
            <Col span={6} className='tr'>
              险别信息：
            </Col>
            <Col span={12}>
              <Table size='small' dataSource={riskList} pagination={false} rowKey='uniqueId'>
                <Column title='险别代码' key='riskCode' dataIndex='riskCode' />
                <Column title='险别名称' key='riskName' dataIndex='riskName' />
                <Column
                  title='险别类别'
                  key='riskType'
                  dataIndex='riskType'
                  render={(type: string | number) => `${props.riskTypeCatogory[type] || type}`}
                />
              </Table>
            </Col>
          </Col>
        )}

        {planTypeList.length > 0 && (
          <Col span={24} className='detail-item-wrapper' style={{ marginTop: 10 }}>
            <Col span={6} className='tr'>
              方案信息：
            </Col>
            <Col span={12}>
              <Table
                size='small'
                pagination={false}
                dataSource={planTypeList}
                rowKey='uniqueId'
                expandedRowRender={(record: PlanItem) =>
                  expandedRowRender(generateUniqueId(parseStrToArray<PlanItemRisk>(record.riskTypes)))
                }
              >
                <Column title='方案代码' key='planCode' dataIndex='planCode' />
                <Column title='方案名称' key='planName' dataIndex='planName' />
                <Column
                  title='方案保费'
                  key='planPremium'
                  dataIndex='planPremium'
                  render={(premium: number) => `${premium}元`}
                />
              </Table>
            </Col>
          </Col>
        )}
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            保单类型：
          </Col>
          <Col span={18}>{POLICY_TYPE[props.policyTypes || 0]}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            是否为赠险：
          </Col>
          <Col span={18}>{props.isGiftInsurance ? '是' : '否'}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            是否代收保费：
          </Col>
          <Col span={18}>{props.isUnderWriting ? '是' : '否'}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            是否核保：
          </Col>
          <Col span={18}>{props.isCollectionCharges ? '是' : '否'}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            产品有效时间范围：
          </Col>
          <Col span={18}>
            {props.beginTime && moment(props.beginTime).format('YYYY-MM-DD')}
            --
            {props.endTime && moment(props.endTime).format('YYYY-MM-DD')}
          </Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            佣金比例：
          </Col>
          <Col span={18}>{props.commissionRate}%</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            佣金计算保费类型：
          </Col>
          <Col span={18}>{props.premiumType ? '保费(含税)' : '保费(不含税)'}</Col>
        </Col>
        <Col span={24} className='detail-item-wrapper'>
          <Col span={6} className='tr'>
            备注：
          </Col>
          <Col span={18}>{props.remark}</Col>
        </Col>
        {!isSpecial && (
          <Col span={24} className='detail-item-wrapper'>
            <Col span={6} className='tr'>
              H5预览：
            </Col>
            <Col span={18}>
              <a
                href='javascript:void(0);'
                onClick={() => {
                  props.onVisible(true);
                }}
              >
                点击查看
              </a>
            </Col>
          </Col>
        )}
      </Row>
      {props.visible && <Preview id={props.id} />}
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const { app, product } = state;
  const { productCategoryList, riskTypeCategoryList } = app;
  const { detail, h5PreviewVisible: visible } = product;
  return {
    productCategory: getProductCategoryListObj(productCategoryList),
    riskTypeCatogory: getRiskTypeCategoryListObj(riskTypeCategoryList),
    visible,
    ...detail
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onBack: (data: SetKey) => doSetProductShowKey(data),
      onVisible: (visible: boolean) => doSetProductPreviewVisible(visible)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Detail));
