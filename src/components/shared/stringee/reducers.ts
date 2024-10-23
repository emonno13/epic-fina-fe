import { handleActions } from 'redux-actions';
import {
  setConnectingState,
  setReadyToCall,
  setCallInfo,
  setReportCallIn,
  setCallState,
  resetCallData,
  switchViewMode,
  setMuteCallState,
  setHoldCallState,
} from './actions';
import { CALL_STATUS } from './constant';

const initialState = {
  agentCallStatus: CALL_STATUS.OFFLINE,
  isConnected: false,
  readyToCall: false,
  inCall: false,
  isShortViewMode: true,
  namespace: undefined,
  callIn: {
    callState: {},
    callLog: {},
    mute: false,
    hold: false,
  },
  callOut: {
    isCallFromApp: false,
    callState: {},
    callLog: {},
    mute: false,
    hold: false,
  },
};

const StringeeReducers = handleActions(
  {
    [setReadyToCall](state, { payload }) {
      const { readyToCall } = payload;
      return {
        ...state,
        readyToCall,
      };
    },
    [switchViewMode](state, { payload }) {
      return {
        ...state,
        isShortViewMode: !state.isShortViewMode,
      };
    },
    [setConnectingState](state, { payload }) {
      const { agentCallStatus, isConnected } = payload;
      if (agentCallStatus) {
        return {
          ...state,
          agentCallStatus,
        };
      }
      return {
        ...state,
        isConnected,
      };
    },
    [setCallState](state, { payload }) {
      const { callState = { code: -1 }, namespace } = payload;
      const data = state[namespace] || {};
      return {
        ...state,
        [namespace]: {
          ...data,
          callState,
        },
      };
    },
    [setCallInfo](state, { payload }) {
      const { userInfo, phoneNumber, answered, namespace, callState, callLog, isCallFromApp } = payload;
      const data = state[namespace] || {};
      return {
        ...state,
        inCall: true,
        namespace,
        [namespace]: {
          ...data,
          isCalling: true,
          answered,
          userInfo: userInfo || data.userInfo,
          callState: callState || data.callState,
          phoneNumber: phoneNumber || data.phoneNumber,
          callLog: callLog || data.callLog,
          isCallFromApp: typeof isCallFromApp == 'boolean' ? isCallFromApp : data.isCallFromApp,
        },
      };
    },
    [resetCallData](state, { payload: { namespace } }) {
      const data = state[namespace] || {};
      return {
        ...state,
        inCall: false,
        namespace: undefined,
        [namespace]: {
          ...data,
          isCalling: false,
          // callLog: {},
          // userInfo: {},
          answered: false,
          phoneNumber: undefined,
          isCallFromApp: false,
        },
      };
    },
    [setReportCallIn](state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        reportCallIn: data,
      };
    },
    [setMuteCallState](state, { payload }) {
      const { muteState, namespace } = payload;
      const data = state[namespace] || {};
      return {
        ...state,
        [namespace]: {
          ...data,
          mute: !!muteState,
        },
      };
    },
    [setHoldCallState](state, { payload }) {
      const { holdState, namespace } = payload;
      const data = state[namespace] || {};
      return {
        ...state,
        [namespace]: {
          ...data,
          hold: !!holdState,
        },
      };
    },
  },
  initialState,
);

export default StringeeReducers;
