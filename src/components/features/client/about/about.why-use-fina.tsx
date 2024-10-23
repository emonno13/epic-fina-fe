import { useHTranslation } from '@lib/i18n';
import { getWhyUseFinaData } from './constant';

const ClientAboutWhyUseFina = () => {
  const { t } = useHTranslation('common');
  const whyUseFinaData = getWhyUseFinaData(t);
  return (
    <div className="client-about-why-use-fina">
      <div className="max-w-1100 m-auto">
        <div className="client-about-why-use-fina__youtube">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/nL65Er5D7js"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="client-about-why-use-fina__title">
          <h1>
            {t('client_about_why_use_fina_title', {
              en: 'Why use FINA?',
              vn: 'Tại sao nên sử dụng FINA?',
            })}
          </h1>
        </div>
        {whyUseFinaData.map(({ title, description, icon }, index) => (
          <div
            key={`about-why-use-fina-item-${index}`}
            className="client-about-why-use-fina-item"
          >
            <div className="client-about-why-use-fina-item__left">
              <h3>{`${index + 1}. ${title}`}</h3>
              <p>{description}</p>
            </div>
            <div className="client-about-why-use-fina-item__icon">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientAboutWhyUseFina;
