const PreviewTextSelectionQuestionAnswer = ({ data, onChange, isSelected }) => {
  const { content } = data;
  return (
    <div
      className={`preview-text-selection-question__answer ${
        isSelected && 'preview-text-selection-question__answer-selected'
      }`}
      onClick={onChange}
    >
      {content}
    </div>
  );
};

export default PreviewTextSelectionQuestionAnswer;
