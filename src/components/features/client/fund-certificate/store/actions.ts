import { createAction } from 'redux-actions';
export const fundStoreName = 'FUND_CERTIFICATE';

export const CREATE_FUND_TRANSACTION_REQUESTED = 'h2platform/FUND_CERTIFICATE/CREATE_FUND_TRANSACTION_REQUESTED';
export const CREATE_FUND_TRANSACTION_SUCCEEDED = 'h2platform/FUND_CERTIFICATE/CREATE_FUND_TRANSACTION_SUCCEEDED';
export const CREATE_FUND_TRANSACTION_FAILED = 'h2platform/FUND_CERTIFICATE/CREATE_FUND_TRANSACTION_FAILED';
export const createFundTransactionRequested = createAction(CREATE_FUND_TRANSACTION_REQUESTED);
export const createFundTransactionSucceeded = createAction(CREATE_FUND_TRANSACTION_SUCCEEDED);
export const createFundTransactionFailed = createAction(CREATE_FUND_TRANSACTION_FAILED);

export const SEND_OTP_BUY_FUND_REQUESTED = 'h2platform/FUND_CERTIFICATE/SEND_OTP_BUY_FUND_REQUESTED';
export const sendOtpBuyFundRequest = createAction(SEND_OTP_BUY_FUND_REQUESTED);

export const VERIFY_OTP_BUY_FUND = 'h2platform/FUND_CERTIFICATE/VERIFY_OTP_BUY_FUND';
export const verifyOtpBuyFund = createAction(VERIFY_OTP_BUY_FUND);

export const SET_SELECT_PRODUCT_PROGRAM = 'h2platform/FUND_CERTIFICATE/SET_SELECT_PRODUCT_PROGRAM';
export const setSelectProductProgram = createAction(SET_SELECT_PRODUCT_PROGRAM);

export const LOAD_MIO_EKYC = 'h2platform/FUND_CERTIFICATE/LOAD_MIO_EKYC';
export const loadMioEKyc = createAction(LOAD_MIO_EKYC);
export const SET_MIO_EKYC = 'h2platform/FUND_CERTIFICATE/SET_MIO_EKYC';
export const setMioEKyc = createAction(SET_MIO_EKYC);
