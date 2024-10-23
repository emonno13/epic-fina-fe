import { FC, memo } from 'react';
import PreviewTextSelectionQuestionAnswer from './preview-text-selection.answer';
import PreviewSeletionQuestion from '../preview-selection-question';

import './preview-text-selection-question.module.scss';

const PreviewTextSelectionQuestion: FC<any> = memo(({ data, onChange, questionValue, disabled }) => {
  const { answers } = data || {};
  return (
    <PreviewSeletionQuestion {...{ data, onChange, questionValue }}>
      {({ answerObject, handleSetAnswerObject }) => (
        <div className="preview-text-selection-question">
          {answers.map((answerData, index) => (
            <PreviewTextSelectionQuestionAnswer
              key={`preview-text-selection-question-option-${data.id}-${index}`}
              {...{
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

export default PreviewTextSelectionQuestion;
