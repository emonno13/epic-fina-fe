import { InfoCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@components/base/baseButton/BaseButton';
import { Typography } from 'antd';
import Image from 'next/image';
import * as S from './ReplyError.styles';

interface IReplyError {
  onReplaceMessage: (e: any) => void;
}

export const ReplyError: React.FC<IReplyError> = ({ onReplaceMessage }) => {
  return (
    <S.Container>
      <S.ErrorBlock>
        <S.Logo>
          <Image
            className='w-full h-full object-contain'
            width={32}
            height={32}
            src='/logo/ivita-chat-logo.png'
            alt='ivita-chat-logo'
          />
        </S.Logo>
        <S.Body>
          <div className='flex items-center'>
            <Typography.Text strong className='mr-[6px]'>
              iVita
            </Typography.Text>
            <InfoCircleOutlined className='text-[#F05866]' />
          </div>
          <div>
            Đã xảy ra sự cố trong quá trình tạo câu phản hồi dành cho bạn. Hãy nhấn vào nút Trả lời lại để nhận câu phản
            hồi. Nếu vấn đề này vẫn tiếp diễn, vui lòng liên hệ với chúng tôi qua trung tâm trợ giúp tại{' '}
            <span
              className='text-[#0180B6] underline hover:cursor-pointer'
              onClick={() => window.open('mailto:info@iVita.vn')}
            >
              info@iVita.vn
            </span>
          </div>
        </S.Body>
      </S.ErrorBlock>
      <S.ReplyBlock className='text-center'>
        <Typography.Text className='text-sm text-grey-1 mb-2' strong>
          Có lỗi xảy ra khi trả lời câu hỏi
        </Typography.Text>
        <BaseButton
          type='primary'
          size='small'
          className='flex items-center px-4 rounded-[12px]'
          onClick={onReplaceMessage}
          icon={
            <svg width='21' height='20' viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_1338_4315)'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.49996 2.85874C5.30295 1.09135 7.77389 0 10.5 0C16.0228 0 20.5 4.47715 20.5 10C20.5 10.5523 20.0523 11 19.5 11C18.9477 11 18.5 10.5523 18.5 10C18.5 5.58172 14.9183 2 10.5 2C8.29545 2 6.29878 2.89119 4.85089 4.33528L6.28745 4.0228C6.82712 3.90541 7.35976 4.24774 7.47715 4.7874C7.59454 5.32707 7.25221 5.85972 6.71255 5.9771L2.71249 6.84719C2.41687 6.91149 2.10803 6.8385 1.87246 6.64867C1.6369 6.45883 1.49994 6.17256 1.49994 5.87003L1.49997 1.99993C1.49997 1.44765 1.94769 0.999935 2.49998 0.999939C3.05226 0.999943 3.49997 1.44766 3.49997 1.99995L3.49996 2.85874ZM1.5 9C2.05228 9 2.5 9.44771 2.5 10C2.5 14.4183 6.08172 18 10.5 18C12.7046 18 14.7012 17.1088 16.1491 15.6647L14.7125 15.9772C14.1728 16.0946 13.6402 15.7523 13.5228 15.2126C13.4054 14.6729 13.7477 14.1403 14.2874 14.0229L18.2875 13.1528C18.5831 13.0885 18.8919 13.1615 19.1275 13.3513C19.3631 13.5412 19.5 13.8274 19.5 14.13L19.5 18.0001C19.5 18.5523 19.0523 19.0001 18.5 19.0001C17.9477 19.0001 17.5 18.5523 17.5 18L17.5 17.1413C15.697 18.9087 13.2261 20 10.5 20C4.97715 20 0.5 15.5228 0.5 10C0.5 9.44771 0.947715 9 1.5 9Z'
                  fill='#EEEEEE'
                />
              </g>
              <defs>
                <clipPath id='clip0_1338_4315'>
                  <rect width='20' height='20' fill='white' transform='matrix(1 0 0 -1 0.5 20)' />
                </clipPath>
              </defs>
            </svg>
          }
        >
          <span className='text-white font-semibold'>Trả lời lại</span>
        </BaseButton>
      </S.ReplyBlock>
    </S.Container>
  );
};
