'use client';

import { TextareaAutosize } from '@components/atoms/TextareaAutosize';
import { BaseButton } from '@components/base/baseButton/BaseButton';
import { mainTextareaId } from '@hooks/useNewConvo';
import useTextarea from '@hooks/useTextarea';
import recoilStore from '@recoil-store';
import { Image, message } from 'antd';
import React, { HTMLAttributes, PropsWithChildren, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Control, useForm, useWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import AttachmentImageList from '../AttachmentImageList';
const AttachmentPopup = dynamic(() => import('@components/molecules/AttachmentPopup'), { ssr: false });
const GoogleDriveLoader = dynamic(() => import('@components/molecules/GoogleDriveLoader'), { ssr: false });
const SpeechToTextRecorder = dynamic(() => import('@components/molecules/SpeechToTextRecorder'), { ssr: false });

import cn, { requestMicrophoneAccess } from '@utils';
import dynamic from 'next/dynamic';
import * as S from './CommandBlock.styles';
interface Props extends HTMLAttributes<HTMLElement> {
  onEnter?: (question: string) => void;
  loading?: boolean;
}

interface ChatFormProps {
  onAsk: (data: { text: string }) => void;
  onStop: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting?: boolean;
}

const StyledChatFormContainer = styled.div`
  width: 100%;
  flex: 1;
  .chat-input-element {
    background-color: #ffffff;
    height: 22px !important;
    border: none;
    font-weight: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    /* padding: 18px 15px; */
    color: #2d3c58;
    border-radius: 45px;
    &::placeholder {
      color: #a2acc0;
      font-size: 16px;
      font-weight: 600;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const StyledSubmitButton = styled(BaseButton)`
  &.ant-btn {
    position: relative;
    background: #20b46f;
    /* box-shadow: 0px 21px 27px -10px #10532747; */
    border: none;
    &:hover {
      background: #7fe7b6 !important;
    }
  }
`;

const SubmitButton = React.memo(
  forwardRef((props: { disabled: boolean }, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <StyledSubmitButton
        ref={ref}
        disabled={props.disabled}
        htmlType='submit'
        className='flex flex-row justify-center items-center lg:gap-x-[7px] w-[40px] h-[40px] lg:w-[40px] rounded-full'
      >
        <Image
          src='/icon/green-send-icon.svg'
          alt='send icon'
          preview={false}
          className='w-[40px] h-[40px] object-cover'
        />
      </StyledSubmitButton>
    );
  }),
);

type SendButtonProps = {
  disabled: boolean;
  control: Control<{ text: string }>;
};

type StopButtonProps = {
  stop: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowStopButton: any;
};

const SendButton = React.memo(
  forwardRef((props: SendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const data = useWatch({ control: props.control });
    return <SubmitButton ref={ref} disabled={props.disabled || !data?.text} />;
  }),
);

const StopButton = React.memo(
  forwardRef(({ stop, setShowStopButton }: StopButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <StyledSubmitButton
        ref={ref}
        htmlType='submit'
        className='flex flex-row justify-center items-center lg:gap-x-[7px] w-[40px] h-[40px] rounded-[45px]'
        style={{
          boxShadow: '0px 0px 20px 0px #00000012',
        }}
        onClick={(e) => {
          setShowStopButton(false);
          stop(e as any);
        }}
      >
        <div className='w-3 h-3 bg-white rounded-sm'></div>
        {/* <p className='text-white hidden lg:inline-block m-0'>Dừng</p> */}
      </StyledSubmitButton>
    );
  }),
);

export interface ChatFormRef {
  resetForm: () => void;
}

export const ChatForm = forwardRef<ChatFormRef, ChatFormProps>(function ChatForm({ onAsk, onStop, isSubmitting }, ref) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showStopButton, setShowStopButton] = useRecoilState(recoilStore.showStopButtonByIndex(0));
  const [showSpeechToTextInput, setShowSpeechTotextInput] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenGooleDrive, setIsOpenGooleDrive] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      methods.reset();
    },
  }));

  const methods = useForm<{ text: string }>({
    defaultValues: { text: '' },
  });

  const text = methods.watch('text');

  const { handlePaste, handleKeyDown, handleKeyUp, handleCompositionStart, handleCompositionEnd } = useTextarea({
    textAreaRef,
    submitButtonRef,
    disabled: false,
  });

  const { ref: formRef, ...registerProps } = methods.register('text', {
    required: true,
    onChange: (e) => {
      methods.setValue('text', e.target.value, { shouldValidate: true });
    },
  });

  if (showSpeechToTextInput) {
    return (
      <SpeechToTextRecorder
        showSpeechToTextInput={showSpeechToTextInput}
        setShowSpeechTotextInput={setShowSpeechTotextInput}
        handleSetTranscript={({ transcript }) => {
          console.log('@@SpeechToTextRecorder', transcript);
          methods.setValue('text', transcript || '', {
            shouldValidate: true,
          });
        }}
      />
    );
  }

  // Function to handle file selection from the AttachmentPopup
  const handleFileSelection = (files: any[]) => {
    setFileList((prev) => [...prev, ...files]);
  };

  return (
    <>
      <StyledChatFormContainer>
        {isOpenGooleDrive ? (
          <GoogleDriveLoader
            handleFileSelection={handleFileSelection}
            isOpenGooleDrive={isOpenGooleDrive}
            setIsOpenGooleDrive={setIsOpenGooleDrive}
          />
        ) : null}
        <form onSubmit={methods.handleSubmit(onAsk)}>
          <div className='flex w-full items-center '>
            <div
              className={cn('w-full flex flex-col h-fit  ', {
                'rounded-[24px] bg-white': fileList.length > 0,
              })}
            >
              <div className={cn('', { 'mx-[12px]': fileList.length > 0 })}>
                <AttachmentImageList fileList={fileList} setFileList={setFileList} />
              </div>
              <div className='relative flex overflow-hidden gap-2 p-[12px] rounded-full [box-shadow:0px_2px_4px_-2px_#1717170F] w-full bg-white mx-auto items-center'>
                <AttachmentPopup
                  isPopupOpen={isPopupOpen}
                  setIsOpenGooleDrive={setIsOpenGooleDrive}
                  setIsPopupOpen={setIsPopupOpen}
                  onFileSelection={handleFileSelection}
                >
                  <Image
                    id='attachment-id'
                    src='/icon/attachment-icon-2.png'
                    alt='attachment'
                    width={24}
                    preview={false}
                    className='hover:cursor-pointer w-[24px] h-[24px]'
                    onClick={() => setIsPopupOpen(!isPopupOpen)}
                  />
                </AttachmentPopup>

                <TextareaAutosize
                  {...registerProps}
                  autoFocus
                  ref={(e) => {
                    formRef(e);
                    textAreaRef.current = e;
                  }}
                  maxLength={2000}
                  maxRows={8}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  id={mainTextareaId}
                  tabIndex={0}
                  style={{ overflowY: 'auto' }}
                  rows={1}
                  className={'chat-input-element flex-grow mobile:rounded-[14px] rounded-[45px] overflow-hidden'}
                />
                <div className='flex justify-start mt-1 gap-[12px] items-center'>
                  {isSubmitting && showStopButton ? (
                    <StopButton stop={onStop} setShowStopButton={setShowStopButton} />
                  ) : (
                    <>
                      {text ? (
                        <SendButton ref={submitButtonRef} control={methods.control} disabled={!!isSubmitting} />
                      ) : (
                        <>
                          <Image
                            src={'/icon/voice-icon-2.svg'}
                            alt='voice-icon'
                            width={24}
                            height={24}
                            preview={false}
                            className='w-[24px] h-[24px] object-cover hover:cursor-pointer'
                            onClick={async () => {
                              const isAccessMicrophone = await requestMicrophoneAccess();
                              if (isAccessMicrophone) setShowSpeechTotextInput(true);
                            }}
                          />
                          <Image
                            src={'/icon/voice-circle.svg'}
                            alt='voice-circle-icon'
                            width={40}
                            height={40}
                            preview={false}
                            className='hover:cursor-pointer'
                            onClick={async () => {
                              message.warning('Tính năng sắp được triển khai');
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </StyledChatFormContainer>
    </>
  );
});

export const CommandBlock: React.FC<Props & PropsWithChildren> = ({ loading, onEnter, className, children }) => {
  return (
    <S.StyledCommandBlock className={className}>
      <S.CommandInput>{children}</S.CommandInput>
    </S.StyledCommandBlock>
  );
};

export default ChatForm;
