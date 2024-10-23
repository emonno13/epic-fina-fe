import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Form } from 'antd';
import { AlmaFooterFormSchema } from '../form-schemas';

const ClientAlmaFooterForm = () => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.submit();
  };
  return (
    <div className="client-alma-footer-form">
      <h2 className="client-alma-footer-form__title">
        {t('Register now', { vn: 'Đăng ký ngay' })}
      </h2>
      <p className="client-alma-footer-form__desc">
        {t('Let us accompany you', {
          vn: 'Hãy để chúng tôi đồng hành cùng bạn',
        })}
      </p>
      <div className="client-alma-footer-form__form">
        <HForm
          {...{
            form,
            schema: AlmaFooterFormSchema,
            removeControlActions: true,
            nodeName: 'alma-registrations/public',
            method: 'post',
          }}
        />
        <Button
          type="primary"
          className="client-alma-footer-form__form-submit-btn"
          onClick={handleSubmit}
        >
          {t('Register', { vn: 'Đăng ký' })}
        </Button>
      </div>
    </div>
  );
};

export default ClientAlmaFooterForm;
