import { ConvertUtils } from '@lib/utils/convert';
import { FormUtils } from '@schema-form/utils/form-utils';
import numeral from 'numeral';
import {
  BILLION_SUFFIX,
  CALCULATE_LOAN_OPTION_LOAN_VALUE,
  CALCULATE_LOAN_OPTIONS,
  MONTH_SUFFIX,
  PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST,
  PREFERENTIAL_RATE_OPTION_CUSTOM,
  YEAR_SUFFIX,
} from './constants';

export const checkLoanCalcPathname = (pathname) => {
  return (
    pathname === '/embeded/cong-cu-tinh' ||
    pathname === '/embeded/uoc-tinh-khoan-vay' ||
    pathname === '/cong-cu-tinh-khoan-vay' ||
    pathname === '/uoc-tinh-khoan-vay' ||
    pathname.includes('/chi-tiet-khoan-vay')
  );
};

export const getNumberValue = (val, defaultVal) =>
  isNaN(val) ? defaultVal : Number(val);

export const getLoanCalcObject = (router) => {
  const { query } = router;
  const {
    calculateLoanOption,
    propertyPrice,
    ratio,
    months,
    introRate,
    introMonths,
    rate,
    paymentMethod,
    gracePeriod,
    interestRateSupportPeriod,
    prePaymentMonths,
    prePaymentRate,
    isPrePaymentCheck,
    isGracePeriodCheck,
    isInterestRateSupportPeriodCheck,
    preferentialRateOption,
    propertyPriceSuffix,
    monthsSuffix,
    introMonthsSuffix,
    prePaymentMonthsSuffix,
    gracePeriodSuffix,
    interestRateSupportPeriodSuffix,
  } = query;

  const newCalculateLoanOption =
    Number(calculateLoanOption) || CALCULATE_LOAN_OPTION_LOAN_VALUE;
  const existCalculateLoanOption = CALCULATE_LOAN_OPTIONS.find(
    ({ id }) => id === newCalculateLoanOption,
  );
  const defaultPropertyPrice = existCalculateLoanOption
    ? existCalculateLoanOption.propertyPrice
    : 0;
  const defaultRatio = existCalculateLoanOption
    ? existCalculateLoanOption.ratio
    : 0;

  return {
    calculateLoanOption: newCalculateLoanOption,
    ratio: getNumberValue(ratio, defaultRatio),
    propertyPrice: getNumberValue(propertyPrice, defaultPropertyPrice),
    months: getNumberValue(months, 25 * 12),
    introRate: getNumberValue(introRate, 0.075),
    introMonths: getNumberValue(introMonths, 12),
    rate: getNumberValue(rate, 0.11),
    paymentMethod: getNumberValue(
      paymentMethod,
      PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST,
    ),
    gracePeriod:
      Number(isGracePeriodCheck) === 1 ? Number(gracePeriod || 0) : 0,
    interestRateSupportPeriod:
      Number(isInterestRateSupportPeriodCheck) === 1
        ? Number(interestRateSupportPeriod || 0)
        : 0,
    prePaymentMonths:
      Number(isPrePaymentCheck) === 1 ? Number(prePaymentMonths || 0) : 0,
    prePaymentRate:
      Number(isPrePaymentCheck) === 1 ? Number(prePaymentRate || 0) : 0,
    isPrePaymentCheck: Number(isPrePaymentCheck) === 1,
    isGracePeriodCheck: Number(isGracePeriodCheck) === 1,
    isInterestRateSupportPeriodCheck:
      Number(isInterestRateSupportPeriodCheck) === 1,
    preferentialRateOption: getNumberValue(
      preferentialRateOption,
      PREFERENTIAL_RATE_OPTION_CUSTOM,
    ),
    propertyPriceSuffix: propertyPriceSuffix || BILLION_SUFFIX,
    monthsSuffix: monthsSuffix || YEAR_SUFFIX,
    introMonthsSuffix: introMonthsSuffix || YEAR_SUFFIX,
    prePaymentMonthsSuffix: prePaymentMonthsSuffix || MONTH_SUFFIX,
    gracePeriodSuffix: gracePeriodSuffix || MONTH_SUFFIX,
    interestRateSupportPeriodSuffix:
      interestRateSupportPeriodSuffix || MONTH_SUFFIX,
  };
};

export const getExistObj = (mainObj, key) => {
  return mainObj[key] || {};
};

export const onSuffixChange = ({ property, val, router }) => {
  const newQuery = {
    [property]: val,
  };
  const { pathname, query, push } = router;
  const submitQuery = {
    ...query,
    ...newQuery,
  };
  push({
    pathname,
    query: submitQuery,
  });
};

export const filterOptions = (input, option) =>
  ConvertUtils.normalizeString(option.props.children.toLowerCase()).indexOf(
    ConvertUtils.normalizeString(input.toLowerCase()),
  ) >= 0;

export const toFixed = (num, fixed = 2) => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
};

export const fmoney = (x) => {
  if (isNaN(x)) return x;
  const absVal = Math.abs(x);

  if (absVal < 1000000) {
    return `${toFixed(absVal / 1000)} Trăm`;
  }
  if (absVal < 1000000000) {
    return `${toFixed(absVal / 1000000)} Triệu`;
  }
  if (absVal < 1000000000000 || absVal >= 1000000000001) {
    return `${toFixed(absVal / 1000000000)} Tỷ`;
  }
  return toFixed(absVal);
};

export const number = /^-?[0-9][0-9\.]*$/g;

export const changeHistory = (router, newQuery = {}) => {
  const { pathname, query } = router;
  const submit = {
    ...query,
    ...newQuery,
  };

  router.push(
    {
      pathname,
      query: submit,
    },
    undefined,
    { shallow: true },
  );
};

export const formatMoney = (amount, suffix = 'đ') => {
  return `${numeral(amount).format('0,0')} ${suffix}`;
};

export const validatePhoneForm = (text) => {
  return (
    (/^0[0-9]{9}$/gm.test(text) && text.length === 10) ||
    'Số điện thoại phải là số hợp lệ'
  );
};

export const fetchBrands = async (values = {}) => {
  return await FormUtils.submitForm(
    { ...values, order: 'DESC' },
    {
      nodeName: 'product-details/public-bankers',
      showSuccessMessage: false,
    },
  );
};

export const fetchLoanDetail = async (id = '') => {
  return await FormUtils.submitForm(
    {},
    {
      endpoint: `https://cms-v1.fina.com.vn/api/client/loans/${id}`,
      showSuccessMessage: false,
    },
  );
};

export const getCalcResult = async (values = {}) => {
  return await FormUtils.submitForm(
    { ...values },
    {
      nodeName: 'calculator',
      showSuccessMessage: false,
    },
  );
};
