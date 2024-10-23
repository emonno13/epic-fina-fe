import { message } from 'antd';

export const regexAppVersion = /^[0-9]+((\.)[0-9]+){0,2}$/;

export const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=com.fina.mobile';
export const APP_STORE_LINK = 'https://apps.apple.com/vn/app/fina-tulip-financial-services/id1538117309';

export const MobileUtils = {
  getUserAgentData: () => {
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      const userAgent = window.navigator.userAgent;
      return JSON.parse(userAgent);
    } catch (error) {
      return {};
    }
  },
  checkIsWebView: () => {
    // return true; // !! dev mode only
    const userAgentData = MobileUtils.getUserAgentData();
    return (
      userAgentData?.mobileUserAgent ===
			process?.env?.NEXT_PUBLIC_MOBILE_APP_USER_AGENT
    );
  },
  getAppVersion: () => {
    const userAgentData = MobileUtils.getUserAgentData();
    return userAgentData?.appVersion || '0.0.0';
  },
  getAppOS: () => {
    const userAgentData = MobileUtils.getUserAgentData();
    return userAgentData.os || '';
  },
  checkIsGreaterVersion: (validVersion: string) => {
    const appVersion = MobileUtils.getAppVersion();
    if (
      !regexAppVersion.test(validVersion) ||
			!regexAppVersion.test(appVersion)
    ) {
      return false;
    }
    const appVersionNumber = MobileUtils.getMobileVersionNumber(appVersion);
    const validVersionNumber = MobileUtils.getMobileVersionNumber(validVersion);
    return appVersionNumber > validVersionNumber;
  },
  checkIsLesserVersion: (validVersion: string) => {
    const appVersion = MobileUtils.getAppVersion();
    if (
      !regexAppVersion.test(validVersion) ||
			!regexAppVersion.test(appVersion)
    ) {
      return false;
    }
    const appVersionNumber = MobileUtils.getMobileVersionNumber(appVersion);
    const validVersionNumber = MobileUtils.getMobileVersionNumber(validVersion);
    return appVersionNumber < validVersionNumber;
  },
  checkIsEqualVersion: (checkVersion: string) => {
    const appVersion = MobileUtils.getAppVersion();
    return appVersion === checkVersion;
  },
  checkIsEqualOrLesserVersion: (validVersion: string) => {
    return (
      MobileUtils.checkIsEqualVersion(validVersion) ||
			MobileUtils.checkIsLesserVersion(validVersion)
    );
  },
  checkDisplayInsurances: () => {
    const showInsurancesAppVersion =
			process.env.NEXT_PUBLIC_SHOW_INSURANCES_APP_VERSION || '0.0';
    return MobileUtils.checkIsEqualOrLesserVersion(showInsurancesAppVersion);
  },
  getMobileVersionNumber: (version: string) => {
    if (!regexAppVersion.test(version)) {
      return 0;
    }
    const maxLength = 3;
    const splitVersion = version.split('.');
    const splitVersionLength = splitVersion.length;
    if (splitVersionLength < maxLength) {
      for (let i = 0; i < maxLength - splitVersionLength; i++) {
        splitVersion.push('0');
      }
    }
    return splitVersion.reduce(
      (acc, num, index) =>
        acc + Number(num) * Math.pow(10, maxLength - index - 1),
      0,
    );
  },
  getLatestAppVersion: () => {
    return process.env.NEXT_PUBLIC_LATEST_APP_VERSION || '0.0.0';
  },
  openLinkAppAndroid: () => {
    window.open(GOOGLE_PLAY_LINK);
  },
  openLinkAppIos: () => {
    window.open(APP_STORE_LINK);
  },
  openGetUpdateNotification: (t) => {
    const latestVersion = MobileUtils.getLatestAppVersion();
    if (
      !MobileUtils.checkIsGreaterVersion(latestVersion) &&
			!MobileUtils.checkIsEqualVersion(latestVersion)
    ) {
      const key = `open${Date.now()}`;
      const onMessageClick = () => {
        const appOS = MobileUtils.getAppOS();
        if (appOS === 'android') MobileUtils.openLinkAppAndroid();
        if (appOS === 'ios') MobileUtils.openLinkAppIos();
        message.destroy(key);
      };
      message.info({
        duration: 0,
        key,
        content: t('Update noti content', {
          en:
						'Old app warning, please go to the store to update to the latest version',
          vn:
						'Cảnh báo app cũ, xin vui lòng lên store để update lên version mới nhất',
        }),
        onClick: onMessageClick,
      });
    }
  },
  removeFbElement: () => {
    const fbElem = document.getElementById('fb-root');
    const fbCustomerChatElem = document.getElementById('fb-customer-chat');
    const fbScriptElem = document.getElementById('fb-script');
    const fbJssdkElem = document.getElementById('facebook-jssdk');
    
    if (fbElem) {
      fbElem.remove();
    }
    if (fbCustomerChatElem) {
      fbCustomerChatElem.remove();
    }
    if (fbScriptElem) {
      fbScriptElem.remove();
    }
    if (fbJssdkElem) {
      fbJssdkElem.remove();
    }
  },
};
