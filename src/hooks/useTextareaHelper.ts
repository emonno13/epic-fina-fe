'use client';

import recoilStore from '@recoil-store';
import { forceResize, insertTextAtCursor, isBrowser } from '@utils';
import debounce from 'lodash/debounce';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

type KeyEvent = KeyboardEvent<HTMLTextAreaElement>;

export default function useTextareaHelper({
  textAreaRef,
  submitButtonRef,
  disabled = false,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  submitButtonRef: React.RefObject<HTMLButtonElement>;
  disabled?: boolean;
}) {
  const isComposing = useRef(false);
  const enterToSend = useRecoilValue(recoilStore.enterToSend);

  useEffect(() => {
    if (!isBrowser) return;

    const timeoutId = setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [textAreaRef]);

  useEffect(() => {
    if (!isBrowser) return;

    if (textAreaRef.current?.value) {
      return;
    }

    const placeholder = 'Nhập câu hỏi của bạn tại đây...';

    if (textAreaRef.current?.getAttribute('placeholder') === placeholder) {
      return;
    }

    const setPlaceholder = () => {
      if (textAreaRef.current?.getAttribute('placeholder') !== placeholder) {
        textAreaRef.current?.setAttribute('placeholder', placeholder);
        forceResize(textAreaRef);
      }
    };

    const debouncedSetPlaceholder = debounce(setPlaceholder, 80);
    debouncedSetPlaceholder();

    return () => debouncedSetPlaceholder.cancel();
  }, [disabled, textAreaRef]);

  const handleKeyUp = useCallback(() => {
    const text = textAreaRef.current?.value;
    if (!(text && text[text.length - 1] === '@')) {
      return;
    }

    const startPos = textAreaRef.current?.selectionStart;
    if (!startPos) {
      return;
    }
  }, [textAreaRef]);

  const handleKeyDown = useCallback(
    (e: KeyEvent) => {
      const isNonShiftEnter = e.key === 'Enter' && !e.shiftKey;

      if (isNonShiftEnter) {
        e.preventDefault();
      }

      if (isNonShiftEnter) {
        e.preventDefault();
      }

      if (e.key === 'Enter' && !enterToSend && textAreaRef.current) {
        insertTextAtCursor(textAreaRef.current, '\n');
        forceResize(textAreaRef);
        return;
      }

      if (isNonShiftEnter && !isComposing?.current) {
        submitButtonRef.current?.click();
      }
    },
    [enterToSend, textAreaRef, submitButtonRef],
  );

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
  };

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const textArea = textAreaRef.current;
      if (!textArea) {
        return;
      }

      if (!e.clipboardData) {
        return;
      }

      const richText = '';
      const includedText = '';

      if (includedText && (e.clipboardData.files.length > 0 || richText)) {
        insertTextAtCursor(textAreaRef.current, includedText);
        forceResize(textAreaRef);
      }
    },
    [textAreaRef],
  );

  return {
    textAreaRef,
    handlePaste,
    handleKeyUp,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
  };
}
