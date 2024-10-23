import { createAction } from 'redux-actions';

const SET_HAS_FEATURE_DETAIL_STATUS = 'h2platform/SET_HAS_FEATURE_DETAIL_STATUS';
const SET_SCROLL_BARS_VALUES = 'h2platform/SET_SCROLL_BARS_VALUES';
const SET_MODEL = 'h2platform/status/SET_MODEL';
const SET_PERMISSION = 'h2platform/SET_PERMISSION';
const REQUEST_PERMISSION = 'h2platform/REQUEST_PERMISSION';
const REQUEST_INFORMATION_USER = 'h2platform/REQUEST_INFORMATION_USER';
const REQUEST_INFORMATION_ORGANIZATION = 'h2platform/REQUEST_INFORMATION_ORGANIZATION';
const SET_GLOBAL_MESSAGES = 'h2platform/SET_GLOBAL_MESSAGES';
export const SET_MELI_SOCKET = 'h2platform/SET_MELI_SOCKET';
export const CONNECT_MELI_SOCKET = 'h2platform/CONNECT_MELI_SOCKET';
export const DISCONNECT_MELI_SOCKET = 'h2platform/DISCONNECT_MELI_SOCKET';

export const setHasFeatureDetailStatus = createAction(SET_HAS_FEATURE_DETAIL_STATUS);
export const setScrollBarValues = createAction(SET_SCROLL_BARS_VALUES);
export const setModels = createAction(SET_MODEL);
export const setPermission = createAction(SET_PERMISSION);
export const requestPermission = createAction(REQUEST_PERMISSION);
export const requestInformationUser = createAction(REQUEST_INFORMATION_USER);
export const requestInformationOrganizations = createAction(REQUEST_INFORMATION_ORGANIZATION);
export const setGlobalMessages = createAction(SET_GLOBAL_MESSAGES);
export const setMeliSocket = createAction(SET_MELI_SOCKET);
export const connectMeliSocket = createAction(CONNECT_MELI_SOCKET);
export const disconnectMeliSocket = createAction(DISCONNECT_MELI_SOCKET);

