import { Button, ButtonProps } from 'antd';
import { useState } from 'react';
import { ReviewModal, ReviewModalProps } from '.';

interface ReviewModalButtonProps extends ButtonProps {
  reviewModalProps: ReviewModalProps,
}

export const ReviewModalButton = (props: ReviewModalButtonProps) => {
  const { reviewModalProps = {}, onClick, ...rest } = props;
  const [reviewModalVisible, setReviewModalVisile] = useState<boolean>(false);

  const onOpenReviewModal = (e) => {
    if (onClick) onClick(e);
    setReviewModalVisile(true);
  };

  const onCancelReviewModal = () => {
    setReviewModalVisile(false);
  };

  return (
    <div>
      <Button {...{
        ...rest,
        onClick: onOpenReviewModal,
        className: 'review-modal-button',
      }} />
      <ReviewModal {...{
        ...reviewModalProps,
        visible: reviewModalVisible,
        onCancel: onCancelReviewModal,
      }} />
    </div>
  );
};
