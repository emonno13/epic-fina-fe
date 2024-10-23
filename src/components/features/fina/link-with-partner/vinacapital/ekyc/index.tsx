import { EnterOutlined } from '@ant-design/icons';
import { expiredTimeOtp } from '@components/features/client/fund-certificate/buy-fund-action';
import AuthenticationOtp from '@components/features/client/fund-certificate/buy-fund/authentication-otp';
import FundCertificateESignature from '@components/features/client/fund-certificate/ekyc/fund-certificate-e-signature';
import SyncAccountWithMio from '@components/features/client/fund-certificate/ekyc/sync-account-with-mio';
import { useMioEkyc } from '@components/features/client/fund-certificate/hooks';
import { KYC } from '@components/features/profiles/kyc';
import { DateTimeHelper } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, Modal, Steps } from 'antd';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { vinaCapitalTabPaneKeys } from '../../constants';
import { VinaCapitalManagementContext } from '../context/context';
import { NotificationNeedSyncOrEkycLayoutContext } from '../notification-need-sync-or-ekyc';

import './ekyc.module.scss';

const { Step } = Steps;

export const eKycSteps = {
  ENTER_INFORMATION: 0,
  SIGNATURE: 1,
};

export const StepsAntdStatus: any = {
  FINISH: 'finish',
  PROCESS: 'process',
  WAIT: 'wait',
};

const SwitchCaseEkycSteps = ({ currentStep, setCurrentStep, mioInfo = {} }) => {
  const { t } = useHTranslation('admin');
  const { setTabActive } = useContext(VinaCapitalManagementContext);
  const { investmentNumber } = useContext(
    NotificationNeedSyncOrEkycLayoutContext,
  );

  const handleKycGotError = ({ error }) => {
    const { message } = error;
    Modal.confirm({
      title: t('Information exists', { vn: 'Thông tin đã tồn tại' }),
      content: (
        <div>
          {message}
          <hr />
          <span style={{ fontSize: '13px', fontStyle: 'italic' }}>
            {t(
              "If you already have an account on VinaCapital system, you can synchronize with FINA's account.",
              {
                vn: 'Nếu Quý khách đã có tài khoản (Đã thực hiện E-KYC) trên hệ thống VinaCapital, Quý khách có thể đồng bộ với tài khoản của FINA.',
              },
            )}
          </span>
        </div>
      ),
      okText: (
        <a
          onClick={() => {
            setTabActive(vinaCapitalTabPaneKeys.ACCOUNT_SYNC);
          }}
        >
          {t('Sync account', { vn: 'Đồng bộ tài khoản' })}
        </a>
      ),
      cancelText: t('Cancel', { vn: 'Huỷ bỏ' }),
    });
  };

  switch (currentStep) {
    case eKycSteps.ENTER_INFORMATION:
      return (
        <KYC
          disableField={!!investmentNumber}
          mioInfo={mioInfo}
          header={null}
          callbackWhenKycSuccessfully={() =>
            setCurrentStep(eKycSteps.SIGNATURE)
          }
          handleKycGotError={handleKycGotError}
        />
      );
    case eKycSteps.SIGNATURE:
      return (
        <div className={'account-sync-with-vina-capital'}>
          <SignatureWithVinaCapital />
        </div>
      );
    default:
      return null;
  }
};

export const EkycWithVinaCapital = ({
  mioInfo: defaultMioInfo,
}: {
  mioInfo?: any;
}) => {
  const mioEkyc = useMioEkyc();
  const mioInfo = defaultMioInfo || {
    ...(mioEkyc?.mioInfo || {}),
    ...(mioEkyc?.finaInfo || {}),
  };

  const { t } = useHTranslation('admin');
  const [currentStep, setCurrentStep] = useState<number>(
    eKycSteps.ENTER_INFORMATION,
  );
  const { investmentNumber, contractFileUrlMio } = useContext(
    NotificationNeedSyncOrEkycLayoutContext,
  );

  const isMobile = useIsMobile();
  const directionOfStep = useMemo(
    () => (isMobile ? 'vertical' : 'horizontal'),
    [isMobile],
  );

  const statusOfEkycStep = investmentNumber
    ? StepsAntdStatus.FINISH
    : StepsAntdStatus.PROCESS;
  const statusOfSignatureStep = investmentNumber
    ? contractFileUrlMio
      ? StepsAntdStatus.FINISH
      : StepsAntdStatus.PROCESS
    : StepsAntdStatus.WAIT;

  const descriptionEkyc =
    statusOfEkycStep === StepsAntdStatus.PROCESS
      ? t('Enter E-KYC information', { vn: 'Nhập thông tin để E-KYC' })
      : t('You have E-KYC, move to the next step to sign the contract', {
          vn: 'Đã E-KYC, sang bước tiếp theo để kí hợp đồng',
        });

  const descriptionSignature = (() => {
    switch (statusOfSignatureStep) {
      case StepsAntdStatus.FINISH:
        return t('You have signed a contract', {
          vn: 'Quý khách đã ký hợp đồng',
        });
      case StepsAntdStatus.PROCESS:
        return t('Please sign the contract', {
          vn: 'Quý khách vui lòng ký hợp đồng',
        });
      case StepsAntdStatus.WAIT:
        return t('Wait E-KYC', { vn: 'Chờ E-KYC' });
      default:
        return '';
    }
  })();

  const handleChangeStep = (step) => {
    if (statusOfEkycStep === StepsAntdStatus.PROCESS) return undefined;
    setCurrentStep(step);
  };

  return (
    <div className="ekyc-with-vina-capital">
      <div className="ekyc-with-vina-capital__steps">
        <Steps
          type="navigation"
          direction={directionOfStep}
          current={currentStep}
          onChange={handleChangeStep}
        >
          <Step
            description={descriptionEkyc}
            status={statusOfEkycStep}
            title={t('Enter E-KYC information', { vn: 'Nhập thông tin E-KYC' })}
          />
          <Step
            description={descriptionSignature}
            status={statusOfSignatureStep}
            title={t('Signature', { vn: 'Ký hợp đồng điện tử' })}
          />
        </Steps>
      </div>
      <SwitchCaseEkycSteps
        mioInfo={mioInfo}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
    </div>
  );
};

