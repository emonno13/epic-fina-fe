import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { MobileUtils } from '@lib/utils/mobile';
import { HForm } from '@schema-form/h-form';
import { SignUpSuccessComponent } from '../signup-success';
import { PersonalInfoFormSchema } from './personal-info-form-schema';

export const PersonalInfo = ({ layout, user }) => {
  const { t } = useHTranslation('common');
  const { query, push } = useRouter();
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const [visibleSuccessModal, setVisibleSuccessModal] =
    useState<boolean>(false);

  const redirectToLoginScreen = () => {
    setTimeout(() => {
      if (MobileUtils.checkIsWebView()) {
        RouteUtils.redirect('admin/m-dashboard?openLogin=true');
        return;
      }

      push('/users/login');
    }, 4000);
  };

  return (
    <>
      <div className={'pre-login__login-form signup-custom-form'}>
        <h2 className="pre-login--title">
          {t('ACCOUNT SETTINGS', { vn: 'THIẾT LẬP TÀI KHOẢN' })}
        </h2>
        <p className="sub-title">
          <span>
            {t('This important information will help keep your account safe', {
              vn: 'Thông tin quan trọng này sẽ giúp bảo vệ tài khoản của bạn luôn an toàn',
            })}
          </span>
        </p>

        <HForm
          {...{
            endpoint: endpoints.endpointWithApiDomain(
              `/users/${query?.userId}/register-information-user`,
            ),
            method: 'put',
            summitButtonStyleFull: true,
            submitButtonLabel: t('Sign up account', {
              vn: 'Đăng ký tài khoản',
            }),
            hideSubmitAndContinueButton: true,
            layout: layout || 'vertical',
            initialValues: {
              ...user,
            },
            form,
            showSuccessMessage: false,
            schema: PersonalInfoFormSchema,
            onDataReadyToSubmit: (userSaved) => {
              return { ...userSaved, telOrEmail: user?.telOrEmail };
            },
            onGotSuccess: () => {
              setVisibleSuccessModal(true);
              redirectToLoginScreen();
            },
          }}
        />

        <SignUpSuccessComponent
          onCancel={() => setVisibleSuccessModal(true)}
          visible={visibleSuccessModal}
        />
      </div>
      <style jsx>{`
        h2 {
          margin-bottom: 16px;
          margin-top: calc(100vh / 30);
        }
        .sub-title {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          font-size: ${isMobile ? 14 : 16}px;
        }
        .sub-title span {
          max-width: 80%;
          display: block;
        }
      `}</style>
    </>
  );
};
