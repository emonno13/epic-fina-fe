import { useEffect, useState } from 'react';

import './preview-selection-question.module.scss';

type AsnwerObject = {
  isCorrect: boolean;
  selectedOptions: number[];
};

type PreviewSeletionQuestionProps = {
  data: any;
  onChange?: Function;
  questionValue?: any;
  children: any;
};

const PreviewSeletionQuestion = ({
  data,
  onChange,
  questionValue,
  children,
}: PreviewSeletionQuestionProps) => {
  const { direction, mediaDisplayMode, mediaRatio, answers, selectionMode } = data || {};
  const [answerObject, setAnswerObject] = useState<AsnwerObject>({
    isCorrect: false,
    selectedOptions: [],
  });

  const getNewSelectedOptions = (index: number) => {
    const { selectedOptions } = answerObject;
    let newSelectedOptions: number[] = [];
    if (selectionMode === 'single') {
      newSelectedOptions = selectedOptions.includes(index) ? [] : [index];
    } else {
      newSelectedOptions = selectedOptions.includes(index)
        ? selectedOptions.filter((selectedIndex) => selectedIndex !== index)
        : [...selectedOptions, index];
    }
    return newSelectedOptions;
  };

  const getIsCorrect = (selectedOptions: number[]) => {
    const allCorrectAnswers = answers.filter((answer) => !!answer.isCorrect);
    if (allCorrectAnswers.length !== selectedOptions.length) return false;
    return selectedOptions.every((optionIndex) =>
      answers.some((answer, answerIndex) => !!answer.isCorrect && answerIndex === optionIndex),
    );
  };

  const handleSetAnswerObject = (index: number) => {
    const newSelectedOptions = getNewSelectedOptions(index);
    const newAnswerObject = {
      isCorrect: getIsCorrect(newSelectedOptions),
      selectedOptions: newSelectedOptions,
    };
    if (onChange)
      onChange({
        selectedOptions: newSelectedOptions.map((optionIndex) => ({
          ...answers[optionIndex],
          optionIndex,
        })),
      });
    setAnswerObject(newAnswerObject);
  };

  useEffect(() => {
    const selectedOptions = questionValue?.selectedOptions || [];
    if (selectedOptions.length > 0) {
      setAnswerObject({
        isCorrect: getIsCorrect(selectedOptions),
        selectedOptions: selectedOptions.map(({ optionIndex }) => optionIndex),
      });
    }
  }, [questionValue]);

  if (!(Array.isArray(answers) && answers.length > 0)) {
    return null;
  }
  if (typeof children === 'function') {
    return children({ answerObject, handleSetAnswerObject });
  }
  return children;
};

export default PreviewSeletionQuestion;
