import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { message } from 'antd';
import { useEffect } from 'react';
import { ConverterUtils } from '../../../../../lib/converter';
import { SendToMailFormSchema } from '../send-to-mail-form-schema';

const FormSendToMail = ({
  hiddenValues = {},
  onGotSuccess,
  form,
  ...rest
}: HFormProps) => {
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser() || {};
  const onSubmitSuccess = () => {
    if (onGotSuccess) onGotSuccess();
    message.success(
      t('Sent to your email, please check your mailbox', {
        vn: 'Đã gửi qua email của bạn, hãy kiểm tra hộp mail',
      }),
    );
  };

  useEffect(() => {
    const { id, emails, tels } = currentUser;
    if (id) {
      form?.setFieldsValue({
        fullName: ConverterUtils.getFullNameUser(currentUser),
        email: emails?.[0]?.email || '',
        phone: tels?.[0]?.tel || '',
      });
    }
  }, [currentUser]);

  return (
    <div className="loan-estimate-form">
      <p className="loan-estimate-form__title">
        {t(
          'Please fill in the information below to receive the loan interest calculation',
          { vn: 'Hãy điền thông tin dưới để nhận bảng tính lãi vay' },
        )}
      </p>
      <HForm
        {...{
          ...rest,
          form,
          onGotSuccess: onSubmitSuccess,
          nodeName: 'calculator',
          method: 'post',
          schema: SendToMailFormSchema,
          hideSubmitAndContinueButton: true,
          submitButtonLabel: t('Send to email', { vn: 'Gửi về email' }),
          hiddenValues: {
            ...hiddenValues,
            page: location.pathname,
          },
          showSuccessMessage: false,
        }}
      />
    </div>
  );
};

export default FormSendToMail;
