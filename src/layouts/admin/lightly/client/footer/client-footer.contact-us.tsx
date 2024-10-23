import { useHTranslation } from '@lib/i18n';
import React from 'react';
import { getFooterContactUsData } from '../constants';
import ClientFooterHeaderTitle from './client-footer.header-title';

const ClientFooterContactUs = () => {
  const { t } = useHTranslation('common');
  const data = getFooterContactUsData(t);
  return (
    <div className="client-footer-contact-us">
      <ClientFooterHeaderTitle
        {...{
          title: t('client_footer_contact_us_title', {
            vn: 'Liên hệ với chúng tôi',
            en: 'Contact to us',
          }),
        }}
      />
      {data.map(({ icon, text }, index) => (
        <div
          key={`client-footer-contact-us-item-${index}`}
          className="client-footer-contact-us__item"
        >
          <div className="client-footer-contact-us__item__icon">
            {React.createElement(icon)}
          </div>
          <div className="client-footer-contact-us__item__txt">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientFooterContactUs;
