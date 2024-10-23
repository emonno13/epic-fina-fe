import { endpoints } from '@lib/networks/endpoints';
import { doInternalRequest } from '@lib/networks/http';
import { FormUtils } from '@schema-form/utils/form-utils';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'underscore';
import {
  createFundTransactionFailed,
  createFundTransactionRequested,
  createFundTransactionSucceeded,
  loadMioEKyc,
  sendOtpBuyFundRequest,
  setMioEKyc,
  verifyOtpBuyFund,
} from './actions';

export function* handleCreateFundTransaction({ payload }) {
  const { onGotError, onGotSuccess, ...requestBody } = payload;
  const response = yield call(
    FormUtils.submitForm,
    { ...requestBody },
    {
      endpoint: endpoints.endpointWithApiDomain(
        '/transactions/create-transaction-buy-fund',
      ),
      method: 'post',
    },
  );
  if (!isEmpty(response?.error)) {
    yield put(createFundTransactionFailed(response.error));
    onGotError && onGotError(response);
  } else {
    yield put(createFundTransactionSucceeded(response));
    onGotSuccess && onGotSuccess(response);
  }
}

function* handleSendOtpBuyFund({ payload }) {
  const { params = {}, callback = (f) => f } = payload;

  const response = yield call(
    FormUtils.submitForm,
    { ...params },
    {
      endpoint: endpoints.endpointWithApiDomain(
        '/transactions-partner-logs/send-otp-buy-fund',
      ),
      method: 'post',
    },
  );
  callback(response);
}

function* handleVerifyOtpBuyFund({ payload }) {
  const { params, callback = (f) => f, currentUser } = payload;
  yield delay(500);
  const response = yield call(
    FormUtils.submitForm,
    { ...params },
    {
      endpoint: endpoints.endpointWithApiDomain(
        `/transactions-partner-logs/${currentUser?.id}/verify-otp-buy-fund`,
      ),
      method: 'post',
    },
  );
  yield callback(response);
}

function* handleLoadMioEkyc() {
  const url = endpoints.endpointWithApiDomain('/users/kyc-info');
  const response = yield call(doInternalRequest, { url }, 'get');
  if (response?.error) {
    yield put(
      setMioEKyc({ error: true, errorMessage: response.error?.message }),
    );
  }
  yield put(setMioEKyc({ ...response }));
}

export default function* FundCertificateSaga() {
  yield takeLatest(createFundTransactionRequested, handleCreateFundTransaction);
  yield takeLatest(sendOtpBuyFundRequest, handleSendOtpBuyFund);
  yield takeLatest(verifyOtpBuyFund, handleVerifyOtpBuyFund);
  yield takeLatest(loadMioEKyc, handleLoadMioEkyc);
}
