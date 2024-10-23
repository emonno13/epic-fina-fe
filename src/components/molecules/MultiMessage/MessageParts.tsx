import { ContentParts } from '@components/atoms/ContentParts';
import { SiblingSwitch } from '@components/atoms/SiblingSwitch';
import useMessageHelpers from '@hooks/useMessageHelpers';
import { MultiMessage } from '.';
import HoverButtons from '../HoverButtons';

export const MessageParts = (props: any) => {
  const { message, siblingIdx, siblingCount, setSiblingIdx, currentEditId, setCurrentEditId } = props;

  const {
    ask,
    edit,
    index,
    isLast,
    enterEdit,
    conversation,
    isSubmitting,
    latestMessage,
    copyToClipboard,
    handleContinue,
    regenerateMessage,
  } = useMessageHelpers(props);

  const { content, children, message_id = null, role, error, unfinished } = message ?? {};
  const isCreatedByUser = role === 'human';
  if (!message) {
    return null;
  }
  return (
    <div>
      <div className='flex-col gap-1 md:gap-3'>
        <div className='flex max-w-full flex-grow flex-col gap-0'>
          <ContentParts
            ask={ask}
            edit={edit}
            isLast={isLast}
            content={content ?? []}
            message={message}
            messageId={message_id}
            enterEdit={enterEdit}
            error={!!error}
            isSubmitting={isSubmitting}
            unfinished={unfinished ?? false}
            isCreatedByUser={isCreatedByUser ?? true}
            siblingIdx={siblingIdx ?? 0}
            setSiblingIdx={
              setSiblingIdx ??
              (() => {
                return;
              })
            }
          />
        </div>
        <div>
          {isLast && isSubmitting ? null : (
            <div>
              <SiblingSwitch siblingIdx={siblingIdx} siblingCount={siblingCount} setSiblingIdx={setSiblingIdx} />
              <HoverButtons
                index={index}
                isEditing={edit}
                message={message}
                enterEdit={enterEdit}
                isSubmitting={isSubmitting}
                regenerate={() => regenerateMessage()}
                copyToClipboard={copyToClipboard}
                handleContinue={handleContinue}
                latestMessage={latestMessage}
                isLast={isLast}
              />
            </div>
          )}
        </div>
      </div>
      <MultiMessage
        key={message_id}
        messageId={message_id}
        conversation={conversation}
        messagesTree={children ?? []}
        currentEditId={currentEditId}
        setCurrentEditId={setCurrentEditId}
      />
    </div>
  );
};
