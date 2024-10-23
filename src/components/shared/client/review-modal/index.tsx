import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { HFormProps } from '@schema-form/h-types';
import { ModalProps } from 'antd';
import { ReviewForm } from './review-form';

import './review-modal.module.scss';

export interface ReviewModalProps extends ModalProps {
  reviewUser?: any;
  formProps?: HFormProps;
}

export const ReviewModal = (props: ReviewModalProps) => {
  const { t } = useHTranslation('common');
  const { title, reviewUser = {}, formProps = {}, onCancel } = props;

  const onGotSuccess = (response) => {
    if (formProps.onGotSuccess) formProps.onGotSuccess(response);
    if (onCancel) onCancel(response);
  };

  return (
    <HModal
      {...{
        ...props,
        footer: null,
        title: title || t('Review', { vn: 'Đánh giá' }),
        destroyOnClose: true,
        className: 'review-modal',
      }}
    >
      <ReviewForm
        {...{
          ...formProps,
          reviewUser,
          onGotSuccess,
        }}
      />
    </HModal>
  );
};
