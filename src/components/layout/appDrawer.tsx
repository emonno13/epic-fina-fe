'use client';

import ConversationListByDay from '@components/molecules/ConversationListByDay';
import useWindowSize from '@hooks/useWindowSize';
import { useLogout } from '@refinedev/core';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { appActions, selectSiderCollapsed } from '@store/slices/app.slice';
import { selectConversationList } from '@store/slices/conversation.slice';
import { selectUser } from '@store/slices/user.slice';
import { getInitials, groupByDay } from '@utils';
import { Drawer, Tooltip } from 'antd';
import Image from 'next/image';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const AppDrawer = () => {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const user = useAppSelector(selectUser);
  const { width, height } = useWindowSize();
  const siderCollapsed = useAppSelector(selectSiderCollapsed);
  const dispatch = useAppDispatch();
  const recentlyConversation = useAppSelector(selectConversationList);
  const [currentConversationId, setCurrentConversationId] = useState<undefined | string>(undefined);
  const [hoverConversationId, setHoverConversationId] = useState<undefined | string>(undefined);

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

  const handleClose = () => {
    dispatch(appActions.toggleCollapse(false));
  };

  const items = [
    {
      label: (
        <div className='flex items-center'>
          <Image alt='logout' height={32} className='flex' src='/icons/logout-icon-v2.svg' />
          <span className='inline-block pl-2'>Đăng xuất</span>
        </div>
      ),
      key: '0',
      onClick: () => logout(),
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(appActions.toggleCollapse(false));
    };
  }, []);

  return (
    <>
      <Drawer
        className='mobile-drawer !bg-[#F9F9F9]'
        style={{ height: `${height}px` }}
        placement='left'
        closable={false}
        onClose={() => {
          dispatch(appActions.toggleCollapse(false));
        }}
        // destroyOnClose
        open={siderCollapsed}
        width='310px'
      >
        <div className='flex flex-col h-full overflow-auto'>
          {/* HEADER */}
          <div className='w-full flex flex-col justify-start'>
            <Image
              alt='burger-icon'
              height={40}
              width={40}
              className='flex hover:cursor-pointer m-[8px]'
              src='/icon/burger.svg'
              onClick={handleClose}
            />
            {/* NEW CONVERSATION */}
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
          </div>

          {/* LIST */}
          <div className='w-full flex flex-1 flex-col overflow-y-auto'>
            {/* TITLE - */}
            <div className='flex justify-between items-center px-[24px] py-[16px] [border-bottom:1px_solid_#0000000D] [border-top:1px_solid_#0000000D]'>
              <span className='text-center font-medium leading-[24px] text-[14px]'>Cuộc trò chuyện của bạn</span>
              {/* <button className='border-none bg-transparent text-sm text-blue-500 cursor-pointer hover:text-blue-600'>
              Xóa tất cả
            </button> */}
            </div>
            {/* ------------------------------- CONVERSATION LIST */}
            <div className='no-scrollbar h-auto overflow-y-auto flex-1 py-[12px]'>
              {conversations?.map((group: any, index: number) => {
                return (
                  <ConversationListByDay
                    key={index}
                    data={group}
                    currentConversationId={currentConversationId}
                    hoverConversationId={hoverConversationId}
                    setHoverConversationId={setHoverConversationId}
                    handleClose={handleClose}
                  />
                );
              })}
            </div>
          </div>

          {/* ------------------------------- LOGOUT */}
          <div className='p-[24px] flex w-full items-center justify-between'>
            {/* button */}
            <div
              className='h-full w-full flex flex-row items-center justify-between cursor-pointer  hover:bg-[rgba(0,0,0,0.06)] leading-[24px] align content-center'
              onClick={() => {
                logout();
                redirect('/');
              }}
            >
              <div className='flex flex-row flex-1 items-center gap-x-[10px]'>
                <div
                  id='name-user-avatar'
                  className='w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-[8px] bg-[#EFCD55] text-[white] font-bold leading-[20px] text-[17px] grid place-items-center'
                >
                  {getInitials(user?.full_name || 'U')}
                </div>
                <span className='text-[#1B2559] text-[14px] font-bold flex-grow truncate max-w-[150px]'>
                  {user?.full_name || 'User'}
                </span>
              </div>
              <Image src='/icon/logout.svg' alt='' width={24} height={24} />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
