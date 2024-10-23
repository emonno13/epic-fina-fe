import PaymentConfirmationQRCode from '@components/features/client/fund-certificate/buy-fund/payment-confirmation-qr-code';
import { Col, Divider, Empty, Row } from 'antd';
import { ConverterUtils } from 'lib/converter';
import { useHTranslation } from 'lib/i18n';
import { isEmpty } from 'underscore';
import { DescriptionItem } from './drawer-transaction-detail';

export const TransactionBuyDetail = ({ record }) => {
  const { t } = useHTranslation('admin');
  if (isEmpty(record)) return <Empty />;
  const {
    productName,
    productProgramName,
    orderType,
    createAt,
    sessionTime,
    netAmount,
    transactionPartnerLog,
  } = record;

  const investmentInformationData = [
    {
      title: t('Investment funds', { vn: 'Quỹ đầu tư' }),
      content: productName,
    },
    {
      title: t('Program', { vn: 'Chương trình' }),
      content: productProgramName,
    },
    { title: t('Program type', { vn: 'Loại lệnh' }), content: orderType?.name },
    {
      title: t('Order date', { vn: 'Ngày đặt lệnh' }),
      content: ConverterUtils.fullDatetimeConverter(createAt),
    },
    {
      title: t('Session time', { vn: 'Phiên giao dịch' }),
      content: ConverterUtils.dateConverterToString(sessionTime),
    },
    {
      title: t('Buy money', { vn: 'Số tiền mua' }),
      content: `${ConverterUtils.formatNumber(netAmount)} VND`,
    },
  ];
  const infoBankData = [
    {
      title: t('Bank', { vn: 'Ngân hàng' }),
      content: transactionPartnerLog?.productDetailInfo?.dataBank?.name || '',
    },
    {
      title: t('Bank account number', { vn: 'Số tài khoản' }),
      content: transactionPartnerLog?.productDetailInfo?.bankNumber || '',
      isCopy: true,
    },
    {
      title: t('Price', { vn: 'Số tiền thanh toán' }),
      content: `${ConverterUtils.formatNumber(transactionPartnerLog?.metaData?.amount || '')} VNĐ`,
    },
    {
      title: `${t('Content', { vn: 'Nội dung' })} (${t('Cant change', { vn: 'Không được thay đổi' })})`,
      content: transactionPartnerLog?.metaData?.transferContent,
      isCopy: true,
    },
    {
      title: t('Bank account', { vn: 'Tài khoản' }),
      content: transactionPartnerLog?.productInfo?.name,
      isCopy: true,
    },
  ];

  return (
    <div>
      <p className="site-description-item-profile-p">
        {t('Investment information', { vn: 'Thông tin đầu tư' })}
      </p>
      <Row>
        {investmentInformationData.map((item: any, i: number) => {
          return (
            <Col key={`investment-information-${i}`} span={24}>
              <DescriptionItem title={item.title} content={item.content} />
            </Col>
          );
        })}
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">
        {t('Transfer information', { vn: 'Thông tin chuyển khoản' })}
      </p>
      <Row>
        <Col span={24}>
          <div>
            {t('You are choosing a bank transfer method.', {
              vn: 'Bạn đang chọn phương thức chuyển khoản qua ngân hàng.',
            })}
          </div>
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">
        {t('Bank account', { vn: 'Tài khoản thụ hưởng' })}
      </p>
      <Row>
        {infoBankData.map((item: any, i: number) => {
          return (
            <Col key={`investment-information-${i}`} span={24}>
              <DescriptionItem title={item.title} content={item.content} />
            </Col>
          );
        })}
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">
        {t('Payment via QR Code', { vn: 'Thanh toán qua QR Code' })}
      </p>
      <PaymentConfirmationQRCode
        showConfirmMessage={false}
        data={{
          productDetailInfo: transactionPartnerLog?.productDetailInfo,
          amount: transactionPartnerLog?.metaData?.amount,
          transferContent: transactionPartnerLog?.metaData?.investmentNumber,
        }}
      />
    </div>
  );
};
