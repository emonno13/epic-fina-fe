import { handleActions } from 'redux-actions';
import { CREATE_FUND_TRANSACTION_FAILED, CREATE_FUND_TRANSACTION_SUCCEEDED, SET_MIO_EKYC, SET_SELECT_PRODUCT_PROGRAM } from './actions';

const defaultState = {};

export const FundCertificateReducer = handleActions({
  [CREATE_FUND_TRANSACTION_SUCCEEDED]: (state, action) => ({
    ...state,
    CREATE_FUND_TRANSACTION_SUCCEEDED: { ...action.payload },
  }),

  [CREATE_FUND_TRANSACTION_FAILED]: (state, action) => ({
    ...state,
    CREATE_FUND_TRANSACTION_FAILED: { ...action.payload },
  }),

  [SET_SELECT_PRODUCT_PROGRAM]: (state, { payload }) => {
    return {
      ...state,
      selectedProductProgram: payload,
    };
  },

  [SET_MIO_EKYC]: (state, { payload }) => {
    return {
      ...state,
      mioEkyc: payload,
    };
  },
}, defaultState);
