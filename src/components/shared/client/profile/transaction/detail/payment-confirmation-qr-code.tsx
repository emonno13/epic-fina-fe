// import { IconInfoRoundYellow } from '@icons';
import PaymentQRCode from '@components/features/client/fund-certificate/buy-fund/qr-code-payment';
import { IconInfoRoundYellow } from '@icons';

const PaymentConfirmationQRCode = ({
  data,
  showConfirmMessage = true,
}: {
  data?: any;
  showConfirmMessage?: boolean;
}) => {
  const { productDetailInfo, amount, transferContent } = data;
  return (
    <>
      <div className="payment-confirmation-fund-content-qr-code-guide">
        <div className="payment-confirmation-fund-content-qr-code-guide-image">
          <PaymentQRCode
            data={{
              accountNo: productDetailInfo?.bankNumber,
              accountName: productDetailInfo?.dataBank?.shortName,
              swiftCode: productDetailInfo?.dataBank?.swiftCode,
              amount: amount,
              addInfo: transferContent,
              format: 'text',
              template: 'qrZcR1S',
            }}
          />
        </div>
        <div className="payment-confirmation-fund-content-qr-code-guide-content">
          <div className="payment-confirmation-fund-content-qr-code-desc">
            <div style={{ color: '#FF6C0E', fontSize: '16px' }}>
              <IconInfoRoundYellow /> <span>Lưu ý</span>
            </div>
            <span>
              Một số Ngân hàng chưa hỗ trợ quét mã QR
              <br />
              Quý khách vui lòng đối chiếu lại. Thông tin trước khi chuyển khoản
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmationQRCode;
