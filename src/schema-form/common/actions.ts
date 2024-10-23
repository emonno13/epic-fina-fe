import { createAction } from 'redux-actions';

export const CREATE_DOCUMENT = 'h2platform/features/CREATE_DOCUMENT';
export const UPDATE_DOCUMENT = 'h2platform/features/UPDATE_DOCUMENT';
export const DELETE_DOCUMENT = 'h2platform/features/DELETE_DOCUMENT';
export const GET_DOCUMENT = 'h2platform/features/GET_DOCUMENT';
export const GET_DATA_FROM_API = 'h2platform/features/GET_DATA_FROM_API';

export const createDocument = createAction(CREATE_DOCUMENT);
export const updateDocument = createAction(UPDATE_DOCUMENT);
export const deleteDocument = createAction(DELETE_DOCUMENT);
export const getDocument = createAction(GET_DOCUMENT);
export const callApi = createAction(GET_DATA_FROM_API);
