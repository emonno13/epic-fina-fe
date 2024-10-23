import { TFunction } from 'next-i18next';

export const ORGANIZATION_TYPES = {
  SUB_ORG: 'sub_org',
  BANK: 'bank',
  REAL_ESTATE: 'real_estate',
  CAR_COMPANY: 'car_company',
  INSURANCE: 'insurance',
  OTHERS: 'others',
  PARTNER: 'partner',
  MANUFACTOR: 'manufactor',
  HOSPITAL: 'hospital',
};

export const ORGANIZATION_TYPES_MAPPING = {
  sub_org: 'sub_org',
  bank: 'bank',
  car_company: 'car_company',
  real_estate: 'real_estate',
  others: 'others',
  partner: 'partner',
  manufactor: 'manufactor',
};

export const USER_TYPES = {
  staff: 'staff',
  customer: 'customer',
  car_company_staff: 'car_company_staff',
  seller: 'seller',
  insurance_agent: 'insurance_agent',
  collaborator: 'collaborator',
  teller: 'teller',
};

export const PRODUCT_TYPE = {
  LOAN: 'loan',
  INSURANCE: 'insurances',
  INVESTMENT: 'investment',
  BONDS: 'bonds',
};

export const PRODUCT_TYPES = {
  loan: 'loan_products',
  insurance: 'insurance_products',
  real_estate: 'real_estate_products',
  investment: 'investment_products',
  news: 'news',
  funds: 'funds',
};

export const PRODUCT_CATEGORIES = {
  [PRODUCT_TYPES.loan]: {
    real_estate: 'real_estate',
    vehicle: 'vehicle',
  },
  [PRODUCT_TYPES.insurance]: {
    real_estate: 'real_estate',
    vehicle: 'vehicle',
  },
};

export const getSubCategoryProductLoan = (t: TFunction) => [
  { label: t('real_estate'), value: PRODUCT_CATEGORIES[PRODUCT_TYPES.loan].real_estate },
  { label: t('Vehicle'), value: PRODUCT_CATEGORIES[PRODUCT_TYPES.loan].vehicle },
];

export const getUserTypeOptions = (t: TFunction) => [
  { label: t(USER_TYPES.staff, { vn: 'Nhân viên' }), value: USER_TYPES.staff },
  { label: t(USER_TYPES.customer, { vn : 'Khách hàng' }), value: USER_TYPES.customer },
  { label: t(USER_TYPES.seller, { vn: 'Nhân viên bất động sản' }), value: USER_TYPES.seller },
  { label: t(USER_TYPES.insurance_agent, { vn: 'Nhân viên bảo hiểm' }), value: USER_TYPES.insurance_agent },
  { label: t(USER_TYPES.collaborator, { vn: 'Cộng tác viên' }), value: USER_TYPES.collaborator },
  { label: t(USER_TYPES.teller, { vn: 'Nhân viên ngân hàng' }), value: USER_TYPES.teller },
  { label: t(USER_TYPES.car_company_staff, { vn: 'Nhân viên công ty xe' }), value: USER_TYPES.car_company_staff },
];

export const getOrganizationTypeOptions = (t: TFunction) => [
  { label: t('sub_org'), value: ORGANIZATION_TYPES_MAPPING.sub_org },
  { label: t('bank'), value: ORGANIZATION_TYPES_MAPPING.bank },
  { label: t('real_estate'), value: ORGANIZATION_TYPES_MAPPING.real_estate },
  { label: t('others'), value: ORGANIZATION_TYPES_MAPPING.others },
  { label: t('partner'), value: ORGANIZATION_TYPES_MAPPING.partner },
  { label: t('car_company'), value: ORGANIZATION_TYPES_MAPPING.car_company },
  { label: t('manufactor'), value: ORGANIZATION_TYPES_MAPPING.manufactor },
];

export const getProductTypeOptions = (t: TFunction) => [
  { label: t('Loan products', { vn: 'Sản phẩm cho vay' }), value: PRODUCT_TYPES.loan },
  { label: t('Insurance products', { vn: 'Sản phẩm bảo hiểm' }), value: PRODUCT_TYPES.insurance },
  { label: t('Real estate products', { vn: 'Sản phẩm BĐS' }), value: PRODUCT_TYPES.real_estate },
  { label: t('Investment products', { vn: 'Sản phẩm đầu tư' }), value: PRODUCT_TYPES.investment },
];
export const getUserTypeByOrgType = (orgType) => {
  switch (orgType) {
    case ORGANIZATION_TYPES.SUB_ORG:
      return USER_TYPES.staff;
    case ORGANIZATION_TYPES.BANK:
      return USER_TYPES.teller;
    case ORGANIZATION_TYPES.REAL_ESTATE:
      return USER_TYPES.seller;
    case ORGANIZATION_TYPES.CAR_COMPANY:
      return USER_TYPES.car_company_staff;
    case ORGANIZATION_TYPES.INSURANCE:
      return USER_TYPES.seller;
  }
  return undefined;
};

export const POSITION_GROUPS = {
  IN_ORG: 'IN_ORG',
  BANK: 'BANK',
  REAL_ESTATE: 'REAL_ESTATE',
  INSURANCE: 'INSURANCE',
  CAR_COMPANY: 'CAR_COMPANY',
  OTHERS: 'OTHERS',
};

export const getPositionGroupByOrgType = (orgType) => {
  switch (orgType) {
    case ORGANIZATION_TYPES.SUB_ORG:
      return POSITION_GROUPS.IN_ORG;
    case ORGANIZATION_TYPES.BANK:
      return POSITION_GROUPS.BANK;
    case ORGANIZATION_TYPES.REAL_ESTATE:
      return POSITION_GROUPS.REAL_ESTATE;
    case ORGANIZATION_TYPES.CAR_COMPANY:
      return POSITION_GROUPS.CAR_COMPANY;
    case ORGANIZATION_TYPES.INSURANCE:
      return POSITION_GROUPS.INSURANCE;
    case ORGANIZATION_TYPES.OTHERS:
      return POSITION_GROUPS.OTHERS;
  }
  return undefined;
};

export const getPositionGroupOptions = (t: TFunction) => [
  { label: t('Organization'), value: POSITION_GROUPS.IN_ORG },
  { label: t('Bank'), value: POSITION_GROUPS.BANK },
  { label: t('Real estate'), value: POSITION_GROUPS.REAL_ESTATE },
  { label: t('Insurance'), value: POSITION_GROUPS.INSURANCE },
  { label: t('Car Company'), value: POSITION_GROUPS.CAR_COMPANY },
  { label: t('Other'), value: POSITION_GROUPS.OTHERS },
];
