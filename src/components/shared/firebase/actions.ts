import { createAction } from 'redux-actions';

const SHOW_POPUP_NOTIFICATION = 'h2platform/firebase/SHOW_POPUP_NOTIFICATION';
const HIDDEN_POPUP_NOTIFICATION = 'h2platform/firebase/HIDDEN_POPUP_NOTIFICATION';

export const showPopupNoti = createAction(SHOW_POPUP_NOTIFICATION);
export const hiddenPopNoti = createAction(HIDDEN_POPUP_NOTIFICATION);