import { memo, FC } from 'react';
import PreviewSeletionQuestion from '../preview-selection-question';
import PreviewSeletionQuestionAnswer from '../preview-selection-question/preview-selection-question-answer';

const PreviewImageSelectionQuestion: FC<any> = memo(({ data, onChange, questionValue, disabled }) => {
  const { direction, mediaDisplayMode, mediaRatio, answers, selectionMode } = data || {};
  return (
    <PreviewSeletionQuestion {...{ data, onChange, questionValue }}>
      {({ answerObject, handleSetAnswerObject }) => (
        <div className={`preview-selection-question-${direction}`}>
          {answers.map((answerData, index) => (
            <PreviewSeletionQuestionAnswer
              key={`preview-selection-question-option-${data.id}-${index}`}
              {...{
                mediaDisplayMode,
                mediaRatio,
                selectionMode,
                data: answerData,
                onChange: () => {
                  if (!disabled) handleSetAnswerObject(index);
                },
                isSelected: answerObject?.selectedOptions.includes(index),
              }}
            />
          ))}
        </div>
      )}
    </PreviewSeletionQuestion>
  );
});

export default PreviewImageSelectionQuestion;
