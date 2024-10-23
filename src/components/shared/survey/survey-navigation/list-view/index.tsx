import HQuestionMegadraftEditor from '@components/shared/questions/question/h-question-megadraft-editor';
import { useDocumentDetail } from '@schema-form/features/hooks';
import SurveyNavigationButton from '../survey-navigation.button';
import { SurveyNavigationUtils } from '../utils';

const SurveyNavigationListViewPanel = ({
  result,
  currentIndex,
  onNavigate,
}) => {
  const questionGroup = useDocumentDetail();
  const questions = questionGroup?.children || [];

  return (
    <div className="survey-navigation-list-view">
      {questions.map((question, index) => {
        return (
          <div
            className="survey-navigation-list-view__list-item"
            key={`survey-navigation-list-view-${question?.id}-${index}`}
          >
            <SurveyNavigationButton
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
            <HQuestionMegadraftEditor initValue={question.content} readOnly />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyNavigationListViewPanel;
