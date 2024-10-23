import { PRODUCT_TYPES } from './organization';

export const PRODUCT_TYPES_LABEL_MAPPING = {
  [PRODUCT_TYPES.loan]: 'Loan products',
  [PRODUCT_TYPES.insurance]: 'Insurance products',
  [PRODUCT_TYPES.real_estate]: 'Real estate products',
  [PRODUCT_TYPES.investment]: 'Investment products',
};

export const PRODUCT_TYPES_COLOR_MAPPING = {
  [PRODUCT_TYPES.loan]: 'blue',
  [PRODUCT_TYPES.insurance]: 'cyan',
  [PRODUCT_TYPES.real_estate]: 'green',
  [PRODUCT_TYPES.investment]: 'lime',
};