import { useHTranslation } from '@lib/i18n';
import { FC } from 'react';
import { ConverterUtils } from '../../../../../lib/converter';
import FundSuccess from '../fund-success';

export interface BuyFundSuccessProps {
  transactionPartnerLog?: any;
  fund?: any;
  handleActionLeft?: (value?: any) => void;
  handleActionRight?: (value?: any) => void;
}

const BuyFundSuccess: FC<BuyFundSuccessProps> = ({
  transactionPartnerLog,
  handleActionLeft,
  handleActionRight,
}) => {
  const { t } = useHTranslation('common');
  const orderMatchingSession = ConverterUtils.dateConverterToString(
    new Date(transactionPartnerLog?.metaData?.tradingTime),
  );
  return (
    <FundSuccess
      desc={`${t('Your order will apply to the trading session', { vn: 'Lệnh của bạn đặt sẽ áp dụng vào phiên giao dịch' })} ${orderMatchingSession}, ${t('transaction status will be updated after at least 1 business day', { vn: 'trạng thái giao dịch sẽ được cập nhật sau tối thiểu 1 ngày làm việc' })}`}
      title={t('Create order buy successfully', {
        vn: 'Đặt lệnh mua thành công',
      })}
      textActionLeft={t('Buy more', { vn: 'Mua thêm' })}
      textActionRight={t('View transaction', { vn: 'Xem giao dịch' })}
      actionLeft={() => {
        if (handleActionLeft) handleActionLeft();
      }}
      actionRight={() => {
        if (handleActionRight) handleActionRight();
      }}
    />
  );
};

export default BuyFundSuccess;
