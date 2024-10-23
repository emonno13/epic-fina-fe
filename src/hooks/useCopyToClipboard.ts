import { ContentTypes } from '@constants';
import copy from 'copy-to-clipboard';
import { useCallback } from 'react';

// TODO: Refactor later
export default function useCopyToClipboard({ text, content }: Partial<Pick<any, 'text' | 'content'>>) {
  const copyToClipboard = useCallback(
    (setIsCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
      setIsCopied(true);
      let messageText = text ?? '';
      if (content) {
        messageText = content.reduce((acc: any, curr: any, i: number) => {
          if (curr.type === ContentTypes.TEXT) {
            return acc + curr.text.value + (i === content.length - 1 ? '' : '\n');
          }
          return acc;
        }, '');
      }
      copy(messageText ?? '');

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    },
    [text, content],
  );

  return copyToClipboard;
}
