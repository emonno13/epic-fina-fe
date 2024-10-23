import recoilStore from '@recoil-store';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Message } from './Message';
import { MessageParts } from './MessageParts';

export const MultiMessage = ({ messageId, messagesTree, currentEditId, setCurrentEditId, ...props }: any) => {
  const [siblingIdx, setSiblingIdx] = useRecoilState(recoilStore.messagesSiblingIdxFamily(messageId));

  const setSiblingIdxRev = (value: number) => {
    setSiblingIdx((messagesTree?.length ?? 0) - value - 1);
  };

  useEffect(() => {
    setSiblingIdx(0);
  }, [messagesTree?.length]);

  useEffect(() => {
    if (messagesTree?.length && siblingIdx >= messagesTree?.length) {
      setSiblingIdx(0);
    }
  }, [siblingIdx, messagesTree?.length, setSiblingIdx]);

  if (!(messagesTree && messagesTree?.length)) {
    return null;
  }

  const message = messagesTree[messagesTree.length - siblingIdx - 1];

  if (!message) {
    return null;
  }

  if (message.content) {
    return (
      <MessageParts
        key={message.message_id}
        message={message}
        currentEditId={currentEditId}
        setCurrentEditId={setCurrentEditId}
        siblingIdx={messagesTree.length - siblingIdx - 1}
        siblingCount={messagesTree.length}
        setSiblingIdx={setSiblingIdxRev}
      />
    );
  }

  return (
    <Message
      key={message.message_id}
      message={message}
      currentEditId={currentEditId}
      setCurrentEditId={setCurrentEditId}
      siblingIdx={messagesTree.length - siblingIdx - 1}
      siblingCount={messagesTree.length}
      setSiblingIdx={setSiblingIdxRev}
    />
  );
};
