import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';

import './product-menu-content-insurance-header.scss';

const ProductsMenuContentInsuranceHeader = ({ title, seeAllUrl = '' }) => {
  const { t } = useHTranslation('mobile-home');
  const redirectToInsuranceProducts = async () => {
    if (seeAllUrl) await RouteUtils.redirect(seeAllUrl);
  };
  return (
    <div className="menu-content-insurance-header">
      <span className="menu-content-insurance-header__title">{title}</span>
      {seeAllUrl && (
        <span
          className="menu-content-insurance-header__show-all-products"
          onClick={redirectToInsuranceProducts}
        >
          {t('View all products', {
            en: 'View all',
            vn: 'Xem tất cả',
          })}
        </span>
      )}
    </div>
  );
};

export default ProductsMenuContentInsuranceHeader;
