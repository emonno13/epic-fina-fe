import { messageService } from '@api/message.service';
import { QuestionBlock } from '@components/atoms/questionBlock';
import { SiblingSwitch } from '@components/atoms/SiblingSwitch';
import { useChatContext } from '@contexts/chat-provider';
import useGenerationsByLatest from '@hooks/useGenerationsByLatest';
import useMessageHelpers from '@hooks/useMessageHelpers';
import { noopFn } from '@utils';
import { message as messageNotify } from 'antd';
import { MultiMessage } from '.';
import { ReplyError } from '../ReplyError';
import { ReplyWithContent } from '../ReplyWithContent';
import { MessageContent } from './MessageContent';

export const Message = (props: any) => {
  const {
    ask,
    edit,
    index,
    isLast,
    enterEdit,
    conversation,
    isSubmitting,
    latestMessage,
    handleContinue,
    copyToClipboard,
    regenerateMessage,
    // replaceMessage,
    handleReplaceErrorMsg,
  } = useMessageHelpers(props);
  const { setMessages, getMessages } = useChatContext();

  const { message, siblingIdx, siblingCount, setSiblingIdx, currentEditId, setCurrentEditId } = props;

  const { continueSupported } = useGenerationsByLatest({
    isEditing: edit,
    isSubmitting,
    message,
    latestMessage,
  });

  if (!message) {
    return null;
  }

  const { text, message: messageText, children, message_id = null, error, unfinished, role } = message ?? {};

  const actionMessageHandler = (messId: string, react: 'like' | 'dislike' | '', reason?: string) => {
    messageService
      .reaction(messId, {
        react,
        reason: reason || '',
      })
      .then(() => {
        const currentMessages = getMessages();
        if (currentMessages) {
          const newMessageList = currentMessages.map((item) => {
            if (item.message_id === messId) {
              return {
                ...item,
                feedback: {
                  react: react as string,
                },
              };
            }
            return item;
          });
          setMessages(newMessageList);
        }
        if (react === 'dislike' || react === 'like') {
          messageNotify.success('Cảm ơn về phản hồi của bạn!');
        }
      })
      .catch(noopFn);
  };

  const onDislike = (messageId: string, reason: string) => {
    actionMessageHandler(messageId, 'dislike', reason);
  };

  const onClearReaction = (messageId: string) => {
    actionMessageHandler(messageId, '', '');
  };

  return (
    <>
      {role !== 'ai' ? (
        <div className='mb-5'>
          <QuestionBlock
            from='Bạn'
            ask={ask}
            edit={edit}
            question={(text || messageText) ?? ''}
            siblingSwitch={
              <SiblingSwitch siblingIdx={siblingIdx} siblingCount={siblingCount} setSiblingIdx={setSiblingIdx} />
            }
            onEdit={() => {
              if (edit) {
                return enterEdit(true);
              }
              enterEdit();
            }}
            message={message}
            enterEdit={enterEdit}
            error={!!error}
            isSubmitting={isSubmitting}
            unfinished={unfinished ?? false}
            isCreatedByUser={Boolean(role === 'human') ?? true}
            siblingIdx={siblingIdx ?? 0}
            setSiblingIdx={
              setSiblingIdx ??
              (() => {
                return;
              })
            }
          />
        </div>
      ) : (
        <div className='text-token-text-primary w-full border-0 bg-transparent dark:border-0 dark:bg-transparent mb-3'>
          {error ? (
            <ReplyError onReplaceMessage={() => handleReplaceErrorMsg()} />
          ) : (
            <ReplyWithContent
              fromHuman={false}
              isSubmitting={isSubmitting}
              showContinue={continueSupported}
              like={message?.feedback?.react === 'like'}
              dislike={message?.feedback?.react === 'dislike'}
              onLike={() => actionMessageHandler(message.message_id, 'like')}
              onDislike={(reason) => onDislike(message.message_id, reason)}
              onRegenerate={() => regenerateMessage()}
              onContinue={handleContinue}
              onShare={async () => {}}
              onCopy={() =>
                copyToClipboard(() => {
                  messageNotify.info('Đã sao chép');
                })
              }
              replying={isSubmitting && !(text || messageText)}
              showActionButton={!(isLast && isSubmitting)}
              showRegenerate={isLast}
              siblingSwitch={
                <SiblingSwitch siblingIdx={siblingIdx} siblingCount={siblingCount} setSiblingIdx={setSiblingIdx} />
              }
              onClearReaction={() => onClearReaction(message.message_id)}
            >
              <MessageContent
                ask={ask}
                edit={edit}
                isLast={isLast}
                text={(text || messageText) ?? ''}
                message={message}
                enterEdit={enterEdit}
                error={!!error}
                isSubmitting={isSubmitting}
                unfinished={unfinished ?? false}
                isCreatedByUser={Boolean(role === 'human') ?? true}
                siblingIdx={siblingIdx ?? 0}
                setSiblingIdx={
                  setSiblingIdx ??
                  (() => {
                    return;
                  })
                }
              />
            </ReplyWithContent>
          )}
        </div>
      )}

      <MultiMessage
        key={message_id}
        messageId={message_id}
        conversation={conversation}
        messagesTree={children ?? []}
        currentEditId={currentEditId}
        setCurrentEditId={setCurrentEditId}
      />
    </>
  );
};
