import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setModels } from '../../../store/actions';
import { requestStatusModels } from './actions';

function* handleGetStatusModels(models) {
  if (models?.payload) {
    yield put(setModels({ models: models.payload }));
    return;
  }
  models = yield call(httpRequester.getDataFromApi, {
    url: endpoints.endpointWithApiDomain('/statuses/models'),
  });
  yield put(setModels({ models: models }));
}

export const StatusSagas = function* sagas() {
  yield takeLatest(requestStatusModels, handleGetStatusModels);
};
