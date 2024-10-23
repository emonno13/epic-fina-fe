import { fundActions } from '@components/features/profiles/transaction-management/components/constants';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { notification } from 'antd';
import { CartIcon } from 'icons/rsvgs/cart';
import { useRouter } from 'next/router';
import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { DateTimeHelper } from '../../../../../lib/converter';
import { expiredTimeOtp } from '../buy-fund-action';
import AuthenticationOtp from '../buy-fund/authentication-otp';
import { sellFundProductStep } from '../constants';
import FundSuccess, { useDataPaymentConfirmation } from '../fund-success';
import ConfirmSellFund from './confirm-sell-fund';
import {
  initSellValue,
  SellActionContext,
  SellActionContextProvider,
} from './context';
import { SelectProductAndProgram } from './form-select-product-and-program';
import FormSellFund from './form-sell-fund';
import { handleFinishSell } from './utils';

interface SellFundActionProps {
  text?: string | ReactNode;
  productSell?: any;
  productProgramSell?: any;
}

export interface IFeeSellFundproductProgram {
  fee: number;
  feeRate: number;
  totalFee: number;
  volumSell: number;
  holdingDay: number;
  totalAmount: number;
  holdingVolume: number;
}

export interface IFeeSellFundProduct {
  totalFee: number;
  totalAmount: number;
  details: IFeeSellFundproductProgram[];
}

export const SellFundAction: FC<SellFundActionProps> = (props) => {
  return (
    <SellActionContextProvider {...props}>
      <SellFundActionMain {...props} />
    </SellActionContextProvider>
  );
};

export default memo(SellFundAction);

const SellFundActionMain: FC<SellFundActionProps> = ({
  text = <CartIcon />,
  productSell,
  productProgramSell,
}) => {
  const { t } = useHTranslation('common');
  const sellContext = useContext(SellActionContext);
  const { setProduct, setProductProgram } = useContext(SellActionContext);
  const { push, pathname, query } = useRouter();

  const {
    otpTransId,
    visibleSell,
    setOtpTransId,
    setVisibleSell,
    currentStepSell,
    setCurrentStepSell,
    product,
  } = sellContext;

  const matchingSession = useMemo(
    () => product?.info?.nextOrderMatchingSession,
    [product],
  );
  const dataPaymentConfirmation = useDataPaymentConfirmation(
    t,
    matchingSession,
  );

  const handleSell = () => {
    setVisibleSell(true);
    setCurrentStepSell(sellFundProductStep.SELECT_PRODUCT);
  };

  const handleResendOTP = () => {
    if (!otpTransId) {
      notification.error({
        message: t('Failure', { vn: 'Thất bại' }),
        description: t(
          'Please create a sale transaction before requesting OTP resend',
          { vn: 'Vui lòng tạo giao dịch bán trước khi yêu cầu gửi lại OTP' },
        ),
      });
      return;
    }

    FormUtils.submitForm(
      { otpTransId },
      {
        method: 'post',
        endpoint: endpoints.endpointWithApiDomain(
          '/products/resend-otp-sell-order-with-mio',
        ),
        onGotSuccess: (response) => {
          const otpTransId = response?.otpInfo?.otpTransId;
          if (!otpTransId) {
            notification.error({
              message: 'Thất bại',
              description: 'Đã có lỗi xảy ra, vui lòng thử lại',
            });
            return;
          }
          setOtpTransId(otpTransId);
          notification.success({
            message: 'Thành công',
            description: 'Đã gửi OTP',
          });
        },
        onGotError: () => {
          notification.error({
            message: 'Thất bại',
            description: 'Đã có lỗi xảy ra, vui lòng thử lại',
          });
        },
      },
    );
  };

  const handleDataReadyToSubmitVerifyOtp = useCallback(
    (values) => ({
      ...values,
      otpTransId,
    }),
    [otpTransId],
  );

  const redirectToViewTransaction = () => {
    push({
      pathname,
      query: {
        ...query,
        p_ac: fundActions.SELL,
      },
    });
  };

  useEffect(() => {
    if (productSell && productProgramSell) {
      setProduct(productSell);
      setProductProgram(productProgramSell);
    }
  }, [
    visibleSell,
    productSell,
    productProgramSell,
    setProduct,
    setProductProgram,
  ]);

  return (
    <>
      <a onClick={handleSell}>{text}</a>
      <HModal
        {...{
          title: product?.name,
          visible: visibleSell,
          onCancel: () => {
            handleFinishSell(initSellValue, sellContext);
            setVisibleSell(false);
          },
          footer: null,
          className: 'sell-fund-product',
          maskClosable: false,
          destroyOnClose: true,
        }}
      >
        {currentStepSell === sellFundProductStep.SELECT_PRODUCT && (
          <SelectProductAndProgram
            handleNextStep={() =>
              setCurrentStepSell(sellFundProductStep.CREATE)
            }
          />
        )}
        {currentStepSell === sellFundProductStep.CREATE && (
          <FormSellFund
            {...{
              handleCreateSellOrderGotSuccess: () =>
                setCurrentStepSell(sellFundProductStep.CONFIRM_INFORMATION),
            }}
          />
        )}

        {currentStepSell === sellFundProductStep.CONFIRM_INFORMATION && (
          <ConfirmSellFund dataSell={product} />
        )}

        {currentStepSell === sellFundProductStep.OTP && (
          <AuthenticationOtp
            {...{
              callbackVerifySuccessfully: () =>
                setCurrentStepSell(sellFundProductStep.FINISH),
              endpointVerifyOTP: endpoints.endpointWithApiDomain(
                '/products/verify-otp-sell-order-with-mio',
              ),
              handleResendOTP,
              handleDataReadyToSubmit: handleDataReadyToSubmitVerifyOtp,
              getTimeCountdown: () =>
                DateTimeHelper.getDateTimeBySeconds(expiredTimeOtp.MIO_SELL),
            }}
          />
        )}

        {currentStepSell === sellFundProductStep.FINISH && (
          <FundSuccess
            {...{
              data: dataPaymentConfirmation,
              title: t('Successfully create sell order', {
                vn: 'Đặt lệnh bán thành công',
              }),
              desc: 'Quý khách đã đặt lệnh bán thành công',
              actionLeft: () => {
                setCurrentStepSell(sellFundProductStep.SELECT_PRODUCT);
                handleFinishSell(initSellValue, sellContext);
              },
              textActionLeft: t('Sell more', { vn: 'Bán thêm' }),
              actionRight: () => {
                setVisibleSell(false);
                handleFinishSell(initSellValue, sellContext);
                redirectToViewTransaction();
              },
              textActionRight: t('View transaction', { vn: 'Xem giao dịch' }),
            }}
          />
        )}
      </HModal>
    </>
  );
};
