import { useHTranslation } from '@lib/i18n';
import ClientFooterLogo from '../../client/icons/client-footer.logo';
import { getFooterContactUsData } from '../constants';

const ClientAlmaFooterContact = () => {
  const { t } = useHTranslation('common');
  const data = getFooterContactUsData(t);
  return (
    <div className="client-alma-footer-contact">
      <div className="client-alma-footer-contact__logo">
        <div className="client-alma-footer-contact__logo-fina">
          <ClientFooterLogo />
        </div>
        <img
          className="client-alma-footer-contact__logo-alma"
          src="/assets/images/alma-logo.png"
        />
      </div>
      <h2 className="client-alma-footer-contact__title">
        {t('CONTACT US', { vn: 'LIÊN HỆ CHÚNG TÔI' })}
      </h2>
      <div className="client-alma-footer-contact__list">
        {data.map(({ icon, text }, index) => (
          <div
            key={`client-footer-contact-us-item-${index}`}
            className="client-alma-footer-contact__list-item"
          >
            <div className="client-alma-footer-contact__list-item-icon">
              {icon}
            </div>
            <div className="client-alma-footer-contact__list-item-text">
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientAlmaFooterContact;
