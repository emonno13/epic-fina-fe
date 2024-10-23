import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { useIsMobile } from '@lib/hooks/use-media';
import HCard from '../../../common/h-card';
import { TYPE_ACTIONS, TYPE_OF_PROFIT } from '../../bond-list/constants';
import { BondInformationItem } from '../common/bond-information-item';
import ClientBondTransactionForm from '../../bond-list/bond-list-main/bond-list-main.form-transaction';

import './bond-detail-main.information.module.scss';

const ClientBondDetailItem = (props) => {
  const { t } = useHTranslation('common');
  const { bondDetail } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const { info = {}, org = {}, sku, productCodeOfTheInvestor } = bondDetail;
  const { name } = org;
  const {
    typeOfProfit,
    bondMaturity,
    interestPeriod,
    parValueShares,
    totalReleaseVolume,
    releaseDate,
    maturityDate,
    tax,
  } = info;

  const interests = info?.interestRate?.filter((e) => e?.rate) || [];
  const maxInterest = interests.length
    ? interests.reduce((a, b) => (a.rate > b.rate ? a : b))
    : 0;

  const bondInformationItemsInLeft = [
    {
      label: t('Bond term', { vn: 'Kì hạn trái phiếu' }),
      content: `${bondMaturity} ${t('month', { vn: 'tháng' })}`,
    },
    {
      label: t('Total par value of issue', { vn: 'Tổng mệnh giá phát hành' }),
      content: `${parValueShares && totalReleaseVolume ? ConverterUtils.getMoneyLabel(info.totalReleaseVolume * info.parValueShares, t) : '_'}`,
    },
    {
      label: t('Denominations', { vn: 'Mệnh giá' }),
      content: (
        <div>
          <div>{FormatterUtils.formatAmount(info?.parValueShares)}</div>
          <Typography.Text italic className={'denomination__addon'}>
            {t('VNĐ/bond', { vn: 'VNĐ/trái phiếu' })}
          </Typography.Text>
        </div>
      ),
    },
    {
      label: t('Offering volume', { vn: 'Khối lượng chào bán' }),
      content: `${FormatterUtils.formatAmount(info?.totalReleaseVolume)} ${t('bond', { vn: 'trái phiếu' })}`,
    },
    {
      label: t('Interest rate', { vn: 'Lãi suất' }),
      content: `${maxInterest?.rate || '_'}%/ ${t('year', { vn: 'Năm' })}`,
    },
    {
      label: t('Interest payment period', { vn: 'Kỳ trả lãi' }),
      content:
        typeOfProfit === TYPE_OF_PROFIT.PERIODIC
          ? `${interestPeriod} ${t('month', { vn: 'tháng' })}`
          : `${t('Get profit at the end of the period', { vn: 'Nhận lãi cuối kì' })}`,
    },
    {
      label: t('Release date', { vn: 'Ngày phát hành' }),
      content: `${ConverterUtils.dateConverterToString(releaseDate)}`,
    },
    {
      label: t('Transaction fee', { vn: 'Phí giao dịch' }),
      content: `${FormatterUtils.formatAmount(tax || 0)} %`,
    },
  ];

  const bondInformationItemsInRight = [
    {
      label: t('Product code', { vn: 'Mã sản phẩm' }),
      content: `${sku}`,
    },
    {
      label: t('TCPH name', { vn: 'Tên TCPH' }),
      content: `${name}`,
    },
    {
      label: t('Bond code', { vn: 'Mã trái phiếu' }),
      content: `${productCodeOfTheInvestor}`,
    },
    {
      label: t('Date due', { vn: 'Ngày đáo hạn' }),
      content: `${ConverterUtils.dateConverterToString(maturityDate)}`,
    },
  ];

  return (
    <div className={'bond-detail--information'}>
      <h2 className={'bond-detail--information__name'}>
        {bondDetail?.name || t('Bond', { vn: 'Trái Phiếu' })}
      </h2>

      <Row
        gutter={[
          { xs: 12, md: 24 },
          { xs: 0, md: 0 },
        ]}
        className={'bond-detail--information__content'}
      >
        <Col xs={24} md={12}>
          <HCard>
            {bondInformationItemsInLeft.map((item, index) => (
              <BondInformationItem
                key={`bond-information-item-in-left-${index}`}
                label={item.label}
                content={item.content}
                type={'space-between'}
              />
            ))}
          </HCard>
        </Col>

        <Col xs={24} md={12}>
          <div className={'bond-detail--information__content__right'}>
            {bondInformationItemsInRight.map((item, index) => (
              <BondInformationItem
                key={`bond-information-item-in-right-${index}`}
                label={item.label}
                content={item.content}
                type={'down-line'}
              />
            ))}
          </div>
          {!isMobile && (
            <Button
              className="buy-button"
              block
              onClick={() => setVisible(true)}
            >
              {t('Buy', { vn: 'Mua' })}
            </Button>
          )}
        </Col>
      </Row>
      {isMobile && (
        <Button className="buy-button" block onClick={() => setVisible(true)}>
          {t('Buy', { vn: 'Mua' })}
        </Button>
      )}

      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => setVisible(false)}
        bondData={{ bond: bondDetail, type: TYPE_ACTIONS.BUY }}
      />
    </div>
  );
};

export default ClientBondDetailItem;
