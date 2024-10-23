'use client';

import useScreen from '@hooks/useScreen';
import cn from '@utils';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ConversationListByDay = ({
  data,
  currentConversationId,
  hoverConversationId,
  setHoverConversationId,

  handleClose,
}: any) => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const { isMobile, isTablet } = useScreen();

  return (
    <>
      <div className=''>
        <div
          className='flex justify-between items-center px-[24px] py-[12px] hover:cursor-pointer'
          // onClick={() => setShow(!show)}
        >
          <span className='text-center text-[14px] leading-[24px] font-bold'>{data?.title || 'Hôm nay'}</span>
          {/* <img
            src='/icons/CaretDown.svg'
            alt='down-icon'
            width={24}
            height={24}
            className={cn('w-[24px] h-[24px] transition', { 'rotate-180': show })}
          /> */}
        </div>
        {show
          ? data?.data?.map((conversation: any) => (
              <Tooltip
                key={conversation._id}
                placement='leftTop'
                title={isMobile || isTablet ? '' : <span>{conversation?.name || 'Câu hỏi lỗi'}</span>}
              >
                <div
                  className={cn('', {
                    'flex px-[24px] py-[12px] hover:cursor-pointer':
                      conversation?._id !== currentConversationId && conversation?._id !== hoverConversationId,
                    flex: conversation?._id === currentConversationId || conversation?._id === hoverConversationId,
                  })}
                  onClick={() => {
                    handleClose();
                    router.push(`/conversation/${conversation._id}`);
                  }}
                  onMouseOver={() => setHoverConversationId(conversation?._id)}
                  onMouseLeave={() => setHoverConversationId('')}
                >
                  <span
                    className={cn(
                      'text-[#1E293B] prevent-select hover:cursor-pointer text-[16px] leading-[22px] font-normal truncate w-full',
                      {
                        'py-[12px] pl-[24px] pr-[21px] bg-[#E9F6F1] truncate [border-right:4px_solid_#26A876]':
                          conversation._id === currentConversationId || conversation._id === hoverConversationId,
                      },
                    )}
                  >
                    {conversation.name || 'Câu hỏi lỗi'}
                  </span>
                </div>
              </Tooltip>
            ))
          : null}
      </div>
    </>
  );
};

export default ConversationListByDay;
