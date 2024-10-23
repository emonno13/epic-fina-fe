import { Button, Modal, notification } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { HModalProps } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useClearGlobalMessage } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { OtpForm } from '../../signup/otp-form';
import { FORGOT_PASSWORD_STEP } from './constans';
import { RecoverPasswordFormSchema } from './recover-password-form-schema';

import './recover-password.module.scss';

export interface RecoverPasswordFormProps {
  layout?: any;
  onGotSuccess?: (value?: any) => void;
  onGotError?: (value?: any) => void;
  form?: FormInstance;
}

export const RecoverPasswordForm: FC<RecoverPasswordFormProps> = (props) => {
  const { layout, onGotSuccess, onGotError, form } = props;

  const { t } = useHTranslation('common');

  return (
    <div className={'pre-login__login-form forgot-password-form pre-login'}>
      <h2>{t('Forgot password', { vn: 'Quên mật khẩu' })}</h2>

      <p className={'forgot-password-page__sub-heading'}>
        {t('Please enter your Email/ Phone number', {
          vn: 'Vui lòng nhập Email đăng ký tài khoản của bạn',
        })}
      </p>

      <HForm
        {...{
          form,
          endpoint: endpoints.endpointWithApiDomain('/users/recover-password'),
          method: 'post',
          onGotSuccess,
          onGotError,
          layout: layout || 'vertical',
          schema: RecoverPasswordFormSchema,
          useDefaultMessage: true,
          hideControlButton: true,
        }}
      />
    </div>
  );
};

export interface RecoverPasswordModal extends HModalProps {
  onGotSuccess?: (value?: any) => void;
  onGotError?: (value?: any) => void;
  setVisibleForgotPassword?: (value: boolean) => void;
}

export const RecoverPasswordModal: FC<RecoverPasswordModal> = (props) => {
  const {
    onGotSuccess,
    onGotError,
    setVisibleForgotPassword,
    className,
    ...modalProps
  } = props;

  const { t } = useHTranslation('common');
  const [form] = useForm();
  const { push } = useRouter();
  const clearGlobalMessage = useClearGlobalMessage();

  const [step, setStep] = useState<string>(FORGOT_PASSWORD_STEP.USERNAME);
  const [userResponse, setUserResponse] = useState<any>({});

  const directToForgotPassword = (response) => {
    const userId = response.userId;
    const username = response.telOrEmail;

    if (!userId || !username) {
      notification.error({
        message: t('Please try again', { vn: 'Vui lòng thử lại' }),
      });
      return;
    }

    push(`/users/forgot-password?userId=${userId}&username=${username}`);
  };

  const handleGotError = (response) => {
    onGotError?.(response);
  };

  const handleGotSuccess = (response) => {
    if (onGotSuccess) {
      onGotSuccess(response);
      return;
    }

    setUserResponse(response);
    setStep(FORGOT_PASSWORD_STEP.OTP);
  };

  useEffect(() => {
    return () => {
      clearGlobalMessage();
    };
  }, []);

  return (
    <Modal
      {...modalProps}
      className={cn('recover-password-modal', className)}
      title={<></>}
      footer={<></>}
      onCancel={() => setVisibleForgotPassword?.(false)}
      destroyOnClose
    >
      {step === FORGOT_PASSWORD_STEP.USERNAME && (
        <>
          <RecoverPasswordForm
            {...{
              form,
              onGotError: handleGotError,
              onGotSuccess: handleGotSuccess,
            }}
          />

          <div className="group-action-btn w-full">
            <Button
              onClick={() => setVisibleForgotPassword?.(false)}
              className="cancel"
              size="large"
            >
              {t('Cancel', { vn: 'Hủy bỏ' })}
            </Button>
            <Button
              onClick={() => form?.submit()}
              className="continue"
              size="large"
              type="primary"
            >
              {t('Continue', { vn: 'Tiếp tục' })}
            </Button>
          </div>
        </>
      )}

      {step === FORGOT_PASSWORD_STEP.OTP && (
        <OtpForm
          {...{
            hiddenValues: { telOrEmail: userResponse?.telOrEmail },
            onGotSuccess: () => directToForgotPassword(userResponse),
            endpoint: endpoints.endpointWithApiDomain(
              `/otp/verify/${userResponse?.userId}`,
            ),
          }}
        />
      )}
    </Modal>
  );
};
