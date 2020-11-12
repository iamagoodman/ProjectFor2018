import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { StateType } from 'typesafe-actions';
import { appReducer } from './app';
import { userReducer } from './user';
import { channelReducer } from './channel';
import { productReducer } from './product';
import { policyReducer } from './policy';
import { commissionReducer } from './commission';
import { companyReducer } from './company';
import { reportReducer } from './report';
import { paymentReducer } from './payment';
import { dataXReducer } from './datax';
import { companyGlobalReducer } from './companyGlobal';
import { ncVoucherReducer } from './ncVoucher';
import { insureReducer } from './batchInsure';
import { batchPolicyReducer } from './batchPolicy';
import { policyMarketReducer } from './market';
import { intentionReducer } from './intention';
import { history } from '@/utils/util';

const rootReducer = combineReducers({
  router: connectRouter(history),
  app: appReducer,
  user: userReducer,
  company: companyReducer,
  channel: channelReducer,
  product: productReducer,
  policy: policyReducer,
  commission: commissionReducer,
  report: reportReducer,
  payment: paymentReducer,
  datax: dataXReducer,
  companyGlobal: companyGlobalReducer,
  ncVoucher: ncVoucherReducer,
  insure: insureReducer,
  batchPolicy: batchPolicyReducer,
  market: policyMarketReducer,
  intention: intentionReducer
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
