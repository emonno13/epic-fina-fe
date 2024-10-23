import { MegadraftEditor, editorStateFromRaw } from 'megadraft';
import { useState } from 'react';
import ImgPlugin from '../../question-plugins/image';
import {  QuestionProps } from '../types';
import { HInlineImageAnswer } from '../h-inline-image-answer';

import 'megadraft/dist/css/megadraft.css';

export const QuestionWithSelectImageAnswer = ({
  onChange = (data) => {},
  value = {},
}: QuestionProps) => {
  const {
    selectionMode = 'multiple',
    direction = 'next-to',
    mediaRatio,
    mediaDisplayMode,
    answers = [],
  } = value;
  const [editor, setEditor] = useState(editorStateFromRaw(null));

  const onQuestionChange = (editorState) => {
    setEditor(editorState);
    onChange({ content: editorState.toJS() });
  };

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

  return (
    <div className={'cq-question-panel'}>
      <div>
        <MegadraftEditor
          plugins={[ImgPlugin]}
          editorState={editor}
          onChange={onQuestionChange}
          placeholder="Add some text"
        />
      </div>
      <div className={`ui-panel-answers direction-${direction}`}>
        {answers.map((answer, index) => {
          return (
            <HInlineImageAnswer
              key={index}
              {...{
                mediaRatio: mediaRatio || '',
                mediaDisplayMode: mediaDisplayMode || '',
                isSingleMode: selectionMode === 'single',
                className: 'ui-answer',
                selectable: true,
                value: answer,
                onChange: (newData) => handleChangeAnswer(newData, index),
                onDelete: () => onDelete(index),
              }}
            />
          );
        })}
        <HInlineImageAnswer  {...{ onAdd: handleAddMoreQuestion, className: 'ui-answer' }} />
      </div>
    </div>
  );
};
