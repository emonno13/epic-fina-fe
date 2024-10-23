import LoanAbility from '@components/shared/loan-ability';
import { BASE_QUESTION_CODE } from '@components/shared/questions/question/types';
import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import { getSurveyResultByCode } from '../utils';

import './credit-offer-letter-calculation.module.scss';

const CreditOfferLetterCalculation = () => {
  const taskData = useClientDocumentDetail();
  const surveyResult = taskData?.surveyResult || [];
  const getSurveyResult = (code) => {
    return getSurveyResultByCode(surveyResult, code)?.content || '';
  };
  return (
    <div id="calculation">
      <CreditOfferLetterBodyContainer
        {...{
          title: 'Bảng tính khả năng vay sơ bộ:',
          preface:
            'Dựa trên các thông tin mà quý khách đã cung cấp, chúng tôi gửi đến quý khách khả năng vay như sau:',
          className: 'credit-offer-letter-calculation',
        }}
      >
        <LoanAbility
          {...{
            totalIncome: +getSurveyResult(
              BASE_QUESTION_CODE.QUESTION_LC_INCOME,
            ),
            totalCost: +getSurveyResult(
              BASE_QUESTION_CODE.QUESTION_LC_COST_PER_MONTH,
            ),
            realInterestRate: +getSurveyResult(
              BASE_QUESTION_CODE.QUESTION_LC_RATE,
            ),
            borrowedTime: +(
              getSurveyResult(BASE_QUESTION_CODE.QUESTION_LC_BORROWED_TIME) ||
              20
            ),
            className: 'credit-offer-letter-calculation__result',
          }}
        />
        <p className="credit-offer-letter-calculation__note">
          Quý khách lưu ý bảng tính trên chúng tôi dựa trên một số quy định
          chung của các ngân hàng đối tác của chúng tôi và đây không phải là kết
          quả cho vay cuối cùng. Đây là thông tin tham khảo giúp quý khách có
          cái nhìn sơ bộ về năng lực tài chính của quý khách.
        </p>
      </CreditOfferLetterBodyContainer>
    </div>
  );
};

export default CreditOfferLetterCalculation;
