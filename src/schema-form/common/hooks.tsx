import { useDispatch } from 'react-redux';
import { callApi } from './actions';
import { endpoints } from '../../lib/networks/endpoints';

export function usePostToApi({ nodeName, endpoint, documentId }): Function {
  const dispatch = useDispatch();
  const apiEndpoint = endpoint || endpoints.generateNodeEndpoint(nodeName, documentId);
  return (params: any, callback) => {
    dispatch(callApi({ method: 'post', params, endpoint: apiEndpoint, callback }));
  };
}

export function useGetFromApi({ nodeName, endpoint, documentId }): Function {
  const dispatch = useDispatch();
  const apiEndpoint = endpoint || endpoints.generateNodeEndpoint(nodeName, documentId);
  return (params: any, callback) => {
    dispatch(callApi({ method: 'get', params, endpoint: apiEndpoint, callback }));
  };
}

export function usePutToApi({ nodeName, endpoint, documentId }: any): Function {
  const dispatch = useDispatch();
  const apiEndpoint = endpoint || endpoints.generateNodeEndpoint(nodeName, documentId);
  return (params: any, callback) => {
    dispatch(callApi({ method: 'put', params, endpoint: apiEndpoint, callback }));
  };
}