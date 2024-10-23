import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Col, Empty, Row } from 'antd';
import { isEmpty } from 'underscore';
import { DescriptionItem } from './drawer-transaction-detail';

export const TransactionSellDetail = ({ record }) => {
  const { t } = useHTranslation('admin');
  if (isEmpty(record)) return <Empty />;
  const {
    productName,
    productProgramName,
    orderType,
    createAt,
    sessionTime,
    netAmount,
    volume,
    fee,
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
      title: t('Fund certificate amount', { vn: 'Số CCQ bán' }),
      content: `${ConverterUtils.formatNumber(volume)}`,
    },
    {
      title: t('Sell money', { vn: 'Số tiền bán' }),
      content: `${ConverterUtils.formatNumber(netAmount)} VND`,
    },
    {
      title: t('Fee', { vn: 'Phí' }),
      content: `${ConverterUtils.formatNumber(fee)} VND`,
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
    </div>
  );
};
