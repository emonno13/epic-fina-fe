import React from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import { ContactSchema } from './contact-schema-form';
import { HForm } from '../../../../../../schema-form/h-form';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';

import './contact-item.module.scss';

const  ContactItem = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  const [form] = useForm();

  return (
    <div className="contact-item__container">
      <p className="contact-item__title">{t('contact.contactUs')}</p>
      <div className="contact-item__item" style={{ width: '100%' }}>
        <span className="contact-item__text">{t('contact.anyQuestion')}</span>
        <span className="contact-item__text" style={{ color: '#2196F3' }}>&nbsp;support@fina.com.vn</span>
      </div>

      <HForm {...{
        form,
        nodeName: 'contact-us/register-contact-us',
        method: 'post',
        schema: ContactSchema,
        resetIfSuccess: false,
        hideControlButton: true,
      }}
      />
      <HButton {...{
        size: 'large',
        className: 'contact-item__button',
        onClick: form.submit,
      }}>
        {t('sent',{ en: 'Sent', vn: 'Gửi' })}
      </HButton>
    </div>
  );
});
export default ContactItem;
