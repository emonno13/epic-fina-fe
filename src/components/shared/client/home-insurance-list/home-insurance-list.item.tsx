import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';

const HomeInsuranceListItem = ({ insuranceData }) => {
  const { info, name, description, slug, category } = insuranceData;
  const { t } = useHTranslation('common');
  const imageSrc =
    info?.image?.url || '/assets/images/icons/ic_insurance-active.svg';

  return (
    <Link href={`/${CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE}/${slug}`}>
      <div className="client-home-insurance-list-item">
        <div className="client-home-insurance-list-item__image">
          <div className="client-home-insurance-list-item__image__overlay">
            <div className="client-home-insurance-list-item__image__overlay__logo">
              <img src="/assets/images/fina_client_footer_logo.png" />
              <span className="client-home-insurance-list-item__image__overlay__insurance-txt">
                {t('Insurance', { vn: 'Bảo hiểm' })}
              </span>
            </div>
            <div className="client-home-insurance-list-item__image__overlay__description">
              <span className="client-home-insurance-list-item__image__overlay__name">
                {name}
              </span>
            </div>
          </div>
          <i style={{ backgroundImage: `url("${imageSrc}")` }} />
        </div>
        <div className="client-home-insurance-list-item__content">
          {/*<div className="client-home-insurance-list-item__content__category-name">{category?.name}</div>*/}
          <div
            className="client-home-insurance-list-item__content__name"
            title={name}
          >
            {name}
          </div>
          <div className="client-home-insurance-list-item__content__desc">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeInsuranceListItem;
