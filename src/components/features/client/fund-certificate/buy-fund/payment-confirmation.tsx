import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { NumberUtils } from '@lib/utils/number';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { BuyFundSuccessIcon } from 'icons/rsvgs/buy-fund-success';
import { useSelector } from 'react-redux';
import { fundStoreName } from '../store';

const PaymentConfirmationFund = ({ fund, navHistory, callBack }) => {
  const isMobile = useIsMobile();
  const { info = {} } = fund;
  const fundTransaction = useSelector(
    (state) => state?.[fundStoreName]?.CREATE_FUND_TRANSACTION_SUCCEEDED,
  );
  // const { metaData } = fundTransaction;

  const onClick = () => callBack();

  const dataPaymentConfirmation = [
    {
      label: 'Quỹ đầu tư',
      value: fundTransaction?.metaData?.productInfo?.name,
    },
    {
      label: 'Phiên giao dịch',
      value: info?.nextOrderMatchingSession
        ? `${ConverterUtils.dateConverterToString(info.nextOrderMatchingSession, 'DD/MM/YYYY')}`
        : '',
    },
    {
      label: 'Ngày đặt lệnh (Giờ VN)',
      value: `${ConverterUtils.dateConverterToString(fundTransaction?.createdAt, 'DD/MM/YYYY, HH:mm')}`,
    },
    {
      label: 'Chương trình',
      value: fundTransaction?.metaData?.productDetailInfo?.name || '',
    },
    {
      label: 'Số tiền',
      value: `${ConverterUtils.formatNumber((fundTransaction?.metaData?.amount || 0).toFixed(0))} VNĐ`,
    },
    {
      label: 'Số lượng ước tính',
      value: fundTransaction?.metaData?.amount
        ? ConverterUtils.formatNumber(
            NumberUtils.toFixed(
              fundTransaction?.metaData?.amount / navHistory?.[0]?.nav,
              3,
            ),
          ) || ''
        : '',
    },
  ];

  return (
    <div className="payment-confirmation-fund">
      <div className="payment-confirmation-fund-header">
        <BuyFundSuccessIcon />
        <h2>Xác thực lệnh mua</h2>
        <p>
          Cảm ơn Quý khách đã đầu tư vào chứng chỉ quỹ của VinaCapital. Để lệnh
          đặt mua có hiệu lực, quý khách vui lòng thực hiện thanh toán lệnh mua
        </p>
      </div>

      <div className="payment-confirmation-fund-content">
        <Row gutter={[32, 32]}>
          <Col {...{ xs: 24, sm: 24, md: 24 }}>
            <div className="payment-confirmation-fund-content-left">
              {dataPaymentConfirmation?.map((item, index) => (
                <PaymentConfirmationFundItemViewer item={item} key={index} />
              ))}
            </div>
          </Col>
        </Row>
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
          }}
        >
          Thanh toán ngay
        </HButton>
      </div>
    </div>
  );
};

export default PaymentConfirmationFund;

export const PaymentConfirmationFundItemViewer = ({ item }) => {
  return (
    <div className="payment-confirmation-fund-item-viewer">
      <span className="payment-confirmation-fund-item-viewer-label">
        {item?.label}
      </span>
      <span className="payment-confirmation-fund-item-viewer-value">
        {item?.value}
      </span>
      {item?.unit && (
        <span className="payment-confirmation-fund-item-viewer-label">
          {' '}
          {item?.unit}
        </span>
      )}
    </div>
  );
};
