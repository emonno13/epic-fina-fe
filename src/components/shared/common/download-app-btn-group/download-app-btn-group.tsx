import { AppStoreIcon, ChPlayIcon } from 'icons';

export const DOWNLOAD_APP_URL = {
  android: 'https://play.google.com/store/apps/details?id=com.fina.mobile',
  ios: 'https://apps.apple.com/vn/app/fina-tulip-financial-services/id1538117309',
};

const DownloadAppBtnGroup = () => {
  return <div className="download-btn-group">
    <a
      {...{
        target: '_blank',
        rel: 'noopener',
        href: DOWNLOAD_APP_URL.ios,
      }}
    >
      <AppStoreIcon />
    </a>
    <a
      {...{
        target: '_blank',
        rel: 'noopener',
        href: DOWNLOAD_APP_URL.android,
      }}
    >
      <ChPlayIcon />
    </a>
  </div>;
};

export default DownloadAppBtnGroup;
