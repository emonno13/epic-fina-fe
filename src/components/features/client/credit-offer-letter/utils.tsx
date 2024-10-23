import {
  CALCULATION_QUESTION_CODE,
  QUESTION_TYPES,
} from '@components/shared/questions/question/types';
import { ConverterUtils } from '@lib/converter';
import { CreditOfferLetterListGenerateArrayItem } from './credit-offer-letter-list-with-label';

export const PLAN_INFOMATION_QUESTION_CODE = [
  CALCULATION_QUESTION_CODE.QUESTION_LA_INCOME,
  CALCULATION_QUESTION_CODE.QUESTION_LA_COST_PER_MONTH,
  CALCULATION_QUESTION_CODE.QUESTION_LA_REAL_INTEREST_RATE,
  CALCULATION_QUESTION_CODE.QUESTION_LA_BORROWED_TIME,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_LOAN_DEMAND,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_LOAN_PLAN,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_INCOME,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_ACCUMULATED_ASSETS,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_REPAYMENT_PERIOD,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_EVALUATE_PLAN,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_EVALUATE_SOURCE_OF_INCOME,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_EVALUATE_CREDIT_HISTORY,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_EVALUATE_BORROWING_AGE_AND_PROPERTY_OWNER_AGE,
];

export const EVALUATE_QUESTION_CODE = [
  CALCULATION_QUESTION_CODE.QUESTION_LPC_CREDIT_HISTORY,
  CALCULATION_QUESTION_CODE.QUESTION_LPC_EVALUATE_MORTAGE_TYPE,
];

export const getSurveyResultByCode = (surveyResult, code) => {
  const { surveyDetails = [] } = surveyResult || {};

  if (!Array.isArray(surveyDetails) || surveyDetails.length === 0) {
    return;
  }
  return (
    surveyDetails.find(
      (surveyDetail) => surveyDetail?.questionData?.code === code,
    ) || {}
  );
};

export const getCreditOfferLetterCustomerEmail = (surveyResult) => {
  return (
    getSurveyResultByCode(surveyResult, 'QUESTION_LPC_EMAIL')?.content || ''
  );
};

export const getCreditOfferLetterCustomerName = (surveyResult) => {
  return (
    getSurveyResultByCode(surveyResult, 'QUESTION_LPC_NAME')?.content || ''
  );
};

export const getCreditOfferLetterListGenenrateArray = (
  surveyResult,
  questionCodes: string[] = [],
): CreditOfferLetterListGenerateArrayItem[] => {
  const { surveyDetails = [] } = surveyResult || {};

  if (!Array.isArray(surveyDetails) || surveyDetails.length === 0) {
    return [];
  }
  return surveyDetails
    .filter((surveyDetail) =>
      questionCodes.includes(surveyDetail?.questionData?.code),
    )
    .map((surveyDetail) => {
      const {
        type,
        questionData,
        selectedOptions = [],
        content,
      } = surveyDetail || {};

      let value = '';

      switch (type) {
        case QUESTION_TYPES.TEXT_SELECTION:
          value = selectedOptions
            .map((option) => option?.content || '')
            .join(', ');
          break;
        case QUESTION_TYPES.DATE:
          value = ConverterUtils.dateConverterToString(content);
          break;
        case QUESTION_TYPES.OPEN_ENDED_NUMBER:
          value = `${ConverterUtils.formatNumber(content)} ${questionData?.suffix || ''}`;
          break;
        default:
          value = content;
      }
      return {
        label: questionData?.content?.blocks?.[0]?.text || '',
        value,
      };
    });
};
