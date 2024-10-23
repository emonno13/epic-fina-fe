import { useForm } from 'antd/lib/form/Form';
import classnames from 'classnames';

import { useHandleLoginSuccess } from '@lib/hooks/authentication';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { ChangePasswordFormSchema } from './change-password-form-schema';

type ChangePasswordFormProps = {
  layout?: any;
  user: any;
  onSuccess?: (value?: any) => void;
  useDefaultClassName?: boolean;
  className?: string;
};

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const {
    layout,
    user,
    onSuccess,
    useDefaultClassName = true,
    className,
  } = props;
  const { t } = useHTranslation('common');
  const [form] = useForm();
  const { query } = useRouter();
  const isMobile = useIsMobile();
  const handleLoginSuccess = useHandleLoginSuccess();

  const handleRecoverPasswordSuccess = () => {
    const password = form?.getFieldValue('password');
    const username = query.username;

    if (!password || !username) {
      notification.error({
        message: t('Please try again', { vn: 'Vui lòng thử lại' }),
      });
    }

    FormUtils.submitForm(
      { username, password },
      {
        nodeName: 'login',
        method: 'post',
        onGotSuccess: (loginResponse) => {
          handleLoginSuccess({
            loginResponse,
            onGotSuccess: onSuccess,
          });
        },
      },
    );
  };

  return (
    <div
      className={classnames(className, {
        'pre-login__login-form change-password-form forgot-password-form':
          useDefaultClassName,
      })}
    >
      <h2>{t('ENTER NEW PASSWORD', { vn: 'TẠO MẬT KHẨU MỚI' })}</h2>
      <p className="sub-title">
        {t('Please enter new password', { vn: 'Vui lòng nhập mật khẩu mới' })}
      </p>

      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            `/users/${user?.id}/reset-password`,
          ),
          method: 'put',
          onGotSuccess: handleRecoverPasswordSuccess,
          form,
          summitButtonStyleFull: true,
          resetIfSuccess: false,
          submitButtonLabel: t('Create new password', { vn: 'Tạo mật khẩu' }),
          layout: layout || 'vertical',
          schema: ChangePasswordFormSchema,
          useDefaultMessage: true,
        }}
      />
      <style jsx>{`
        h2 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-size: ${isMobile ? 20 : 24}px;
          font-weight: bold;
        }
        .sub-title {
          margin-bottom: 24px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};
