import { Epic } from 'redux-observable';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  doInsureSetStep,
  doInsureSetProduct,
  doGetInsureImportInfo,
  doPostInsureDeclareImport,
  doInsureSetPolicyVisible,
  doGetInsurePolicyList,
  doGetInsurePolicy,
  doSetInsurePolicyList,
  doInsureBatch,
  doInsureStep2Init,
  doInsureStep3Init,
  doInsureSetDeclare,
} from '@/stores/actions';
import {
  fetchInsureInfo,
  fetchInsureImport,
  fetchInsurePolicy,
  fetchBatchInsure,
} from '@/services';
import {
  ResponseOk,
  InsurePolicy,
  InsureDeclareImportData,
  InsureDeclarePolicy,
  ErrorInfo,
  QueryParams,
  InsurePolicyData,
  BatchInsureData,
} from '@/types';
import { AxiosResponse } from 'axios';
import { of, forkJoin } from 'rxjs';
import { message } from 'antd';

function getPolicyList({
  groupFlag,
  info = {},
  list = [],
}: {
  groupFlag: number | string | null | undefined;
  info: InsurePolicy;
  list: any[];
}) {
  const policy: InsureDeclarePolicy[] = [];
  if (
    ((typeof groupFlag === 'string' && groupFlag === '1') ||
      (typeof groupFlag === 'number' && groupFlag)) &&
    list.length
  ) {
    // 团单
    policy.push({
      premium: info.sumPremium,
      policyNo: list[0].policyNo,
      isGeneratePolicyNo: true,
      applicant: {
        name: list[0].appliName,
        idType: list[0].identifyType,
        idNumber: list[0].identifyNumber,
        mobile: list[0].mobile,
        birthday: list[0].birthday,
        email: list[0].email,
      },

      insured: list.map((item: any, index: number) => ({
        num: index + 1,
        name: item.insuredName,
        idType: item.insuredIdentifyType,
        idNumber: item.insuredIdentifyNumber,
        relation: item.appliIdentity,
        birthday: item.insuredBirthday,
        email: item.insuredEmail,
        benefitName: item.benefitName,
      })),
    });
  } else {
    // 个单
    list.forEach((item: any, index: number) => {
      policy.push({
        num: index + 1,
        premium: item.sumPremium,
        policyNo: item.policyNo,
        isGeneratePolicyNo: true,
        applicant: {
          name: item.appliName,
          idType: item.identifyType,
          idNumber: item.identifyNumber,
          mobile: item.mobile,
          birthday: item.birthday,
        },
        insured: [
          {
            name: item.insuredName,
            idType: item.insuredIdentifyType,
            idNumber: item.insuredIdentifyNumber,
            relation: item.appliIdentity,
            birthday: item.insuredBirthday,
            email: item.insuredEmail,
            benefitName: item.benefitName,
          },
        ],
      });
    });
  }
  return policy;
}

export const setInsureProduct: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doInsureSetProduct)),
    mergeMap(() => [doInsureSetStep(1), doInsureStep2Init()]),
  );

export const getInsurePolicyInfo: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetInsureImportInfo.request)),
    mergeMap(({ payload }: { payload: string }) =>
      fetchInsureInfo(payload).pipe(
        map(({ data: { data } }: AxiosResponse<ResponseOk<InsurePolicy>>) =>
          doGetInsureImportInfo.success(data),
        ),
        catchError(err => of(doGetInsureImportInfo.failure(err))),
      ),
    ),
  );

