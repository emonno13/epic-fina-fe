const SurveyNavigationButton = ({
  number,
  isSelected = false,
  onClick = (f) => f,
  isAnswered = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`survey-navigation__button ${isSelected && 'survey-navigation__button-selected'} ${
        isAnswered && 'survey-navigation__button-isAnswered'
      }`}
    >
      {number}
    </div>
  );
};

export default SurveyNavigationButton;
