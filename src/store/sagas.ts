import { endpoints } from '@lib/networks/endpoints';
import { doInternalRequest } from '@lib/networks/http';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  requestInformationOrganizations,
  requestInformationUser,
  requestPermission,
  setPermission,
} from './actions';

export function* handleRequestPermission({ payload }) {
  const { userId } = payload;
  const url = endpoints.endpointWithApiDomain(`/user/${userId}/permission`);
  const permissions = yield call(doInternalRequest, { url }, 'get');
  yield put(setPermission({ permissions }));
}

export function* handleRequestInformationUser({ payload }) {
  const { userId, callback = (f) => f } = payload;
  const url = endpoints.endpointWithApiDomain(`/users/${userId}`);
  const user = yield call(doInternalRequest, { url }, 'get');
  callback(user);
}

export function* handleRequestInformationOrganizations({ payload }) {
  const { orgId, callback = (f) => f } = payload;
  const url = endpoints.endpointWithApiDomain(
    `/organizations/information/${orgId}`,
  );
  const organization = yield call(doInternalRequest, { url }, 'get');
  callback(organization);
}

export const CommonSagas = function* sagas() {
  yield takeLatest(requestPermission, handleRequestPermission);
  yield takeLatest(requestInformationUser, handleRequestInformationUser);
  yield takeLatest(
    requestInformationOrganizations,
    handleRequestInformationOrganizations,
  );
};
