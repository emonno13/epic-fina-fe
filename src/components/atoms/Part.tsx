import { ContentTypes } from '@constants';
import Markdown from './Markdown';

export type PartMetadata = {
  progress?: number;
  asset_pointer?: string;
  status?: string;
  action?: boolean;
};

export type TMessageContentParts =
  | { type: ContentTypes.ERROR; text: Text & PartMetadata }
  | { type: ContentTypes.TEXT; text: Text & PartMetadata }
  | {
      type: ContentTypes.TOOL_CALL;
    };

// import EditMessage from './EditMessage';

// Display Message Component
const DisplayMessage = ({ text, isCreatedByUser = false, message, showCursor }: any) => {
  return (
    <div className={'markdown prose dark:prose-invert light w-full break-words'}>
      {!isCreatedByUser ? <Markdown content={text} message={message} showCursor={showCursor} /> : <>{text}</>}
    </div>
  );
};

export default function Part({
  part,
  showCursor,
  isSubmitting,
  message,
}: {
  part: TMessageContentParts;
  isSubmitting: boolean;
  showCursor: boolean;
  message: any;
}) {
  if (!part) {
    return null;
  }
  if (part.type === ContentTypes.ERROR) {
    return <div>ErrorMessage</div>;
  } else if (part.type === ContentTypes.TEXT) {
    // Access the value property
    return (
      <div>
        <div className='markdown prose dark:prose-invert light dark:text-gray-70 my-1 w-full break-words'>
          <DisplayMessage
            text={part[ContentTypes.TEXT].textContent}
            isCreatedByUser={message.role === 'human'}
            message={message}
            showCursor={showCursor}
          />
        </div>
      </div>
    );
  }

  return null;
}
