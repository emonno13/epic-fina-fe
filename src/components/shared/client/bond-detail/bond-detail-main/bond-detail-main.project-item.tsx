import { useHTranslation } from '@lib/i18n';
import { useTableSourceData } from '@schema-form/features/hooks';

export const BondDetailProjectItemCarousel = () => {
  const data = useTableSourceData() || [];
  const { t } = useHTranslation('common');

  return (
    <>
      {data.length > 0 && (
        <div>
          {t('Some big projects of the corporation', {
            vn: 'Một số dự án lớn của tập đoàn',
          })}
        </div>
      )}
      <div className="client-product-detail-bond-content__info__list-product">
        {data?.slice(0, 3)?.map((project, index) => (
          <div
            key={index}
            className="client-product-detail-bond-content__info__list-product"
          >
            <div
              key={index}
              className="client-product-detail-bond-content__info__list-product__item"
            >
              <img
                src={project?.images?.[0] || '/assets/images/default-bds.png'}
                alt="du an noi bat"
              />
              <h3>{project.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BondDetailProjectItemCarousel;
