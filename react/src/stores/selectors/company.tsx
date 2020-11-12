import { createSelector } from 'reselect';
import { CompanyListItem, Company } from '@/types';

const companyList = (list: CompanyListItem[]) => list;

export const getCompanyList = createSelector(companyList, (list: CompanyListItem[]) => {
  return list.map((item: CompanyListItem) => ({
    ...item,
    level: 'first',
    owningCompanyNo: item.companyNo,
    children:
      (item.insureCompanyList &&
        item.insureCompanyList.map((item1: Company) => ({
          ...item1,
          owningCompanyNo: item.companyNo,
          level: 'second',
        }))) ||
      [],
  }));
});
