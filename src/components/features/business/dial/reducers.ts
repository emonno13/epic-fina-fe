import { handleActions } from 'redux-actions';

import {
  setCallHandleIncognito,
  setCallMode,
  setIsVisibleCallRecordDetail,
  setIsvisibleKeyBoardNumber,
  setIsvisiblePhoneBooks,
  setIsvisibleRecentCall, 
  setShowDetailCallRecord,
  setCurrentControl,
} from './actions';

const initialState = {
  callMode: false,
  namespace: undefined,
  callIn: {
    callState: {},
    callLog: {},
  },
  callOut: {
    callState: {},
    callLog: {},
  },
  isVisibleCallRecordDetail: true,
  isVisibleKeyBoardNumber: true,
  isVisibleRecentCall: false,
  isVisiblePhoneBooks: false,
  isVisibleCallHandleIncognito: false,
  showDetailCallRecord: false,
  currentControl: '',
};

const DialReducer = handleActions(
  {
    [setCurrentControl](state, { payload }) {
      return {
        ...state,
        currentControl: payload,
      };
    },
    [setCallMode](state, { payload }) {
      return {
        ...state,
        callMode: payload,
      };
    },
    [setShowDetailCallRecord](state, { payload }) {
      return {
        ...state,
        showDetailCallRecord: payload,
        isVisibleKeyBoardNumber: true,
        isVisibleCallHandleIncognito: payload,
      };
    },
    [setCallHandleIncognito](state, { payload }) {
      return {
        ...state,
        isVisibleCallHandleIncognito: payload,
        isVisibleKeyBoardNumber: !payload,
        isVisibleRecentCall: false,
        isVisiblePhoneBooks:false,
      };
    },
    [setIsVisibleCallRecordDetail](state, { payload }) {
      return {
        ...state,
        isVisibleCallRecordDetail: payload,
      };
    },
    [setIsvisibleKeyBoardNumber](state, { payload }) {
      return {
        ...state,
        isVisibleKeyBoardNumber: payload,
        isVisiblePhoneBooks: false,
        isVisibleRecentCall: false,
        isVisibleCallHandleIncognito:false,
      };
    },
    [setIsvisibleRecentCall](state, { payload }) {
      return {
        ...state,
        isVisibleRecentCall: payload,
        isVisibleKeyBoardNumber: false,
        isVisiblePhoneBooks: false,
        isVisibleCallHandleIncognito:false,
      };
    },
    [setIsvisiblePhoneBooks](state, { payload }) {
      return {
        ...state,
        isVisiblePhoneBooks: payload,
        isVisibleKeyBoardNumber: false,
        isVisibleRecentCall: false,
        isVisibleCallHandleIncognito: false,
      };
    },
  },
  initialState,
);

export default DialReducer;
