'use client';

import ChatForm, { ChatFormRef, CommandBlock } from '@components/molecules/commandBlock';
import { useChatContext } from '@contexts/chat-provider';
import { useGetConvoIdQuery } from '@data-provider/react-query';
import useNewConvo from '@hooks/useNewConvo';
import recoilStore from '@recoil-store';
import { useAppDispatch, useAppSelector } from '@store/hook';
import {
  chatbotActions,
  selectChatbotMessage,
  selectChatbotShouldGetMessage,
  selectChatbotShouldProgressQuestion,
} from '@store/slices/chatbot.slice';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const CommandInputForm = () => {
  const { id: conversationId } = useParams();
  const chatFormRef = useRef<ChatFormRef>(null);
  const { ask, handleStopGenerating, isSubmitting, setIsSubmitting } = useChatContext();
  const submissionAtIndex = useRecoilValue(recoilStore.submissionByIndex(0));
  const shouldProgressQuestion = useAppSelector(selectChatbotShouldProgressQuestion);
  const [alreadyChat, setAlreadyChat] = useState(false);
  const messageFromHome = useAppSelector(selectChatbotMessage);
  const dispatch = useAppDispatch();
  const setSubmission = useSetRecoilState<TSubmission | null>(recoilStore.submissionByIndex(0));

  const shouldGetMessage = useAppSelector(selectChatbotShouldGetMessage);
  const { newConversation } = useNewConvo();
  const hasSetConversation = useRef(false);

  const initialConvoQuery = useGetConvoIdQuery((conversationId as string) ?? '', {
    enabled: shouldGetMessage && !alreadyChat,
  });

  const allMessagesInCurrentConv = useRecoilValue(recoilStore.allMessages);
  const latestAnswer = allMessagesInCurrentConv?.filter((i: any) => i?.role === 'ai')?.slice(-1)?.[0];

  useEffect(() => {
    if (initialConvoQuery.data && !hasSetConversation.current) {
      newConversation({
        template: {
          ...(initialConvoQuery.data as any).data,
          conversationId:
            (initialConvoQuery.data as any).data?._id || (initialConvoQuery.data as any)?.payload?.data?._id,
          conv_id: (initialConvoQuery.data as any)?.payload?.data?._id,
        },
        keepLatestMessage: true,
      });
      hasSetConversation.current = true;
    }
  }, [initialConvoQuery.data]);

  useEffect(() => {
    if (shouldProgressQuestion) {
      dispatch(chatbotActions.resetConversation());
      setTimeout(() => {
        submitMessage(
          {
            text: messageFromHome,
          },
          true,
        );
      }, 999);
    }
  }, [shouldProgressQuestion]);

  useEffect(() => {
    // Next.JS Problem - trick, it is hard to call function cancel here
    return () => {
      console.log('leave current conversation', conversationId);
      setSubmission(null);
      setIsSubmitting(false);
    };
  }, [conversationId]);

  const submitMessage = useCallback(
    (data?: { text: string }, isNewConvo?: boolean) => {
      if (!data) {
        return console.warn('No data provided to submitMessage');
      }
      setAlreadyChat(true);
      try {
        ask({ text: data.text, isNewConvo });
      } catch (error) {
        console.log('error:', error);
      }
      chatFormRef.current?.resetForm();
    },
    [ask],
  );

  if (latestAnswer?.error || (isSubmitting && submissionAtIndex?.isReplaceAnswer)) {
    return <></>;
  }

  return (
    <CommandBlock>
      <ChatForm ref={chatFormRef} onAsk={submitMessage} onStop={handleStopGenerating} isSubmitting={isSubmitting} />
    </CommandBlock>
  );
};

export default CommandInputForm;
