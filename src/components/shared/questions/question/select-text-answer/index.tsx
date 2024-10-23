import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { MegadraftEditor, editorStateFromRaw } from 'megadraft';
import { useState } from 'react';
import { HInlineAnswer } from '../h-inline-answer';
import ImgPlugin from '../../question-plugins/image';
import { Answer, QuestionProps } from '../types';

import 'megadraft/dist/css/megadraft.css';

export const QuestionWithSelectTextAnswer = ({
  onChange = (data) => {},
  value = {},
}: QuestionProps) => {
  const {
    selectionMode = 'multiple',
    direction = 'next-to',
  } = value;
  const [answers, setAnswers] = useState<Answer[]>(value?.answers || []);
  const [editor, setEditor] = useState(editorStateFromRaw(null));

  const onQuestionChange = (editorState) => {
    setEditor(editorState);
    onChange({ ...(value || {}), content: editorState.toJS() });
  };

  const handleAddMoreQuestion = () => {
    const newAnswers = [
      ...answers,
      {
        content: 'New answer',
        hint: '',
        isCorrect: false,
      },
    ];
    setAnswers(newAnswers);
    onChange({ ...(value || {}), answers: newAnswers });
  };

  const handleChangeAnswer = (newData, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = newData;
    setAnswers(newAnswers);
    onChange({ ...(value || {}), answers: newAnswers });
  };

  return (
    <div className={'cq-question-panel'}>
      <div>
        <MegadraftEditor
          plugins={[ImgPlugin]}
          editorState={editor}
          onChange={onQuestionChange}
          placeholder="Add some text"/>
      </div>
      <div className={`ui-panel-answers direction-${direction}`}>
        {answers.map((answer, index) => {
          const { content, hint, isCorrect, audio } = answer;
          return (
            <HInlineAnswer key={index} {...{
              isSingleMode: selectionMode === 'single',
              className: 'ui-answer',
              selectable: true,
              value: { content, hint, isCorrect },
              onChange: () => handleChangeAnswer(answer, index),
            }}/>
          );
        })}
        <HInlineAnswer className={'ui-answer'}  Icon={PlusOutlined} selectable={false} value={{ content: 'Add more answer' }} isEditMode={false} onClick={handleAddMoreQuestion}/>
      </div>
    </div>
  );
};