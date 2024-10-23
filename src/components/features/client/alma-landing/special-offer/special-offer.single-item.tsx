import { useHTranslation } from '@lib/i18n';

const AlmaSpecialOfferSingleItem = ({
  icon,
  headerLabel,
  desc,
  applicableObject,
}) => {
  const { t } = useHTranslation('common');
  return (
    <div className="single-item">
      <div className="single-item-desc">
        <div className="single-item-desc__icon">{icon}</div>
        <h1 className="single-item-desc__label">{headerLabel}:</h1>
        <p
          className="single-item-desc__content"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      </div>
      <div className="single-item-applicable-object">
        <h1 className="single-item-applicable-object__label">
          {t('Applicable object', { vn: 'Đối tượng áp dụng' })}:
        </h1>
        <p
          className="single-item-applicable-object__content"
          dangerouslySetInnerHTML={{ __html: applicableObject }}
        ></p>
      </div>
    </div>
  );
};

export default AlmaSpecialOfferSingleItem;
