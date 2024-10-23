import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

import { loadPositionConfig, loadRolesConfig, setPositionConfig, setRolesConfig } from './actions';
import { endpoints } from '../lib/networks/endpoints';
import { doInternalRequest } from '../lib/networks/http';
import { setGlobalMessages } from '../store/actions';

function* handleLoadPosition() {
  const url = endpoints.endpointWithApiDomain('/positions');
  const response = yield call(doInternalRequest, { url }, 'get');
  if (response?.error) {
    yield put(setGlobalMessages({ error: true, errorMessage: response.error?.message }));
    return;
  }
  yield put(setPositionConfig({ ...response }));
}

export const PositionSystemSagas = function* sagas() {
  yield takeLatest(loadPositionConfig, handleLoadPosition);
};

function* handleLoadRoles() {
  const url = endpoints.endpointWithApiDomain('/roles');
  const response = yield call(doInternalRequest, { url }, 'get');
  if (response?.error) {
    yield put(setGlobalMessages({ error: true, errorMessage: response.error?.message }));
    return;
  }
  yield put(setRolesConfig({ ...response }));
}

export const RolesSystemSagas = function* sagas() {
  yield takeLatest(loadRolesConfig, handleLoadRoles);
};

