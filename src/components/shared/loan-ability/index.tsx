import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import cls from 'classnames';
import { DEFAULT_BORROWED_TIME } from './constants';
import { LoanAbilityType, useLoanAbility } from './hooks';
import LoanAbilityResult from './loan-ability-result';

import './loan-ability.module.scss';

export const LoanAbilityInfoItem = ({ label, value, suffix }) => {
  return (
    <div className="loan-ability-info-item">
      <p className="loan-ability-info-item__label">{label}:</p>
      <p className="loan-ability-info-item__value">
        {ConverterUtils.formatNumber(value)}
        {suffix}
      </p>
    </div>
  );
};

const LoanAbility = (props: LoanAbilityType) => {
  const { borrowedTime = DEFAULT_BORROWED_TIME, realInterestRate } = props;

  const {
    loanableAmount,
    totalAnnuallyPayment,
    totalMonthlyPayment,
    rootMonthlyPayment,
    interestMonthlyPayment,
  } = useLoanAbility(props);
  const { t } = useHTranslation('common');
  return (
    <div className={cls('loan-ability', props?.className || '')}>
      <p className="loan-ability-title">Kết quả khảo sát khả năng vay</p>
      <div className="loan-ability-info">
        <LoanAbilityInfoItem
          {...{
            label: 'Lãi suất thực (hằng năm)',
            value: realInterestRate,
            suffix: '%',
          }}
        />
        <LoanAbilityInfoItem
          {...{
            label: 'Thời gian vay',
            value: borrowedTime,
            suffix: ' năm',
          }}
        />
      </div>
      <LoanAbilityResult
        {...{
          loanableAmount,
          totalAnnuallyPayment,
          totalMonthlyPayment,
          rootMonthlyPayment,
          interestMonthlyPayment,
        }}
      />
    </div>
  );
};

export default LoanAbility;
