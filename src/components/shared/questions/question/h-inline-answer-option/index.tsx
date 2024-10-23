import React, { useRef, useState } from 'react';
import { useMemo } from 'react';
import { HInlineAnswer } from '../h-inline-answer';
import { HInlineImageAnswer } from '../h-inline-image-answer';
import { QUESTION_TYPES } from '../types';

import './h-inline-answer-option.module.scss';

interface HInlineAnswerOptionProps {
  mediaRatio?: string;
  mediaDisplayMode?: string;
  onChange?: any;
  isEditMode?: boolean;
  selectable?: boolean;
  iconSize?: number;
  isSingleMode?: boolean;
  Icon?: any;
  activeColor?: string;
  className?: string;
  onClick?: any;
  onDelete?: any;
  onAdd?: any;
  value?: {
    isCorrect?: boolean;
    content?: string;
    hint?: string;
    image?: {
      url?: string;
      width?: number;
      height?: number;
    };
    color?: string;
  };
  wrapperWidth?: string;
  wrapperHeight?: string;
  mediaWidth?: string;
  isPreview?: boolean;
  type?: string;
  enableSetCorrect?: boolean;
}

export const HInlineAnswerOption = (props: HInlineAnswerOptionProps) => {
  const {
    className,
    selectable = true,
    onChange = ({ isCorrect, content, hint }) => {},
    value = { isCorrect: false, content: '', hint: '' },
    onClick = (event) => {},
    onDelete,
    type,
    enableSetCorrect = false,
  } = props;
  const titleRef = useRef(null);
  const initValue = useRef(value);
  const [hover, setHover] = useState(false);
  const handleSwitchActiveState = (event) => {
    onClick(event);
    if (!selectable) {
      return;
    }
    handleSetCorrect();
  };
  const selectableProps = useMemo(() => {
    return selectable ? { onClick: handleSwitchActiveState } : {};
  }, [selectable]);
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };
  const handleSetCorrect = () => {
    if (enableSetCorrect) {
      onChange({
        ...value,
        isCorrect: !value.isCorrect,
      });
    }
  };
  const handleColorChange = (color) => {
    onChange({ ...value, color });
  };
  const commonChildrenProps = {
    ...props,
    titleRef,
    initValue,
    handleDelete,
    handleSetCorrect,
    handleColorChange,
  };

  return (
    <div
      {...selectableProps}
      {...{
        onClick: handleSwitchActiveState,
        onMouseLeave: () => setHover(false),
        onMouseEnter: () => setHover(true),
        style: {
          backgroundColor: value.isCorrect ? '#84c225f0' : '#ffffff',
        },
        className: `${className} ui-hc-checkbox flex ${hover ? 'hover' : ''}`,
      }}
    >
      {type === QUESTION_TYPES.IMAGE_SELECTION && (
        <HInlineImageAnswer {...{ ...commonChildrenProps }} />
      )}
      {type === QUESTION_TYPES.TEXT_SELECTION && <HInlineAnswer {...{ ...commonChildrenProps }} />}
    </div>
  );
};
