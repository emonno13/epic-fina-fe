import { ConverterUtils } from '@lib/converter';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SurveyLoanAbility from '../survey/survey-loan-ability';

import './borrowing-ability-survey-result.module.scss';

const HomeLoanListWithFetching = dynamic(
  () =>
    import('../client/home-loan-list').then(
      ({ HomeLoanListWithFetching }) => HomeLoanListWithFetching,
    ) as any,
  {
    ssr: false,
  },
);

const BorrowingAbilitySurveyResult = () => {
  const { query } = useRouter();
  const { borrowedTime, realInterestRate, totalCost, totalIncome, dtiIndex } =
    query;
  return (
    <div className="survey-container">
      <div className="borrowing-ability-survey-result">
        <SurveyLoanAbility
          {...{
            borrowedTime:
              ConverterUtils.convertQueryParamToNumber(borrowedTime),
            realInterestRate:
              ConverterUtils.convertQueryParamToNumber(realInterestRate),
            totalCost: ConverterUtils.convertQueryParamToNumber(totalCost),
            totalIncome: ConverterUtils.convertQueryParamToNumber(totalIncome),
            dtiIndex: ConverterUtils.convertQueryParamToNumber(dtiIndex),
          }}
        />
        <HomeLoanListWithFetching />
      </div>
    </div>
  );
};

export default BorrowingAbilitySurveyResult;
