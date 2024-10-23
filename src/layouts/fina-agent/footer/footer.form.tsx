import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Form, Modal } from 'antd';
import { USER_TYPES } from 'types/organization';
import { FinaAgentFooterFormSchema } from './form-schemas';

const FinaAgentFooterForm = () => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.submit();
  };
  return (
    <div className="fina-agent-footer-form">
      <h2 className="fina-agent-footer-form__title">
        {t('Register now', { vn: 'Đăng ký ngay' })}
      </h2>
      <p className="fina-agent-footer-form__desc">
        {t('Let us accompany you', {
          vn: 'Hãy để chúng tôi đồng hành cùng bạn',
        })}
      </p>
      <div className="fina-agent-footer-form__form">
        <HForm
          {...{
            form,
            schema: FinaAgentFooterFormSchema,
            removeControlActions: true,
            nodeName: 'users/public-collaborators',
            method: 'post',
            onDataReadyToSubmit: (values) => {
              const data = {
                emails: [{ email: values?.email }],
                type: USER_TYPES.collaborator,
              };

              delete values.email;

              return data;
            },
            onGotSuccess: () => {
              Modal.success({
                title: t('Register successfully!', {
                  vn: 'Đăng ký thành công!',
                }),
                centered: true,
              });

              form.resetFields();
            },
          }}
        />
        <Button
          type="primary"
          className="fina-agent-footer-form__form-submit-btn"
          onClick={handleSubmit}
        >
          {t('Register', { vn: 'Đăng ký' })}
        </Button>
      </div>
    </div>
  );
};

export default FinaAgentFooterForm;
