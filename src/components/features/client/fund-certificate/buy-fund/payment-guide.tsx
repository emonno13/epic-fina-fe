import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useIsMobile } from '@lib/hooks/use-media';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { fundStoreName } from '../store';
import PaymentConfirmationBank from './payment-confirmation-bank';
import PaymentConfirmationQRCode from './payment-confirmation-qr-code';

const PaymentGuide = ({ callBack, loadingConfirmOrder }) => {
  const isMobile = useIsMobile();
  const fundTransaction = useSelector(
    (state) => state?.[fundStoreName]?.CREATE_FUND_TRANSACTION_SUCCEEDED,
  );
  const { metaData } = fundTransaction;

  const onClick = () => callBack();

  return (
    <div className="payment-confirmation-fund">
      <div className="payment-confirmation-fund-content">
        <h2 className="payment-confirmation-fund-content-title">
          Thanh toán bằng QR code
        </h2>
        <PaymentConfirmationQRCode
          data={{
            productDetailInfo: metaData?.productDetailInfo,
            amount: metaData?.amount,
            transferContent: metaData?.investmentNumber,
          }}
        />

        <div className="payment-confirmation-fund-content-or">
          <span>Hoặc</span>
        </div>

        <h2 className="payment-confirmation-fund-content-title">
          Thanh toán bằng chuyển khoản
        </h2>
        <PaymentConfirmationBank
          data={{
            productDetailInfo: metaData?.productDetailInfo,
            amount: metaData?.amount,
            transferContent: metaData?.investmentNumber,
            productInfo: metaData?.productInfo,
          }}
        />
      </div>

      <div className="form-info-fund-action">
        <HButton
          {...{
            className: classNames('form-info-fund-action-buy', {
              'w-full': isMobile,
            }),
            type: 'primary',
            size: 'large',
            onClick: onClick,
            loading: loadingConfirmOrder,
          }}
        >
          Xác nhận thanh toán
        </HButton>
      </div>
    </div>
  );
};

export default PaymentGuide;
