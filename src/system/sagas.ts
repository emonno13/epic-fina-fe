import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import { loadSystemEnv, setSystemEnv } from './actions';
import { endpoints } from '../lib/networks/endpoints';
import { doInternalRequest } from '../lib/networks/http';

export function* handleLoadSystemEnv() {
  const url = endpoints.endpointWithApiDomain('/systems/envs');
  const environments = yield call(doInternalRequest, { url }, 'get');
  yield put(setSystemEnv({ environments }));
}

export const SystemSagas = function* sagas() {
  yield takeLatest(loadSystemEnv, handleLoadSystemEnv);
};
