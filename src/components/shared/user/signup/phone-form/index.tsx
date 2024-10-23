import { Alert } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { PhoneFormSchema } from './phone-form-schema';

export const PhoneForm = ({ layout, onGotSuccess = (f) => f, form }) => {
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState(false);
  const [userRes, setUserRes] = useState(null);
  const { push } = useRouter();

  const clickContinue = (user) => {
    onGotSuccess(user);
  };

  const clickCancel = async () => {
    await push('/users/login');
  };

  const Description = () => (
    <span>
      {t('The system already has information about your account.', {
        vn: 'Trên hệ thống đã có thông tin về tài khoản của bạn.',
      })}
      {t(' You can choose', { vn: ' Bạn có thể chọn' })}
      <span onClick={() => clickContinue(userRes)} className={'continute'}>
        {' '}
        {t('Continue', { vn: 'Tiếp Tục' })}{' '}
      </span>{' '}
      {t('to register an account or choose', {
        vn: 'để đăng ký tài khoản hoặc chọn',
      })}
      <span onClick={clickCancel} className={'cancel'}>
        {' '}
        {t('Cancel', { vn: 'Hủy Bỏ' })}{' '}
      </span>{' '}
      {t('contact sales for more information.', {
        vn: 'để liên hệ sale để biết thêm thông tin.',
      })}
    </span>
  );

  return (
    <div className={'pre-login__login-form signup-custom-form'}>
      {visible && (
        <Alert
          className={'pre-login__information-acc'}
          message={<h3>{t('Notification', { vn: 'Thông báo' })}</h3>}
          description={<Description />}
          type="info"
          closable
        />
      )}

      <h2 className="pre-login--title">
        {t('SIGN UP A ACCOUNT', { vn: 'ĐĂNG KÝ TÀI KHOẢN' })}
      </h2>

      <HForm
        {...{
          form,
          endpoint: endpoints.endpointWithApiDomain(
            '/signup-by-phone-or-email',
          ),
          method: 'post',
          summitButtonStyleFull: true,
          submitButtonLabel: t('Continue', { vn: 'Tiếp tục' }),
          hideSubmitAndContinueButton: true,
          hideControlButton: visible,
          layout: layout || 'vertical',
          resetIfSuccess: false,
          onGotSuccess: (res) => {
            if (res.status === 409) {
              setVisible(true);
              setUserRes(res.user);
              return;
            }
            onGotSuccess(res.user);
          },
          schema: PhoneFormSchema,
          useDefaultMessage: true,
        }}
      />
    </div>
  );
};
