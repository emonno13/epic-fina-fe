import { Form, PageHeader } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useSetGlobalMessages } from '@schema-form/features/hooks';
import { WelComeToFina } from '../login';
import { mappingBackgroundImageSignUpScreen, useCurrentStep } from './hooks';
import { OtpForm } from './otp-form';
import { PersonalInfo } from './personal-info';
import { PhoneForm } from './phone-form';

import '../pre-login.module.scss';
import './signup.module.scss';

const PreLoginFrame = dynamic(
  () => import('../../common/pre-login-frame/pre-login-frame'),
  { ssr: false },
);

const PreLoginFrameLogo = dynamic(
  () => import('../../common/pre-login-frame/pre-login-frame-logo'),
  { ssr: false },
);

export const STEP_SIGNUP = {
  INPUT_PHONE_EMAIL: 'phone',
  OTP: 'otp',
  CONFIRM_PERSONAL_INFO: 'personalInfo',
  FINISHED: 'end',
};

export const SignupUserForm = ({ layout }) => {
  const { query, push } = useRouter();
  const currentStep = useCurrentStep();
  const isMobile = useIsMobile();
  const [phoneOrEmailForm] = Form.useForm();
  const setGlobalMessages = useSetGlobalMessages();

  const [user, setUser] = useState<any>();

  const currBackgroundImage =
    mappingBackgroundImageSignUpScreen(isMobile)[currentStep];

  const getRefCode = () =>
    query?.refCode || phoneOrEmailForm.getFieldValue('referralCode') || '';

  const handleNextStep = async (stepName: string, user?: any) => {
    if (stepName === STEP_SIGNUP.FINISHED) {
      await push('/users/login');
    }

    if (user && user.id) {
      setUser({
        ...user,
        telOrEmail: user?.emails?.[0]?.email || user?.tels?.[0]?.tel,
      });
      const refCode = getRefCode();
      await push(`/users/signup?userId=${user.id}&refCode=${refCode}`);
    }
  };

  const onMoveToPersonalInfo = async () => {
    const refCode = getRefCode();
    await push(
      `/users/signup?userId=${query.userId}&refCode=${refCode}&finish`,
    );
  };

  useEffect(() => {
    return () =>
      setGlobalMessages({
        error: false,
        errorMessage: '',
        successMessage: '',
      });
  });

  return (
    <PreLoginFrame
      header={<SignUpPageHeader currentStep={currentStep} />}
      footer={<Footer currentStep={currentStep} />}
      leftSidePhoto={currBackgroundImage}
    >
      <div className="pre-login sign-up">
        <div className={'pre-login__logo'}>
          <PreLoginFrameLogo
            extraContent={
              currentStep === STEP_SIGNUP.INPUT_PHONE_EMAIL ? (
                <WelComeToFina />
              ) : (
                <></>
              )
            }
          />
        </div>

        {currentStep === STEP_SIGNUP.INPUT_PHONE_EMAIL && (
          <PhoneForm
            {...{
              layout,
              onGotSuccess: (res) => handleNextStep(STEP_SIGNUP.OTP, res),
              form: phoneOrEmailForm,
            }}
          />
        )}

        {currentStep === STEP_SIGNUP.OTP && (
          <OtpForm
            {...{
              layout,
              hiddenValues: {
                telOrEmail: user?.telOrEmail,
              },
              onGotSuccess: () => onMoveToPersonalInfo(),
            }}
          />
        )}

        {currentStep === STEP_SIGNUP.CONFIRM_PERSONAL_INFO && (
          <PersonalInfo
            {...{
              layout,
              user,
            }}
          />
        )}
      </div>
    </PreLoginFrame>
  );
};

const Footer = ({ currentStep }) => {
  const { t } = useHTranslation('common');

  switch (currentStep) {
    case STEP_SIGNUP.INPUT_PHONE_EMAIL: {
      return (
        <div>
          <span>{t('Have account?', { vn: 'Đã có tài khoản?' })}</span>
          <a href="/users/login">
            {t(' Login now!', { vn: ' Đăng nhập ngay!' })}
          </a>
        </div>
      );
    }
    case STEP_SIGNUP.OTP:
    case STEP_SIGNUP.CONFIRM_PERSONAL_INFO:
    default: {
      return <></>;
    }
  }
};

const SignUpPageHeader = ({ currentStep }) => {
  const isMobile = useIsMobile();
  switch (currentStep) {
    case STEP_SIGNUP.CONFIRM_PERSONAL_INFO:
    case STEP_SIGNUP.OTP: {
      return (
        <PageHeader
          title={<></>}
          onBack={() => window.history.back()}
          style={!isMobile ? { paddingTop: 60, paddingLeft: 54 } : {}}
        />
      );
    }
    default: {
      return <></>;
    }
  }
};
