'use client';

import { useGetMessagesByConvoId } from '@data-provider/react-query';
import useSSE from '@hooks/useSSE';
import recoilStore from '@recoil-store';
import { buildTree } from '@utils';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { MessagesView } from '../MessagesView';

export const MappingMessages = () => {
  const { id: conversationId } = useParams();
  const submissionAtIndex = useRecoilValue(recoilStore.submissionByIndex(0));

  useSSE(submissionAtIndex);

  const { data: messagesTree = null, isLoading } = useGetMessagesByConvoId((conversationId as string) ?? '', {
    select: (data) => {
      const messageDataReal = data;
      const dataTree = buildTree({
        messages: (messageDataReal || []).map((item: any) => ({
          ...item,
          parent_message_id: item.parent_message_id || item.parentMessageId,
        })),
      });
      return dataTree?.length === 0 ? null : dataTree ?? null;
    },
    enabled: true,
  });

  return (
    <div>
      {messagesTree && messagesTree.length !== 0 ? (
        <MessagesView messagesTree={messagesTree} Header={<div>Header</div>} />
      ) : null}
    </div>
  );
};

export default MappingMessages;
