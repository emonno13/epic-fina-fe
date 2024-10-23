import { useChatContext } from '@contexts/chat-provider';
import { useCallback, useEffect, useRef } from 'react';
import useCopyToClipboard from './useCopyToClipboard';

export default function useMessageHelpers(props: TMessageProps) {
  const latestText = useRef<string | number>('');
  const { message, currentEditId, setCurrentEditId } = props;
  const {
    ask,
    index,
    regenerate,
    replaceErrorMsg,
    isSubmitting,
    conversation,
    latestMessage,
    // setMessages,
    // setAbortScroll,
    handleContinue,
    setLatestMessage,
  } = useChatContext();

  const { text, message: messageText, content, role, children, message_id = null } = message ?? {};
  const edit = message_id === currentEditId;
  const isLast = !children?.length;

  useEffect(() => {
    let contentChanged = message?.content
      ? message?.content?.length !== latestText.current
      : message?.text !== latestText.current;
    const regeneratedError = message?.error === true;
    if (!isLast) {
      contentChanged = false;
    }

    if (!message) {
      return;
    } else if (isLast && ((conversation?.conversationId !== 'new' && contentChanged) || regeneratedError)) {
      setLatestMessage({ ...message });
      latestText.current = message?.content ? message.content.length : message.text;
    }
  }, [isLast, message, setLatestMessage, conversation?.conversationId]);

  const enterEdit = useCallback(
    (cancel?: boolean) => setCurrentEditId && setCurrentEditId(cancel ? -1 : message_id),
    [message_id, setCurrentEditId],
  );

  // const handleScroll = useCallback(() => {
  //   if (isSubmitting) {
  //     setAbortScroll(true);
  //   } else {
  //     setAbortScroll(false);
  //   }
  // }, [isSubmitting, setAbortScroll]);

  const regenerateMessage = () => {
    if ((isSubmitting && role === 'human') || !message) {
      return;
    }
    try {
      regenerate(message);
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleReplaceErrorMsg = () => {
    if ((isSubmitting && role === 'human') || !message) {
      return;
    }
    try {
      replaceErrorMsg();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const copyToClipboard = useCopyToClipboard({ text: text || messageText, content });

  return {
    ask,
    edit,
    index,
    isLast,
    enterEdit,
    conversation: {
      ...(conversation || {}),
      endpoint: 'custom',
    },
    isSubmitting,
    // handleScroll,
    latestMessage,
    handleReplaceErrorMsg,
    handleContinue,
    copyToClipboard,
    regenerateMessage,
  };
}
