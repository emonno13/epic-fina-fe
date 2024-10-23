import AuthenticationOtp from '@components/features/client/fund-certificate/buy-fund/authentication-otp';
import BuyFundSuccess from '@components/features/client/fund-certificate/buy-fund/buy-fund-success';
import FormInfoFund from '@components/features/client/fund-certificate/buy-fund/form-info-fund';
import PaymentConfirmationFund from '@components/features/client/fund-certificate/buy-fund/payment-confirmation';
import {
  BUY_WITH_MIO_STEP,
  eSignatureStep,
  kycWithMioStep,
} from '@components/features/client/fund-certificate/detail/constants';
import { FundCertificateAccuracySuccess } from '@components/features/client/fund-certificate/ekyc/fund-certificate-accuracy-success';
import { FundCertificateNeedAccuracy } from '@components/features/client/fund-certificate/ekyc/fund-certificate-need-accuracy';
import SyncAccountWithMio from '@components/features/client/fund-certificate/ekyc/sync-account-with-mio';
import {
  BASE_PATH_PROFILE_SCREEN,
  PROFILE_SCREEN,
} from '@components/features/profiles/constanst';
import { KYC } from '@components/features/profiles/kyc';
import { fundActions } from '@components/features/profiles/transaction-management/components/constants';
import { fetchNavsPublicByProductId } from '@components/shared/client/fund-certificates/hook';
import { HModal } from '@components/shared/common/h-modal';
import { DateTimeHelper } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import { useSetGlobalMessages } from '@schema-form/features/hooks';
import { Button, notification } from 'antd';
import { CloseIconLargeSvg } from 'icons';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'underscore';
import AuthenticationOtpWithBuy from './buy-fund/authentication-otp-with-buy';
import { BuyFundContextProvider } from './buy-fund/context';
import PaymentGuide from './buy-fund/payment-guide';
import { ContractPreview } from './contract-preview';
import { useSelectedProductProgram } from './detail/hooks';
import FundCertificateESignature from './ekyc/fund-certificate-e-signature';
import FundCertificateESignatureFinish from './ekyc/fund-certificate-e-signature-finish';
import FundCertificateESignatureNeedAccuracy from './ekyc/fund-certificate-e-signature-need-accuracy';
import { useMioEkyc } from './hooks';
import { loadMioEKyc, sendOtpBuyFundRequest } from './store';
interface BuyFundActionProps {
  type?: string;
  text?: string;
  data: any;
  programProductId?: string;
  setIsShowPrograms?: (value: boolean) => void;
  className?: string;
  beforeHandleClickBuy?: Function;
}

export const expiredTimeOtp = {
  MIO_SIGN_CONTRACT: 300,
  MIO_SYNC_ACCOUNT: 90,
  MIO_SELL: 300,
  MIO_BUY: 300,
};

