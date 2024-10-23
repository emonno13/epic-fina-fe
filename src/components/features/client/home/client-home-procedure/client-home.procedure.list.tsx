import { useHTranslation } from '@lib/i18n';
import { getHomeProcedureData } from '../constants';

const ClientHomeProcedureList = () => {
  const { t } = useHTranslation('admin-common');
  const homeProcedureData = getHomeProcedureData(t);
  return (
    <div className="client-home-procedure__content__list">
      {homeProcedureData.map(({ title, description }, index) => (
        <div
          key={`client-home-procedure-${index}`}
          className="client-home-procedure__content__list__item"
        >
          <div className="client-home-procedure__content__list__item__index">
            {index + 1}
          </div>
          <div className="client-home-procedure__content__list__item__content">
            <div className="client-home-procedure__content__list__item__content__title">
              {title}
            </div>
            <div className="client-home-procedure__content__list__item__content__description">
              {description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientHomeProcedureList;
