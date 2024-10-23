import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { call, takeLatest } from 'redux-saga/effects';
import { getFilterWithRelations } from '../../../../schema-form/utils/form-utils';
import { requestDealDetailsByDeal, updateDealProgressItem } from './actions';

function* handleUpdateDealProgressItem({ payload }) {
  return yield call(httpRequester.putToApi, {
    url: endpoints.endpointWithApiDomain('/deal-progress/update-progress-item'),
    params: payload,
  });
}

function* handleRequestDealDetailsByDeal({ payload }) {
  const { params = {}, callback = (f) => f } = payload;
  const urlEndpoint = endpoints.endpointWithApiDomain('/deal-details');
  const response = yield call(httpRequester.getDataFromApi, {
    url: urlEndpoint,
    params: {
      filter: {
        where: params,
        include: getFilterWithRelations([
          'partner',
          'partnerStaff',
          'executePartner',
        ]),
      },
    },
  });
  callback(response);
}

export const DealSagas = function* sagas() {
  yield takeLatest(updateDealProgressItem, handleUpdateDealProgressItem);
  yield takeLatest(requestDealDetailsByDeal, handleRequestDealDetailsByDeal);
};
