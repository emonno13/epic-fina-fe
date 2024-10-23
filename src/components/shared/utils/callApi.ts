import { doInternalRequest } from '@lib/networks/http';
import { FormUtils } from '../../../schema-form/utils/form-utils';

export const getEndpoint = (payload: any) => {
  const {
    endpoint,
    nodeName,
    featureId,
    documentId,
    callback = (f) => f,
  } = payload;
  return FormUtils.getNodeEndpoint(
    Object.assign({ endpoint, nodeName, featureId, documentId }),
  );
};

export const handleCallApi = async (payload) => {
  const { params, method, callback = (f) => f } = payload;
  const url = getEndpoint(payload);
  const response = await doInternalRequest({ params, url }, method || 'get');
  callback(response);
  return response;
};
