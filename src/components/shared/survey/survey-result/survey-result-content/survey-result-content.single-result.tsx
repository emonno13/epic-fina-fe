import { CheckCircleFilled } from '@ant-design/icons';
import HQuestionMegadraftEditor from '@components/shared/questions/question/h-question-megadraft-editor';
import { useMemo } from 'react';
import SurveyResultContentDisplayResult from './survey-result-content.display-result';

const SurveyResultContentSingleResult = ({ resultData, questionData }) => {
  const isAnswered = useMemo(
    () => !!(resultData?.content || resultData?.selectedOptions?.length),
    [resultData],
  );

  return (
    <div
      className={`survey-result-content-single ${
        !isAnswered && 'survey-result-content-single-not-answered'
      }`}
    >
      <div className="survey-result-content-single__title">
        <HQuestionMegadraftEditor initValue={questionData?.content} readOnly />
        {isAnswered && (
          <CheckCircleFilled className="survey-result-content-single__title__icon" />
        )}
      </div>
      <div className="survey-result-content-single__result">
        <SurveyResultContentDisplayResult
          {...{ isAnswered, questionData, resultData }}
        />
      </div>
    </div>
  );
};

export default SurveyResultContentSingleResult;
