import { ConverterUtils } from '@lib/converter';
import { Divider } from 'antd';

const LoanAbilityResultItem = ({ label, value, suffix }) => {
  return (
    <div className="loan-ability-result-item">
      <p className="loan-ability-result-item__label">{label}</p>
      <p className="loan-ability-result-item__value">
        {ConverterUtils.formatNumber(value)} {suffix}
      </p>
    </div>
  );
};

const LoanAbilityResult = ({
  loanableAmount,
  totalAnnuallyPayment,
  totalMonthlyPayment,
  rootMonthlyPayment,
  interestMonthlyPayment,
}) => {
  return (
    <div className="loan-ability-result">
      <div className="loan-ability-result-header">
        <p>Số tiền bạn có thể vay</p>
        <p>{ConverterUtils.formatNumber(Math.floor(loanableAmount))} đ</p>
      </div>
      <div className="loan-ability-result-body">
        <LoanAbilityResultItem
          {...{
            label: 'Số tiền gốc trả hàng tháng',
            value: Math.floor(rootMonthlyPayment),
            suffix: 'đ',
          }}
        />
        <Divider
          {...{
            type: 'vertical',
            className: 'loan-ability-result-body__divider',
          }}
        />
        <LoanAbilityResultItem
          {...{
            label: 'Số tiền lãi trả hàng tháng',
            value: Math.floor(interestMonthlyPayment),
            suffix: 'đ',
          }}
        />
      </div>
    </div>
  );
};

export default LoanAbilityResult;
