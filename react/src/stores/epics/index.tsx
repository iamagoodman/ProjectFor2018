import { combineEpics } from 'redux-observable';
import app from './app';
import channel from './channel';
import product from './product';
import policy from './policy';
import commission from './commission';
import company from './company';
import payment from './payment';
import report from './report';
import datax from './datax';
import companyGlobal from './companyGlobal';
import user from './user';
import ncVoucher from './ncVoucher';
import batchInsure from './batchInsure';
import batchPolicy from './batchPolicy';
import market from './market';
import intention from './intention';

export default combineEpics(
  ...app,
  ...channel,
  ...commission,
  ...policy,
  ...product,
  ...company,
  ...payment,
  ...report,
  ...datax,
  ...companyGlobal,
  ...user,
  ...ncVoucher,
  ...batchInsure,
  ...batchPolicy,
  ...market,
  ...intention
);