const BuyFundAction: FC<BuyFundActionProps> = ({
  data,
  text,
  programProductId: productProgramIdDefault,
  setIsShowPrograms,
  className,
  beforeHandleClickBuy,
}) => {
  const currentUser = useCurrentUser();
  const { push, asPath } = useRouter();
  const { t } = useHTranslation('common');
  const [urlContract, setUrlContract] = useState('');
  const [buyFundStep, setBuyFundStep] = useState('');
  const [navHistory, setNavHistory] = useState<any[]>([]);
  const [transactionDaftId, setTransactionDaftId] = useState('');
  const [showModalBuyFund, setShowModalBuyFund] = useState(false);
  const [visibleESignature, setVisibleESignature] = useState(false);
  const [visibleKycWithMio, setVisibleKycWithMio] = useState(false);
  const [currentStepKycWithMio, setCurrentStepKycWithMio] = useState('');
  const [currentStepESignature, setCurrentStepESignature] = useState('');
  const [transactionPartnerLog, setTransactionPartnerLog] = useState<any>('');
  const [phone, setPhone] = useState('');
  const selectedProductProgram = useSelectedProductProgram();
  const programProductId = productProgramIdDefault || selectedProductProgram;
  const setGlobalMessages = useSetGlobalMessages();

  useEffect(() => {
    if (!showModalBuyFund) return;
    (async () => {
      const navsData = await fetchNavsPublicByProductId(data?.id, {
        skip: 0,
        limit: 1,
        order: ['navDate DESC'],
      });
      setNavHistory(navsData?.data || []);
    })();
  }, [data, showModalBuyFund]);

  const handleBuy = async (e) => {
    const isContinue = beforeHandleClickBuy?.() ?? true;
    if (!isContinue) return;

    e?.stopPropagation();
    setIsShowPrograms && setIsShowPrograms(false);
    if (!currentUser?.id) {
      setGlobalMessages({
        error: true,
        errorMessage: t('Please login to continue trading', {
          vn: 'Quý khách vui lòng đăng nhập để tiếp tục giao dịch',
        }),
        successMessage: '',
      });
      push(`/users/login?prePage=${asPath}`);
      return;
    }

    //chưa có investmentNumber === chưa KYC/đồng bộ
    const user = await httpRequester.getDataFromApi({
      url: endpoints.endpointWithApiDomain('/me'),
    });

    if (!user?.investmentNumber) {
      setVisibleKycWithMio(true);
      setCurrentStepKycWithMio(kycWithMioStep.ACCURACY);
      return;
    }

    if (user?.investmentNumber) {
      const contractStatus = await httpRequester.getDataFromApi({
        url: endpoints.endpointWithApiDomain(
          '/users/check-contract-status-on-mio',
        ),
      });
      const { isFullSubmission, contractFileUrl } = contractStatus;

      if (!isFullSubmission) {
        setVisibleESignature(true);
        setUrlContract(contractFileUrl);
        setCurrentStepESignature(eSignatureStep.ACCURACY);
        return;
      }
    }

    setShowModalBuyFund(true);
    setBuyFundStep(BUY_WITH_MIO_STEP.SET_BUY_COMMAND);
  };

  const handleAccuracySuccess = () => {
    setVisibleKycWithMio(false);
    setCurrentStepKycWithMio('');

    const visibleESignature = (response) => {
      setVisibleESignature(true);
      setUrlContract(response?.contractFileUrl);
    };

    // chuyển sang bước ký hợp đồng điện tử
    httpRequester
      .getDataFromApi({
        url: `${endpoints.endpointWithApiDomain('/users/check-contract-status-on-mio')}`,
      })
      .then((response) => {
        //chưa thì chuyển sang ký
        if (!response?.isFullSubmission) {
          visibleESignature(response);
          setCurrentStepESignature(eSignatureStep.PREVIEW_CONTRACT);
          return;
        }
        //đã ký bên mio thì chỉ show hợp đồng
        visibleESignature(response);
        setCurrentStepESignature(eSignatureStep.FINISH);
      })
      .catch((e) => {
        notification.error({
          message: t('Failure', { vn: 'Thất bại' }),
          description:
            e?.message ||
            t('Failure, please checking again', {
              vn: 'Thất bại, vui lòng thử lại',
            }),
        });
      });
  };

  return (
    <>
      <Button
        type={'primary'}
        className={`buy-fund-action ${className}`}
        onClick={handleBuy}
        size="large"
      >
        {text ? text : 'Mua'}
      </Button>
      <ModalEkycWithMio
        {...{
          setVisibleKycWithMio,
          visibleKycWithMio,
          currentStepKycWithMio,
          setCurrentStepKycWithMio,
          setPhone,
          phone,
          handleAccuracySuccess,
        }}
      />
      <ModalESignatureWithMio
        {...{
          setVisibleESignature,
          visibleESignature,
          currentStepESignature,
          setCurrentStepESignature,
          urlContract,
          setUrlContract,
        }}
      />
      <ModalBuyFund
        {...{
          setShowModalBuyFund,
          buyFundStep,
          showModalBuyFund,
          data,
          navHistory,
          setBuyFundStep,
          setTransactionDaftId,
          programProductId,
          transactionPartnerLog,
          transactionDaftId,
          setTransactionPartnerLog,
        }}
      />
    </>
  );
};

export default BuyFundAction;

