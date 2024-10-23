import { QUESTION_TYPES } from '@components/shared/questions/question/types';
import SurveyResultContentSelectionResult from './survey-result-content.selection-result';
import SurveyResultContentTextSelectionResult from './survey-result-content.text-selection-result';

const SurveyResultContentDisplayResult = ({
  isAnswered,
  resultData,
  questionData,
}) => {
  const { type } = questionData;
  if (!isAnswered) {
    return '----';
  }
  if (type === QUESTION_TYPES.OPEN_ENDED) {
    return resultData.content || '';
  }
  if (type === QUESTION_TYPES.OPEN_ENDED_NUMBER) {
    return (
      `${resultData.content || ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
    );
  }
  if (type === QUESTION_TYPES.IMAGE_SELECTION) {
    return (
      <SurveyResultContentSelectionResult {...{ resultData, questionData }} />
    );
  }
  if (type === QUESTION_TYPES.TEXT_SELECTION) {
    return (
      <SurveyResultContentTextSelectionResult
        {...{ resultData, questionData }}
      />
    );
  }
  return null;
};

export default SurveyResultContentDisplayResult;
