import { Button } from 'antd';

const SurveyResultFooter = ({ form, onChangeResult }) => {
  const onNext = () => {
    form.submit();
  };

  return (
    <div className="survey-result__footer">
      <span onClick={onChangeResult} className="survey-result__footer__change">
				Thay đổi
      </span>
      <Button onClick={onNext} type="primary">
				Tiếp tục
      </Button>
    </div>
  );
};

export default SurveyResultFooter;
