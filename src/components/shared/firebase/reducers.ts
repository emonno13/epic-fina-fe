import { handleActions } from 'redux-actions';

import {
  hiddenPopNoti,
  showPopupNoti,
} from './actions';

const initialState = {
  isShowPopup: false,
};

const FirebaseReducers = handleActions(
  {
    [showPopupNoti](state, { payload }) {
      return {
        ...state,
        isShowPopup: payload.isShowPopup,
        userId: payload.userId,
      };
    },
    [hiddenPopNoti](state, { payload }) {
      return {
        ...state,
        isShowPopup: payload.isShowPopup,
      };
    },
  }, initialState,
);

export default FirebaseReducers;