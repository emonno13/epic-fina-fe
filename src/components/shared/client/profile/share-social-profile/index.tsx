/* eslint-disable @next/next/inline-script-id */
import { Popover } from 'antd';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { IconEmailShare, IconFacebookShare, IconLinkedInShare } from '../../news-detail';

const ShareSocialProfile = ({ url, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const zaloSocialSDK = window?.ZaloSocialSDK;

    if (zaloSocialSDK) zaloSocialSDK.reload();
  }, [visible]);

  // @ts-ignore
  window.callbackSuccess = () => setVisible(false);

  return (
    <Popover content={
      <div className="profile-info-share">
        <span className="profile-info-share-item">
          <FacebookShareButton {...{ url }}>
            <IconFacebookShare />
          </FacebookShareButton>
        </span>
        <span className="profile-info-share-item">
          <LinkedinShareButton {...{ url }}>
            <IconLinkedInShare />
          </LinkedinShareButton>
        </span>
        <span className="profile-info-share-item">
          <EmailShareButton {...{ url }}>
            <IconEmailShare />
          </EmailShareButton>
        </span>
        <span className="profile-info-share-item">
          <div
            className="zalo-share-button"
            data-href={url}
            data-oaid={process.env.NEXT_PUBLIC_DATA_OAID}
            data-layout="2"
            data-color="blue"
            data-customize="false"
            data-callback="callbackSuccess"
          />
          <Script type="text/javascript" src="https://sp.zalo.me/plugins/sdk.js" />
        </span>
      </div>
    }
    trigger="click"
    visible={visible}
    >
      <span onClick={() => setVisible(!visible)}>{children}</span>
    </Popover>
  );
};

export default ShareSocialProfile;