export const postInsureDeclareImport: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doPostInsureDeclareImport.request)),
    mergeMap(({ payload }: { payload: InsureDeclareImportData }) =>
      fetchInsureImport(payload).pipe(
        mergeMap(({ data: { data = {} } }: AxiosResponse<ResponseOk>) => {
          const { copywriting, insureInfo, resultList = [], groupFlag, excel_key } = data;
          const info = { ...copywriting };
          const policy: InsureDeclarePolicy[] = [];
          const totalCount = resultList.length;
          // const list = policy.slice(0, totalCount > 10 ? 10 : totalCount);
          let list: InsureDeclarePolicy[] = [];
          if (groupFlag) {
            // 团单
            policy.push({
              premium: insureInfo.premium,
              applicant: {
                name: insureInfo.appli_name,
                idType: insureInfo.insure_type,
                idNumber: insureInfo.insure_number,
                mobile: insureInfo.phone_number,
                birthday: insureInfo.birthday,
                email: insureInfo.insure_email,
              },

              insured: resultList.map((item: any) => ({
                name: item.insured_name,
                idType: item.identify_type,
                idNumber: item.identify_number,
                mobile: item.mobile,
                email: item.identify_email,
                relation: item.appli_identity,
                num: item.number,
                benefitName: item.benefit_name,
                remark: item.identify_remark,
                birthday: item.identify_birthday,
              })),
            });
            list = [
              {
                premium: insureInfo.premium,
                applicant: {
                  name: insureInfo.appli_name,
                  idType: insureInfo.insure_type,
                  idNumber: insureInfo.insure_number,
                  mobile: insureInfo.phone_number,
                  birthday: insureInfo.birthday,
                },

                insured: resultList
                  .slice(0, totalCount > 10 ? 10 : totalCount)
                  .map((item: any) => ({
                    name: item.insured_name,
                    idType: item.identify_type,
                    idNumber: item.identify_number,
                    mobile: item.mobile,
                    email: item.identify_email,
                    relation: item.appli_identity,
                    num: item.number,
                    benefitName: item.benefit_name,
                    remark: item.identify_remark,
                    birthday: item.identify_birthday,
                  })),
              },
            ];
          } else {
            resultList.forEach((item: any) => {
              policy.push({
                num: item.number,
                premium: item.premium,
                applicant: {
                  name: item.appli_name,
                  idType: item.insure_type,
                  idNumber: item.insure_number,
                  mobile: item.phone_number,
                  birthday: item.birthday,
                },
                insured: [
                  {
                    name: item.insured_name,
                    idType: item.identify_type,
                    idNumber: item.identify_number,
                    relation: item.appli_identity,
                    birthday: item.identify_birthday,
                    email: item.identify_email,
                  },
                ],
              });
            });
            list = policy.slice(0, totalCount > 10 ? 10 : totalCount);
          }
          return [
            doPostInsureDeclareImport.success({
              info,
              policy,
              excelKey: excel_key,
              groupFlag,
              page: { pageSize: 10, totalCount, current: 1 },
              list,
              file: payload.file,
              fileList: [payload.file],
            }),
            doSetInsurePolicyList(resultList),
            doInsureSetPolicyVisible(true),
          ];
        }),
        catchError((err: ErrorInfo) => {
          message.error(err.message || '请求失败');
          return of(doPostInsureDeclareImport.failure(err));
        }),
      ),
    ),
  );

export const getInsurePolicy: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doGetInsurePolicy.request)),
    mergeMap(({ payload }: { payload: string }) =>
      forkJoin(
        fetchInsureInfo(payload),
        fetchInsurePolicy({ data: { importNo: payload }, pageSize: 10, pageNumber: 1 }),
      ).pipe(
        map(
          ([
            {
              data: { data: info = {} },
            },
            {
              data: { data: list = [], totalCount = 0 },
            },
          ]: [AxiosResponse<ResponseOk<InsurePolicy>>, AxiosResponse<ResponseOk<any[]>>]) => {
            const policy = getPolicyList({ groupFlag: info.groupFlag, info, list });
            return doGetInsurePolicy.success({
              info,
              list: policy,
              page: { pageSize: 10, current: 1, totalCount },
              groupFlag: info.groupFlag,
            });
          },
        ),
        catchError((err: ErrorInfo) => {
          message.error(err.message || '请求失败');
          return of(doGetInsurePolicy.failure(err));
        }),
      ),
    ),
  );

const getInsurePolicyList: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doGetInsurePolicyList.request)),
    mergeMap(({ payload }: { payload: QueryParams<InsurePolicyData> }) => {
      const { importNo, policy } = state$.value.insure;
      const {
        page: { pageSize: size, current },
        groupFlag,
        info,
      } = policy;
      const { pageSize = size, pageNumber = current } = payload;
      return fetchInsurePolicy({ data: { importNo }, pageSize, pageNumber }).pipe(
        map(
          ({
            data: { data: list = [], totalCount = 0 },
          }: AxiosResponse<ResponseOk<InsureDeclarePolicy[]>>) => {
            const policy = getPolicyList({ groupFlag, info, list });
            return doGetInsurePolicyList.success({
              list: policy,
              pageSize,
              pageNumber,
              totalCount,
            });
          },
        ),
        catchError((error: ErrorInfo) => {
          message.warning(error.message || '请求失败');
          return of(doGetInsurePolicyList.failure(error));
        }),
      );
    }),
  );

const postInsureBatch: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(doInsureBatch.request)),
    mergeMap(({ payload }: { payload: BatchInsureData }) =>
      fetchBatchInsure(payload).pipe(
        mergeMap(
          ({
            data: {
              data: { importNo = '' },
            },
          }: AxiosResponse<ResponseOk<{ importNo: string }>>) => {
            console.log(importNo);
            return [
              doInsureBatch.success(importNo),
              doInsureSetDeclare(payload),
              doInsureSetStep(2),
              doInsureStep3Init(),
            ];
          },
        ),
        catchError((err: ErrorInfo) => {
          console.log(err);
          message.error(err.message || '请求失败');
          return of(doInsureBatch.failure(err));
        }),
      ),
    ),
  );

export default [
  setInsureProduct,
  getInsurePolicyInfo,
  postInsureDeclareImport,
  getInsurePolicyList,
  getInsurePolicy,
  postInsureBatch,
];
