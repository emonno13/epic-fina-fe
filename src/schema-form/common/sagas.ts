import {
  call,
  takeLatest,
} from 'redux-saga/effects';
import { createDocument, deleteDocument, callApi, getDocument, updateDocument } from './actions';
import { FormUtils } from '../utils/form-utils';
import { doInternalRequest, httpRequester } from '../../lib/networks/http';

export interface SagaNodePayload {
  endpoint?: string,
  nodeName?: string,
  featureId?: string,
  method?: string,
  callback?: Function,
  document?: any
}

const getEndpoint = (payload: any) => {
  const { endpoint, nodeName, featureId, documentId, callback = (f=>f) } = payload;
  return  FormUtils.getNodeEndpoint(Object.assign({ endpoint, nodeName, featureId, documentId }));
};

function* handleCreateDocument({ payload }) {
  const { document, callback = (f=>f) } = payload;
  const urlEndpoint = getEndpoint(payload);

  const response = yield httpRequester.postToApi({
    url: urlEndpoint,
    params: { ...document },
  });
  callback(response);
  return response;
}

function* handleUpdateDocument({ payload }) {
  const { document, callback = (f=>f) } = payload;
  const urlEndpoint = getEndpoint(payload);

  const response = yield httpRequester.putToApi({
    url: urlEndpoint,
    params: { ...document },
  });
  callback(response);
}

function* handleDeleteDocument({ payload }) {
  const { params, callback = (f=>f) } = payload;
  const urlEndpoint = getEndpoint(payload);

  const response = yield httpRequester.deleteFromApi({
    url: urlEndpoint,
    params: { ...params },
  });
  callback(response);
}

function* handleCallApi({ payload }) {
  const { params, method, callback = (f=>f) } = payload;
  const url = getEndpoint(payload);
  const response = yield call(doInternalRequest,{ params, url }, method || 'get');
  callback(response);
}

export const nodeDocumentSaga = function* sagas() {
  yield takeLatest(createDocument, handleCreateDocument);
  yield takeLatest(updateDocument, handleUpdateDocument);
  yield takeLatest(deleteDocument, handleDeleteDocument);
  yield takeLatest(getDocument, handleCallApi);
  yield takeLatest(callApi, handleCallApi);
};
