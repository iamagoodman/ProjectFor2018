import { lazy } from 'react';
import { RouteItem } from '@/types';

const routes: RouteItem[] = [
  {
    key: 'home',
    code: 'home',
    path: '/',
    component: lazy(() => import('@/pages/home'))
  },
  {
    key: 'insurance_company',
    code: 'insurance_company',
    path: '/insurance/company',
    component: lazy(() => import('@/pages/company')),
    auth: true
  },
  {
    key: 'insurance_policy_detail',
    code: 'insurance_policy_detail',
    path: '/insurance/policy/detail',
    component: lazy(() => import('@/pages/policy/detail')),
    auth: true
  },
  {
    key: 'insurance_policy',
    code: 'insurance_policy',
    path: '/insurance/policy',
    component: lazy(() => import('@/pages/policy')),
    auth: true
  },
  {
    key: 'insurance_commission',
    code: 'insurance_commission',
    path: '/insurance/commission',
    component: lazy(() => import('@/pages/commission')),
    auth: true
  },
  {
    key: 'insurance_channel',
    code: 'insurance_channel',
    path: '/insurance/channel',
    component: lazy(() => import('@/pages/channel')),
    auth: true
  },
  {
    key: 'insurance_product',
    code: 'insurance_product',
    path: '/insurance/product',
    component: lazy(() => import('@/pages/product')),
    auth: true
  },
  {
    key: 'insurance_repayment',
    code: 'insurance_repayment',
    path: '/insurance/repayment',
    component: lazy(() => import('@/pages/repayment')),
    auth: true
  },
  {
    key: 'insurance_report',
    code: 'insurance_report',
    path: '/insurance/report',
    component: lazy(() => import('@/pages/report')),
    auth: true
  },
  {
    key: 'insurance_userChannel',
    code: 'insurance_userChannel',
    path: '/insurance/userChannel',
    component: lazy(() => import('@/pages/user/channel')),
    auth: true
  },
  {
    key: 'insurance_ncVoucher',
    code: 'insurance_ncVoucher',
    path: '/insurance/ncVoucher',
    component: lazy(() => import('@/pages/ncVoucher')),
    auth: true
  },
  {
    key: 'insurance_market',
    code: 'insurance_market',
    path: '/insurance/market',
    component: lazy(() => import('@/pages/market')),
    auth: true
  },
  {
    key: 'insurance_intention',
    code: 'insurance_intention',
    path: '/insurance/intention',
    component: lazy(() => import('@/pages/intention'))
  },
  {
    key: 'batch_insure',
    code: 'batch_insure',
    path: '/batch/insure',
    component: lazy(() => import('@/pages/batchInsure')),
    title: '批量投保',
    auth: true,
    tip: true
  },
  {
    key: 'batch_policy',
    code: 'batch_policy',
    path: '/batch/policy',
    component: lazy(() => import('@/pages/batchPolicy')),
    title: '批量查询',
    auth: true,
    tip: true
  },
  {
    key: 'batch_policy_detail',
    code: 'batch_policy_detail',
    path: '/batch/policy/detail',
    component: lazy(() => import('@/pages/batchPolicy/detail')),
    title: '保单详情',
    auth: true,
    tip: true
  }
];

export default routes;
