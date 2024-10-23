import { useHTranslation } from '@lib/i18n';
import ClientFooterLogo from '../../admin/lightly/client/icons/client-footer.logo';
import { getFooterFinaAgentData } from '../constants';

const FinaAgentFooterContact = () => {
  const { t } = useHTranslation('common');
  const data = getFooterFinaAgentData(t);
  return (
    <div className="fina-agent-footer-contact">
      <div className="fina-agent-footer-contact__logo">
        <div className="fina-agent-footer-contact__logo-fina">
          <ClientFooterLogo />
        </div>
      </div>
      <h2 className="fina-agent-footer-contact__title">
        {t('CONTACT US', { vn: 'LIÊN HỆ CHÚNG TÔI' })}
      </h2>
      <div className="fina-agent-footer-contact__list">
        {data.map(({ icon, text }, index) => (
          <div
            key={`client-footer-contact-us-item-${index}`}
            className="fina-agent-footer-contact__list-item"
          >
            <div className="fina-agent-footer-contact__list-item-icon">
              {icon}
            </div>
            <div className="fina-agent-footer-contact__list-item-text">
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinaAgentFooterContact;
