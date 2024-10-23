import { DeviceUuidUtils } from '@lib/utils/device-uuid-utils';
import {
  SET_DATA_SOURCE,
  SET_DOCUMENT_DETAIL,
  SET_PAGINATION,
} from '@schema-form/features/actions';
import {
  SET_DATASOURCE_EVENT,
  SET_DOCUMENT_DETAIL_EVENT,
  SET_PAGINATION_EVENT,
} from '@types/socket';
import { DEVICE_UUID_HEADER_NAMESPACE } from '@types/uuid';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
export let SOCKET_SERVER: any = null;
export const createWebSocketConnection = async () => {
  // eslint-disable-next-line no-async-promise-executor
  const promiser = () =>
    new Promise(async (resolve, reject) => {
      if (SOCKET_SERVER?.id) {
        resolve(SOCKET_SERVER);
      }
      const token = Cookies.get('h2token');
      const uuid = DeviceUuidUtils.getDeviceUuid();
      if (!token || !uuid) {
        await new Promise((r) => setTimeout(r, 100));
        return await promiser();
      }
      const socket = io(`${API_SERVER}/melis`, {
        withCredentials: true,
        transports: ['websocket'],
        auth: {
          token: Cookies.get('h2token') || '',
          [DEVICE_UUID_HEADER_NAMESPACE]: DeviceUuidUtils.getDeviceUuid(),
        },
        extraHeaders: {
          token: Cookies.get('h2token') || '',
          [DEVICE_UUID_HEADER_NAMESPACE]: DeviceUuidUtils.getDeviceUuid(),
        },
      });

      socket.on('connect', () => {
        resolve(socket);
        SOCKET_SERVER = socket;
      });

      socket.on('connect_error', (error) => {
        reject(error);
      });
    });
  return await promiser();
};

export const getWsDataByEvent = (eventName: string, payload: any) => {
  return {
    type: eventName,
    payload,
  };
};

export const getFeatureActionType = (eventName: string): string => {
  switch (eventName) {
    case SET_DATASOURCE_EVENT:
      return SET_DATA_SOURCE;
    case SET_DOCUMENT_DETAIL_EVENT:
      return SET_DOCUMENT_DETAIL;
    case SET_PAGINATION_EVENT:
      return SET_PAGINATION;
    default:
      return '';
  }
};
