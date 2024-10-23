import { Modal } from 'antd';
import Statistic from 'antd/lib/statistic';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OtpFormSchema } from '@components/shared/user/signup/otp-form/otp-form-schema';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';

import '../../../../shared/user/signup/otp-form/otp-form.module.scss';

const Countdown = Statistic.Countdown;

export const OtpFormModal = ({
  type,
  telOrEmail,
  showModalOtp,
  onGotSuccess,
  handleCancel,
  className = '',
}) => {
  const { t } = useTranslation('common');
  const currentUser = useCurrentUser();
  const handleRequestOTP = async () => {
    await FormUtils.submitForm(
      { telOrEmail, userId: currentUser?.id },
      {
        nodeName: 'otp/send-otp',
        method: 'post',
      },
    );
    setTimeDefault(Date.now() + 1000 * 60 * 5);
  };
  const [timeDefault, setTimeDefault] = useState(Date.now() + 1000 * 60 * 5);
  return (
    <Modal
      destroyOnClose={true}
      visible={showModalOtp}
      width={'60%'}
      footer={false}
      onCancel={handleCancel}
    >
      <div className={`pre-login__login-form signup-custom-form ${className}`}>
        <p>{t('Nhập mã xác thực được gửi tới')}</p>
        <p>
          {type} <b>{telOrEmail}</b>
        </p>
        <p>
          <a href="javascript:void(0)">
            <Countdown value={timeDefault} format="m phút s giây" />
          </a>
        </p>
        <HForm
          {...{
            endpoint: endpoints.endpointWithApiDomain(
              `/otp/verify/${currentUser.id}`,
            ),
            method: 'post',
            summitButtonStyleFull: true,
            submitButtonLabel: t('Xác thực'),
            hideSubmitAndContinueButton: true,
            layout: 'vertical',
            showSuccessMessage: false,
            onGotSuccess,
            schema: () => OtpFormSchema({ handleRequestOTP }),
          }}
        />
      </div>
    </Modal>
  );
};
