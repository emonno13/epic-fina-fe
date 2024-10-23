import { NOTIFICATION_STATUSES } from '@components/features/fina/notifications/constants';
import { handleLogin } from '@components/shared/user/utils';
import { MESSAGE_TYPE } from '@constants/mobile-app';
import { FormUtils } from '@schema-form/utils/form-utils';

export const MessageUtils = {
  postMessageToWebview: (type, payload = '') => {
    if (!(window as any)?.ReactNativeWebView) return;
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
        payload,
      }),
    );
  },
  getMessageFromWebView: (data: string) => {
    try {
      return JSON.parse(data || '{}');
    } catch (error) {
      return {};
    }
  },
  onMessageTypeLoginData(payload, useAuthObject) {
    const loginValues = JSON.parse(payload || '{}');
    FormUtils.submitForm(loginValues, {
      nodeName: '/login',
      method: 'post',
      showSuccessMessage: false,
      onGotSuccess: (response) => {
        handleLogin({
          response,
          useAuthObject: useAuthObject || {},
        });
      },
    });
  },
  onMessageTypeFirebaseMessage(payload, onFirebaseMessage) {
    try {
      const fireBaseMessage = JSON.parse(payload || '{}');
      const notificationData = JSON.parse(
        fireBaseMessage?.data?.notificationData || '{}',
      );
      onFirebaseMessage({
        ...notificationData,
        status: NOTIFICATION_STATUSES.UNREAD,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.log('onMessageTypeFirebaseMessage error', error);
    }
  },
  handleWebViewMessage: (event, params) => {
    const { useAuthObject = {}, onFirebaseMessage = (f) => f } = params;
    try {
      const { type, payload } = MessageUtils.getMessageFromWebView(event.data);
      if (type === MESSAGE_TYPE.LOGIN_DATA) {
        MessageUtils.onMessageTypeLoginData(payload, useAuthObject);
      }
      if (type === MESSAGE_TYPE.FIREBASE_MESSAGE) {
        MessageUtils.onMessageTypeFirebaseMessage(payload, onFirebaseMessage);
      }
    } catch (error) {
      //
    }
  },
};
