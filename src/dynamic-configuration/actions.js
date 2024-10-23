import { createAction } from 'redux-actions';

const LOAD_POSITION_CONFIG = 'h2platform/system/POSITION/LOAD/CONFIG';
const SET_POSITION_CONFIG = 'h2platform/system/POSITION/SET/CONFIG';

const LOAD_ROLES_CONFIG = 'h2platform/system/ROLES/LOAD/CONFIG';
const SET_ROLES_CONFIG = 'h2platform/system/ROLES/SET/CONFIG';

export const loadPositionConfig = createAction(LOAD_POSITION_CONFIG);
export const setPositionConfig = createAction(SET_POSITION_CONFIG);

export const loadRolesConfig = createAction(LOAD_ROLES_CONFIG);
export const setRolesConfig = createAction(SET_ROLES_CONFIG);
