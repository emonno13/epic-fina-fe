import { useChatContext } from '@contexts/chat-provider';
import useScreen from '@hooks/useScreen';
import recoilStore from '@recoil-store';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MultiMessage } from '../MultiMessage';

export const MessagesView = ({ messagesTree: _messagesTree, Header }: any) => {
  const [currentEditId, setCurrentEditId] = useState<number | string | null>(-1);
  const { conversation } = useChatContext();

  const { conversationId } = conversation ?? {};

  const screen = useScreen();
  const isSubmitting = useRecoilValue(recoilStore.isSubmittingFamily(0));

  return (
    <div className='pt-5'>
      <MultiMessage
        key={conversationId} // avoid internal state mixture
        messagesTree={_messagesTree}
        messageId={conversationId ?? null}
        setCurrentEditId={setCurrentEditId}
        currentEditId={currentEditId ?? null}
      />
      {/* {matchConversationPage && (screen.isTablet || screen.isMobile) ? <OthersSearchMobileBox /> : null} */}
      {/* {!isSubmitting ? <NewConservationSuggestion /> : null} */}
    </div>
  );
};
