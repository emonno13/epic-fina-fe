import { IconInfoRoundYellow } from '@icons';
import PaymentQRCode from './qr-code-payment';

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
      {/* <div className="payment-confirmation-fund-content-qr-code-desc">
        <IconInfoRoundYellow /> <span>Quý khách vui lòng chuyển khoản theo thông tin chuyển khoản ở bên dưới</span>
      </div>
      {showConfirmMessage && <div className="payment-confirmation-fund-content-qr-code-desc">
        <IconInfoRoundYellow />
        <span>
					Sau khi chuyển khoản thành công, nhấn nút <br />
          <b>{`"${'Xác nhận thanh toán'}"`}</b>
        </span>
      </div>} */}

      {/* <h2 className="payment-confirmation-fund-content-qr-code-title">XEM HƯỚNG DẪN CHUYỂN KHOẢN</h2> */}

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
            <IconInfoRoundYellow />{' '}
            <span>Một số Ngân hàng chưa hỗ trợ quét mã QR</span>
          </div>
          <div className="payment-confirmation-fund-content-qr-code-desc">
            <IconInfoRoundYellow />
            <span>
              Quý khách vui lòng đối chiếu lại. Thông tin trước khi chuyển khoản
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmationQRCode;
