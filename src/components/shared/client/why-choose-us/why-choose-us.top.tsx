import { useHTranslation } from '@lib/i18n';
import { getWhyChooseUsTopData } from './constants';

const ClientWhyChooseUsTop = () => {
  const { t } = useHTranslation('common');
  const whyChooseUSTopData = getWhyChooseUsTopData(t);
  return (
    <div className="client-why-choose-us-top m-auto">
      <h2 className="client-why-choose-us-top__title">
        {t('client_why_choose_us_top_title', {
          vn: 'Vì sao khách hàng lựa chọn FINA',
          en: 'Why customers choose FINA',
        })}
      </h2>
      {whyChooseUSTopData.map(({ icon, title }, index) => (
        <div
          key={`client-why-choose-us-top-item-${index}`}
          className="client-why-choose-us-top__item"
        >
          <div className="client-why-choose-us-top__item__icon">{icon}</div>
          <div className="client-why-choose-us-top__item__title">{title}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientWhyChooseUsTop;
