import { Link } from '@components/shared/link';
import { AlmaRegisterSchema } from '@layouts/admin/lightly/client-alma/form-schemas';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Form, Modal } from 'antd';

const AlmaRegisterForm = () => {
  const [form] = Form.useForm();
  const { t } = useHTranslation('common');

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <div className="alma-register-form">
      <h1 className="alma-register-form__title">
        {t('Register now', { vn: 'Đăng ký ngay' })}
      </h1>
      <HForm
        {...{
          form,
          schema: AlmaRegisterSchema,
          removeControlActions: true,
          nodeName: 'alma-registrations/public',
          method: 'post',
          onDataReadyToSubmit: (values) => ({
            ...values,
            condition: undefined,
          }),
          showSuccessMessage: false,
          onGotSuccess: () => {
            Modal.success({
              title: t('Register successfully!', { vn: 'Đăng ký thành công!' }),
              content: t(
                'FINA will quickly check and send the results to your email. Thank you for accompanying FINA.',
                {
                  vn: 'FINA sẽ nhanh chóng kiểm tra và gửi kết quả đến email của bạn. Cảm ơn quý khách đã đồng hành cùng FINA.',
                },
              ),
              centered: true,
            });
          },
        }}
      />
      <div className="alma-register-form__detail-each-package">
        <Link href="/alma-landing-page#endow">
          <p>
            {t('See details of benefits for each package', {
              vn: 'Xem chi tiết quyền lợi mỗi gói',
            })}
          </p>
        </Link>
      </div>
      <Button
        {...{
          type: 'primary',
          onClick: handleSubmit,
          className: 'alma-register-form__submit-btn',
        }}
      >
        {t('Join now', { vn: 'Tham gia ngay' })}
      </Button>
    </div>
  );
};

export default AlmaRegisterForm;
