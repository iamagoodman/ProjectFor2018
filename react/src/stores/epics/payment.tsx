import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { message } from 'antd';
import { doGetPaymentList } from '@/stores/actions';
import { fetchPaymentList } from '@/services';
import { QueryParams, ErrorInfo, PaymentFormData, Payment, ResponseOk } from '@/types';
import { AxiosResponse } from 'axios';

const getPaymentList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetPaymentList.request)),
    mergeMap(({ payload }: { payload: QueryParams<PaymentFormData> }) => {
      const {
        formData,
        page: { pageSize: size, current },
      } = state$.value.payment;
      const { data = formData, pageSize = size, pageNumber = current } = payload;
      return fetchPaymentList({ data, pageSize, pageNumber }).pipe(
        map(({ data: { data: list = [], totalCount = 0 } }: AxiosResponse<ResponseOk<Payment[]>>) =>
          doGetPaymentList.success({ list, data, pageNumber, pageSize, totalCount }),
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetPaymentList.failure(error));
        }),
      );
    }),
  );

export default [getPaymentList];