export const ModalESignatureWithMio = ({
  setVisibleESignature,
  visibleESignature,
  currentStepESignature,
  setCurrentStepESignature,
  urlContract,
  setUrlContract,
}) => {
  return (
    <HModal
      {...{
        onCancel: () => setVisibleESignature(false),
        visible: visibleESignature,
        footer: null,
        className: 'ekyc-fund-modal buy-fund-modal',
        width: 650,
        destroyOnClose: true,
        maskClosable: false,
      }}
    >
      {currentStepESignature === eSignatureStep.ACCURACY && (
        <FundCertificateESignatureNeedAccuracy
          {...{
            setVisibleESignature,
            setCurrentStepESignature,
          }}
        />
      )}

      {currentStepESignature === eSignatureStep.PREVIEW_CONTRACT && (
        <ContractPreview
          {...{
            setCurrentStepESignature,
            contractUrl: urlContract,
            setVisibleESignature,
          }}
        />
      )}

      {currentStepESignature === eSignatureStep.SIGNATURE && (
        <FundCertificateESignature
          callbackWhenESignatureSuccessfully={() =>
            setCurrentStepESignature(eSignatureStep.OTP)
          }
          urlContract={urlContract}
        />
      )}

      {currentStepESignature === eSignatureStep.OTP && (
        <AuthenticationOtp
          {...{
            callbackVerifySuccessfully: (response) => {
              setUrlContract(response.contractFileUrl);
              setCurrentStepESignature(eSignatureStep.FINISH);
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
      )}

      {currentStepESignature === eSignatureStep.FINISH && (
        <FundCertificateESignatureFinish
          callback={() => setVisibleESignature(false)}
          urlContract={urlContract}
        />
      )}
    </HModal>
  );
};

export const ModalEkycWithMio = ({
  setVisibleKycWithMio,
  visibleKycWithMio,
  currentStepKycWithMio,
  setCurrentStepKycWithMio,
  setPhone,
  phone,
  handleAccuracySuccess,
}) => {
  const dispatch = useDispatch();
  return (
    <HModal
      onCancel={() => setVisibleKycWithMio(false)}
      visible={visibleKycWithMio}
      footer={null}
      className="ekyc-fund-modal buy-fund-modal"
      width={
        currentStepKycWithMio === kycWithMioStep.ENTER_INFORMATION_FOR_KYC
          ? 850
          : 556
      }
      maskClosable={false}
    >
      {currentStepKycWithMio === kycWithMioStep.ACCURACY && (
        <FundCertificateNeedAccuracy
          setCurrentStepKycWithMio={setCurrentStepKycWithMio}
        />
      )}

      {currentStepKycWithMio === kycWithMioStep.ENTER_INFORMATION_FOR_KYC && (
        <KYC
          {...{
            callbackWhenKycSuccessfully: () =>
              setCurrentStepKycWithMio(kycWithMioStep.FINISH),
            setCurrentStepKycWithMio,
          }}
        />
      )}

      {currentStepKycWithMio === kycWithMioStep.ENTER_INFORMATION_FOR_ASYNC && (
        <SyncAccountWithMio
          callback={() => setCurrentStepKycWithMio(kycWithMioStep.OTP)}
          setPhone={setPhone}
        />
      )}

      {kycWithMioStep.OTP === currentStepKycWithMio && (
        <AuthenticationOtp
          {...{
            callbackVerifySuccessfully: () => {
              setCurrentStepKycWithMio(kycWithMioStep.FINISH);
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
      )}

      {currentStepKycWithMio === kycWithMioStep.FINISH && (
        <FundCertificateAccuracySuccess callback={handleAccuracySuccess} />
      )}
    </HModal>
  );
};

export const ModalBuyFund = (props) => {
  return (
    <BuyFundContextProvider>
      <ModalBuyFundMain {...props} />
    </BuyFundContextProvider>
  );
};

export const ModalBuyFundMain = ({
  setShowModalBuyFund,
  buyFundStep,
  showModalBuyFund,
  data,
  navHistory,
  setBuyFundStep,
  setTransactionDaftId,
  programProductId,
  transactionPartnerLog,
  transactionDaftId,
  setTransactionPartnerLog,
}) => {
  const dispatch = useDispatch();
  const mioEkyc = useMioEkyc();
  const { push, locale } = useRouter();

  const [loadingConfirmOrder, setLoadingConfirmOrder] =
    useState<boolean>(false);

  const handleConfirmPayment = async () => {
    setLoadingConfirmOrder(true);
    const errorObj = mioEkyc?.error;
    const phone = mioEkyc?.mioInfo?.phone;
    if (!isEmpty(errorObj)) {
      notification.error({
        message: 'Không thành công',
        description: errorObj?.message,
      });
      setLoadingConfirmOrder(false);
      return;
    }

    dispatch(
      sendOtpBuyFundRequest({
        params: { phone, transactionId: transactionDaftId },
        callback: () => {
          setLoadingConfirmOrder(false);
          setBuyFundStep(BUY_WITH_MIO_STEP.OTP_VERIFY);
        },
      }),
    );
  };

  const handleViewTransaction = () => {
    push(
      `/${locale}${BASE_PATH_PROFILE_SCREEN}?screen=${PROFILE_SCREEN.HISTORY_TRANSACTION}&p_ac=${fundActions.BUY}`,
    );
  };

  const renderByStep = (step) => {
    switch (step) {
      case BUY_WITH_MIO_STEP.SET_BUY_COMMAND:
        return (
          <FormInfoFund
            fund={data}
            navHistory={navHistory}
            callBack={() => setBuyFundStep(BUY_WITH_MIO_STEP.CONFIRM_PAYMENT)}
            setTransactionDaftId={setTransactionDaftId}
            programProductId={programProductId}
          />
        );
      case BUY_WITH_MIO_STEP.CONFIRM_PAYMENT:
        return (
          <PaymentConfirmationFund
            fund={data}
            navHistory={navHistory}
            callBack={() => setBuyFundStep(BUY_WITH_MIO_STEP.PAYMENT)}
          />
        );
      case BUY_WITH_MIO_STEP.PAYMENT:
        return (
          <PaymentGuide
            callBack={handleConfirmPayment}
            loadingConfirmOrder={loadingConfirmOrder}
          />
        );
      case BUY_WITH_MIO_STEP.OTP_VERIFY:
        return (
          <AuthenticationOtpWithBuy
            callbackVerifySuccessfully={(response) => {
              setTransactionPartnerLog(response);
              setBuyFundStep(BUY_WITH_MIO_STEP.FINISH);
            }}
            transactionDaftId={transactionDaftId}
            getTimeCountdown={() => {
              const t = new Date();
              t.setSeconds(t.getSeconds() + expiredTimeOtp.MIO_BUY);
              return t.getTime();
            }}
          />
        );
      case BUY_WITH_MIO_STEP.FINISH:
        return (
          <BuyFundSuccess
            transactionPartnerLog={transactionPartnerLog}
            handleActionLeft={() =>
              setBuyFundStep(BUY_WITH_MIO_STEP.SET_BUY_COMMAND)
            }
            handleActionRight={handleViewTransaction}
          />
        );
      default:
        return null;
    }
  };

  const renderTitleByStep = (step) => {
    switch (step) {
      case BUY_WITH_MIO_STEP.CONFIRM_PAYMENT:
        return ' ';
      case BUY_WITH_MIO_STEP.PAYMENT:
        return 'Hướng dẫn thanh toán';
      case BUY_WITH_MIO_STEP.OTP_VERIFY:
        return 'Xác thực OTP';
      case BUY_WITH_MIO_STEP.FINISH:
        return ' ';
      default:
        return `${data?.code} - ${data?.name}`;
    }
  };

  const renderClassNameByStep = (step) => {
    switch (step) {
      case BUY_WITH_MIO_STEP.CONFIRM_PAYMENT:
        return 'buy-fund-modal-no-title';
      case BUY_WITH_MIO_STEP.PAYMENT:
        return 'buy-fund-modal-center-title';
      case BUY_WITH_MIO_STEP.OTP_VERIFY:
        return 'buy-fund-modal-left-title';
      case BUY_WITH_MIO_STEP.FINISH:
        return 'buy-fund-modal-no-title';
      default:
        return '';
    }
  };

  return (
    <HModal
      onCancel={() => setShowModalBuyFund(false)}
      width={BUY_WITH_MIO_STEP.PAYMENT === buyFundStep ? 1050 : 750}
      visible={showModalBuyFund}
      footer={null}
      className={`buy-fund-modal ${renderClassNameByStep(buyFundStep)}`}
      closeIcon={<CloseIconLargeSvg />}
      title={renderTitleByStep(buyFundStep)}
      destroyOnClose={true}
      maskClosable={false}
    >
      {renderByStep(buyFundStep)}
    </HModal>
  );
};
