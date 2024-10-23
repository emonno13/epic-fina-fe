import recoilStore from '@recoil-store';
import { useCallback, useRef } from 'react';
import { useRecoilCallback, useResetRecoilState, useSetRecoilState } from 'recoil';

export const mainTextareaId = 'prompt-textarea';

const useNewConvo = (index = 0) => {
  const { setConversation } = recoilStore.useCreateConversationAtom(index);
  const setSubmission = useSetRecoilState<TSubmission | null>(recoilStore.submissionByIndex(index));
  const resetLatestMessage = useResetRecoilState(recoilStore.latestMessageFamily(index));
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const switchToConversation = useRecoilCallback(
    () => async (conversation: TConversation, buildDefault?: boolean, keepLatestMessage?: boolean) => {
      setConversation(conversation);
      setSubmission({} as TSubmission);
      if (!keepLatestMessage) {
        resetLatestMessage();
      }

      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        const textarea = document.getElementById(mainTextareaId);
        if (textarea) {
          textarea.focus();
        }
      }, 150);
    },
    [],
  );

  const newConversation = useCallback(
    ({
      template = {},
      buildDefault = true,
      keepLatestMessage = false,
    }: {
      template?: Partial<TConversation>;
      buildDefault?: boolean;
      keepLatestMessage?: boolean;
    } = {}) => {
      const conversation = {
        conversationId: 'new',
        title: 'New Chat',
        endpoint: null,
        ...template,
        ...(template.name && {
          title: template.name,
        }),
        ...(template._id && {
          conversationId: template._id,
        }),
        createdAt: '',
        updatedAt: '',
      };

      switchToConversation(conversation, buildDefault, keepLatestMessage);
    },
    [switchToConversation],
  );

  return {
    switchToConversation,
    newConversation,
  };
};

export default useNewConvo;
