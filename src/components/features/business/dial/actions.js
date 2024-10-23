import { createAction } from 'redux-actions';

const SET_CALL_MODE = 'call-center/dial/SET_CALL_MODE';
const SET_IS_SHOW_DETAIL_CALL_RECORD = 'call-center/dial/SET_IS_SHOW_DETAIL_CALL_RECORD';
const SET_CALL_HANDLE_INCOGNITO =  'call-center/dial/SET_CALL_HANDLE_INCOGNITO';
const SET_ISVISIBLE_CALL_RECORD_DETAIL = 'call/dial/SET_ISVISIBLE_CALL_RECORD_DETAIL';
const SET_ISVISIBLE_KEYBOARD_NUMBER = 'call/dial/SET_ISVISIBLE_KEYBOARD_NUMBER';
const SET_ISVISIBLE_RECENT_CALL = 'call/dial/SET_ISVISIBLE_RECENT_CALL';
const SET_ISVISIBLE_PHONE_BOOKS = 'call/dial/SET_ISVISIBLE_PHONE_BOOKS';
const SET_CURRENT_CONTROL = 'call/dial/SET_CURRENT_CONTROL';

export const setCallMode = createAction(SET_CALL_MODE);
export const setShowDetailCallRecord = createAction(SET_IS_SHOW_DETAIL_CALL_RECORD);
export const setCallHandleIncognito = createAction(SET_CALL_HANDLE_INCOGNITO);
export const setIsVisibleCallRecordDetail = createAction(SET_ISVISIBLE_CALL_RECORD_DETAIL);
export const setIsvisibleKeyBoardNumber = createAction(SET_ISVISIBLE_KEYBOARD_NUMBER);
export const setIsvisibleRecentCall = createAction(SET_ISVISIBLE_RECENT_CALL);
export const setIsvisiblePhoneBooks = createAction(SET_ISVISIBLE_PHONE_BOOKS);
export const setCurrentControl = createAction(SET_CURRENT_CONTROL);
