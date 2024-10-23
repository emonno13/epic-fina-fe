import { createContext } from 'react';

export type SurveyContextType = {
  questionIndex: number,
  setQuestionIndex: Function,
  submitSuccess: boolean,
  setSubmitSuccess: Function,
  submitedSurvey: any,
  setSubmitedSurvey: Function,
  preserveValues: any,
  setPreserveValues: Function,
  showLoanAbility: boolean,
  setShowLoanAbility: Function,
  isLoanCalculation: boolean,
}

export const SurveyContext = createContext<SurveyContextType>({
  questionIndex: 0,
  setQuestionIndex: f => f,
  submitSuccess: false,
  setSubmitSuccess: f => f,
  submitedSurvey: {},
  setSubmitedSurvey: f => f,
  preserveValues: {},
  setPreserveValues: f => f,
  showLoanAbility: false,
  setShowLoanAbility: f => f,
  isLoanCalculation: false,
});
