import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHandleLogout } from '@lib/hooks/authentication';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, notification } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import OtpInput from 'react-otp-input';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { MioCode } from '../constants';
import { useMioEkyc } from '../hooks';

import './buy-fund.module.scss';

interface AuthenticationOtpProp {
  callbackVerifySuccessfully?: (response?: any) => void;
  currentStepKycWithMio?: any;
  endpointVerifyOTP: string;
  endpointResendOTP?: string;
  handleResendOTP?: () => void;
  handleDataReadyToSubmit?: (values?: any) => void;
  getTimeCountdown?: () => number;
  phone?: string;
}

export const handleExpiredTimeOtp = (getTimeCountdown, setCountDown) => {
  const timeCountdown = getTimeCountdown ? getTimeCountdown() : 0;
  const helpText =
    timeCountdown === new Date().getTime() ? (
      'Mã OTP đã hết hạn'
    ) : (
      <div
        style={{
          textAlign: 'center',
          color: '#000',
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        {'Mã OTP sẽ hết hiệu lực trong '}
        <Countdown
          {...{
            value: timeCountdown,
            format: 'mm:ss',
            onFinish: () => {
              setCountDown(
                <div
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    marginTop: '10px',
                  }}
                >
                  Mã OTP đã hết hạn
                </div>,
              );
            },
          }}
        />
      </div>
    );
  timeCountdown && setCountDown(helpText);
};

const AuthenticationOtp = ({
  handleResendOTP,
  endpointVerifyOTP,
  endpointResendOTP,
  handleDataReadyToSubmit,
  callbackVerifySuccessfully,
  getTimeCountdown,
  phone: phoneDefault,
}: AuthenticationOtpProp) => {
  const [form] = Form.useForm();
  const handleLogout = useHandleLogout();
  const [countDown, setCountDown] = useState<ReactNode>(null);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const mioEkyc = useMioEkyc();
  const phone = useMemo(() => mioEkyc?.mioInfo?.phone, [mioEkyc]);
  const { t } = useHTranslation('admin');

  useEffect(() => {
    handleExpiredTimeOtp(getTimeCountdown, setCountDown);
  }, [getTimeCountdown]);

  const handleRequestOTP = () => {
    setLoading(true);
    handleExpiredTimeOtp(getTimeCountdown, setCountDown);
    if (handleResendOTP) {
      handleResendOTP();
      setLoading(false);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpointResendOTP,
        onGotSuccess: () => {
          notification.success({
            message: t('Successfully', { vn: 'Thành công' }),
            description: 'Đã gửi OTP',
          });
          setLoading(false);
        },
        onGotError: () => {
          setLoading(false);
          notification.error({
            message: 'Thất bại',
            description: 'Đã có lỗi xảy ra, vui lòng thử lại',
          });
        },
      },
    );
  };

  const handleSubmitOTP = () => {
    setLoading(true);
    form?.submit();
  };

  const handleGotError = ({ error }) => {
    setLoading(false);
    const code = error?.code;
    if (code === MioCode.SESSION_IS_EXPIRED) {
      handleLogout('/users/login');
    }
  };

  return (
    <div className="authentication-otp-fund">
      <div className="authentication-otp-fund-header">
        <div className="authentication-otp-fund-left">
          <p className="authentication-otp-fund-left-desc">
            Mã OTP đã được gửi qua số điện thoại
          </p>
          <p className="authentication-otp-fund-left-phone">
            {phoneDefault || phone}
          </p>
        </div>
      </div>

      <HForm
        {...{
          endpoint: endpointVerifyOTP,
          method: 'post',
          hideSubmitAndContinueButton: true,
          hideControlButton: true,
          schema: () => [
            createSchemaItem({
              Component: OtpInput,
              name: 'otp',
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mã OTP.',
                },
              ],
              extra: countDown,
              componentProps: {
                containerStyle: { justifyContent: 'center' },
                autoComplete: 'false',
                className: 'otp-form__input-control',
                numInputs: 6,
                onChange: (otp: string) => {
                  if (!otp || otp.length < 6) {
                    setDisabledSubmitBtn(true);
                    return;
                  }

                  setDisabledSubmitBtn(false);
                },
              },
            }),
          ],
          onGotSuccess: (response) => {
            setLoading(false);
            callbackVerifySuccessfully?.(response);
          },
          form,
          onDataReadyToSubmit: (values) => {
            if (handleDataReadyToSubmit) return handleDataReadyToSubmit(values);
            return {
              otpCode: values.otp,
            };
          },
          useDefaultMessage: true,
          onGotError: handleGotError,
        }}
      />

      <div className="authentication-otp-fund-right">
        <span>
          {t('you did not receive the verification code?', {
            vn: 'Không nhận được mã xác thực?',
          })}
          &nbsp;
        </span>
        <span className="resend-otp" onClick={handleRequestOTP}>
          {t('Resend OTP', { vn: 'Gửi lại mã' })}
        </span>
      </div>

      <div className="form-info-fund-action">
        <HButton
          {...{
            className: 'form-info-fund-action-buy w-full',
            type: 'primary',
            size: 'large',
            onClick: handleSubmitOTP,
            disabled: disabledSubmitBtn,
            loading,
          }}
        >
          {t('Confirm', { vn: 'Xác nhận' })}
        </HButton>
      </div>
    </div>
  );
};

export default AuthenticationOtp;
