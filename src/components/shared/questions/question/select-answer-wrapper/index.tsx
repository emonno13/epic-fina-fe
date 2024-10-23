import { QuestionProps } from '../types';
import { HInlineAnswerOption } from '../h-inline-answer-option';

import 'megadraft/dist/css/megadraft.css';

export const SelectAnswerWrapper = ({
  onChange = (data) => {},
  value = {},
  isPreview = false,
}: QuestionProps) => {
  const {
    selectionMode = 'multiple',
    direction = 'next-to',
    mediaRatio,
    mediaDisplayMode,
    answers = [],
  } = value;

  const handleAddMoreQuestion = () => {
    const newAnswers = [
      ...answers,
      {
        content: 'New answer',
        hint: '',
        isCorrect: false,
        image: {},
        color: '#111111',
      },
    ];
    onChange({ answers: newAnswers });
  };

  const handleChangeAnswer = (newData, index) => {
    const newAnswers = [...answers];
    if (selectionMode === 'single') {
      for (let i = 0; i < newAnswers.length; i++) {
        const answerData = newAnswers[i];
        if (i === index) {
          newAnswers[i] = newData;
          continue;
        }
        newAnswers[i] = { ...answerData, isCorrect: false };
      }
    } else {
      newAnswers[index] = newData;
    }
    onChange({ answers: newAnswers });
  };

  const onDelete = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    onChange({ answers: newAnswers });
  };

  // const onRatio = (ratio) => {
  // 	if (ratio !== value.mediaRatio) {
  // 		onChange({ mediaRatio: ratio });
  // 	}
  // };

  // const onSelectionMode = (mode) => {
  // 	if (mode !== value.selectionMode) {
  // 		onChange({
  // 			selectionMode: mode,
  // 			answers:
  // 				mode === 'multiple'
  // 					? value.answers
  // 					: value.answers?.map((answer) => ({
  // 							...answer,
  // 							isCorrect: false,
  // 					  })),
  // 		});
  // 	}
  // };

  // const onDisplayMode = (mode) => {
  // 	if (mode !== value.mediaDisplayMode) {
  // 		onChange({ mediaDisplayMode: mode });
  // 	}
  // };

  return (
    <>
      {/* {!isPreview && (
				<div className={'question-header'}>
					<SelectImageActions
						{...{ onDisplayMode, onRatio, onSelectionMode }}
					/>
					Questions
				</div>
			)} */}
      <div className={`ui-panel-answers direction-${direction}`}>
        {answers.map((answer, index) => {
          return (
            <HInlineAnswerOption
              key={index}
              {...{
                type: value.type,
                mediaRatio: mediaRatio || '',
                mediaDisplayMode: mediaDisplayMode || '',
                isSingleMode: selectionMode === 'single',
                className: 'ui-answer',
                selectable: true,
                value: answer,
                onChange: (newData) => handleChangeAnswer(newData, index),
                onDelete: () => onDelete(index),
                isPreview,
              }}
            />
          );
        })}
        {!isPreview && (
          <HInlineAnswerOption
            {...{ type: value.type, onAdd: handleAddMoreQuestion, className: 'ui-answer' }}
          />
        )}
      </div>
    </>
  );
};
