import { Col, Row } from 'antd';
import {
  mappingTypeOfFund,
  TYPE_OF_FUND,
} from '@components/features/fina/products/fund/constants';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import ChartPie from './chart-pie';
import {
  IconGrowUp,
  IconNetAssetValue,
  IconProfit,
  IconSaving,
} from './constants';

import './styles.module.scss';

const calcMoney = (values) => {
  return values?.reduce(
    (totalPrice, product: any) =>
      totalPrice + (product?.navCurrent ?? 0) * (product?.holdingVolume ?? 0),
    0,
  );
};

const ProfileAssetManagementStatistics = ({ dataFund }) => {
  const { t } = useHTranslation('common');

  const calcMoneyInvested = (values) => {
    return values?.reduce(
      (totalPrice, product: any) =>
        totalPrice +
        (product?.navInvested ?? 0) * (product?.holdingVolume ?? 0),
      0,
    );
  };

  const totalAmount = calcMoney(dataFund);
  const totalAmountInvested = calcMoneyInvested(dataFund);

  const amountOfBondTypeFund = dataFund.filter(
    (product: any) => product?.info?.typeOfFund === TYPE_OF_FUND.BOND,
  );
  const amountOfBalanceTypeFund = dataFund.filter(
    (product: any) => product?.info?.typeOfFund === TYPE_OF_FUND.BALANCED,
  );
  const amountOfStockTypeFund = dataFund.filter(
    (product: any) => product?.info?.typeOfFund === TYPE_OF_FUND.STOCK,
  );
  const amountOfIpoTypeFund = dataFund.filter(
    (product: any) => product?.info?.typeOfFund === TYPE_OF_FUND.IPO,
  );

  const dataStatistics = [
    {
      icon: <IconSaving />,
      label: t('profile.invested'),
      value: Math.round(totalAmountInvested),
      type: 'saving',
    },
    {
      icon: <IconNetAssetValue />,
      label: t('profile.netAsset'),
      value: Math.round(totalAmount),
      type: 'net-asset',
    },
    {
      icon: <IconProfit />,
      label: t('profile.profit'),
      value: Math.round(totalAmount - totalAmountInvested),
      type: 'profit',
    },
  ];

  const legends = [
    {
      label: mappingTypeOfFund[TYPE_OF_FUND.BOND],
      value: amountOfBondTypeFund,
      color: '#F382C0',
    },
    {
      label: mappingTypeOfFund[TYPE_OF_FUND.BALANCED],
      value: amountOfBalanceTypeFund,
      color: '#FF8536',
    },
    {
      label: mappingTypeOfFund[TYPE_OF_FUND.STOCK],
      value: amountOfStockTypeFund,
      color: '#716FFF',
    },
    {
      label: mappingTypeOfFund[TYPE_OF_FUND.IPO],
      value: amountOfIpoTypeFund,
      color: '#007AFF',
    },
  ];

  return (
    <div className="profile-asset-management-statistics">
      <Row>
        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <div className="profile-asset-management-statistics-left">
            <Statistics dataStatistics={dataStatistics} />
          </div>
        </Col>

        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <div className="profile-asset-management-statistics-right">
            <div className="profile-asset-management-statistics-chart">
              <ChartPie
                dataChart={[
                  Math.round(calcMoney(amountOfBondTypeFund)),
                  Math.round(calcMoney(amountOfBalanceTypeFund)),
                  Math.round(calcMoney(amountOfStockTypeFund)),
                  Math.round(calcMoney(amountOfIpoTypeFund)),
                ]}
              />
            </div>
            <StatisticsLegends legends={legends} totalAmount={totalAmount} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileAssetManagementStatistics;

const StatisticsLegends = ({ legends, totalAmount }) => {
  const { t } = useHTranslation('common');

  return (
    <div className="profile-asset-management-statistics-legends">
      <h2 className="profile-asset-management-statistics-legends-title">
        {t('profile.capitalAllocation')}
      </h2>
      <div className="profile-asset-management-statistics-legends-content">
        {legends?.map((legend, index) => (
          <div
            key={index}
            className="profile-asset-management-statistics-legend"
          >
            <span
              style={{ background: legend?.color }}
              className="legend-color"
            ></span>
            <span className="legend-label"> {legend?.label}</span>
            <span className="legend-value">
              {' '}
              {legend?.value.length > 0
                ? ((calcMoney(legend?.value) / totalAmount) * 100)?.toFixed(2)
                : 0}
              %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Statistics = ({ dataStatistics }) => {
  return (
    <Row>
      {dataStatistics?.map((item, index) => (
        <Col key={index} {...{ xs: 8, sm: 8, md: 8 }}>
          <div className="profile-asset-management-statistics-item">
            {item?.icon}
            <div className="profile-asset-management-statistics-label">
              {item?.label}
            </div>
            <div className="profile-asset-management-statistics-value">
              <span
                className={`${item.type === 'profit' ? (item?.value >= 0 ? 'increase' : 'reduce') : ''}`}
              >
                {ConverterUtils.formatNumber(item?.value)} <sup>đ</sup>
                &nbsp;
                {item.type === 'profit' && <IconGrowUp />}
              </span>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
