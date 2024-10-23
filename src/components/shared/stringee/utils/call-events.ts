import Cookies from 'js-cookie';

import {
  clientEndCall, setCallInfo,
  setCallState,
  updateEndCallCauseBusyForCallLog,
} from '../actions';
import { CALL_DIRECTION, SIGNALING_STATE } from '../constant';
import { setShowDetailCallRecord } from '../../../features/business/dial/actions';

export const SetupCallEvent = (callInstance, dispatch, options: any = {}) => {
  const {
    localVideo,
    remoteVideo,
    namespace,
    currentUser,
  } = options;
  const token = Cookies.get('stringeeToken');

  callInstance.on('error', info => {
    console.log(`on error: ${JSON.stringify(info)}`);
  });

  callInstance.on('addlocalstream', (stream) => {
    console.log('on addlocalstream', stream);
    if (!token) {
      return;
    }

    localVideo.srcObject = null;
    localVideo.srcObject = stream;
  });

  callInstance.on('addremotestream', (stream) => {
    console.log('on addremotestream', stream);
    if (!token) {
      return;
    }

    remoteVideo.srcObject = null;
    remoteVideo.srcObject = stream;
  });

  callInstance.on('signalingstate', (callState) => {
    console.log('signalingstate: ', callState, namespace);
    const codeStateCode = callState.code;

    dispatch(setCallState({ callState, namespace }));

    if (codeStateCode === SIGNALING_STATE.CALL_ANSWER_CODE && namespace === CALL_DIRECTION.CALL_OUT) {
      dispatch(setShowDetailCallRecord(true));
      dispatch(setCallInfo({ namespace, answered: true }));
    }

    const isEndSign = [SIGNALING_STATE.CALL_BUSY_CODE, SIGNALING_STATE.CALL_ENDED_CODE].includes(codeStateCode);
    if (isEndSign) {
      setTimeout(() => {
        dispatch(clientEndCall({ namespace, currentUser }));

        if (codeStateCode === SIGNALING_STATE.CALL_BUSY_CODE) {
          dispatch(updateEndCallCauseBusyForCallLog({ namespace }));
        }
      }, 300);
    }
  });

  callInstance.on('mediastate', state => {
    console.log('mediastate ', state);
  });

  callInstance.on('info', info => {
    console.log('on info', info);
  });
};
