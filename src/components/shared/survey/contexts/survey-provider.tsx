import { CALCULATION_QUESTION_GROUP_CODE } from '@components/shared/questions/question/types';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { useMemo, useState } from 'react';
import { SurveyContext } from './survey-context';

export const SurveyProvider = ({ children }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showLoanAbility, setShowLoanAbility] = useState<boolean>(false);
  const [submitedSurvey, setSubmitedSurvey] = useState<any>({});
  const [preserveValues, setPreserveValues] = useState<any>({
    surveyDetails: [],
  });
  const survey = useDocumentDetail('survey') || {};

  const isLoanCalculation = useMemo(() => {
    const { code, pairingQuestionGroups = [] } = survey;

    return (
      code === CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY ||
      (Array.isArray(pairingQuestionGroups) &&
        pairingQuestionGroups.some(
          (questionGroup) =>
            questionGroup?.code ===
            CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY,
        ))
    );
  }, [survey]);

  return (
    <SurveyContext.Provider
      value={{
        questionIndex,
        setQuestionIndex,
        submitSuccess,
        setSubmitSuccess,
        submitedSurvey,
        setSubmitedSurvey,
        preserveValues,
        setPreserveValues,
        showLoanAbility,
        setShowLoanAbility,
        isLoanCalculation,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
