import { useDocumentDetail } from '@schema-form/features/hooks';
import { useContext } from 'react';
import { SurveyContext, SurveyContextType } from './survey-context';

export function useSurveyContext(): SurveyContextType {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within an SurveyProvider');
  }
  return context;
}

export function useSurveyQuestionIndex(): number {
  const surveyContext = useSurveyContext();
  return surveyContext.questionIndex;
}

export function useSurveySetQuestionIndex(): Function {
  const surveyContext = useSurveyContext();
  return surveyContext.setQuestionIndex;
}

export function useSurveySubmitSuccess(): boolean {
  const surveyContext = useSurveyContext();
  return surveyContext.submitSuccess;
}

export function useSurveySetSubmitSuccess(): Function {
  const surveyContext = useSurveyContext();
  return surveyContext.setSubmitSuccess;
}

export function useSurveySubmitedSurvey(): boolean {
  const surveyContext = useSurveyContext();
  return surveyContext.submitedSurvey;
}

export function useSurveySetSubmitedSurvey(): Function {
  const surveyContext = useSurveyContext();
  return surveyContext.setSubmitedSurvey;
}

export function useSurveyPreserveValues(): any {
  const surveyContext = useSurveyContext();
  return surveyContext.preserveValues;
}

export function useSurveyDetails(): any[] {
  const surveyContext = useSurveyPreserveValues();
  return surveyContext.surveyDetails || [];
}

export function useSurveySetPreserveValues(): Function {
  const surveyContext = useSurveyContext();
  return surveyContext.setPreserveValues;
}

export function useSurveyShowLoanAbility(): boolean {
  const surveyContext = useSurveyContext();
  return surveyContext.showLoanAbility;
}

export function useSurveySetShowLoanAbility(): Function {
  const surveyContext = useSurveyContext();
  return surveyContext.setShowLoanAbility;
}

export function useSurveyDetailByQuestionCode(questionCode: string): any {
  const surveyDetails = useSurveyDetails();
  if (Array.isArray(surveyDetails) && surveyDetails.length > 0) {
    return surveyDetails.find(
      (detail) => detail?.questionData?.code === questionCode,
    );
  }
  return {};
}

export function useSurveyDetailContentByQuestionCode(
  questionCode: string,
): number {
  const surveyDetail = useSurveyDetailByQuestionCode(questionCode);

  return surveyDetail?.content || 0;
}

export function usePairingQuestionGroupByCode(questionGroupCode: string): any {
  const documentDetail = useDocumentDetail();

  return (
    documentDetail?.pairingQuestionGroups?.find(
      ({ code }) => code === questionGroupCode,
    ) || {}
  );
}

export function useIsLoanCalculation(): boolean {
  const surveyContext = useSurveyContext();
  return surveyContext.isLoanCalculation;
}
