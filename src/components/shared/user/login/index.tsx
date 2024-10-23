/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Divider, Form } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import GlobalMessage from '@components/shared/global-message';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from '@components/shared/social-button';
import { useHandleLoginSuccess } from '@lib/hooks/authentication';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import {
  useGlobalMessages,
  useSetGlobalMessages,
} from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { RecoverPasswordModal } from '../forgot-password/recover-password-form';
import { LoginSchema } from './login-schema';

import '../pre-login.module.scss';
import './login.module.scss';

const PreLoginFrame = dynamic(
  () => import('../../common/pre-login-frame/pre-login-frame'),
  { ssr: false },
);

const PreLoginFrameLogo = dynamic(
  () => import('../../common/pre-login-frame/pre-login-frame-logo'),
  { ssr: false },
);

interface ILoginForm {
  layout?: any | string;
  showSuccessMessage?: boolean;
  onGotSuccess?: any;
}

const Footer = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  return (
    <div className="login-footer">
      <span>{t('Dont have account?', { vn: 'Chưa có tài khoản?' })}</span>
      <a href="/users/signup">{t(' Sign up now!', { vn: ' Đăng ký ngay!' })}</a>

      <style jsx>{`
        .login-footer {
          font-size: ${isMobile ? 14 : 16}px;
        }
      `}</style>
    </div>
  );
};

export const LoginForm = ({ layout, onGotSuccess }: ILoginForm) => {
  const [form] = Form.useForm();
  const globalMessages = useGlobalMessages();
  const setGlobalMessages = useSetGlobalMessages();
  const { t } = useHTranslation('common');
  const handleLoginSuccess = useHandleLoginSuccess();
  const isMobile = useIsMobile();

  const [visibleForgotPassword, setVisibleForgotPassword] =
    useState<boolean>(false);

  const leftSideBg = isMobile ? 'bg-login-mb.png' : 'bg-login.png';

  return (
    <PreLoginFrame
      className="login-page-wrapper"
      footer={<Footer />}
      leftSidePhoto={leftSideBg}
    >
      <div className="pre-login login-page">
        <div className={'login-page__logo'}>
          <PreLoginFrameLogo extraContent={<WelComeToFina />} />
        </div>
        <div className={'pre-login__login-form'}>
          <GlobalMessage rendering={globalMessages?.error} />
          <h2 className="pre-login--title">
            {t('ACCOUNT LOGIN', { vn: 'ĐĂNG NHẬP TÀI KHOẢN' })}
          </h2>

          <HForm
            {...{
              form,
              method: 'post',
              summitButtonStyleFull: true,
              onDataReadyToSubmit: (data: any) => {
                return {
                  ...data,
                  username: data?.username?.trim() || '',
                };
              },
              layout: layout || 'vertical',
              onGotSuccess: (loginResponse) => {
                handleLoginSuccess({
                  loginResponse,
                  onGotSuccess,
                });
              },
              hideControlButton: true,
              endpoint: endpoints.endpointWithApiDomain('/login'),
              schema: LoginSchema,
              resetIfSuccess: false,
              onGotError: (response) => {
                setGlobalMessages({
                  error: true,
                  errorMessage: response.error?.message,
                });
              },
            }}
          />

          <div className="remember-me-and-forgot-password">
            <Checkbox defaultChecked>
              {t('Remember me', { vn: 'Ghi nhớ tôi' })}
            </Checkbox>
            <a
              onClick={() => setVisibleForgotPassword(true)}
              className="login-form-forgot"
            >
              Quên mật khẩu ?
            </a>
          </div>

          <Button
            type="primary"
            size="large"
            className="w-full"
            onClick={() => form?.submit()}
          >
            {t('Login', { vn: 'Đăng nhập' })}
          </Button>

          <Divider plain className={'pre-login-divider'}>
            {t('Or', { vn: 'Hoặc' })}
          </Divider>

          <SignUpSocialGroup />
        </div>
      </div>

      {visibleForgotPassword && (
        <RecoverPasswordModal
          setVisibleForgotPassword={setVisibleForgotPassword}
          visible={visibleForgotPassword}
        />
      )}
    </PreLoginFrame>
  );
};

export const SignUpSocialGroup = () => {
  return (
    <div className="social-wrapper">
      <FacebookLoginButton />
      <GoogleLoginButton />
      <style jsx>{`
        .social-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
        }
      `}</style>
    </div>
  );
};

export const WelComeToFina = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  return (
    <h2>
      {t('Welcome to FINA', { vn: 'Chào mừng bạn đến với FINA' })}
      <style jsx>{`
        h2 {
          padding: ${isMobile ? '18px 0' : '24px 0'};
          color: #ff6c0e;
          font-size: ${isMobile ? 16 : 24}px;
          font-wight: ${isMobile ? 400 : 600};
          margin-bottom: 0;
        }
      `}</style>
    </h2>
  );
};

export default LoginForm;
