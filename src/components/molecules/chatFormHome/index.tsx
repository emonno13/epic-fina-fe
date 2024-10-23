'use client';

import { TextareaAutosize } from '@components/atoms/TextareaAutosize';
import 'regenerator-runtime/runtime';
// const TextareaAutosize = dynamic(() => import('@components/atoms/TextareaAutosize'), { ssr: false });
import { BaseButton } from '@components/base/baseButton/BaseButton';
import { mainTextareaId } from '@hooks/useNewConvo';
import useTextareaHelper from '@hooks/useTextareaHelper';

import cn, { requestMicrophoneAccess } from '@utils';
import { Image, message } from 'antd';
import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Control, useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import AttachmentImageList from '../AttachmentImageList';
const AttachmentPopup = dynamic(() => import('@components/molecules/AttachmentPopup'), { ssr: false });
const GoogleDriveLoader = dynamic(() => import('@components/molecules/GoogleDriveLoader'), { ssr: false });
const SpeechToTextRecorder = dynamic(() => import('@components/molecules/SpeechToTextRecorder'), { ssr: false });

interface ChatFormProps {
  onAsk: (data: { text: string }) => void;
  isSubmitting?: boolean;
  chatInput?: string; // Optional prop for initial chat input
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
    border-radius: 45px;
    color: #2d3c58;
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
      background: #20b46f;
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

const SendButton = React.memo(
  forwardRef((props: SendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const data = useWatch({ control: props.control });
    return <SubmitButton ref={ref} disabled={props.disabled || !data?.text} />;
  }),
);

export interface ChatFormRef {
  resetForm: () => void;
}

export const ChatFormHome = forwardRef<ChatFormRef, ChatFormProps>(function ChatFormHome(
  { onAsk, isSubmitting, chatInput },
  ref,
) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showSpeechToTextInput, setShowSpeechTotextInput] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenGooleDrive, setIsOpenGooleDrive] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  console.log('🚀 ~ fileList:', fileList);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      methods.reset();
    },
  }));

  const methods = useForm<{ text: string }>({
    defaultValues: { text: chatInput || '' }, // Initialize form with chatInput
  });

  const text = methods.watch('text');

  const { handlePaste, handleKeyDown, handleKeyUp, handleCompositionStart, handleCompositionEnd } = useTextareaHelper({
    textAreaRef,
    submitButtonRef,
    disabled: isSubmitting,
  });

  const { ref: formRef, ...registerProps } = methods.register('text', {
    required: true,
    onChange: (e) => {
      methods.setValue('text', e.target.value, { shouldValidate: true });
    },
  });

  useEffect(() => {
    console.log('chatInput:', chatInput);
    if (chatInput !== undefined) {
      methods.setValue('text', chatInput, { shouldValidate: true });
    }
  }, [chatInput, methods]);

  const onSubmit = (data: { text: string }) => {
    onAsk(data);
    methods.reset(); // Optionally reset the form after submission
  };

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
    <StyledChatFormContainer>
      {isOpenGooleDrive ? (
        <GoogleDriveLoader
          handleFileSelection={handleFileSelection}
          isOpenGooleDrive={isOpenGooleDrive}
          setIsOpenGooleDrive={setIsOpenGooleDrive}
        />
      ) : null}
      <form onSubmit={methods.handleSubmit(onAsk)}>
        <div className='relative flex h-full flex-1 items-stretch md:flex-col'>
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
                  className={'chat-input-element flex-grow mobile:rounded-[14px] rounded-[45px] '}
                />
                <div className='flex items-center justify-start gap-[12px] mt-1'>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </StyledChatFormContainer>
  );
});

export default ChatFormHome;
