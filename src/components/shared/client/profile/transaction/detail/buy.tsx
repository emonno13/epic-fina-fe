import { Col, Empty, Row, Tag } from 'antd';
import { isEmpty } from 'underscore';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { mappingColorBuyOrderStatus } from '@components/features/profiles/transaction-management/components/constants';
import PaymentConfirmationQRCode from './payment-confirmation-qr-code';
// import { DescriptionItem } from '@components/features/profiles/transaction-management/components/drawer-transaction-detail';

export const TransactionBuyDetail = ({ record }) => {
  const { t } = useHTranslation('admin');
  if (isEmpty(record)) return <Empty />;
  const {
    code,
    productName,
    productProgramName,
    orderType,
    createAt,
    sessionTime,
    netAmount,
    transactionPartnerLog,
  } = record;

  const investmentInformationData = [
    // { title: t('Investment funds', { vn: 'Quỹ đầu tư' }), content: productName },
    { title: t('Code', { vn: 'Mã lệnh' }), content: code },
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
      content: `${ConverterUtils.formatNumber(netAmount)}đ`,
    },
  ];
  const infoBankData = [
    {
      title: t('Phương thức thanh toán', { vn: 'Phương thức thanh toán' }),
      content: 'Chuyển khoản qua ngân hàng',
    },
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
      title: t('Bank account', { vn: 'Tài khoản' }),
      content: transactionPartnerLog?.productInfo?.name,
      isCopy: true,
    },
    {
      title: t('Price', { vn: 'Số tiền thanh toán' }),
      content: `${ConverterUtils.formatNumber(transactionPartnerLog?.metaData?.amount || '')}đ`,
    },
    {
      title: `${t('Content', { vn: 'Nội dung' })}`,
      content: transactionPartnerLog?.metaData?.transferContent,
      isCopy: true,
    },
  ];

  console.log('record===', record);
  const color = mappingColorBuyOrderStatus(record?.statusName);

  return (
    <div>
      <div style={{ borderBottom: '1px solid #E0E1E4', marginBottom: '25px' }}>
        <h2>Chi tiết lệnh mua</h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12} className="profile-description-item-transaction">
          <p className="site-description-item-title">
            {t('Investment information', { vn: 'Thông tin đầu tư' })}
          </p>
          <Row className="site-description-item-content">
            <Col span={24}>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <img
                  src={record?.product?.org?.avatar?.url}
                  alt=""
                  width={70}
                  height={70}
                  style={{
                    borderRadius: '4px',
                    marginRight: '15px',
                    border: '1px solid #cbe3fc',
                  }}
                />
                <div>
                  <span style={{ fontWeight: 'bold' }}>{productName}</span>
                  <br />
                  <span>{productProgramName}</span>
                  <br />
                  <Tag style={{ fontSize: '10px' }} color={color}>
                    {record?.statusName}
                  </Tag>
                </div>
              </div>
            </Col>
            {investmentInformationData.map((item: any, i: number) => {
              return (
                <Col key={`investment-information-${i}`} span={24}>
                  <DescriptionItem title={item.title} content={item.content} />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={12} className="profile-description-item-transaction">
          <p className="site-description-item-title">
            {t('Bank account', { vn: 'Tài khoản thụ hưởng' })}
          </p>
          <Row className="site-description-item-content">
            {infoBankData.map((item: any, i: number) => {
              return (
                <Col key={`investment-information-${i}`} span={24}>
                  <DescriptionItem title={item.title} content={item.content} />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={24} className="profile-description-item-transaction">
          <p className="site-description-item-title">
            {t('Payment via QR Code', { vn: 'Thanh toán qua QR Code' })}
          </p>
          <div className="site-description-item-content">
            <PaymentConfirmationQRCode
              showConfirmMessage={false}
              data={{
                productDetailInfo: transactionPartnerLog?.productDetailInfo,
                amount: transactionPartnerLog?.metaData?.amount,
                transferContent:
                  transactionPartnerLog?.metaData?.investmentNumber,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const DescriptionItem = ({ title, content, icon = '' }: any) => (
  <div style={{ display: 'flex' }}>
    {icon && <div style={{ width: '180px' }}>{icon}</div>}
    {title && (
      <p
        style={{ width: '180px' }}
        className="site-description-item-profile-p-content"
      >
        {title}:{' '}
      </p>
    )}
    <p style={{ width: 'calc(100% - 180px)' }}>{content}</p>
  </div>
);
