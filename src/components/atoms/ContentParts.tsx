import Part from './Part';

export const ContentParts = ({ error, unfinished, isSubmitting, isLast, content, ...props }: any) => {
  if (error) {
    return <div>ErrorMessage</div>;
  } else {
    const { message } = props;
    const { message_id } = message;

    return (
      <>
        {content
          .filter((part: any | undefined) => part)
          .map((part: any | undefined, idx: number) => {
            const showCursor = idx === content.length - 1 && isLast;
            return (
              <Part
                key={`display-${message_id}-${idx}`}
                showCursor={showCursor && isSubmitting}
                isSubmitting={isSubmitting}
                part={part}
                {...props}
              />
            );
          })}
        {/* Temporarily remove this */}
        {/* {!isSubmitting && unfinished && (
          <Suspense>
            <DelayedRender delay={250}>
              <UnfinishedMessage message={message} key={`unfinished-${messageId}`} />
            </DelayedRender>
          </Suspense>
        )} */}
      </>
    );
  }
};
