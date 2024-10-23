import {
  mappingTypeOfFund,
  TYPE_OF_FUND,
} from '@components/features/fina/products/fund/constants';
import { ConverterUtils } from 'lib/converter';
import ChartPie from './chartPie';

import './tabs.scss';
const InfoInvestment = ({ dataFund = [] }) => {
  if (!dataFund.length) return null;

  const calcMoney = (values) => {
    return values?.reduce(
      (totalPrice, product: any) =>
        totalPrice + (product?.navCurrent ?? 0) * (product?.holdingVolume ?? 0),
      0,
    );
  };

  const totalAmount = calcMoney(dataFund);

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

  return (
    <div className="info-investment">
      <div className="info-investment-left">
        <ChartPie
          dataChart={[
            calcMoney(amountOfBondTypeFund),
            calcMoney(amountOfBalanceTypeFund),
            calcMoney(amountOfStockTypeFund),
            calcMoney(amountOfIpoTypeFund),
          ]}
        />
      </div>
      <div className="info-investment-right">
        <div className="statistic-group">
          <StatisticItem
            label={mappingTypeOfFund[TYPE_OF_FUND.BOND]}
            value={`${((calcMoney(amountOfBondTypeFund) / totalAmount) * 100)?.toFixed(2)}%`}
            color={'#76FFFF'}
          />
          <StatisticItem
            label={mappingTypeOfFund[TYPE_OF_FUND.BALANCED]}
            value={`${((calcMoney(amountOfBalanceTypeFund) / totalAmount) * 100)?.toFixed(2)}%`}
            color={'#FF8536'}
          />
        </div>
        <div className="statistic-group">
          <StatisticItem
            label={mappingTypeOfFund[TYPE_OF_FUND.STOCK]}
            value={`${((calcMoney(amountOfStockTypeFund) / totalAmount) * 100)?.toFixed(2)}%`}
            color={'#FBE947'}
          />
          <StatisticItem
            label={mappingTypeOfFund[TYPE_OF_FUND.IPO]}
            value={`${((calcMoney(amountOfIpoTypeFund) / totalAmount) * 100)?.toFixed(2)}%`}
            color={'#FF4FB8'}
          />
        </div>
        <ItemTotal
          label={'Giá trị đầu tư'}
          value={`${ConverterUtils.formatNumber(totalAmount.toFixed(0))} VND`}
        />
      </div>
    </div>
  );
};

export default InfoInvestment;

const StatisticItem = ({ label, value, color = '#76FFFF' }) => {
  return (
    <div className="info">
      <div className="label">
        <div className="color-label" style={{ background: color }} />
        <span className="main-label">{label}</span>
      </div>
      <div className="value">{value}</div>
    </div>
  );
};

const ItemTotal = ({ label, value }) => {
  return (
    <div className="item-total">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
};
