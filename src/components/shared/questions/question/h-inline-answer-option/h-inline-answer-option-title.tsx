import { HInlineEditableText } from '@components/shared/common-form-elements/h-inline-editable-text';
import React from 'react';

const HInlineAnswerOptionTitle = React.forwardRef((props: any, ref: any) => {
  const {
    initValue,
    isEditMode,
    onChange,
    value = {},
    handleColorChange,
    colorPaletteVisible,
  } = props;
  return (
    <div className="title" ref={ref}>
      <HInlineEditableText
        {...{
          value: initValue.current.content,
          isEditMode,
          onChange: (content) => onChange({ ...value, content }),
          onColorChange: handleColorChange,
          textColor: value?.color || '#111111',
          colorPaletteVisible,
        }}
      ></HInlineEditableText>
    </div>
  );
});

export default HInlineAnswerOptionTitle;
