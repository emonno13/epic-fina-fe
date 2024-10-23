import { CheckOutlined } from '@ant-design/icons';
import { ButtonContainer } from '@components/atoms/buttonContainer';
import { BaseButton } from '@components/base/baseButton/BaseButton';
import { BaseModal } from '@components/base/baseModal/BaseModal';
import { TextAreaFieldControl } from '@components/hook-form/TextAreaField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';

const DISLIKE_REASON_TAGS = [
  {
    label: 'Không đáp ứng được nhu cầu/ không giải thích chi tiết',
    value: 'Không đáp ứng được nhu cầu/ không giải thích chi tiết',
  },
  {
    label: 'Nội dung không đúng',
    value: 'Nội dung không đúng',
  },
  {
    label: 'Không rõ ràng, cụ thể và khó hiểu',
    value: 'Không rõ ràng, cụ thể và khó hiểu',
  },
  {
    label: 'Không đầy đủ thông tin',
    value: 'Không đầy đủ thông tin',
  },
];

interface Props {
  open?: boolean;
  onCancel?: () => void;
  onSuccess?: (reason: string) => void;
}

const schema = Yup.object().shape({
  reason: Yup.string().notRequired().max(100, 'Tối đa 100 kí tự'),
});

export const DislikeMessageModal = ({ open, onCancel, onSuccess }: Props) => {
  const [dislikeTag, setDislikeTag] = useState('');
  const methods = useForm<{ reason: string }>({
    resolver: yupResolver(schema) as Resolver<{ reason: string }, any>,
    shouldFocusError: true,
  });
  const { handleSubmit } = methods;
  const onFinished = (values: { reason: string }) => {
    const dislikeReason = values.reason ? values.reason : dislikeTag;
    onSuccess?.(dislikeReason || '');
  };
  return (
    <BaseModal
      open={Boolean(open)}
      onCancel={onCancel}
      width={653}
      destroyOnClose
      afterClose={() => {
        methods.reset();
        setDislikeTag('');
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFinished)}>
          <div className='modal-heading mb-[20px]'>
            <div className='text-[24px] font-semibold'>Chia sẻ ý kiến của bạn</div>
          </div>

          <div className='flex flex-wrap justify-start gap-3 mb-[20px]'>
            {DISLIKE_REASON_TAGS.map((tag) => (
              <DislikeTag
                key={tag.value}
                $active={tag.value === dislikeTag}
                className='px-[20px] py-[12px] text-[15px] text-black-1'
                onClick={() => {
                  setDislikeTag(tag.value);
                }}
              >
                {tag.value === dislikeTag && (
                  <span className='inline-block mr-2'>
                    <CheckOutlined className='text-[#16A979]' />
                  </span>
                )}
                {tag.label}
              </DislikeTag>
            ))}
          </div>
          <div className='text-[#7C878E] text-[14px] mb-1 font-semibold'>Cung cấp thêm thông tin</div>
          <div className='custom-input-placeholder'>
            <TextAreaFieldControl name='reason' placeholder='Thông tin cụ thể về vấn đề của bạn' required />
          </div>
          <ButtonContainer align='right'>
            <BaseButton
              block
              type='primary'
              htmlType='submit'
              className='max-w-[180px] !bg-[#16A979] !rounded-[39px] hover:!bg-[#16A979] hover:opacity-80'
            >
              Gửi
            </BaseButton>
          </ButtonContainer>
        </form>
      </FormProvider>
    </BaseModal>
  );
};

export const DislikeTag = styled.div<{ $active?: boolean }>`
  border: 1.5px solid #d4d7e4;
  border-radius: 70px;
  cursor: pointer;
  &:hover {
    background-color: #f3f7f9;
  }
  ${(props) =>
    props.$active &&
    css`
      border: 1.5px solid transparent;
      background-color: #d4efe9;
      color: #16a979;
    `}
`;
