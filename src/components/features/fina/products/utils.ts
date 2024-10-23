
export const LOAN_PRODUCT_SERVICE_CLASSIFICATION = {
  BASIC: 'basic',
  ADVANCED: 'advanced',
  OTHER: 'other',
};

export const PRODUCT_TYPE = {
  LOAN: 'loan',
  INSURANCE: 'insurances',
  INVESTMENT: 'investment',
  REAL_ESTATE: 'real_estate',
  BONDS: 'bonds',
  FUND: 'fund',
};

export const NAMESPACE_DOCUMENT = {
  loan: 'loan',
  product: 'product',
};

export const LOAN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  HIDDEN: 'hidden',
  REFUSE_APPROVAL: 'refuse_approval',
};

export const LOAN_STATUSES_OPTIONS = [
  { value: LOAN_STATUS.PENDING, label: 'PRODUCT_DETAIL_STATUS_PENDING' },
  { value: LOAN_STATUS.APPROVED, label: 'PRODUCT_DETAIL_STATUS_APPROVED' },
  { value: LOAN_STATUS.REFUSE_APPROVAL, label: 'PRODUCT_DETAIL_STATUS_REFUSE_APPROVAL' },
];

export const LOAN_STATUSES_LABEL_MAPPING = {
  [LOAN_STATUS.PENDING]: 'PRODUCT_DETAIL_STATUS_PENDING',
  [LOAN_STATUS.APPROVED]: 'PRODUCT_DETAIL_STATUS_APPROVED',
  [LOAN_STATUS.HIDDEN]: 'PRODUCT_DETAIL_STATUS_HIDDEN',
  [LOAN_STATUS.ACTIVE]: 'PRODUCT_DETAIL_STATUS_PENDING',
  [LOAN_STATUS.REFUSE_APPROVAL]: 'PRODUCT_DETAIL_STATUS_REFUSE_APPROVAL',
};

export const LOAN_STATUSES_COLOR_MAPPING = {
  [LOAN_STATUS.PENDING]: 'blue',
  [LOAN_STATUS.APPROVED]: 'green',
  [LOAN_STATUS.HIDDEN]: 'yellow',
  [LOAN_STATUS.ACTIVE]: 'blue',
  [LOAN_STATUS.REFUSE_APPROVAL]: 'red',
};

export const PRODUCT_HIGHLIGHT = {
  'TRUE': true,
  'FALSE': false,
};
