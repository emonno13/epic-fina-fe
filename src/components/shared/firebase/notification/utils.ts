import firebase from 'firebase/app';
import 'firebase/firebase-messaging';
import { isEmpty } from 'lodash';
import { httpRequester } from '../../../../lib/networks/http';
import { endpoints } from '../../../../lib/networks/endpoints';
import { firebaseConfig } from '../constants';

export const NotificationUtils = {
  requestNotificationPermission: () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  },
  initFirebase: () => {
    if (isEmpty(firebaseConfig)) {
      console.error('Missing firebase configuration');
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  },
  requestPermission: () => {
    if (!window || !('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'granted') {
      return;
    }
    
    if (Notification.permission !== 'denied' && Notification.permission === 'default') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Notification is ready!', {
            body: 'Now, we can send you the notification.',
            icon: '/favicon.ico',
          });
        }
      });
    }
  },
  getToken: async () => {
    try {
      const token = await firebase.messaging().getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      
      return token;
    } catch (e: any) {
      console.log('Get firebase token erorr: ', e.message);
    }
  },
  checkMessagingToken: async (userId: string) => {
    try {
      const token = await firebase.messaging().getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      const url = endpoints.endpointWithApiDomain('/firebase/check-token');
      await httpRequester.putToApi({ url, params: { token, userId, tokenType: 'messaging' } });
    } catch (e: any) {
      console.log('Check messaging token error: ', e.message);      
    }
  },
  getTranslatedNotification: ({ t, notificationData }) => {
    const { code, data } = notificationData;
    return t(code, data);
  },
  onFirebaseCloudMessageListener: (onMessage) => {
    if (typeof window !== 'undefined' && firebase?.messaging?.isSupported()) {
      firebase.messaging().onMessage(onMessage);
    }
  },
  getMessagingToken: async () => {
    if (typeof window !== 'undefined' && firebase?.messaging?.isSupported()) {
      const messaging = firebase.messaging();
      if (!messaging) {
        return;
      }

      try {
        return await messaging.getToken({
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
      } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
        return undefined;
      }
    }
  },
};

NotificationUtils.initFirebase();
