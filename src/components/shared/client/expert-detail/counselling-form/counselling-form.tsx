import { useHTranslation } from '@lib/i18n';
import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { Button, Form, message } from 'antd';
import { ExpertDetailFormSchema } from './counselling-form-schema';

const ExpertDetailCounsellingForm = (props: HFormProps) => {
  const { onDataReadyToSubmit } = props;
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  return (
    <div className="counselling-form">
      <h2 className="counselling-form__title">
        {t('Create a consultation request', { vn: 'Tạo yêu cầu tư vấn' })}
      </h2>
      <HForm
        {...{
          form,
          nodeName: 'tasks/public',
          method: 'post',
          schema: ExpertDetailFormSchema,
          showSuccessMessage: false,
          removeControlActions: true,
          onDataReadyToSubmit: (values) => {
            let newValues = { ...values };

            if (onDataReadyToSubmit) {
              newValues = {
                ...newValues,
                ...onDataReadyToSubmit(values),
              };
            }
            if (isAuthenticated) {
              newValues.sourceId = currentUser?.id;
            }
            return {
              ...newValues,
              page: location.href,
            };
          },
          onGotSuccess: () => {
            message.success(
              t('Create a successful consultation request!', {
                vn: 'Tạo yêu cầu tư vấn thành công!',
              }),
            );
          },
        }}
      />
      <Button
        {...{
          type: 'primary',
          onClick: () => form.submit(),
        }}
      >
        {t('Send', { vn: 'Gửi' })}
      </Button>
    </div>
  );
};

export default ExpertDetailCounsellingForm;
