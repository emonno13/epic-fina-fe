import { EditMessage } from '@components/atoms/EditMessage';
import Markdown from '@components/atoms/Markdown';
import { Fragment } from 'react';

// Display Message Component
const DisplayMessage = ({ text, isCreatedByUser = false, message, showCursor }: any) => {
  return (
    <div className={'markdown prose dark:prose-invert light w-full break-words'}>
      {!isCreatedByUser ? <Markdown content={text} message={message} showCursor={showCursor} /> : <>{text}</>}
    </div>
  );
};

export const MessageContent = ({ text, edit, error, unfinished, isSubmitting, isLast, ...props }: any) => {
  if (edit) {
    return <EditMessage text={text} isSubmitting={isSubmitting} {...props} />;
  } else {
    const marker = ':::plugin:::\n';
    const splitText = text.split(marker);
    const { message } = props;
    const { plugins, message_id } = message;
    const displayedIndices = new Set<number>();
    // Function to get the next non-empty text index
    const getNextNonEmptyTextIndex = (currentIndex: number) => {
      for (let i = currentIndex + 1; i < splitText.length; i++) {
        // Allow the last index to be last in case it has text
        // this may need to change if I add back streaming
        if (i === splitText.length - 1) {
          return currentIndex;
        }

        if (splitText[i].trim() !== '' && !displayedIndices.has(i)) {
          return i;
        }
      }
      return currentIndex; // If no non-empty text is found, return the current index
    };

    return splitText.map((text: any, idx: number) => {
      let currentText = text.trim();
      let plugin: any | null = null;

      if (plugins) {
        plugin = plugins[idx];
      }

      // If the current text is empty, get the next non-empty text index
      const displayTextIndex = currentText === '' ? getNextNonEmptyTextIndex(idx) : idx;
      currentText = splitText[displayTextIndex];
      const isLastIndex = displayTextIndex === splitText.length - 1;
      const isEmpty = currentText.trim() === '';
      const showText = (currentText && !isEmpty && !displayedIndices.has(displayTextIndex)) || (isEmpty && isLastIndex);
      displayedIndices.add(displayTextIndex);

      return (
        <Fragment key={idx}>
          {showText ? (
            <DisplayMessage
              key={`display-${message_id}-${idx}`}
              showCursor={isLastIndex && isLast && isSubmitting}
              text={currentText}
              {...props}
            />
          ) : null}
          {!isSubmitting && unfinished && <div>unfinished</div>}
        </Fragment>
      );
    });
  }
};
