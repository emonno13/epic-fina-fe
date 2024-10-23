import { requestNewToken, setConnectingState, setReadyToCall } from '../actions';
const window: any = global.window || {};
window.stringeeClientInstance = undefined;

export const getCurrentStringeeClient = () => {
  return window.stringeeClientInstance;
};
export const disconnectFromStringee = () => {
  return window.stringeeClientInstance?.disconnect();
};

export const SetupStringeeClient = (dispatch, options) => {
  if (window.stringeeClientInstance) {
    return window.stringeeClientInstance;
  }
  const {
    stringeeToken,
    stringeeAgent,
    setStringeeToken,
  } = options;
  if (!stringeeToken) {
    return undefined;
  }
  window.stringeeClientInstance = new (window as any).StringeeClient();
  window.stringeeClientInstance.connect(stringeeToken);
  window.stringeeClientInstance.on('connect', function () {
    dispatch(setConnectingState({ isConnected: true }));
  });
  window.stringeeClientInstance.on('authen', function (res: any) {
    console.log(res);
    dispatch(setReadyToCall({ readyToCall: true }));
    // var call = new (window as any).StringeeCall(client, "84866890696", "84966298666", false);
    // SetupCallEvent(call);

    // call.makeCall(function (res) {
    //   console.log('make call callback: ' + JSON.stringify(res));
    // });

  });
  window.stringeeClientInstance.on('disconnect', function () {
    dispatch(setReadyToCall({ readyToCall: false }));
  });

  window.stringeeClientInstance.on('otherdeviceauthen', function () {
    console.log('otherdeviceauthen');
  });

  window.stringeeClientInstance.on('requestnewtoken', function () {
    const stringeeUserId = (stringeeAgent as any)?.stringeeUserId;
    if (!stringeeUserId) {
      return;
    }
    dispatch(requestNewToken({ stringeeUserId, setStringeeToken }));
  });
  return window.stringeeClientInstance;
};