export const EkycDoneWithVinaCapital = memo(({ children = <></> }) => {
  const { t } = useHTranslation('admin');
  const { setTabActive } = useContext(VinaCapitalManagementContext);
  return (
    <div className="ekyc-done-with-vina-capital">
      <div className={'ekyc-done-with-vina-capital__wrapper'}>
        <div className="ekyc-done-with-vina-capital__msg">
          {t('The account has been verified. Investors can make trades now.', {
            vn: 'Tài khoản đã được xác thực. Quý nhà đầu tư có thể thực hiện giao dịch ngay bây giờ.',
          })}
        </div>
        <div className="ekyc-done-with-vina-capital__action">
          <Button
            onClick={() => setTabActive(vinaCapitalTabPaneKeys.TRANSACTION)}
            icon={<EnterOutlined />}
            type="primary"
          >
            {t('Invest now', { vn: 'Đầu tư ngay' })}
          </Button>
        </div>
      </div>
      <div className={'ekyc-done-with-vina-capital__children'}>{children}</div>
    </div>
  );
});

export const EkycDoneWithVinaCapitalInEkycScreen = memo(() => {
  return (
    <EkycDoneWithVinaCapital>
      <EkycWithVinaCapital />
    </EkycDoneWithVinaCapital>
  );
});

export const EkycDoneWithVinaCapitalInAccountSyncScreen = memo(() => {
  const [form] = Form.useForm();
  const mioEkyc = useMioEkyc();
  const mioInfo = useMemo(() => mioEkyc?.mioInfo ?? {}, [mioEkyc]);

  useEffect(() => {
    const mioInfo = mioEkyc?.mioInfo ?? {};
    const { email, idNo, phone } = mioInfo;
    if (email) return;
    form?.setFieldsValue({ idNumber: idNo, tels: [{ tel: phone }] });
  }, [mioEkyc]);

  return (
    <EkycDoneWithVinaCapital>
      {!mioInfo?.email && (
        <div className={'sync-account-with-mio'}>
          <SyncAccountWithMio disableField={true} form={form} />
        </div>
      )}
    </EkycDoneWithVinaCapital>
  );
});

export const SignatureWithVinaCapital = () => {
  const { contractFileUrlMio, setContractFileUrlMio } = useContext(
    NotificationNeedSyncOrEkycLayoutContext,
  );
  const [contractResponse, setContractResponse] = useState<any>();
  const [visibleOtp, setVisibleOtp] = useState<boolean>(false);
  const { t } = useHTranslation('admin');

  useEffect(() => {
    if (contractFileUrlMio) return;
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          '/users/check-contract-status-on-mio',
        ),
        onGotSuccess: (response) => setContractResponse(response),
      },
    );
  }, [contractFileUrlMio]);
  if (contractFileUrlMio) {
    return (
      <div>
        <span>
          {t(
            'Your transaction contract has been confirmed and signed electronically. Investors can download the signed E-Contract by',
            {
              vn: 'Hợp đồng giao dịch của Quý khách đã được xác nhận ký điện tử. Quý nhà đầu tư có thể tải Hợp đồng điện tử đã ký bằng cách',
            },
          )}
          <a
            href={contractFileUrlMio}
            target={'_blank'}
            download
            rel="noreferrer"
          >
            {t(' click here', { vn: ' ấn vào đây' })}
          </a>
        </span>
      </div>
    );
  }

  return (
    <>
      <FundCertificateESignature
        callbackWhenESignatureSuccessfully={() => setVisibleOtp(true)}
        urlContract={contractResponse?.contractFileUrl}
      />
      <Modal
        visible={visibleOtp}
        footer={false}
        onCancel={() => setVisibleOtp(false)}
      >
        <AuthenticationOtp
          {...{
            callbackVerifySuccessfully: (response) => {
              setContractFileUrlMio(response.contractFileUrl);
              setVisibleOtp(false);
            },
            endpointVerifyOTP: endpoints.endpointWithApiDomain(
              '/users/verify-otp-e-sign-by-mio',
            ),
            endpointResendOTP: endpoints.endpointWithApiDomain(
              '/users/resend-otp-sign-contract-with-mio',
            ),
            getTimeCountdown: () =>
              DateTimeHelper.getDateTimeBySeconds(
                expiredTimeOtp.MIO_SIGN_CONTRACT,
              ),
          }}
        />
      </Modal>
    </>
  );
};
