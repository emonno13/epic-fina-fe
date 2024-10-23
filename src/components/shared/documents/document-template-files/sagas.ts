import { call, takeLatest } from 'redux-saga/effects';
import { getUploadedDocumentsOfTemplate } from './actions';
import { endpoints } from '../../../../lib/networks/endpoints';
import { httpRequester } from '../../../../lib/networks/http';
import { getFilterWithRelations } from '../../../../schema-form/utils/form-utils';

function* handleGetUploadedDocumentsOfTemplate({ payload }) {
  const { params = {}, callback = (f=>f) } = payload;
  const urlEndpoint = endpoints.endpointWithApiDomain('/document-template-files');
  const response = yield call(httpRequester.getDataFromApi, {
    url: urlEndpoint,
    params: {
      filter: {
        where: params,
        include: getFilterWithRelations(['file', 'document']),
      },
    },
  });
  callback(response);
}


export const nodeTemplateDocumentUploaderSaga = function* sagas() {
  yield takeLatest(getUploadedDocumentsOfTemplate, handleGetUploadedDocumentsOfTemplate);
};
