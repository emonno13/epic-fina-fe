import { handleActions } from 'redux-actions';
import { saveLoanCalcObj } from './actions';
import { BILLION_SUFFIX, CALCULATE_LOAN_OPTION_LOAN_VALUE, MONTH_SUFFIX, PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST, PREFERENTIAL_RATE_OPTION_CUSTOM, YEAR_SUFFIX } from './constants';

const defaultState = {
  calculateLoanOption: CALCULATE_LOAN_OPTION_LOAN_VALUE,
  propertyPrice: 0,
  ratio: 0,
  months: 0,
  introRate: 0,
  introMonths: 0,
  rate: 0.11,
  paymentMethod: PAYMENT_METHOD_OPTION_PRINCIPAL_AND_INTEREST,
  gracePeriod: 0,
  interestRateSupportPeriod: 0,
  prePaymentMonths: 0,
  prePaymentRate: 0,
  isPrePaymentCheck: false,
  isGracePeriodCheck: false,
  isInterestRateSupportPeriodCheck: false,
  preferentialRateOption: PREFERENTIAL_RATE_OPTION_CUSTOM,
  propertyPriceSuffix: BILLION_SUFFIX,
  monthsSuffix: YEAR_SUFFIX,
  introMonthsSuffix: YEAR_SUFFIX,
  prePaymentMonthsSuffix: MONTH_SUFFIX,
};

const LoanCalcObjReducer = handleActions({
  [saveLoanCalcObj](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
}, defaultState);

export default LoanCalcObjReducer;