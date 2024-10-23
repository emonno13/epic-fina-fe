export const DEFAULT_PREFERENTIAL_LATE = 11;

export const MILLION_SUFFIX = 'Triệu';
export const BILLION_SUFFIX = 'Tỷ';

export const MONEY_SUFFIX_OBJ = {
  [MILLION_SUFFIX]: {
    multiplier: 1000 * 1000,
    max: 9999,
    step: 1,
    altSuffix: BILLION_SUFFIX,
  },
  [BILLION_SUFFIX]: {
    multiplier: 1000 * 1000 * 1000,
    max: 100,
    step: 0.1,
    altSuffix: MILLION_SUFFIX,
  },
};

export const MONTH_SUFFIX = 'Tháng';
export const YEAR_SUFFIX = 'Năm';

export const TIME_SUFFIX_OBJ = {
  [MONTH_SUFFIX]: {
    multiplier: 1,
    max: 40 * 12,
    step: 1,
    altSuffix: YEAR_SUFFIX,
  },
  [YEAR_SUFFIX]: {
    multiplier: 12,
    max: 40,
    step: 1,
    altSuffix: MONTH_SUFFIX,
  },
};


export const TIME_SUFFIX_OBJ_ENDOW = {
  [MONTH_SUFFIX]: {
    multiplier: 1,
    max: 5 * 12,
    step: 1,
    altSuffix: YEAR_SUFFIX,
  },
  [YEAR_SUFFIX]: {
    multiplier: 12,
    max: 5,
    step: 1,
    altSuffix: MONTH_SUFFIX,
  },
};

export const PREFERENTIAL_RATE_OPTION_CUSTOM = 2;
export const PREFERENTIAL_RATE_OPTION_BANK = 1;

export const PREFERENTIAL_RATE_OPTIONS = [
  {
    id: PREFERENTIAL_RATE_OPTION_CUSTOM,
    label: 'Tùy chỉnh',
    style: {},
  },
  {
    id: PREFERENTIAL_RATE_OPTION_BANK,
    label: 'Theo ngân hàng',
    style: { marginRight: 45 },
  },
];

export const PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST = 1;
export const PAYMENT_METHOD_OPTION_INTEREST = 2;

export const PAYMENT_METHOD_OPTIONS = [
  {
    id: PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST,
    label: 'Dư nợ giảm dần',
    style: { marginRight: 67 },
  },
  {
    id: PAYMENT_METHOD_OPTION_INTEREST,
    label: 'Trả đều hàng tháng',
    style: {},
  },
];

export const CALCULATE_LOAN_OPTION_LOAN_VALUE = 1;
export const CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE = 2;

export const CALCULATE_LOAN_OPTIONS = [
  {
    id: CALCULATE_LOAN_OPTION_LOAN_VALUE,
    label: 'Giá trị khoản vay',
    style: {},
    propertyPrice: 2 * 1000 * 1000 * 1000,
    ratio: 1,
  },
  {
    id: CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE,
    label: 'Giá trị bất động sản',
    style: {},
    propertyPrice: 3 * 1000 * 1000 * 1000,
    ratio: 0.7,
  },
];

export const PAYMENT_METHOD = {
  1: 'Dư nợ giảm dần',
  2: 'Trả đều hàng tháng',
};
