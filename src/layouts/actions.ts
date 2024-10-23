import { createAction } from 'redux-actions';

const SET_LAYOUT_VALUE = 'h2platform/layout/SET_LAYOUT_VALUE';
const SET_CURRENT_LAYOUT = 'h2platform/layout/SET_CURRENT_LAYOUT';
const SET_LAYOUT_VALUES = 'h2platform/layout/SET_LAYOUT_VALUES';
const SHOW_LEFT_MENU = 'h2platform/layout/SHOW_LEFT_MENU';

export const setLayoutValues = createAction(SET_LAYOUT_VALUES);
export const setCurrentLayout = createAction(SET_CURRENT_LAYOUT);
export const setLayoutValue = createAction(SET_LAYOUT_VALUE);
export const showLeftMenu = createAction(SHOW_LEFT_MENU);
