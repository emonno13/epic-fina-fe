import { forwardRef } from 'react';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';
import ReactTextareaAutosize from 'react-textarea-autosize';
export const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(function TextareaAutosize(
  props,
  ref,
) {
  return <ReactTextareaAutosize {...props} ref={ref} />;
});

export default TextareaAutosize;
