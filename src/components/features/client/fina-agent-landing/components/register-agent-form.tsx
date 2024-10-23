import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { USER_TYPES } from '@types/organization';
import { Button, Form, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FinaAgentRegisterSchema } from '../../../../../layouts/fina-agent/footer/form-schemas';

import '../css/register-agent-form.module.scss';

const RegisterAgentForm = () => {
  const [form] = Form.useForm();
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState(false);
  const { push } = useRouter();

  const handleSubmit = () => {
    form.submit();
  };

  const pushToLogin = () => {
    push('/users/login');
  };

  const reloadData = () => {
    form.resetFields();
    setVisible(false);
  };

  const getOtp = () => {
    FormUtils.submitForm(
      { telOrEmail: form.getFieldValue('email') },
      {
        nodeName: 'users/recover-password',
        method: 'post',
        onGotSuccess: (response) => {
          push(`/users/forgot-password?userId=${response?.userId}`);
        },
      },
    );
  };

  return (
    <div className="agent-register-form">
      <h1 className="agent-register-form__title">
        {t('Register now', { vn: 'Đăng ký ngay' })}
      </h1>
      <HForm
        {...{
          form,
          schema: FinaAgentRegisterSchema,
          removeControlActions: true,
          nodeName: 'users/public-collaborators',
          method: 'post',
          onDataReadyToSubmit: (values) => {
            const data = {
              fullName: values?.fullName,
              tels: [{ tel: values?.phone }],
              emails: [{ email: values?.email }],
              type: USER_TYPES.collaborator,
            };

            delete values.email;
            delete values.phone;

            return data;
          },
          showSuccessMessage: false,
          onGotSuccess: () => {
            Modal.success({
              title: t('Register successfully!', { vn: 'Đăng ký thành công!' }),
              centered: true,
            });

            form.resetFields();
          },
          onGotError: (e) => {
            setVisible(true);
          },
        }}
      />
      <Button
        {...{
          type: 'primary',
          onClick: handleSubmit,
          className: 'agent-register-form__submit-btn',
        }}
      >
        {t('Join now', { vn: 'Tham gia ngay' })}
      </Button>

      <Modal
        visible={visible}
        footer={false}
        width={500}
        onCancel={() => setVisible(false)}
      >
        <p>
          Hệ thống đã ghi nhận tài khoản của bạn với Số điện thoại/Email . Vui
          lòng
          <ins
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              pushToLogin();
            }}
          >
            ĐĂNG NHẬP
          </ins>
          .
        </p>
        <p>
          Trường hợp bạn chưa từng đăng ký hoặc đã quên mật khẩu, vui lòng{' '}
          <ins
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              getOtp();
            }}
          >
            LẤY LẠI TÀI KHOẢN
          </ins>
          , hoặc bạn có thể{' '}
          <ins
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => reloadData()}
          >
            HUỶ BỎ
          </ins>{' '}
          để nhập thông tin khác.
        </p>
      </Modal>
    </div>
  );
};

export default RegisterAgentForm;
