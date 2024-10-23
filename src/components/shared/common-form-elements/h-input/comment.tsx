import { ChangeEvent } from 'react';

export const nomalizerInput = (value: string, { uppercase = false, lowercase = false, deleteWhiteSpace = false, valueConverter = f =>f }) => {
  value = uppercase ? value.toUpperCase() : value;
  value = lowercase ? value.toLowerCase() : value;
  value = deleteWhiteSpace ? value.replace(/\r|[ ]/g, '') : value;
  value = valueConverter ? valueConverter(value) : value;
  return value;
};

export const handleChangeInput = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, props) => {
  const { onChange } = props;
  const newValue = event.target.value;
  const selectionEnd = event.target.selectionEnd;
  const selectionStart = event.target.selectionStart;
  event.target.value = nomalizerInput(newValue, props);
  event.target.selectionStart = selectionStart;
  event.target.selectionEnd = selectionEnd;
  onChange && onChange(event);
};