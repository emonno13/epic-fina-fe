import { useChatContext } from '@contexts/chat-provider';
import recoilStore from '@recoil-store';
import { forceResize, insertTextAtCursor } from '@utils';
import debounce from 'lodash/debounce';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type KeyEvent = KeyboardEvent<HTMLTextAreaElement>;

export default function useTextarea({
  textAreaRef,
  submitButtonRef,
  disabled = false,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  submitButtonRef: React.RefObject<HTMLButtonElement>;
  disabled?: boolean;
}) {
  const localize = (text: string) => text;
  const isComposing = useRef(false);
  const enterToSend = useRecoilValue(recoilStore.enterToSend);

  const { index, conversation, isSubmitting, latestMessage, setShowBingToneSetting } = useChatContext();

  const setShowMentionPopover = useSetRecoilState(recoilStore.showMentionPopoverFamily(index));

  const isNotAppendable = (latestMessage?.unfinished && !isSubmitting) || latestMessage?.error;
  // && (conversationId?.length ?? 0) > 6; // also ensures that we don't show the wrong placeholder

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isSubmitting, textAreaRef]);

  useEffect(() => {
    if (textAreaRef.current?.value) {
      return;
    }

    const getPlaceholderText = () => {
      if (disabled) {
        return localize('Nhập câu hỏi của bạn tại đây...');
      }
      return localize('Nhập câu hỏi của bạn tại đây...');
    };

    const placeholder = getPlaceholderText();

    if (textAreaRef.current?.getAttribute('placeholder') === placeholder) {
      return;
    }

    const setPlaceholder = () => {
      const placeholder = getPlaceholderText();

      if (textAreaRef.current?.getAttribute('placeholder') !== placeholder) {
        textAreaRef.current?.setAttribute('placeholder', placeholder);
        forceResize(textAreaRef);
      }
    };

    const debouncedSetPlaceholder = debounce(setPlaceholder, 80);
    debouncedSetPlaceholder();

    return () => debouncedSetPlaceholder.cancel();
  }, [conversation, disabled, latestMessage, isNotAppendable, localize, textAreaRef]);

  const handleKeyUp = useCallback(() => {
    const text = textAreaRef.current?.value;
    if (!(text && text[text.length - 1] === '@')) {
      return;
    }

    const startPos = textAreaRef.current?.selectionStart;
    if (!startPos) {
      return;
    }

    const isAtStart = startPos === 1;
    const isPrecededBySpace = textAreaRef.current?.value.charAt(startPos - 2) === ' ';

    setShowMentionPopover(isAtStart || isPrecededBySpace);
  }, [textAreaRef, setShowMentionPopover]);

  const handleKeyDown = useCallback(
    (e: KeyEvent) => {
      if (e.key === 'Enter' && isSubmitting) {
        return;
      }

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
    [isSubmitting, enterToSend, textAreaRef, submitButtonRef],
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
