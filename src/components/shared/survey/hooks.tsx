import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { usePairingQuestionGroupByCode, useSurveyDetailContentByQuestionCode } from './contexts/survey-hooks';
import { DEFAULT_DTI_INDEX } from '../loan-ability/constants';
import { CALCULATION_QUESTION_CODE, CALCULATION_QUESTION_GROUP_CODE } from '../questions/question/types';

export const useRedirectToSurveyResultPage = () => {
  const { push } = useRouter();
  const borrowedTime = useSurveyDetailContentByQuestionCode(CALCULATION_QUESTION_CODE.QUESTION_LA_BORROWED_TIME);
  const realInterestRate = useSurveyDetailContentByQuestionCode(CALCULATION_QUESTION_CODE.QUESTION_LA_REAL_INTEREST_RATE);
  const totalCost = useSurveyDetailContentByQuestionCode(CALCULATION_QUESTION_CODE.QUESTION_LA_COST_PER_MONTH);
  const totalIncome = useSurveyDetailContentByQuestionCode(CALCULATION_QUESTION_CODE.QUESTION_LA_INCOME);
  const loanAbilityQuestionGroup = usePairingQuestionGroupByCode(CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY);

  const dtiIndex = useMemo(() => loanAbilityQuestionGroup?.metadata?.dtiIndex || DEFAULT_DTI_INDEX, [loanAbilityQuestionGroup]);

  return useCallback(() => {
    const surveyResultLinkParams: any = {
      borrowedTime,
      realInterestRate,
      totalCost,
      totalIncome,
      dtiIndex,
    };
    const surveyResultLinkParamsString = Object.keys(surveyResultLinkParams).map((key: string) => `${key}=${surveyResultLinkParams[key]}`).join('&');
    push(`/ket-qua-khao-sat-kha-nang-vay?${surveyResultLinkParamsString}`);
  }, [borrowedTime, realInterestRate, totalCost, totalIncome, dtiIndex]);
};
