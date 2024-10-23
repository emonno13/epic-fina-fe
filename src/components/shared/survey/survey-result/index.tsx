import SurveyResultContent from './survey-result-content';
import SurveyResultFooter from './survey-result.footer';

const SurveyResult = ({ form, onChangeResult, result }) => {
  return (
    <div className="survey-result">
      <div className="survey-result__title">Các câu trả lời của bạn</div>
      <SurveyResultContent {...{ result }} />
      <SurveyResultFooter {...{ form, onChangeResult }} />
    </div>
  );
};

export default SurveyResult;
