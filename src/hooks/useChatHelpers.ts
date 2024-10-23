'use client';

import { Constants } from '@constants';
import { QueryKeys } from '@data-provider/keys';
import { useGetMessagesByConvoId } from '@data-provider/react-query';
import recoilStore from '@recoil-store';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import useNewConvo from './useNewConvo';

// this to be set somewhere else
export default function useChatHelpers(index = 0, paramId: string | undefined) {
  const setShowStopButton = useSetRecoilState(recoilStore.showStopButtonByIndex(index));
  // const getSender = useGetSender();
  const { id: conversationId } = useParams();
  // console.log('conversationId useChatHelpers:', conversationId);

  const queryClient = useQueryClient();
  // const { isAuthenticated } = useAuthContext();

  const { newConversation } = useNewConvo(index);
  const { conversation, setConversation } = recoilStore.useCreateConversationAtom(index);
  // console.log('conversation123:', conversation);
  // const { conversationId } = conversation ?? {};

  const queryParam = paramId ? paramId : conversationId ?? paramId ?? '';

  /* Messages: here simply to fetch, don't export and use `getMessages()` instead */
  // const { data: _messages } = useGetMessagesByConvoId(conversationId ?? '', {
  //   enabled: true,
  // });
  // console.log('_messages:', _messages);

  const { data: _messages } = useGetMessagesByConvoId((conversationId as string) ?? '', {
    enabled: true,
  });

  const setAllMessagesInCurrentConversation = useSetRecoilState(recoilStore.allMessages);

  useEffect(() => {
    setAllMessagesInCurrentConversation(_messages || []);
  }, [_messages]);

  const resetLatestMessage = useResetRecoilState(recoilStore.latestMessageFamily(index));
  const [isSubmitting, setIsSubmitting] = useRecoilState(recoilStore.isSubmittingFamily(index));
  const [latestMessage, setLatestMessage] = useRecoilState(recoilStore.latestMessageFamily(index));
  const setSiblingIdx = useSetRecoilState(
    recoilStore.messagesSiblingIdxFamily(latestMessage?.parent_message_id ?? null),
  );

  const setMessages = useCallback(
    (messages: TMessage[]) => {
      queryClient.setQueryData<TMessage[]>([QueryKeys.messages, queryParam], messages);
    },
    // [conversationId, queryClient],
    [queryParam, queryClient],
  );

  const getMessages = useCallback(() => {
    return queryClient.getQueryData<TMessage[]>([QueryKeys.messages, queryParam]);
  }, [queryParam, queryClient]);

  const setSubmission = useSetRecoilState(recoilStore.submissionByIndex(index));

  const ask: TAskFunction = (
    { text, parent_message_id = null, message_id = null, isNewConvo = false },
    {
      editedText = null,
      editedMessageId = null,
      isRegenerate = false,
      isContinued = false,
      isEdited = false,
      isReplaceAnswer = false,
    } = {},
  ) => {
    // console.log('-isNewConvo:', isNewConvo);
    setShowStopButton(false);
    if (!!isSubmitting || text === '') {
      return;
    }

    // conversationId = conversationId ?? (conversation?.conversationId || conversation?._id) ?? null;
    if (conversationId == 'search') {
      console.error('cannot send any message under search view!');
      return;
    }

    // console.log('---latestMessage:', latestMessage);
    if (isContinued && !latestMessage) {
      console.error('cannot continue AI message without latestMessage!');
      return;
    }

    const isEditOrContinue = isEdited || isContinued;

    let currentMessages: TMessage[] | null = getMessages() ?? [];

    // construct the query message
    // this is not a real messageId, it is used as placeholder before real messageId returned
    text = text.trim();
    // console.log('latestMessage:', latestMessage);
    const fakeMessageId = v4();
    parent_message_id =
      parent_message_id || latestMessage?.message_id || latestMessage?.messageId || Constants.NO_PARENT;

    if (isNewConvo === true) {
      parent_message_id = Constants.NO_PARENT;
      currentMessages = [];
      // conversationId = null;
    }

    const parentMessage = currentMessages?.find((msg) => msg.message_id === latestMessage?.parent_message_id);

    let thread_id = parentMessage?.thread_id ?? latestMessage?.thread_id;
    if (!thread_id) {
      thread_id = currentMessages?.find((message) => message.thread_id)?.thread_id;
    }

    // const endpointsConfig = queryClient.getQueryData<TEndpointsConfig>([QueryKeys.endpoints]);
    // const endpointType = getEndpointField(endpointsConfig, endpoint, 'type');

    // set the endpoint option
    // const convo = parseCompactConvo({
    //   endpoint,
    //   endpointType,
    //   conversation: conversation ?? {},
    // });

    // const endpointOption = {
    //   ...convo,
    //   thread_id,
    // } as TEndpointOption;

    const currentMsg: TMessage | any = {
      text,
      message: text,
      sender: 'User',
      isCreatedByUser: true,
      parent_message_id,
      conversationId,
      message_id: isContinued && message_id ? message_id : fakeMessageId,
      messageId: isContinued && message_id ? message_id : fakeMessageId,
      thread_id,
      role: 'human',
      error: false,
    };

    // construct the placeholder response message
    const generation = editedText ?? (latestMessage?.text || latestMessage?.message) ?? '';
    const responseText = isEditOrContinue ? generation : '';
    // console.log('isRegenerate:', isRegenerate);
    const responseMessageId = editedMessageId ?? latestMessage?.message_id ?? null;
    const initialResponse: TMessage = {
      text: responseText,
      message: responseText,
      parentMessageId: isRegenerate ? message_id : fakeMessageId,
      parent_message_id: isRegenerate ? message_id : fakeMessageId,
      messageId: responseMessageId ?? `${isRegenerate ? message_id : fakeMessageId}_`,
      message_id: responseMessageId ?? `${isRegenerate ? message_id : fakeMessageId}_`,
      thread_id,
      conversationId: conversationId || '',
      conv_id: conversationId || '',
      unfinished: false,
      isCreatedByUser: false,
      isEdited: isEditOrContinue,
      role: 'ai',
      error: false,
    };

    setShowStopButton(true);

    if (isContinued) {
      currentMessages = currentMessages.filter((msg) => msg.message_id !== responseMessageId);
    }
    if (isReplaceAnswer) {
      currentMessages = currentMessages.filter((msg) => msg.message_id !== responseMessageId);
      console.log('isReplaceAnswer:', isReplaceAnswer);
      console.log('currentMessages when isReplaceAnswer:', currentMessages);
    }

    const submission: TSubmission = {
      isNewConvo: isNewConvo === true,
      conversation: {
        ...(conversation && { ...conversation }),
        ...(conversationId && { conversationId }),
      },
      userMessage: {
        ...currentMsg,
        generation,
        messageId: currentMsg.message_id,
        parentMessageId: currentMsg.parent_message_id,
        responseMessageId,
        overrideParentMessageId: isRegenerate ? message_id : null,
      },
      messages: currentMessages,
      isEdited: isEditOrContinue,
      isContinued,
      isRegenerate,
      isReplaceAnswer,
      initialResponse,
    };

    if (isRegenerate) {
      setMessages([...submission.messages, initialResponse]);
    } else {
      setMessages([...submission.messages, currentMsg, initialResponse]);
    }
    setLatestMessage(initialResponse);
    // console.log('submission:', submission);
    setSubmission(submission);
  };

  const regenerate = ({ parent_message_id }: any) => {
    // console.log('parentMessageId:', parent_message_id);
    const messages = getMessages();
    // console.log('messages:', messages);
    const parentMessage = messages?.find((element) => element.message_id == parent_message_id);
    // console.log('parentMessage:', parentMessage);
    if (parentMessage && parentMessage.role === 'human') {
      ask({ ...parentMessage, text: parentMessage.message || '' }, { isRegenerate: true });
    } else {
      console.error('Failed to regenerate the message: parentMessage not found or not created by user.');
    }
  };

  const continueGeneration = () => {
    if (!latestMessage) {
      console.error('Failed to regenerate the message: latestMessage not found.');
      return;
    }

    const messages = getMessages();

    const parentMessage = messages?.find((element) => element.message_id == latestMessage.parent_message_id);

    if (parentMessage && parentMessage.role === 'human') {
      ask(
        { ...parentMessage, text: parentMessage.message || '' },
        { isContinued: true, isRegenerate: true, isEdited: true },
      );
    } else {
      console.error('Failed to regenerate the message: parentMessage not found, or not created by user.');
    }
  };

  const handleReplaceErrorMsg = () => {
    console.log('123latestMessage:', latestMessage);
    if (!latestMessage) {
      console.error('Failed to regenerate the message: latestMessage not found.');
      return;
    }

    const messages = getMessages();

    const parentMessage = messages?.find((element) => element.message_id == latestMessage.parent_message_id);

    if (parentMessage && parentMessage.role === 'human') {
      ask(
        { ...parentMessage, text: parentMessage.message || '' },
        { isReplaceAnswer: true, isContinued: false, isRegenerate: true, isEdited: true },
      );
    } else {
      console.error('Failed to regenerate the message: parentMessage not found, or not created by user.');
    }
  };

  const stopGenerating = () => {
    setSubmission(null);
  };

  const handleStopGenerating = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    stopGenerating();
  };

  const handleRegenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log('latestMessage:', latestMessage);
    const parentMessageId = latestMessage?.parent_message_id;
    if (!parentMessageId) {
      console.error('Failed to regenerate the message: parentMessageId not found.');
      return;
    }
    regenerate({ parentMessageId });
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    continueGeneration();
    setSiblingIdx(0);
  };
  const replaceErrorMsg = () => {
    handleReplaceErrorMsg();
    setSiblingIdx(0);
  };

  const [showBingToneSetting, setShowBingToneSetting] = useRecoilState(recoilStore.showBingToneSettingFamily(index));

  return {
    newConversation,
    conversation,
    setConversation,
    isSubmitting,
    setIsSubmitting,
    getMessages,
    setMessages,
    setSiblingIdx,
    latestMessage,
    showBingToneSetting,
    setShowBingToneSetting,
    setLatestMessage,
    resetLatestMessage,
    ask,
    index,
    regenerate,
    stopGenerating,
    handleStopGenerating,
    handleRegenerate,
    handleContinue,
    replaceErrorMsg,
  };
}
