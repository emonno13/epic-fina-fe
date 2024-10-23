import { BaseButton } from '@components/base/baseButton/BaseButton';
import { Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from './TextareaAutosize';

type TInitialProps = {
  text: string;
  edit: boolean;
  error: boolean;
  unfinished: boolean;
  isSubmitting: boolean;
  isLast: boolean;
};

type TAdditionalProps = {
  ask: TAskFunction;
  message: TMessage;
  isCreatedByUser: boolean;
  siblingIdx: number;
  enterEdit: (cancel: boolean) => void;
  setSiblingIdx: (value: number) => void;
};

type TEditProps = Pick<TInitialProps, 'text' | 'isSubmitting'> & Omit<TAdditionalProps, 'isCreatedByUser'>;

export const EditMessage: React.FC<TEditProps> = ({ text, message, ask, enterEdit, siblingIdx, setSiblingIdx }) => {
  const [editedText, setEditedText] = useState<string>(text ?? '');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { conv_id, conversationId, parent_message_id, message_id } = message;

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const length = textArea.value.length;
      textArea.focus();
      textArea.setSelectionRange(length, length);
    }
  }, []);

  const resubmitMessage = () => {
    if (!editedText || (editedText && editedText.trim() === '')) {
      enterEdit(true);
      return;
    }
    if (message.role === 'human') {
      ask({
        text: editedText,
        parent_message_id,
        conversationId: conv_id || conversationId,
      });

      setSiblingIdx((siblingIdx ?? 0) - 1);
    }

    enterEdit(true);
  };

  return (
    <div className='w-full'>
      <TextareaAutosize
        ref={textAreaRef}
        onChange={(e: any) => {
          setEditedText(e.target.value);
        }}
        className={'edit-chat-input-element w-full'}
        onPaste={(e: any) => {
          e.preventDefault();

          const pastedData = e.clipboardData.getData('text/plain');
          const textArea = textAreaRef.current;
          if (!textArea) {
            return;
          }
          const start = textArea.selectionStart;
          const end = textArea.selectionEnd;
          const newValue = textArea.value.substring(0, start) + pastedData + textArea.value.substring(end);
          setEditedText(newValue);
        }}
        contentEditable={true}
        value={editedText}
        maxLength={2000}
        maxRows={8}
        suppressContentEditableWarning={true}
      />
      <div className='flex justify-end'>
        <Space className='mt-1'>
          <BaseButton
            size='small'
            className='min-w-[120px] rounded-[29px] bg-[#FFFFFF] border-none hover:text-[#16A979] hover:border-none'
            onClick={() => enterEdit(true)}
          >
            Huỷ bỏ
          </BaseButton>
          <BaseButton
            type='primary'
            size='small'
            className='min-w-[100px] rounded-[29px] bg-[#16A979] hover:bg-[#16A979] hover:opacity-80'
            onClick={resubmitMessage}
          >
            Gửi
          </BaseButton>
        </Space>
      </div>
    </div>
  );
};
