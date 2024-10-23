import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { BuyFundSuccessIcon } from 'icons/rsvgs/buy-fund-success';
import { ReactNode, useContext } from 'react';
import { SellActionContext } from './sell-fund/context';

type FundSuccessProps = {
  title: string;
  actionLeft?: Function;
  textActionLeft: string;
  actionRight?: Function;
  textActionRight: string;
  desc: string | ReactNode;
};

export const useDataPaymentConfirmation = (t, matchingSession) => {
  const { order, fee } = useContext(SellActionContext);
  return [
    {
      label: t('Order date', { vn: 'Ngày đặt lệnh' }),
      value: ConverterUtils.dateConverterToString(
        new Date().toString(),
        'DD/MM/YYYY HH:mm:ss',
      ),
      unit: t('(VN time)', { vn: '(Giờ VN)' }),
    },
    {
      label: t('Order matching', { vn: 'Phiên khớp lệnh' }),
      value: ConverterUtils.dateConverterToString(
        matchingSession,
        'DD/MM/YYYY',
      ),
    },
    {
      label: t('Selling fee', { vn: 'Phí bán' }),
      value: `${ConverterUtils.formatNumber(fee?.totalFee)} vnđ`,
    },
    {
      label: t('Quantity to sel', { vn: 'Số lượng bán' }),
      value: ConverterUtils.formatNumber(order?.volume),
    },
  ];
};

const FundSuccess = ({
  desc,
  title,
  actionLeft,
  actionRight,
  textActionLeft,
  textActionRight,
}: FundSuccessProps) => {
  return (
    <div className="fund-success">
      <BuyFundSuccessIcon />
      <h2 className="fund-success-title">{title}</h2>
      <p className="fund-success-desc">{desc}</p>

      <div className="fund-success-actions">
        <HButton
          {...{
            type: 'ghost',
            size: 'large',
            onClick: actionLeft,
          }}
        >
          {textActionLeft}
        </HButton>
        <HButton
          {...{
            type: 'primary',
            size: 'large',
            onClick: actionRight,
          }}
        >
          {textActionRight}
        </HButton>
      </div>
    </div>
  );
};

export default FundSuccess;

export const FundSuccessItemViewer = ({ item }) => {
  return (
    <div className="fund-success-item-viewer">
      <span className="fund-success-item-viewer-label">{item?.label}</span>
      <div className="flex">
        <span className="fund-success-item-viewer-value m-r-5">
          {item?.value}
        </span>
        {item?.unit && (
          <span className="fund-success-item-viewer-label"> {item?.unit}</span>
        )}
      </div>
    </div>
  );
};
