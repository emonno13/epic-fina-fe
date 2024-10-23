import { UserOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { Avatar, message } from 'antd';
import { ReviewFormSchema } from './review-form-schema';

import './review-form.module.scss';

interface ReviewFormProps extends HFormProps {
  reviewUser: any;
}

export const ReviewForm = (props: ReviewFormProps) => {
  const { t } = useHTranslation('common');
  const { onGotSuccess, reviewUser = {} } = props;
  const currentUser = useCurrentUser();

  const onFormGotSuccess = (response) => {
    if (onGotSuccess) onGotSuccess(response);
    message.success(
      t('Send review successfully!', { vn: 'Gửi đánh giá thành công!' }),
    );
  };

  return (
    <div className="review-form-container">
      <div className="review-form-review-user">
        <Avatar
          {...{
            size: 136,
            src: reviewUser?.avatar,
            icon: <UserOutlined />,
          }}
        />
        <h2>{ConverterUtils.getFullNameUser(reviewUser)}</h2>
        <p>{t('Financial specialist', { vn: 'Chuyên viên tài chính' })}</p>
      </div>
      <HForm
        {...{
          ...props,
          nodeName: 'user-ratings',
          method: 'post',
          schema: ReviewFormSchema,
          submitButtonLabel: t('Send review', { vn: 'Gửi đánh giá' }),
          showSuccessMessage: false,
          onGotSuccess: onFormGotSuccess,
          hiddenValues: {
            senderId: currentUser?.id,
            userId: reviewUser?.id,
          },
        }}
      />
    </div>
  );
};
