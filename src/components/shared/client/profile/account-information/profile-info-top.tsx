/* eslint-disable @next/next/no-img-element */
import { useFetchUser } from '@components/features/organizations/users/hooks';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser, useRefferalLink } from '@lib/providers/auth';
import { CommentUtils } from '@lib/utils/comment';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Modal } from 'antd';
import { CloseIconLargeSvg, IconCopyProfile, IconShareProfile } from 'icons';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { AvatarDefault } from '../my-network/constant';
import ShareSocialProfile from '../share-social-profile';
import VerifyAccountProfile from '../verify-account';
import ProfileInfoEkyc from './profile-info-ekyc';

import './styles.module.scss';

const ProfileInformationTop = () => {
  const { t } = useHTranslation('common');
  const { t: t_a_c } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isMobile = useIsMobile();
  const [card, setCard] = useState<any>('');
  const refferalLink = useRefferalLink();
  const [isShowEkyc, setIsShowEkyc] = useState(false);

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
  }, []);

  const handleCopyReferralCode = () => {
    CommentUtils.copyToClipboard(refferalLink, t('profile.copiedReferralCode'));
  };

  return (
    <div className="profile-information-top-wrapper">
      {isMobile && <VerifyAccount setIsShowEkyc={setIsShowEkyc} />}

      <div className="profile-information-top">
        <div className="profile-information-top-left">
          <div className="profile-information-top-image">
            <CustomComponentHUploadImage />
          </div>

          <div className="profile-information-top-content">
            {!isMobile && <VerifyAccount setIsShowEkyc={setIsShowEkyc} />}

            <div className="profile-information-top-content-name">
              {currentUser?.fullName}
            </div>

            <div className="profile-information-top-content-code">
              ID: {currentUser?.code}
            </div>

            <div className="profile-information-top-content-type">
              {t_a_c(currentUser.type)}
            </div>
          </div>
        </div>

        <div className="profile-information-top-qr-code">
          {card && <QRCode value={card} size={isMobile ? 44 : 100} />}

          <div className="referral-code">
            {t('profile.referralCode')}: <b>{currentUser?.refCode}</b>
          </div>

          <div className="profile-information-top-qr-code-actions">
            <span
              className="qr-code-action"
              onClick={() => handleCopyReferralCode()}
            >
              <IconCopyProfile />
            </span>
            <span className="qr-code-action">
              <ShareSocialProfile url={refferalLink}>
                <IconShareProfile />
              </ShareSocialProfile>
            </span>
          </div>
        </div>
      </div>

      <Modal
        visible={isShowEkyc}
        className="profile-info-modal profile-info-modal-ekyc"
        width={600}
        footer={null}
        closeIcon={<CloseIconLargeSvg />}
        onCancel={() => setIsShowEkyc(false)}
        destroyOnClose
      >
        <ProfileInfoEkyc setIsShowEkyc={setIsShowEkyc} />
      </Modal>
    </div>
  );
};

export default ProfileInformationTop;

const VerifyAccount = ({ setIsShowEkyc }) => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const user = useFetchUser(currentUser.id);
  const initialValues = {
    ...user,
    fullName: ConverterUtils.getFullNameUser(user),
  };
  const isVerifyAccount = isEmpty(
    initialValues?.identification || currentUser?.identification,
  );

  return (
    <>
      <VerifyAccountProfile user={initialValues} />

      {isVerifyAccount && (
        <div className="profile-information-no-verified-label">
          {t('profile.notVerifiedDesc')}
          <span onClick={() => setIsShowEkyc(true)}>
            {t('profile.verifyNow')}
          </span>
        </div>
      )}
    </>
  );
};

const CustomComponentHUploadImage = (props) => {
  const currentUser: any = useCurrentUser();
  const { setCurrentUser } = useAuth();

  const defaultValue = {
    name: 'Avatar',
    url: currentUser?.avatar || AvatarDefault,
    uid: '-1',
  };

  const handleChangeAvatar = async (file) => {
    if (file) {
      try {
        await FormUtils.submitForm(
          { avatar: file?.url },
          {
            endpoint: endpoints.endpointWithApiDomain(
              `/users/${currentUser.id}`,
            ),
            method: 'put',
            useDefaultMessage: true,
            onGotSuccess: () => {
              const userNew = {
                ...currentUser,
                avatar: file.url ?? currentUser.avatar,
              };
              setCurrentUser(userNew);
              Cookies.set('h2user', JSON.stringify(userNew));
            },
          },
        );
      } catch (e) {
        FormUtils.showFormValidateFailMessage();
      }
    }
  };

  return (
    <div className="profile-information-top-upload">
      <HUploadImage
        {...props}
        onChange={handleChangeAvatar}
        useImageCrop={false}
        width={150}
        height={150}
        value={[defaultValue]}
        buttonUpload={
          <div className="profile-info-edit-btn-upload">
            <img src={AvatarDefault} alt={'fina'} />
            <img
              src={'/assets/images/icon-camera-upload.svg'}
              alt={'fina'}
              className="profile-information-top-upload-icon"
            />
          </div>
        }
      />
      <img
        src={'/assets/images/icon-camera-upload.svg'}
        alt={'fina'}
        className="profile-information-top-upload-icon"
      />
    </div>
  );
};
