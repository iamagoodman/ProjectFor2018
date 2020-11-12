import * as ACTIONTYPE from '@/constans/actionType';
import { createAsyncAction } from 'typesafe-actions';
import { Payment, List, QueryParams, ErrorInfo, PaymentFormData } from '@/types';

export const doGetPaymentList = createAsyncAction(
  ACTIONTYPE.PAYMENT_REQUEST,
  ACTIONTYPE.PAYMENT_SUCCESS,
  ACTIONTYPE.PAYMENT_FAILURE,
)<QueryParams<PaymentFormData>, List<Payment, PaymentFormData>, ErrorInfo>();
