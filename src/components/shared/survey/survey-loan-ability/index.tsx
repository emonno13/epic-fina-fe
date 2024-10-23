import { Col, Row } from 'antd';
import { useMemo } from 'react';
import LoanAbility from '@components/shared/loan-ability';
import {
  DEFAULT_BORROWED_TIME,
  DEFAULT_BORROWED_TIMES,
  DEFAULT_DTI_INDEX,
  DEFAULT_REAL_INTEREST_RATES,
} from '@components/shared/loan-ability/constants';
import { useHTranslation } from '@lib/i18n';

import './survey-loan-ability.module.scss';

const SurveyLoanAbility = (props) => {
  const {
    borrowedTime,
    realInterestRate,
    totalCost,
    totalIncome,
    dtiIndex = DEFAULT_DTI_INDEX,
  } = props;
  const { t } = useHTranslation('common');

  const loanAbilities = useMemo(() => {
    const normalizedDtiIndex = dtiIndex || DEFAULT_DTI_INDEX;
    const defaultLoanAbilityItem = {
      totalCost,
      totalIncome,
      dtiIndex: normalizedDtiIndex,
    };
    if (realInterestRate && !borrowedTime) {
      return DEFAULT_BORROWED_TIMES.map((time) => ({
        ...defaultLoanAbilityItem,
        borrowedTime: time,
        realInterestRate,
      }));
    }
    if (!realInterestRate && borrowedTime) {
      return DEFAULT_REAL_INTEREST_RATES.map((rate) => ({
        ...defaultLoanAbilityItem,
        borrowedTime,
        realInterestRate: rate,
      }));
    }
    if (realInterestRate && borrowedTime) {
      return Array.from(Array(3)).map((_, index) => ({
        ...defaultLoanAbilityItem,
        borrowedTime,
        realInterestRate: realInterestRate + (index - 1) * 1,
      }));
    }
    return DEFAULT_REAL_INTEREST_RATES.map((defaultRealInterestRate) => ({
      ...defaultLoanAbilityItem,
      borrowedTime: DEFAULT_BORROWED_TIME,
      realInterestRate: defaultRealInterestRate,
    }));
  }, [realInterestRate, borrowedTime, totalCost, totalIncome, dtiIndex]);

  return (
    <div className="survey-loan-ability">
      <p className="survey-loan-ability-title">
        Các kết quả khảo sát khả năng vay của bạn
      </p>
      <p className="survey-loan-ability-suggest-label">
        Dựa vào các câu trả lời của bạn, chúng tôi gợi ý{' '}
        <span>{loanAbilities.length} kết quả</span> khảo sát khả năng vay của
        bạn
      </p>
      <Row gutter={[24, 24]}>
        {loanAbilities.map((props, index) => (
          <Col key={`loan-ability-${index}`} {...{ xs: 24, sm: 24, md: 8 }}>
            <LoanAbility {...props} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SurveyLoanAbility;
