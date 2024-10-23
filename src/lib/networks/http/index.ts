import Cookies from 'js-cookie';
import TokenManagement from 'token-management';
import jwtDecode from 'jwt-decode';
import { FormDataUtils } from './form-data-utils';
import { endpoints } from '../endpoints';
import { ErrorProcessing, redirectErrorProcessing, showErrorDetailForDev , STATUS_CODE } from '../error-processing';

const defaultHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

// eslint-disable-next-line no-undef
export interface INetwork extends RequestInit {
  url: string | any,
  params?: object | any,
  options?: any
}


export const getUrlParams = (url: string, params = {}) => {
  return `${url}?${new URLSearchParams(params).toString()}`;
};

export const doRequest = async (networkData: INetwork, method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options') => {
  const headers = networkData?.headers || {};
  const data = {};
  const { useDefaultMessage } = networkData?.options || { useDefaultMessage: true };
  const params = networkData?.params || {};
  Object.keys(params).forEach((key) => {
    FormDataUtils.simplifyParams(data, key, params[key]);
  });
  const res = await fetch(networkData?.url, {
    method: (method || 'GET').toUpperCase(),
    headers: {
      ...defaultHeader,
      ...headers,
    },
    body: method === 'get' ? undefined : JSON.stringify(data),
  });

  if (res?.status === 204 || res?.statusText === 'No Content') {
    return {
      success: true,
      statusText: 'No Content',
    };
  }
  const responseData = await res.json();
  if (responseData?.error) {
    showErrorDetailForDev(responseData?.error);
    await redirectErrorProcessing(responseData?.error);
    (useDefaultMessage && !STATUS_CODE.includes(responseData.error?.statusCode)) && await ErrorProcessing(responseData?.error);
  }
  return responseData;

};

export const tkManager = new TokenManagement({
  refreshTimeout: 10000,
  isTokenValid(token) {
    try {
      const decodeToken: any = jwtDecode(token);
      return Date.now() / 1000 < decodeToken?.exp;
    } catch (error) {
      return false;
    }
  },
  getAccessToken: () => Cookies.get('h2token'),
  onRefreshToken: async (done) => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      done(null);
      return;
    }
    try {
      const refreshResponse = await doRequest({
        url: endpoints.endpointWithApiDomain('/refresh'),
        params: {
          refreshToken,
        },
      }, 'post');
      const { accessToken, refreshToken: newRefreshToken } = refreshResponse;
      Cookies.set('h2token', accessToken, { expires: 365 });
      Cookies.set('refreshToken', newRefreshToken, { expires: 365 });
      done(accessToken);
    } catch (error) {
      console.error('err on refresh', error);
      done(null);
    }
  },
});

export const doInternalRequest = async (networkData: INetwork, method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options') => {
  const headers = networkData?.headers || {};
  const token = await tkManager.getToken();
  networkData.headers = {
    ...headers,
    'Authorization': `Bearer ${token}`,
  };
  return await doRequest(networkData, method);
};

export const commonHeaders = () => {

};

const getDataFromApi = async (networkData: INetwork) => {
  const formData = FormDataUtils.createFrom(networkData.params);
  const getNetworkRequest = {
    ...networkData,
    url: `${networkData.url}?${FormDataUtils.convertFormDataToString(formData)}`,
    params: undefined,
  };
  return await doInternalRequest(getNetworkRequest, 'get');
};

const postToApi = async (networkData: INetwork) => {
  return await doInternalRequest(networkData, 'post');
};

const deleteFromApi = async (networkData: INetwork) => {
  return await doInternalRequest(networkData, 'delete');
};

const putToApi = async (networkData: INetwork) => {
  return await doInternalRequest(networkData, 'put');
};

const saveToApi = async (networkData: INetwork) => {
  const params = networkData.params || {};
  if (params.id) {
    return await doInternalRequest(networkData, 'put');
  }

  return await doInternalRequest(networkData, 'post');
};

export const httpRequester = {
  postToApi,
  getDataFromApi,
  putToApi,
  deleteFromApi,
  getUrlParams,
  saveToApi,
  doRequest,
  doInternalRequest,
};
