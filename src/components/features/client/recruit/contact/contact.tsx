import React from 'react';
import ContactItem from '../components/contact/contact-item';
import Location from '../components/contact/location';
import { useHTranslation } from '../../../../../lib/i18n';

import './contact.module.scss';

const RecruitContact = React.memo(()=> {
  const { t } = useHTranslation('recruit');
  return (
    <>
      <div className="contact__banner">{t('contact-us', { en:'Contact us', vn: 'Liên hệ với chúng tôi' })}</div>
      <div className="contact__container">
        <ContactItem />
        <Location />
      </div>
    </>
  );
});

export default RecruitContact;
