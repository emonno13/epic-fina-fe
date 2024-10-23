import { IconCopy, IconShareProfile } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser, useRefferalLink } from '@lib/providers/auth';
import { CommentUtils } from '@lib/utils/comment';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Input } from 'antd';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import ShareSocialProfile from '../share-social-profile';
import VerifyAccountProfile from '../verify-account';

import './styles.module.scss';

const ProfileMyNetworkTopUser = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const refferalLink = useRefferalLink();
  const [card, setCard] = useState<any>('');
  const [initialValues, setInitialValues]: any = useState();

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint(
          `/users/${currentUser?.id}/card`,
        ),
        onGotSuccess: (response) => setCard(response),
      },
    );

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => setInitialValues(response),
      },
    );
  }, []);

  const handleCopyRefLink = () => {
    CommentUtils.copyToClipboard(
      refferalLink,
      t('Successfully copied referral link', {
        vn: 'Đã copy đường dẫn giới thiệu',
      }),
    );
  };

  const handleCopyRefCode = () => {
    CommentUtils.copyToClipboard(
      currentUser?.refCode,
      t('Successfully copied referral code', { vn: 'Đã copy mã giới thiệu' }),
    );
  };

  return (
    <div className="profile-my-network-top-user">
      <div className="profile-my-network-top-user-left">
        <h2 className="profile-my-network-top-user-title">
          {currentUser?.fullName} &nbsp;
          <VerifyAccountProfile user={initialValues} />
        </h2>
        <div className="profile-my-network-top-user-desc">
          {t('profile.referrerLink')}
        </div>
        <Input
          value={refferalLink}
          suffix={
            <IconCopy
              onClick={handleCopyRefLink}
              style={{ cursor: 'pointer' }}
            />
          }
        />
      </div>
      <div className="profile-my-network-top-user-right">
        <div className="profile-my-network-top-user-ref-code">
          <div className="profile-my-network-top-user-desc">
            {t('profile.referrerCode')}:
          </div>
          <Input
            value={currentUser?.refCode}
            suffix={
              <IconCopy
                onClick={handleCopyRefCode}
                style={{ cursor: 'pointer' }}
              />
            }
          />
          <div className="qr-code-action">
            <ShareSocialProfile url={refferalLink}>
              <div className="qr-code-action-share">
                <IconShareProfile style={{ cursor: 'pointer' }} />{' '}
                {t('Share', { vn: 'Chia sẻ' })}
              </div>
            </ShareSocialProfile>
          </div>
        </div>

        <div className="profile-my-network-top-user-qr-code">
          {card && <QRCode value={card} size={96} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileMyNetworkTopUser;
