'use client';

import CommandInputForm from '@components/molecules/CommandInputForm';
import { MappingMessages } from '@components/molecules/MappingMessages';
import { ChatContext } from '@contexts/chat-provider';
import useChatHelpers from '@hooks/useChatHelpers';
import useIsAtBottom from '@hooks/useIsAtBottom';
import { useLogout } from '@refinedev/core';
import { useAppSelector } from '@store/hook';
import { selectUser } from '@store/slices/user.slice';
import { WhiteHeaderBackgroundPageStyle } from '@styles/override.styles';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function ConversationDetailPage() {
  const user = useAppSelector(selectUser);
  const { mutate: logout } = useLogout();

  const { id: conversationId } = useParams();
  const { isAtBottom } = useIsAtBottom({ className: 'react-scroll__scroll-view' });

  const chatHelpers = useChatHelpers(0, conversationId as string);

  /*  Custom scroll */
  const handleScrollToBottom = () => {
    const scrollContainer = document?.querySelector('.react-scroll__scroll-view');
    if (scrollContainer) {
      // Calculate the amount to scroll to the bottom
      const scrollAmount = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      // Scroll to the bottom
      scrollContainer.scrollTo({
        top: scrollAmount,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  /*  Custom scroll */
  // scroll to bottom when initing the conversation
  useEffect(() => {
    setTimeout(() => {
      handleScrollToBottom();
    }, 1000);
  }, [conversationId]);

  return (
    <ChatContext.Provider value={chatHelpers}>
      <div
        id='chat-conservation-epic'
        className='relative flex flex-col flex-1 h-full overflow-auto pt-0 pb-0 lg:pb-[30px] lg:pt-[52px] w-full'
      >
        {/* ------------------------------- HEADER */}
        {/* <div className='flex flex-row items-center justify-between mb-[35px] lg:mb-[45px] px-[16px] lg:pl-[calc((100vw_-_310px)*0.3/2)] lg:pr-[calc((100vw_-_310px)*0.3/6)]'>
          <p className='text-[34px] leading-[34px] font-[700] tablet:text-[26px] mobile:text-[24px] m-0'>
            Trò chuyện với iVita
          </p>
          <div className='bg-white px-[12px] py-[8px] hidden lg:inline-block rounded-[54px]'>
            <Avatar size={41} src='/default-avatar.svg' />
            <div className='w-[41px] h-[41px] rounded-full bg-[#EFCD55] text-[white] font-bold leading-[22px] text-[20px] grid place-items-center'>
              {getInitials(user?.full_name || 'U')}
            </div>
          </div>
        </div> */}

        {/* ------------------------------- CHAT CONTENT */}
        <div className='flex flex-1 overflow-hidden mx-auto w-full px-[16px] lg:px-[calc((100vw_-_310px)*0.3/2)]'>
          <div role='presentation' className='flex h-full w-full flex-col'>
            <div className='flex-1 overflow-hidden w-full'>
              <div className='home-content-wrapper flex flex-col justify-between h-full'>
                <div className='main-home-content text-center lg:text-left h-full'>
                  <div className='flex flex-col justify-start h-full'>
                    <div className='welcome-text overflow-hidden'>
                      <WhiteHeaderBackgroundPageStyle />
                      <ScrollToBottom
                        className='relative h-full react-scroll-bottom-container'
                        followButtonClassName='react-scroll-button hidden'
                        initialScrollBehavior='auto'
                        mode='bottom'
                        scrollViewClassName='react-scroll__scroll-view inVisible-scroll'
                        /*  Custom scroll */
                        scroller={({ maxValue, minValue, offsetHeight, scrollHeight, scrollTop }) => {
                          return 0;
                        }}
                      >
                        <div className='flex flex-col text-sm pb-2 mx-auto w-full'>
                          <MappingMessages />
                        </div>
                        {/*  Custom scroll */}
                        {!isAtBottom ? (
                          <button
                            className='absolute bottom-[5px] react-scroll-button hover:cursor-pointer'
                            onClick={handleScrollToBottom}
                          ></button>
                        ) : null}
                      </ScrollToBottom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='flex flex-col px-[16px] lg:px-[calc((100vw_-_310px)*0.3/2)]'>
          <div className='mx-auto mb-[0px] text-black w-full'>
            <CommandInputForm />
          </div>
          {/* <div className=' text-black w-full mx-auto'>
            <p className='text-center text-sm text-[#2F2F2F]'>
              Thông tin được tạo ra bằng AI. Hãy luôn cẩn trọng và sử dụng thông tin AI một cách có trách nhiệm.
              <br />
                Xem thêm về
                <Link to={'#'} className='text-[#000000] underline ml-1'>
                  Quyền riêng tư của bạn và ứng dụng
                </Link>{' '}
                iVita AI chăm sóc sức khoẻ.
            </p>
          </div> */}
          {/* <div className='w-full mx-auto'>
            <p className='text-right text-sm text-[#718096] mobile:text-center'>
              © 2024 iVita AI Template. All Rights Reserved.
            </p>
          </div> */}
        </div>
      </div>
    </ChatContext.Provider>
  );
}
