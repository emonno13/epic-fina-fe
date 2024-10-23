import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHandleLogout } from '@lib/hooks/authentication';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, notification } from 'antd';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'underscore';
import { MioCode } from '../constants';
import { useMioEkyc } from '../hooks';
import { verifyOtpBuyFund } from '../store';
import { handleExpiredTimeOtp } from './authentication-otp';

interface AuthenticationOtpProp {
  callbackVerifySuccessfully?: (response?: any) => void;
  currentStepKycWithMio?: any;
  transactionDaftId?: string;
  getTimeCountdown?: () => number;
}

const AuthenticationOtpWithBuy = ({
  callbackVerifySuccessfully,
  transactionDaftId,
  getTimeCountdown,
}: AuthenticationOtpProp) => {
  const [form] = Form.useForm();
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();
  const [countDown, setCountDown] = useState<ReactNode>(null);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState<boolean>(true);
  const [loadingConfirmOtp, setLoadingConfirmOtp] = useState<boolean>(false);

  const dispatch = useDispatch();
  const mioEkyc = useMioEkyc();
  const mioInfo = useMemo(() => mioEkyc?.mioInfo ?? {}, [mioEkyc]);

  useEffect(() => {
    handleExpiredTimeOtp(getTimeCountdown, setCountDown);
  }, [getTimeCountdown]);

  const handleRequestOTP = () => {
    handleExpiredTimeOtp(getTimeCountdown, setCountDown);
    FormUtils.submitForm(
      {},
      {
        method: 'post',
        endpoint: endpoints.endpointWithApiDomain(
          '/transactions-partner-logs/resend-otp-buy-fund',
        ),
        onDataReadyToSubmit: () => ({
          transactionId: transactionDaftId,
        }),
        onGotSuccess: () => {
          notification.success({
            message: 'Thành công',
            description: 'Đã gửi OTP',
          });
        },
      },
    );
  };

  const handleSubmitOTP = async () => {
    setLoadingConfirmOtp(true);
    try {
      const values = await form?.validateFields();
      dispatch(
        verifyOtpBuyFund({
          params: {
            otpCode: values.otp,
            transactionId: transactionDaftId,
          },
          callback: (response) => {
            setLoadingConfirmOtp(false);
            const errorObj = response?.error;
            if (!isEmpty(errorObj)) {
              notification.error({
                message: errorObj?.name,
                description: errorObj?.message,
              });
              handleGotError(errorObj);
              return;
            }

            callbackVerifySuccessfully?.(response);
          },
          currentUser,
        }),
      );
    } catch (err) {
      setLoadingConfirmOtp(false);
      FormUtils.showFormValidateFailMessage();
    }
  };

  const handleGotError = ({ error }) => {
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
          <p className="authentication-otp-fund-left-phone">{mioInfo?.phone}</p>
        </div>
      </div>

      <HForm
        {...{
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
                isInputNum: true,
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
          form,
        }}
      />
      <p className="authentication-otp-fund-right">
        Không nhận được mã xác thực?
        <Button
          onClick={handleRequestOTP}
          className="authentication-otp-fund-button"
        >
          <span>Gửi lại mã</span>
        </Button>
      </p>

      <div className="form-info-fund-action">
        <HButton
          {...{
            className: 'form-info-fund-action-buy',
            type: 'primary',
            size: 'large',
            onClick: handleSubmitOTP,
            disabled: disabledSubmitBtn,
            loading: loadingConfirmOtp,
          }}
        >
          Xác nhận
        </HButton>
      </div>
    </div>
  );
};

export default AuthenticationOtpWithBuy;
