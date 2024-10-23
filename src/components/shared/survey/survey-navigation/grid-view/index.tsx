import { useDocumentDetail } from '@schema-form/features/hooks';
import SurveyNavigationButton from '../survey-navigation.button';
import { SurveyNavigationUtils } from '../utils';

const SurveyNavigationGridViewPanel = ({
  result,
  currentIndex,
  onNavigate,
}) => {
  const questionGroup = useDocumentDetail();
  const questions = questionGroup?.children || [];

  return (
    <div className="survey-navigation-grid-view">
      {questions.map((question, index) => {
        return (
          <SurveyNavigationButton
            key={`survey-navigation-grid-view-${question?.id}-${index}`}
            {...{
              number: index + 1,
              isSelected: index === currentIndex,
              isAnswered: SurveyNavigationUtils.checkIsAnswered({
                question,
                result,
              }),
              onClick: () => onNavigate(index),
            }}
          />
        );
      })}
    </div>
  );
};

export default SurveyNavigationGridViewPanel;
