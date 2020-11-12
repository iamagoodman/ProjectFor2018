import * as React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from '@/layouts/coreLayout';
import Loading from './routeLoading';
import Auth404 from '@/components/auth/auth404';
import AuthRoute from '@/components/auth/authRoute';
import AuthTipRoute from '@/components/auth/authTipRoute';
import routes from './route';
import { RouteItem } from '@/types';

// const Home = lazy(() => import('@/pages/home'));
// const Company = lazy(() => import('@/pages/company'));
// const Policy = lazy(() => import('@/pages/policy'));
// const Commission = lazy(() => import('@/pages/commission'));
// const Channel = lazy(() => import('@/pages/channel'));
// const Product = lazy(() => import('@/pages/product'));
// const PolicyDetail = lazy(() => import('@/pages/policy/detail'));
// const Repayment = lazy(() => import('@/pages/repayment'));
// const Report = lazy(() => import('@/pages/report'));
// const UserChannel = lazy(() => import('@/pages/user/channel'));
// const NcVoucher = lazy(() => import('@/pages/ncVoucher'));
// const BatchPolicy = lazy(() => import('@/pages/batchPolicy'));
// const BatchInsure = lazy(() => import('@/pages/batchInsure'));
// const BatchPolicyDetail = lazy(() => import('@/pages/batchPolicy/detail'));

function CoreRoute() {
  return (
    <CoreLayout>
      <Suspense fallback={<Loading />}>
        <Switch>
          {/* <Route exact path='/' component={Home}/>
                    <AuthRoute code='insurance_company' exact path='/insurance/company' component={Company}/>
                    <AuthRoute code='insurance_policy_detail' exact path='/insurance/policy/detail' component={PolicyDetail}/>
                    <AuthRoute code='insurance_policy' exact path='/insurance/policy' component={Policy}/>
                    <AuthRoute code='insurance_commission' exact path='/insurance/commission' component={Commission}/>
                    <AuthRoute code='insurance_channel' exact path='/insurance/channel' component={Channel}/>
                    <AuthRoute code='insurance_product' exact path='/insurance/product' component={Product}/>
                    <AuthRoute code='insurance_repayment' exact path='/insurance/repayment' component={Repayment}/>
                    <AuthRoute code='insurance_report' exact path='/insurance/report' component={Report}/>
                    <AuthRoute code='insurance_userChannel' exact path='/insurance/userChannel' component={UserChannel}/>
                    <AuthRoute code='insurance_ncVoucher' exact path='/insurance/ncVoucher' component={NcVoucher}/>
                    <AuthTipRoute title='批量投保' code='batch_insure' exact path='/batch/insure' component={BatchInsure}/>
                    <AuthTipRoute title='批量查询' code='batch_policy' exact path='/batch/policy' component={BatchPolicy}/>
                    <AuthTipRoute title='保单详情' code='batch_policy_detail' exact path='/batch/policy/detail' component={BatchPolicyDetail}/>
                    <Route path='*' component={Auth404}/> */}
          {routes.map(({ auth, tip, title, ...props }: RouteItem) =>
            auth && tip ? (
              <AuthTipRoute title={title || ''} {...props} />
            ) : auth ? (
              <AuthRoute {...props} />
            ) : (
              <Route exact {...props} />
            ),
          )}
          <Route path="*" component={Auth404} />
        </Switch>
      </Suspense>
    </CoreLayout>
  );
}

export default React.memo(CoreRoute);
