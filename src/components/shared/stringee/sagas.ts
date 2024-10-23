import { notification } from 'antd';
import Cookies from 'js-cookie';
import { channel } from 'redux-saga';
import {
  call,
  delay,
  put,
  select,
  spawn,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { setDocumentDetail } from '@schema-form/features/actions';
import Router from 'next/router';
import { Socket } from 'socket.io-client';
import { FormDataUtils } from '../../../lib/networks/http/form-data-utils';
import { callApi, createDocument } from '../../../schema-form/common/actions';
import { setShowDetailCallRecord } from '../../features/business/dial/actions';
import {
  answerIncomingCall,
  clientEndCall,
  connectAgentCallStatus,
  connectToStringeeServer,
  makeCall,
  receiveIncomingCall,
  requestNewToken,
  resetCallData,
  setCallInfo,
  setConnectingState,
  setDtmfCallOut,
  setEndingCall,
  setHoldCall,
  setHoldCallState,
  setMuteCall,
  setMuteCallState,
  setReadyToCall,
  updateEndCallCauseBusyForCallLog,
} from './actions';
import { FEATURE_ID_CALL_LOG_POPOVER } from './call-logs';
import {
  ANSWER_CALL_STATE,
  CALL_DIRECTION,
  CALL_END_CAUSE,
  CALL_STATE_SKIP_REASON,
  CALL_STATUS,
  getCallStatusLabel,
  SIGNALING_STATE,
} from './constant';
import { getCorrectPhoneNumber } from './utils';
import { SetupCallEvent } from './utils/call-events';

let client: any = undefined;
let stringeeCallOut: any = undefined;
let incomingCall: any = undefined;
let requestingNewToken = false;
let incomingAudio: any = undefined;
let socketId = '';

const loadUserByPhoneNumber = (
  stringeeChanel,
  phoneNumber: string,
  userInfo?: any,
) => {
  return new Promise((resolve) => {
    const endpoint = endpoints.endpointWithApiDomain(
      `/users/phone/${phoneNumber}`,
    );
    stringeeChanel.put(
      callApi({
        method: 'get',
        params: { phoneNumber },
        endpoint,
        callback: resolve,
      }),
    );
  });
};

function* handleEndingCall({ payload: { namespace, currentUser } }) {
  try {
    const isIncomingCall = namespace === CALL_DIRECTION.CALL_IN;
    const state = yield select();
    const callInfo = state.stringee[namespace];
    const { callLog, userInfo, answered } = callInfo;
    const callState = callInfo?.callState || {};
    const isCallFromApp = callInfo?.isCallFromApp || {};
    const callStateCode = callState?.code;
    const callStateSipCode = callState?.sipCode;

    console.log('handleEndingCall: ', callInfo);

    yield put(resetCallData({ namespace }));
    yield put(setShowDetailCallRecord(false));

    const endResponse = yield new Promise((resolve) => {
      if (isIncomingCall) {
        // in case incoming call but there is click to answer button
        if (answered) {
          incomingCall?.hangup(resolve);
        } else {
          incomingCall?.reject((res) => {
            resolve(res);
            const { r } = res;
            if (r !== ANSWER_CALL_STATE.SUCCESS) {
              incomingCall?.hangup(resolve);
            } else {
              resolve(res);
            }
          });
        }
      } else {
        stringeeCallOut?.hangup(resolve);
      }
    });

    if (incomingAudio) {
      incomingAudio.pause();
    }

    const { r } = endResponse;
    if (r !== ANSWER_CALL_STATE.SUCCESS) {
      notification.error({
        message: `Lỗi hệ thống(${getCallStatusLabel(r)}), xin vui lòng liên hệ bộ phận hỗ trợ IT.`,
      });
      return;
    }

    try {
      if (callStateCode === SIGNALING_STATE.CALL_BUSY_CODE) {
        yield new Audio('/assets/audio/no-answer.mp3').play();
      } else {
        yield new Audio('/assets/audio/end-call.mp3').play();
      }
    } catch (e) {
      console.log('Ending audio: ', e);
    }

    if (callStateSipCode === CALL_STATE_SKIP_REASON.TEMPORARILY_UNAVAILABLE) {
      const endpoint = endpoints.endpointWithApiDomain(
        `/call-logs/${callLog.id}`,
      );
      yield put(
        callApi({
          method: 'put',
          params: { endCallCause: CALL_END_CAUSE.NO_ANSWER },
          endpoint,
        }),
      );

      const endpointCreateTemporarilyUnavailableCall =
        endpoints.endpointWithApiDomain('/temporarily-unavailable-calls');
      yield put(
        callApi({
          method: 'post',
          params: {
            callLogId: callLog.id,
            fromId: currentUser?.id,
            toId: userInfo?.id,
            direction: CALL_DIRECTION.CALL_OUT,
            toNumber: getCorrectPhoneNumber(callInfo?.phoneNumber),
          },
          endpoint: endpointCreateTemporarilyUnavailableCall,
        }),
      );
    }
    if (!isCallFromApp) {
      yield put(
        setDocumentDetail({
          featureId: FEATURE_ID_CALL_LOG_POPOVER,
          documentDetail: callLog,
          documentDetailVisibility: true,
        }),
      );
    }
  } catch (e) {
    console.log('handleEndingCall error: ', e);
  }
}

function* handleClientEndCall({ payload: { namespace, currentUser } }) {
  try {
    const state = yield select();
    const callInfo = state.stringee[namespace];
    const { callLog = {}, userInfo } = callInfo;
    const callState = callInfo?.callState || {};
    const isCallFromApp = callInfo?.isCallFromApp || {};
    const callStateCode = callState?.code;
    const callStateSipCode = callState?.sipCode;
    const callLogId = callLog.id;

    console.log('handleClientEndCall: ', callInfo);

    yield put(resetCallData({ namespace }));
    yield put(setShowDetailCallRecord(false));

    if (incomingAudio) {
      incomingAudio.pause();
    }

    try {
      if (callStateCode === SIGNALING_STATE.CALL_BUSY_CODE) {
        yield new Audio('/assets/audio/no-answer.mp3').play();
      } else {
        yield new Audio('/assets/audio/end-call.mp3').play();
      }
    } catch (e) {
      console.log('Ending audio: ', e);
    }

    if (
      callStateSipCode === CALL_STATE_SKIP_REASON.TEMPORARILY_UNAVAILABLE &&
      callLogId
    ) {
      yield put(
        callApi({
          endpoint: endpoints.endpointWithApiDomain(`/call-logs/${callLogId}`),
          method: 'put',
          params: {
            endCallCause: CALL_END_CAUSE.NO_ANSWER,
          },
        }),
      );
      yield put(
        callApi({
          endpoint: endpoints.endpointWithApiDomain(
            '/temporarily-unavailable-calls',
          ),
          method: 'post',
          params: {
            callLogId: callLogId,
            fromId: currentUser?.id,
            toId: userInfo?.id,
            direction: CALL_DIRECTION.CALL_OUT,
            toNumber: getCorrectPhoneNumber(callInfo?.phoneNumber),
          },
        }),
      );
    }

    if (callLogId && !isCallFromApp) {
      const response = yield call(httpRequester.getDataFromApi, {
        url: endpoints.endpointWithApiDomain(`/call-logs/${callLogId}`),
        params: {},
      });
      if (!response?.error) {
        yield put(
          setDocumentDetail({
            featureId: FEATURE_ID_CALL_LOG_POPOVER,
            documentDetail: callLog,
            documentDetailVisibility: true,
          }),
        );
      }
    }
  } catch (e) {
    console.log('handleEndingCall error: ', e);
  }
}

function* handleUpdateEndCallCauseBusyForCallLog({ payload: { namespace } }) {
  const state = yield select();
  const callInfo = state.stringee[namespace] || {};
  const { callLog = {} } = callInfo;
  const callId = callLog.id;

  if (!callId) {
    return;
  }

  yield put(
    callApi({
      endpoint: endpoints.endpointWithApiDomain(`/call-logs/${callId}`),
      method: 'put',
      params: {
        endCallCause: CALL_END_CAUSE.USER_BUSY,
      },
    }),
  );
}

function* handleAnswerIncomingCall({ payload: { namespace } }) {
  const response = yield new Promise((resolve) => {
    incomingCall?.answer(resolve);
  });

  const { r } = response;
  if (r !== ANSWER_CALL_STATE.SUCCESS) {
    notification.error({
      message: `Lỗi hệ thống(answer - ${getCallStatusLabel(r)}), xin vui lòng liên hệ bộ phận hỗ trợ IT.`,
    });
    return;
  }

  try {
    incomingAudio.pause();
  } catch (e) {
    console.log('incoming pause: ', e);
  }

  yield put(setShowDetailCallRecord(true));
  yield put(setCallInfo({ namespace, answered: true }));
}

function* handleReceiveIncomingCall({ payload: { phoneNumber, userInfo } }) {
  try {
    incomingAudio = new Audio('/assets/audio/incoming.mp3');
    incomingAudio.play();
  } catch (e) {
    console.log('incoming audio: ', e);
  }

  yield put(
    setCallInfo({
      userInfo: userInfo || { fullName: null, tels: [{ tel: phoneNumber }] },
      phoneNumber,
      namespace: CALL_DIRECTION.CALL_IN,
      callState: { code: 1, reason: 'Incoming call' },
    }),
  );
}

const storeCallLog = (stringeeChanel, options) => {
  const { namespace, callLog } = options;
  stringeeChanel.put(setCallInfo({ namespace, callLog }));
};

function* handleMakeCall(stringeeChanel, { payload }) {
  const {
    phoneNumber,
    namespace,
    userInfo,
    currentUser,
    belongToId,
    isCallFromApp,
  } = payload;
  const {
    common: { socket },
    system: { environments },
  } = yield select();
  const {
    private: { fina_number_call_out, fina_number_call_app },
  } = environments;

  try {
    const { stringeeCallOutCreated, phoneNumberCallTo } =
      getStringeeClientCallOut({
        finaNumberCallOut: fina_number_call_out,
        finaNumberCallApp: fina_number_call_app,
        numberCallTo: phoneNumber,
        currentUser: currentUser,
        isCallFromApp,
      });
    stringeeCallOut = stringeeCallOutCreated;
    yield put(
      setCallInfo({
        namespace,
        userInfo: {
          fullName: 'Đang lấy dữ liệu ...',
          tels: [{ tel: phoneNumberCallTo }],
        },
        phoneNumberCallTo,
        isCallFromApp,
      }),
    );
    const callToUser = yield call(
      loadUserByPhoneNumber,
      stringeeChanel,
      phoneNumber,
      userInfo,
    );

    yield put(
      setCallInfo({
        namespace,
        userInfo: callToUser || {
          fullName: null,
          tels: [{ tel: phoneNumberCallTo }],
        },
        phoneNumberCallTo,
      }),
    );

    const options = {
      localVideo: document.getElementById('localVideo[callOut]'),
      remoteVideo: document.getElementById('remoteVideo[callOut]'),
      namespace,
      userInfo: callToUser,
      currentUser,
    };
    SetupCallEvent(stringeeCallOut, stringeeChanel.put, options);

    const callOutResponse = yield new Promise((resolve) => {
      stringeeCallOut.makeCall((res) => {
        resolve(res);
      });
    });
    const { toNumber, callId, message } = callOutResponse;

    console.log('make call response: ' + JSON.stringify(callOutResponse));

    if (message !== 'SUCCESS') {
      notification.error({
        message: `Lỗi hệ thống(${getCallStatusLabel(message)}), xin vui lòng liên hệ bộ phận hỗ trợ IT.`,
      });
      yield put(resetCallData({ namespace }));
      return;
    }

    const currentUserId = currentUser.id;
    if (currentUserId && socket) {
      socket.emit('updateCallStatus', {
        callStatus: CALL_STATUS.BUSY,
        userId: currentUserId,
      });
    }

    stringeeChanel.put(
      createDocument({
        document: {
          toNumber,
          callId,
          videoCall: 0,
          userId: callToUser?.id,
          staffId: currentUserId,
          direction: namespace,
          routerQuery: Router.query,
          belongToId: belongToId,
        },
        callback: (callLog) =>
          storeCallLog(stringeeChanel, { callLog, namespace }),
        nodeName: 'call-logs',
      }),
    );
  } catch (e) {
    console.error(e);
  }
}

function* handleRequestNewToken(stringeeChanel, { payload: { currentUser } }) {
  if (requestingNewToken || !currentUser?.id) {
    return;
  }
  requestingNewToken = true;
  try {
    const result = yield call(httpRequester.getDataFromApi, {
      url: endpoints.endpointWithApiDomain(`/agents/${currentUser.id}/token`),
    });
    if (result?.error) {
      setTimeout(() => {
        stringeeChanel.put(requestNewToken({ currentUser }));
      }, 1000);
    }
    Cookies.set('stringeeToken', result?.stringeeToken);
    Cookies.set('stringeeAgent', JSON.stringify(result?.stringeeAgent));
    Cookies.set('stringeeTokenApi', result?.stringeeTokenApi);
    Cookies.set('stringeeRestApiToken', result?.stringeeRestApiToken);
    stringeeChanel.put(
      connectToStringeeServer({
        stringeeToken: result?.stringeeToken,
        currentUser,
      }),
    );
  } catch (err) {
    console.log('Err handleRequestNewToken: ', err);
  }
  requestingNewToken = false;
}

function* handleMuteCall({ payload: { namespace, muteEnabled } }) {
  const isIncomingCall = namespace === CALL_DIRECTION.CALL_IN;
  console.log('handleMuteCall: ', isIncomingCall);

  if (isIncomingCall) {
    incomingCall?.mute(muteEnabled);
  } else {
    stringeeCallOut?.mute(muteEnabled);
  }

  yield put(setMuteCallState({ namespace, muteState: muteEnabled }));
}

function* handleHoldCall({ payload: { namespace, holdState } }) {
  const isIncomingCall = namespace === CALL_DIRECTION.CALL_IN;

  if (isIncomingCall) {
    holdState ? incomingCall?.hold() : incomingCall?.unhold();
  } else {
    holdState ? stringeeCallOut?.hold() : stringeeCallOut?.unhold();
  }

  yield put(setHoldCallState({ namespace, holdState }));
}

function handleConnectStringee(
  stringeeChanel,
  { payload: { stringeeToken, currentUser, setStringeeToken } },
) {
  if (!global.window) {
    return;
  }
  if (!stringeeToken) {
    stringeeChanel.put(requestNewToken({ currentUser }));
    return;
  }
  console.log('handleConnectStringee========');
  try {
    client = new (window as any).StringeeClient();
    client.connect(stringeeToken);

    client.on('connect', function () {
      setStringeeToken && setStringeeToken(stringeeToken);
      stringeeChanel.put(setConnectingState({ isConnected: true }));
    });
    client.on('authen', function (res: any) {});

    client.on('disconnect', function () {
      console.log('disconnected stringee');
      stringeeChanel.put(setReadyToCall({ readyToCall: false }));
      stringeeChanel.put(setConnectingState({ isConnected: true }));
      // setTimeout(() => client.connect(stringeeToken), 0)
    });

    client.on('otherdeviceauthen', function () {
      console.log('otherdeviceauthen');
    });

    client.on('messagefromtopic', function (req) {
      const message = req?.message || {};
      const { attribute, callEnded, newValue } = message;
      const isCall = attribute === 'call';

      if (isCall && callEnded) {
        console.log('messagefromtopic callEnded', req, callEnded);
        stringeeChanel.put(
          setEndingCall({ namespace: CALL_DIRECTION.CALL_IN }),
        );
      }
      console.log('messagefromtopic', req);
    });

    client.on('custommessage', function (re) {
      console.log('custommessage', re);
    });
    client.on('requestnewtoken', function (res) {
      stringeeChanel.put(requestNewToken({ currentUser }));
    });
    client.on('incomingcall', async (re) => {
      incomingCall = re;
      const token = Cookies.get('stringeeToken');

      console.log('incomingcall event: ', incomingCall);

      const { callId } = incomingCall;
      const options = {
        localVideo: document.getElementById('localVideo[callIn]'),
        remoteVideo: document.getElementById('remoteVideo[callIn]'),
        namespace: CALL_DIRECTION.CALL_IN,
        currentUser,
      };

      SetupCallEvent(incomingCall, stringeeChanel.put, options);

      if (!token) {
        return;
      }

      const callToUser = await loadUserByPhoneNumber(
        stringeeChanel,
        incomingCall.fromNumber,
      );
      stringeeChanel.put(
        receiveIncomingCall({
          phoneNumber: incomingCall.fromNumber,
          userInfo: callToUser,
        }),
      );

      const params: any = {
        filter: {
          where: {
            callId,
            ownerId: currentUser?.id,
          },
        },
      };

      const endpoint = endpoints.endpointWithApiDomain(
        `/call-logs?${FormDataUtils.convertObjectToUri(params)}`,
      );
      stringeeChanel.put(
        callApi({
          endpoint,
          method: 'get',
          params,
          callback: (response: any) => {
            const callLogs = response?.data || [];
            storeCallLog(stringeeChanel, {
              callLog: callLogs[0] || { callId: callId },
              namespace: CALL_DIRECTION.CALL_IN,
            });
          },
        }),
      );
    });
  } catch (e) {
    console.log(e);
  }
}

export function* watchStringeeChannel(stringeeChanel) {
  while (true) {
    const action = yield take(stringeeChanel);
    yield put(action);
  }
}

function* handleConnectAgentCallStatus(
  stringeeChanel,
  { payload: { currentUser } },
) {
  const state = yield select();
  const socket: Socket = state?.common?.socket;
  if (socket?.id && currentUser?.id && socketId !== socket?.id) {
    socket.on(currentUser?.id, (data) => {
      const { callStatus } = data;
      stringeeChanel.put(setConnectingState({ agentCallStatus: callStatus }));
    });
    //socket?.emit('checkCallStatus', {userId: currentUser?.id});
    socketId = socket?.id;
  }
}

function getStringeeClientCallOut({
  finaNumberCallOut,
  finaNumberCallApp,
  numberCallTo,
  currentUser,
  isCallFromApp,
}) {
  let phoneNumberCallTo = getCorrectPhoneNumber(numberCallTo);
  let phoneNumberCallFrom = getCorrectPhoneNumber(finaNumberCallOut);
  const custom = '';
  if (isCallFromApp) {
    phoneNumberCallFrom = getCorrectPhoneNumber(finaNumberCallOut);
    phoneNumberCallTo = getCorrectPhoneNumber(finaNumberCallApp);
  }

  const stringeeCallOutCreated = new (window as any).StringeeCall(
    client,
    phoneNumberCallFrom || '',
    phoneNumberCallTo,
    false,
  );
  stringeeCallOutCreated.custom = custom;
  return {
    stringeeCallOutCreated,
    phoneNumberCallTo,
    phoneNumberCallFrom,
  };
}

function* handleDtmfCallOut({ payload: { valueNumber, callback } }) {
  if (!valueNumber) {
    return;
  }
  yield delay(50);
  stringeeCallOut?.sendDtmf(valueNumber, (result) => {
    callback && callback(result);
  });
}

export const StringeeSagas = function* sagas() {
  const stringeeChanel = yield call(channel);
  yield spawn(watchStringeeChannel, stringeeChanel);
  yield takeLatest(
    connectToStringeeServer,
    handleConnectStringee,
    stringeeChanel,
  );
  yield takeLatest(requestNewToken, handleRequestNewToken, stringeeChanel);
  yield takeLatest(makeCall, handleMakeCall, stringeeChanel);
  yield takeLatest(setEndingCall, handleEndingCall);
  yield takeLatest(receiveIncomingCall, handleReceiveIncomingCall);
  yield takeLatest(answerIncomingCall, handleAnswerIncomingCall);
  yield takeLatest(
    updateEndCallCauseBusyForCallLog,
    handleUpdateEndCallCauseBusyForCallLog,
  );
  yield takeLatest(clientEndCall, handleClientEndCall);
  yield takeLatest(setHoldCall, handleHoldCall);
  yield takeLatest(setMuteCall, handleMuteCall);
  yield takeLatest(
    connectAgentCallStatus,
    handleConnectAgentCallStatus,
    stringeeChanel,
  );
  yield takeLatest(setDtmfCallOut, handleDtmfCallOut);
};
