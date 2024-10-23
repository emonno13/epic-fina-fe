import { Steps } from 'antd';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { expiredTimeOtp } from '@components/features/client/fund-certificate/buy-fund-action';
import AuthenticationOtp from '@components/features/client/fund-certificate/buy-fund/authentication-otp';
import SyncAccountWithMio from '@components/features/client/fund-certificate/ekyc/sync-account-with-mio';
import { DateTimeHelper } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { loadMioEKyc } from '@components/features/client/fund-certificate/store';
import { accountAsyncSteps } from './constants';
import { EkycDoneWithVinaCapital } from '../ekyc';

import './account-async.module.scss';
const { Step } = Steps;

const SwitchAccountAsyncBuyStep = ({
  currentStep,
  setPhone,
  phone,
  setCurrentStep,
}) => {
  const dispatch = useDispatch();
  switch (currentStep) {
    case accountAsyncSteps.ENTER_INFORMATION:
      return (
        <SyncAccountWithMio
          callback={() => {
            setCurrentStep(accountAsyncSteps.OTP);
          }}
          setPhone={setPhone}
          header={<></>}
        />
      );
    case accountAsyncSteps.OTP:
      return (
        <AuthenticationOtp
          {...{
            callbackVerifySuccessfully: () => {
              setCurrentStep(accountAsyncSteps.RESULT);
              dispatch(loadMioEKyc());
            },
            endpointVerifyOTP: endpoints.endpointWithApiDomain(
              '/users/verify-otp-sync-account-with-mio',
            ),
            endpointResendOTP: endpoints.endpointWithApiDomain(
              '/users/resend-otp-sync-existing-account-with-mio',
            ),
            getTimeCountdown: () =>
              DateTimeHelper.getDateTimeBySeconds(
                expiredTimeOtp.MIO_SYNC_ACCOUNT,
              ),
            phone,
          }}
        />
      );
    case accountAsyncSteps.RESULT:
      return <EkycDoneWithVinaCapital />;
    default:
      return null;
  }
};

export const AccountAsyncWithVinaCapital = () => {
  const { t } = useHTranslation('admin');
  const [phone, setPhone] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(
    accountAsyncSteps.ENTER_INFORMATION,
  );
  const isMobile = useIsMobile();
  const directionOfStep = useMemo(
    () => (isMobile ? 'vertical' : 'horizontal'),
    [isMobile],
  );

  return (
    <div className={'account-async'}>
      <Steps
        type="navigation"
        direction={directionOfStep}
        current={currentStep}
      >
        <Step title={t('Enter information', { vn: 'Nhập thông tin' })} />
        <Step title={t('OTP validation', { vn: 'Xác thực OTP' })} />
        <Step title={t('Result', { vn: 'Kết quả' })} />
      </Steps>
      <div className="switch-screen">
        <SwitchAccountAsyncBuyStep
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          phone={phone}
          setPhone={setPhone}
        />
      </div>
    </div>
  );
};

export default AccountAsyncWithVinaCapital;
