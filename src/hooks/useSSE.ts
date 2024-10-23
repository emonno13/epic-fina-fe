'use client';

import createPayload from '@data-provider/createPayload';
import { useGenTitleMutation } from '@data-provider/react-query';
import recoilStore from '@recoil-store';
import { useAppDispatch } from '@store/hook';
import { doFetchConversation } from '@store/slices/conversation.slice';
import { useQueryClient } from '@tanstack/react-query';
import { getAccessTokenFromLocalStorage } from '@utils';
import envConfig from '@utils/config';
import { SSE } from '@utils/sse';
import { message } from 'antd';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import useChatHelpers from './useChatHelpers';

type TResData = {
  error?: boolean;
  final?: boolean;
  initial?: boolean;
  previousMessages?: TMessage[];
  requestMessage: TMessage;
  responseMessage: TMessage;
  conversation: TConversation;
  conversationId?: string;
  runMessages?: TMessage[];
};

type TSyncData = {
  sync: boolean;
  thread_id: string;
  messages?: TMessage[];
  requestMessage: TMessage;
  responseMessage: TMessage;
  conversationId: string;
};

function useSSE(submission: TSubmission | null, index = 0) {
  const queryClient = useQueryClient();
  const genTitle = useGenTitleMutation();
  const dispatch = useAppDispatch();

  const setActiveRunId = useSetRecoilState(recoilStore.activeRunFamily(index));

  const { id: paramId } = useParams();

  // TODO: Refactor later
  const token = getAccessTokenFromLocalStorage();
  const [completed, setCompleted] = useState(new Set());
  const setShowStopButton = useSetRecoilState(recoilStore.showStopButtonByIndex(index));

  const { setMessages, getMessages, setConversation, setIsSubmitting, newConversation, resetLatestMessage } =
    useChatHelpers(index, paramId as string);

  const messageHandler = useCallback(
    (data: string, submission: TSubmission) => {
      const { messages, userMessage, initialResponse, isRegenerate = false } = submission;
      // console.log('1submission:', submission);
      // console.log('initialResponse:', initialResponse);
      // console.log('data:', data);
      if (isRegenerate) {
        setMessages([
          ...messages,
          {
            ...initialResponse,
            text: data,
            message: data,
            // unfinished: true
          },
        ]);
      } else {
        setMessages([
          ...messages,
          userMessage,
          {
            ...initialResponse,
            text: data,
            message: data,
            // unfinished: true
          },
        ]);
      }
    },
    [setMessages],
  );

  const cancelHandler = useCallback(
    (data: TResData, submission: TSubmission) => {
      const { requestMessage, responseMessage, conversation } = data;
      const { messages, userMessage, isRegenerate = false } = submission;

      const formattedResponseMessage = {
        ...responseMessage,
        message: responseMessage.text || responseMessage.message || '',
        text: responseMessage.text || responseMessage.message || '',
        conv_id: responseMessage.conversationId,
        message_id: responseMessage.messageId,
        parent_message_id: responseMessage.parentMessageId,
        is_finished: responseMessage.isFinished,
        role: 'ai',
      } as TMessage;
      const convoUpdate = conversation ?? submission.conversation;

      // update the messages
      if (isRegenerate) {
        const messagesUpdate = [...messages, formattedResponseMessage].filter((msg) => msg);
        setMessages(messagesUpdate);
      } else {
        // console.log('requestMessage:', requestMessage);
        const messagesUpdate = [...messages, userMessage, formattedResponseMessage].filter((msg) => msg);
        setMessages(messagesUpdate);
      }

      // console.log('submission:', submission);
      // const isNewConvo = conversation.conversationId !== submission.conversation.conversationId;
      const isNewConvo = Boolean(submission.isNewConvo);
      // console.log('isNewConvo::', isNewConvo);
      if (isNewConvo) {
        setTimeout(() => {
          dispatch(doFetchConversation());
        }, 2500);
      }

      setConversation((prevState) => {
        const update = {
          ...prevState,
          ...convoUpdate,
        };

        return update;
      });

      setIsSubmitting(false);
    },
    [setMessages, setConversation, queryClient, setIsSubmitting],
  );

  const syncHandler = useCallback(
    (data: TSyncData, submission: TSubmission) => {
      const { conversationId, thread_id, responseMessage, requestMessage } = data;
      const { initialResponse, messages: _messages, userMessage } = submission;

      const messages = _messages.filter((msg) => msg.message_id !== userMessage.message_id);

      setMessages([
        ...messages,
        requestMessage,
        {
          ...initialResponse,
          ...responseMessage,
        },
      ]);

      // let update = {} as TConversation;
      // setConversation((prevState) => {
      //   let title = prevState?.title;
      //   const parentId = requestMessage.parent_message_id;
      //   if (parentId !== Constants.NO_PARENT && title?.toLowerCase()?.includes('new chat')) {
      //     const convos = queryClient.getQueryData<ConversationData>([QueryKeys.allConversations]);
      //     const cachedConvo = getConversationById(convos, conversationId);
      //     console.log('cachedConvo:', cachedConvo);
      //     title = cachedConvo?.title;
      //   }

      //   update = tConvoUpdateSchema.parse({
      //     ...prevState,
      //     conversationId,
      //     thread_id,
      //     title,
      //     messages: [requestMessage.message_id, responseMessage.message_id],
      //   }) as TConversation;

      //   return update;
      // });

      // queryClient.setQueryData<ConversationData>([QueryKeys.allConversations], (convoData) => {
      //   if (!convoData) {
      //     return convoData;
      //   }
      //   if (requestMessage.parent_message_id === Constants.NO_PARENT) {
      //     return addConversation(convoData, update);
      //   } else {
      //     return updateConversation(convoData, update);
      //   }
      // });

      setShowStopButton(true);

      resetLatestMessage();
    },
    [setMessages, setConversation, queryClient, setShowStopButton, resetLatestMessage],
  );

  const createdHandler = useCallback(
    (data: TResData, submission: TSubmission) => {
      const { messages, userMessage, isRegenerate = false } = submission;
      // console.log('userMessage:', userMessage);
      const initialResponse = {
        ...submission.initialResponse,
        role: 'ai',
        parentMessageId: userMessage?.message_id,
        // parent_message_id: userMessage?.message_id,
        messageId: userMessage?.message_id + '_',
        // message_id: userMessage?.message_id + '_',
      };
      if (isRegenerate) {
        setMessages([...messages, initialResponse]);
      } else {
        setMessages([...messages, userMessage, initialResponse]);
      }

      resetLatestMessage();
    },
    [setMessages, setConversation, queryClient, resetLatestMessage],
  );

  const finalHandler = useCallback(
    (data: TResData, submission: TSubmission) => {
      const { requestMessage, responseMessage, conversation, runMessages } = data;
      const { messages, conversation: submissionConvo, isRegenerate = false, isNewConvo } = submission;

      setShowStopButton(false);
      setCompleted((prev) => new Set(prev.add(submission?.initialResponse?.message_id)));

      const currentMessages = getMessages();
      // Early return if messages are empty; i.e., the user navigated away
      if (!currentMessages?.length) {
        return setIsSubmitting(false);
      }
      // console.log('isRegenerate:', isRegenerate);
      // console.log('responseMessage:', responseMessage);
      const formattedResponseMessage = {
        ...responseMessage,
        message: responseMessage.text || '',
        conv_id: responseMessage.conversationId,
        message_id: responseMessage.message_id,
        parent_message_id: responseMessage.parent_message_id,
        role: 'ai',
      };

      // update the messages; if assistants endpoint, client doesn't receive responseMessage
      if (runMessages) {
        setMessages([...runMessages]);
      } else if (isRegenerate && responseMessage) {
        setMessages([...messages, formattedResponseMessage]);
      } else if (responseMessage) {
        setMessages([...messages, requestMessage, formattedResponseMessage]);
      }

      // console.log('conversation:', conversation);
      // console.log('submissionConvo:', submissionConvo);
      // console.log('isNewConvo:', isNewConvo);
      if (isNewConvo) {
        setTimeout(() => {
          dispatch(doFetchConversation());
        }, 2500);
        // queryClient.setQueryData<ConversationData>([QueryKeys.allConversations], (convoData) => {
        //   if (!convoData) {
        //     return convoData;
        //   }
        //   return deleteConversation(convoData, submissionConvo.conversationId as string);
        // });
      }

      // refresh title
      // if (isNewConvo && requestMessage && requestMessage.parentMessageId === Constants.NO_PARENT) {
      //   console.log('<><><><><><> isNewConvo:', isNewConvo);
      //   setTimeout(() => {
      //     genTitle.mutate({ conversationId: conversation.conversationId as string });
      //   }, 2500);
      // }

      setConversation((prevState) => {
        const update = {
          ...prevState,
          ...conversation,
        };

        return update;
      });

      setIsSubmitting(false);
    },
    [queryClient, getMessages, setMessages, setConversation, setIsSubmitting, setShowStopButton],
  );

  const errorHandler = useCallback(
    ({ data, submission }: { data?: TResData; submission: TSubmission }) => {
      const { messages, userMessage, initialResponse } = submission;

      setCompleted((prev) => new Set(prev.add(initialResponse.message_id)));

      const conversationId = userMessage?.conversationId ?? submission?.conversationId;

      const parseErrorResponse = (data: TResData & Partial<TMessage>) => {
        const metadata = data['responseMessage'] ?? data;
        const errorMessage = {
          ...initialResponse,
          ...metadata,
          error: true,
          parent_message_id: userMessage?.message_id,
        };

        if (!errorMessage.message_id) {
          errorMessage.message_id = v4();
        }

        return errorMessage;
      };

      const parseReplaceErrorResponse = (data: TResData & Partial<TMessage>) => {
        const metadata = data['responseMessage'] ?? data;
        const errorMessage = {
          ...initialResponse,
          ...metadata,
          error: true,
        };

        if (!errorMessage.message_id) {
          errorMessage.message_id = v4();
        }

        return errorMessage;
      };

      if (!data) {
        const convoId = conversationId ?? v4();
        // const errorResponse = parseErrorResponse({
        //   text: 'Error connecting to server',
        //   ...submission,
        //   conversationId: convoId,
        // });
        // setMessages([...messages, userMessage, errorResponse]);
        // newConversation({
        //   template: { conversationId: convoId },
        // });
        setIsSubmitting(false);
        return;
      }
      if (data.error && submission.isReplaceAnswer) {
        message.warning('Có lỗi. Vui lòng thử lại sau!');
        const errorResponse = parseReplaceErrorResponse(data) as TMessage;
        setMessages([...messages, errorResponse]);
        setIsSubmitting(false);
        return;
      }

      if (!conversationId && !data.conversationId) {
        const convoId = v4();
        const errorResponse = parseErrorResponse(data) as TMessage;
        setMessages([...messages, userMessage, errorResponse]);
        newConversation({
          template: { conversationId: convoId },
        });
        setIsSubmitting(false);
        return;
      } else if (!data.conversationId) {
        const errorResponse = parseErrorResponse(data) as TMessage;
        setMessages([...messages, userMessage, errorResponse]);
        setIsSubmitting(false);
        return;
      }

      // console.log('Error:', data);
      const errorResponse = {
        ...data,
        error: true,
        parent_message_id: userMessage?.message_id,
      };

      setMessages([...messages, userMessage, errorResponse as any]);

      setIsSubmitting(false);
      return;
    },
    [setMessages, paramId, setIsSubmitting, newConversation],
  );

  const abortConversation = useCallback(
    async (conversationId = '', submission: TSubmission) => {
      const runAbortKey = '';
      try {
        // const conversation = (JSON.parse(localStorage.getItem(LocalStorageKeys.LAST_CONVO_SETUP) ?? '') ??
        //   {}) as TConversation;
        // const { conversationId } = conversation;
        // runAbortKey = `${conversationId}:${messages?.[messages.length - 1]}`;
      } catch (error) {
        console.error('Error getting last conversation setup');
        console.error(error);
      }
      try {
        const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/abort`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            abortKey: conversationId,
          }),
        });

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (response.status === 404) {
            setIsSubmitting(false);
            return;
          }
          if (data.final) {
            finalHandler(data, submission);
          } else {
            cancelHandler(data, submission);
          }
        } else if (response.status === 204) {
          const responseMessage = {
            ...submission.initialResponse,
          };

          const data = {
            requestMessage: submission.userMessage,
            responseMessage: responseMessage,
            conversation: submission.conversation,
          };
          setIsSubmitting(false);
        } else {
          throw new Error('Unexpected response from server; Status: ' + response.status + ' ' + response.statusText);
        }
      } catch (error) {
        console.error('Error cancelling request');
        console.error(error);
        const convoId = conversationId ?? v4();
        const text = submission.initialResponse?.text?.length > 45 ? submission.initialResponse?.text : '';
        const errorMessage = {
          ...submission,
          ...submission.initialResponse,
          text: text ?? (error as Error).message ?? 'Error cancelling request',
          unfinished: !!text.length,
          error: true,
        };
        const errorResponse = errorMessage;
        setMessages([...submission.messages, submission.userMessage, errorResponse]);
        newConversation({
          template: { conversationId: convoId },
        });
        setIsSubmitting(false);
      }
    },
    [setIsSubmitting, finalHandler, cancelHandler, setMessages, newConversation],
  );

  useDeepCompareEffect(() => {
    if (submission === null || Object.keys(submission).length === 0) {
      return;
    }

    const submissionId = (submission.conversation as any)?.conversationId;

    // Next.JS Problem:
    if (submissionId && paramId && submissionId !== paramId) return;

    let { userMessage } = submission;

    const payloadData = createPayload(submission);
    // console.log('payloadData:', payloadData);
    const { payload } = payloadData;
    // if (isAssistantsEndpoint(payload.endpoint)) {
    //   payload = removeNullishValues(payload);
    // }

    let textIndex: any = null;
    // console.log('submission:', submission);
    // console.log('payloadData:', payloadData);

    const events: any = new SSE(payloadData.server, {
      payload: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    // console.log('events:', events);

    events.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      // console.log('eeeeee:', e);
      // console.log('123data:', data);

      if (data.final) {
        const { plugins } = data;
        finalHandler(data, { ...submission, plugins });
        // console.log('final', data);
      }
      if (data.created) {
        const runId = v4();
        setActiveRunId(runId);
        userMessage = {
          ...userMessage,
          ...data.message,
          overrideParentMessageId: userMessage?.overrideParentMessageId,
        };

        createdHandler(data, { ...submission, userMessage });
      } else if (data.sync) {
        const runId = v4();
        setActiveRunId(runId);
        /* synchronize messages to Assistants API as well as with real DB ID's */
        syncHandler(data, { ...submission, userMessage });
      } else if (data.type) {
        const { text, index } = data;
        if (text && index !== textIndex) {
          textIndex = index;
        }

        // contentHandler({ data, submission });
      } else {
        const text = data.text || data.response;

        const initialResponse = {
          ...submission.initialResponse,
          // parent_message_id: data.parentMessageId,
          parentMessageId: data.parentMessageId,
          message_id: data.messageId,
          messageId: data.messageId,
        };
        // console.log('text:', text);
        // console.log('userMessage:', userMessage);
        // console.log('initialResponse:', initialResponse);
        if (data.message) {
          messageHandler(text, { ...submission, userMessage, initialResponse });
        }
      }
    };

    // events.onaudio = (e: MessageEvent) => {
    //   const data = JSON.parse(e.data);
    //   console.log('audio', data);
    //   if (data.audio) {
    //     audioSource.addBase64Data(data.audio);
    //   }
    // };

    // events.onend = () => audioSource.close();

    events.onopen = () => console.log('connection is opened');

    events.oncancel = async () => {
      const streamKey = submission?.initialResponse?.message_id;
      if (completed.has(streamKey)) {
        setIsSubmitting(false);
        setCompleted((prev) => {
          prev.delete(streamKey);
          return new Set(prev);
        });
        return;
      }

      setCompleted((prev) => new Set(prev.add(streamKey)));
      return await abortConversation((userMessage?.conversationId as string) ?? submission?.conversationId, submission);
    };

    events.onerror = function (e: MessageEvent) {
      // console.log('args:', args);
      console.log('onerror e:', e);
      console.log('onerror e.data:', e.data);
      const abc = JSON.parse(e.data);
      console.log('abc:', abc);
      // console.log('error in server stream.');
      events.close();

      let data: TResData | undefined = undefined;
      console.log('---onerror data:', data);
      try {
        data = JSON.parse(e.data) as TResData;
      } catch (error) {
        console.error(error);
        console.log(e);
        setIsSubmitting(false);
      }

      errorHandler({ data, submission: { ...submission, userMessage } });
    };

    // console.log('--> setIsSubmitting = true here');
    setIsSubmitting(true);
    events.stream();

    return () => {
      console.log('🚀 ~ useSSE ~ return - events:', events);
      const isCancelled = events.readyState <= 1;
      const isResponseURL = events?.responseURL;
      const progress = events?.progress;
      events.close();
      // setSource(null);
      if (isCancelled) {
        const e = new Event('cancel');
        events.dispatchEvent(e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission]);
}

export default useSSE;
