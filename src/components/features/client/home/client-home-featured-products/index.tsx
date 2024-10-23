import TypeProductNavigation from '@components/shared/client/type-product-navigation';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
  getTypeProductNavigationData,
  TYPE_PRODUCT_HOME_SLUG,
} from '../constants';
import { ClientHomeFeaturedProductsInsuranceWithFetching } from './insurance-products';
import ClientHomeFeaturedProductsLoan from './loan-products/client-home.featured-products.loan';

const ClientHomeFeaturedProducts = () => {
  const { t } = useHTranslation('admin-common');
  const { asPath } = useRouter();
  const typeProduct = useMemo(() => {
    if (asPath === '/') return TYPE_PRODUCT_HOME_SLUG.LOAN;
    return asPath;
  }, [asPath]);

  const typeProductNavigationData = getTypeProductNavigationData(t);
  const onTypeProductChange = (typeProduct) => RouteUtils.redirect(typeProduct);

  return (
    <div className="client-home-featured-products">
      <div className="max-w-1100 m-auto">
        <TypeProductNavigation
          {...{
            value: typeProduct,
            onChange: onTypeProductChange,
            typeProducts: typeProductNavigationData,
          }}
        />
        <ClientHomeFeaturedProductsByType typeProduct={typeProduct} />
      </div>
    </div>
  );
};

export default ClientHomeFeaturedProducts;

const ClientHomeFeaturedProductsByType = ({ typeProduct }) => {
  switch (typeProduct) {
    case TYPE_PRODUCT_HOME_SLUG.LOAN:
      return <ClientHomeFeaturedProductsLoan />;
    case TYPE_PRODUCT_HOME_SLUG.INSURANCE:
      return <ClientHomeFeaturedProductsInsuranceWithFetching />;
    default:
      return null;
  }
};
