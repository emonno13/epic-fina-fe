import { Button } from 'antd';

const SurveyQuestionsFormFooter = ({ onNextQuestion }) => {
  return (
    <div className="survey-questions-form__footer">
      {/* <Button onClick={onNextQuestion}>Skip</Button> */}
      <Button onClick={onNextQuestion} type="primary">
				Tiếp tục
      </Button>
    </div>
  );
};

export default SurveyQuestionsFormFooter;
