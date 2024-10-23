import { useHTranslation } from '@lib/i18n';
import { getFooterFinancialAdviceData } from '../constants';

const FinancialAdviceFooterContact = () => {
  const { t } = useHTranslation('common');
  const data = getFooterFinancialAdviceData(t);

  return (
    <div className="financial-advice-footer-contact">
      <h2 className="title-footer">
        Liên hệ chúng tôi
        <div className="line-header"></div>
      </h2>
      <div className="financial-advice-footer-contact__list">
        {data.map(({ icon, text }, index) => (
          <div
            key={`client-footer-contact-us-item-${index}`}
            className="financial-advice-footer-contact__list-item"
          >
            <div className="financial-advice-footer-contact__list-item-icon">
              {icon}
            </div>
            <div className="financial-advice-footer-contact__list-item-text">
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialAdviceFooterContact;
