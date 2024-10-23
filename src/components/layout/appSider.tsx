'use client';

import ConversationListByDay from '@components/molecules/ConversationListByDay';
import { useLogout } from '@refinedev/core';
import { useAppSelector } from '@store/hook';
import { selectConversationList } from '@store/slices/conversation.slice';
import { selectUser } from '@store/slices/user.slice';
import { groupByDay } from '@utils';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const AppSider = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const recentlyConversation = useAppSelector(selectConversationList);
  const [currentConversationId, setCurrentConversationId] = useState<undefined | string>(undefined);
  const [hoverConversationId, setHoverConversationId] = useState<undefined | string>(undefined);

  const { mutate: logout } = useLogout();

  const { id: conversationId } = useParams();

  const conversations: any = useMemo(() => {
    const res = groupByDay(recentlyConversation);
    return res;
  }, [recentlyConversation]);

  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId as string);
    } else {
      setCurrentConversationId(undefined);
    }
  }, [conversationId]);

  return (
    <div className='hidden lg:flex justify-between h-full transition-all'>
      {/* ------------------------------- CONTAINER */}
      <div className='h-full bg-white  w-[324px] flex flex-col [box-shadow:0px_17px_40px_4px_#7090B014]'>
        <div>
          <div className='p-[16px] flex flex-row items-center justify-between'>
            {/* LOG0  */}
            <div className='flex flex-row gap-x-[8px] items-center'>
              <Image
                className='object-contain'
                width={40}
                height={40}
                src='/logo/rectangle-ivita-chat-logo.png'
                alt='rectangle-ivita-chat-logo'
              />
              <p className='font-medium text-[14px] leading-[24px] m-0'>iVita</p>
            </div>
            {/* NEW CONVERSATION */}
            <Tooltip placement='rightTop' title={<span>Đoạn chat mới</span>}>
              <Image
                className='object-contain hover:cursor-pointer'
                width={24}
                height={24}
                src='/icon/edit 1.png'
                alt='new-conversation'
                onClick={() => router.push('/')}
              />
            </Tooltip>
          </div>
          {/* TITLE - */}
          <div className='flex justify-between items-center px-[16px] py-[20px] [border-bottom:1px_solid_#0000000D] [border-top:1px_solid_#0000000D]'>
            <span className='text-center text-[14px]'>Cuộc trò chuyện của bạn</span>
            {/* <button className='border-none bg-transparent text-sm text-blue-500 cursor-pointer hover:text-blue-600'>
              Xóa tất cả
            </button> */}
          </div>
        </div>
        {/* ------------------------------- CONVERSATION LIST */}
        <div className='no-scrollbar max-h-[calc(100vh-180px)] overflow-y-auto flex-grow flex-1'>
          {conversations?.map((group: any, index: number) => {
            return (
              <ConversationListByDay
                key={index}
                data={group}
                currentConversationId={currentConversationId}
                hoverConversationId={hoverConversationId}
                setHoverConversationId={setHoverConversationId}
                handleClose={() => {}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
