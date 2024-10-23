import { useHTranslation } from '@lib/i18n';
import { getFooterLoansIntroduceData } from '../constants';

const LoansIntroduceFooterContact = () => {
  const { t } = useHTranslation('common');
  const data = getFooterLoansIntroduceData(t);

  return (
    <div className="loans-introduce-footer-contact">
      <h2 className="title-footer">
        Liên hệ chúng tôi
        <div className="line-header"></div>
      </h2>
      <div className="loans-introduce-footer-contact__list">
        {data.map(({ icon, text }, index) => (
          <div
            key={`client-footer-contact-us-item-${index}`}
            className="loans-introduce-footer-contact__list-item"
          >
            <div className="loans-introduce-footer-contact__list-item-icon">
              {icon}
            </div>
            <div className="loans-introduce-footer-contact__list-item-text">
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoansIntroduceFooterContact;
