import React, { useEffect } from 'react';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ColorPalettePopover from './color-palette-popover';

import './h-inline-editable-text.module.scss';

export interface HInlineEditableTextProps {
  value?: string;
  label?: string;
  tooltip?: string;
  onClick?: any;
  placeholder?: string;
  onChange: any;
  onColorChange?: any;
  isEditMode?: boolean;
  textColor?: string | any;
  style?: any;
  palettePosition?: string;
  paletteVisible?: boolean;
  enableChangeColor?: boolean;
}

export const HInlineEditableText = ({
  onClick = (event) => {},
  value, // meaning initial value
  isEditMode = true,
  onChange,
  onColorChange = () => {},
  placeholder,
  textColor,
  style = {},
  palettePosition,
  paletteVisible,
  enableChangeColor = false,
}: HInlineEditableTextProps) => {
  const [editing, setEditing] = useState(isEditMode);
  useEffect(() => {
    setEditing(isEditMode);
  }, []);
  const handleChange = (event) => {
    if (event.keyCode === 40) {
      setEditing(false);
      return;
    }
    onChange(event.target.innerHTML);
  };
  const handleBlur = (event) => {
    if (event.keyCode === 13) {
      setEditing(false);
    }
  };
  const content = (
    <Scrollbars autoHeight>
      <div
        {...{
          style: { ...style, color: textColor },
          onClick: (event) => {
            onClick(event);
            if (isEditMode) {
              event.stopPropagation();
            }
            setEditing(true);
          },
          suppressContentEditableWarning: true,
          className: `flex w-full h-editor ${editing ? 'editable' : ''}`,
          onKeyDown: handleBlur,
          contentEditable: editing,
          onInput: handleChange,
        }}
      >
        {value}
        {!value && placeholder && <span className={'color-gray4'}>{placeholder}</span>}
      </div>
    </Scrollbars>
  );

  if (!editing) {
    return (
      <div style={{ color: textColor, cursor: 'default' }} className={'flex w-full h-editor'}>
        {' '}
        {value}
      </div>
    );
  }

  if (enableChangeColor) {
    return (
      <ColorPalettePopover
        {...{
          value: textColor,
          onColorChange,
          placement: palettePosition,
          visible: paletteVisible,
        }}
      >
        {content}
      </ColorPalettePopover>
    );
  }
  return content;
};
