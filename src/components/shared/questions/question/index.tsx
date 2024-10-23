import { useHTranslation } from '@lib/i18n';
import { Checkbox, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Actions } from './actions';
import HQuestionMegadraftEditor from './h-question-megadraft-editor';
import OpenEnded from './opend-ended';
import { QuestionUtils } from './question-utils';
import ReorderAnswer from './reorder-answer';
import { SelectAnswerWrapper } from './select-answer-wrapper';
import { Question, QUESTION_SELECTION_TYPES, QUESTION_TYPES } from './types';

import './question.module.scss';

type QuestionsProps = {
  initValue?: any;
  onChange?: Function;
  style?: any;
};

export const SingleQuestion = ({
  initValue,
  onChange,
  style = {},
}: QuestionsProps) => {
  const { t } = useHTranslation('common');
  const initValueRef = useRef(initValue);
  const [value, setValue] = useState<Question>({
    type: QUESTION_TYPES.IMAGE_SELECTION,
    mediaDisplayMode: 'media_above',
    mediaRatio: '1:1',
    selectionMode: 'multiple',
    required: false,
  });

  useEffect(() => {
    const currentInitValue = initValueRef.current;

    setValue({
      ...value,
      ...currentInitValue,
      selectionMode: currentInitValue?.selectionMode || 'multiple',
    });
  }, [initValueRef]);

  const onValueChange = (newValue: Question) => {
    const result = { ...value, ...newValue };
    if (onChange) onChange(result);
    setValue(result);
  };

  const onRequiredChange = (e) => {
    onValueChange({ required: e.target.checked });
  };

  const onDescriptionChange = (e) => {
    onValueChange({ description: e.target.value });
  };

  const onSelectionModeChange = (selectionMode) => {
    onValueChange({ selectionMode });
  };

  const QuestionEditorComponent = useMemo(() => {
    switch (value.type) {
      case QUESTION_TYPES.IMAGE_SELECTION:
        return SelectAnswerWrapper;
      case QUESTION_TYPES.TEXT_SELECTION:
        return SelectAnswerWrapper;
      case QUESTION_TYPES.REORDER:
        return ReorderAnswer;
      case QUESTION_TYPES.OPEN_ENDED:
        return OpenEnded;
      case QUESTION_TYPES.OPEN_ENDED_NUMBER:
        return OpenEnded;
      default:
        return React.Fragment;
    }
  }, [value]);

  return (
    <div style={style} className={'w-1000'}>
      <div className={'ui-questions-panel'}>
        <div className={'cq-question-panel'}>
          <div>
            <HQuestionMegadraftEditor
              onChange={onValueChange}
              initValue={initValueRef.current?.content}
            />
            <FormItem>
              <Checkbox
                {...{ checked: value.required, onChange: onRequiredChange }}
              >
                {t('Required', { vn: 'Bắt buộc' })}
              </Checkbox>
            </FormItem>
            <FormItem label={t('Description', { vn: 'Mô tả' })}>
              <Input.TextArea
                value={value.description}
                onChange={onDescriptionChange}
              />
            </FormItem>
            {QUESTION_SELECTION_TYPES.includes(value?.type) && (
              <FormItem label={t('Selection mode', { vn: 'Cách chọn' })}>
                <Select
                  {...{
                    options: QuestionUtils.getSelectionModeOptions(t),
                    onChange: onSelectionModeChange,
                    value: value.selectionMode,
                  }}
                />
              </FormItem>
            )}
          </div>
          <QuestionEditorComponent
            {...{ value, onChange: onValueChange, isPreview: false }}
          />
        </div>
        <Actions />
      </div>
    </div>
  );
};

export default SingleQuestion;
