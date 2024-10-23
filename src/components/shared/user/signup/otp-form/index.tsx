import { Button, Form, notification } from 'antd';
import Statistic from 'antd/lib/statistic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useClearGlobalMessage } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { OtpFormSchema } from './otp-form-schema';

import './otp-form.module.scss';

const Countdown = Statistic.Countdown;

export const OtpForm = ({
  layout = undefined,
  onGotSuccess = (f) => f,
  ...props
}) => {
  const { endpoint, hiddenValues } = props;
  const { query, pathname } = useRouter();
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const clearGlobalMessage = useClearGlobalMessage();

  const [timeDefault, setTimeDefault] = useState(Date.now() + 1000 * 60 * 5);

  const username = useMemo(
    () => hiddenValues?.telOrEmail || '',
    [hiddenValues],
  );
  const nodeName = useMemo(() => {
    if (pathname.includes('signup')) return 'users/send-otp';
    return 'users/recover-password';
  }, [pathname]);

  const handleRequestOTP = async () => {
    form.resetFields();
    await FormUtils.submitForm(
      { telOrEmail: username },
      {
        nodeName: nodeName,
        method: 'post',
        onGotSuccess: () => {
          notification.success({
            message: t('Resend OTP successfully', {
              vn: 'Đã gửi OTP thành công',
            }),
          });
        },
        onGotError: (response) => {
          notification.error(
            response?.error?.message ||
              t('Please try again', { vn: 'Có lỗi xảy ra, vui lòng thử lại' }),
          );
        },
      },
    );
    setTimeDefault(Date.now() + 1000 * 60 * 5);
  };

  useEffect(() => {
    return () => {
      clearGlobalMessage();
    };
  }, []);

  return (
    <>
      <div className={'pre-login__login-form signup-otp'}>
        <h2 className="pre-login--title">
          {t('Verify OTP', { vn: 'Xác thực OTP' })}
        </h2>

        <div className="sub-title">
          <p>
            {t('Please enter the OTP code sent to your phone number (email)', {
              vn: 'Vui lòng nhập mã OTP được gửi về số điện thoại (email)',
            })}
          </p>
          <p className="pre-login_username">
            {username.replace(username.slice(4, 7), '***')}
          </p>
          <p className="count-down">
            {t('Code is valid within', { vn: 'Mã có hiệu lực trong vòng' })}
            <a href="javascript:void(0)">
              <Countdown value={timeDefault} format="mm:ss" />
            </a>
            <span>{'s'}</span>
          </p>
        </div>

        <HForm
          {...{
            endpoint:
              endpoint ||
              endpoints.endpointWithApiDomain(
                `/signup/${query?.userId}/verify-otp`,
              ),
            method: 'post',
            summitButtonStyleFull: true,
            hideControlButton: true,
            hideSubmitAndContinueButton: true,
            layout: layout || 'vertical',
            onGotSuccess,
            hiddenValues,
            showSuccessMessage: false,
            schema: (props) => OtpFormSchema({ ...props, showResend: false }),
            onGotError: ({ error }) =>
              notification.error({
                message: t('Failure', { vn: 'Thất bại' }),
                description:
                  error?.message ||
                  t('An error occurred, please resend.', {
                    vn: 'Có lỗi xảy ra, quý khách vui lòng gửi lại.',
                  }),
              }),
            form,
          }}
        />

        <Button
          onClick={() => form?.submit()}
          size="large"
          type="primary"
          className="w-full"
        >
          {t('Confirm', { vn: 'Xác thực' })}
        </Button>

        <div className="resend-wrapper">
          <span>
            {t('Code not received yet?', { vn: 'Chưa nhận được mã?' })}
          </span>
          <a className="resend" onClick={handleRequestOTP}>
            {t(' Resend!', { vn: ' Gửi lại' })}
          </a>
        </div>
      </div>
    </>
  );
};
