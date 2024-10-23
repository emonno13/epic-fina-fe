import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { HTPearlRegisterSchemaForm } from './register-schema-form';

import './checkin-form.scss';

const HTPearlRegisterForm = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');

  const { t } = useHTranslation('common');
  const handleSubmit = () => {
    form.submit();
  };

  return (
    <div className="alma-register-form">
      <div className={'checkin-logo'}>
        <div className={'checkin-logo__htpearl'}>
          <img src={'assets/images/dxdnb-logo.png'} />
        </div>
        <div className={'checkin-logo__htpearl'}>
          <img src={'assets/images/htpearl-logo.png'} />
        </div>
      </div>

      {code && (
        <div className={'checkin-success'}>
          <h1>Gửi thành công!</h1>
          <p>
            Cảm ơn bạn đã check in nhà mẫu. Mã check in của bạn là:{' '}
            <strong>{code}</strong>
          </p>
        </div>
      )}

      {!code && (
        <>
          <h1 className="alma-register-form__title">
            {t('Checkin now', { vn: 'Check-in ngay' })}
          </h1>
          <HForm
            {...{
              form,
              schema: HTPearlRegisterSchemaForm,
              removeControlActions: true,
              nodeName: 'checkin/public',
              method: 'post',
              onDataReadyToSubmit: (values) => ({
                ...values,
                condition: undefined,
              }),
              showSuccessMessage: false,
              onGotSuccess: (res) => {
                console.log('response: ', res);
                setCode(res.code);
              },
            }}
          />
          <div className="alma-register-form__detail-each-package">
            <Button
              {...{
                type: 'primary',
                onClick: handleSubmit,
                className: 'alma-register-form__submit-btn',
              }}
            >
              {t('Send now', { vn: 'Gửi' })}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default HTPearlRegisterForm;
