const SurveyResultContentTextSelectionResult = ({ questionData, resultData }) => {
  const allanswers = questionData?.answers || [];
  const selectedOptions = resultData?.selectedOptions || [];
  const selectedAnswers = allanswers.filter((_, index) =>
    selectedOptions.some(({ optionIndex }) => optionIndex === index),
  );
  return (
    <div className="survey-result-content-single__result__selection">
      {selectedAnswers.map((answer, index) => (
        <div
          className="survey-result-content-single__result__selection__item"
          key={`${questionData.id}-${index}`}
        >
          <span>{answer.content}</span>
        </div>
      ))}
    </div>
  );
};

export default SurveyResultContentTextSelectionResult;
