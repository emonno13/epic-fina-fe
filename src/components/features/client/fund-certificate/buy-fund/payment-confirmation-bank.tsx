import { IconCopy } from '@icons/rsvgs/copy-icon';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { CommentUtils } from '@lib/utils/comment';

const PaymentConfirmationBank = ({ data }) => {
  const { t } = useHTranslation('admin-common');
  const { productDetailInfo, transferContent, amount, productInfo } = data;
  const InfoBank = [
    { label: 'Ngân hàng', value: productDetailInfo?.dataBank?.name || '' },
    {
      label: 'Số tài khoản',
      value: productDetailInfo?.bankNumber || '',
      isCopy: true,
    },
    {
      label: 'Số tiền thanh toán',
      value: `${ConverterUtils.formatNumber((amount || 0).toFixed(0))} VNĐ`,
    },
    {
      label: 'Nội dung <span class="color-red">(Không được thay đổi)</span>',
      value: transferContent,
      isCopy: true,
    },
    { label: 'Tài khoản', value: productInfo?.name, isCopy: true },
  ];

  return (
    <div className="payment-confirmation-fund-content-bank-wrapper">
      {InfoBank?.map((info, index) => (
        <div className="payment-confirmation-fund-content-bank" key={index}>
          <div className="payment-confirmation-fund-content-bank-label">
            <span dangerouslySetInnerHTML={{ __html: info?.label }}></span>
            {info?.isCopy && (
              <span
                onClick={() =>
                  CommentUtils.copyToClipboard(
                    info?.value,
                    t('Successfully copied', { vn: 'Đã copy' }),
                  )
                }
              >
                <IconCopy />
              </span>
            )}
          </div>
          <div className="payment-confirmation-fund-content-bank-value">
            {info?.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentConfirmationBank;
