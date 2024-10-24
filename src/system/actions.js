import { createAction } from 'redux-actions';

const LOAD_SYSTEM_ENV = 'h2platform/system/ENV/LOAD';
const SET_SYSTEM_ENV = 'h2platform/system/ENV/SET_ENV';

export const loadSystemEnv = createAction(LOAD_SYSTEM_ENV);
export const setSystemEnv = createAction(SET_SYSTEM_ENV);
