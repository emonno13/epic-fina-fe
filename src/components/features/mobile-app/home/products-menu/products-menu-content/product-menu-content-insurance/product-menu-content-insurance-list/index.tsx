import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import MobileDetailDrawer from '@components/features/mobile-app/mobile-detail-drawer';
import MobileInsuranceDetail from '@components/features/mobile-app/mobile-insurance-detail';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { MobileUtils } from '@lib/utils/mobile';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import HSearchForm from '@schema-form/features/search-form';
import { useMemo } from 'react';
import ProductsMenuContentInsuranceHeader from '../product-menu-content-insurance-header';
import LinkItemInsuranceProduct from '../product-menu-content-insurance-link-item/product-menu-content-insurance.link-item.insurance-product';

import './product-menu-content-insurance.list.scss';

const ProductsMenuContentInsuranceList = () => {
  const { t } = useHTranslation('mobile-home');
  const insuranceList = useTableSourceData('productInsurance');
  const checkShouldDisplayData = MobileUtils.checkDisplayInsurances();
  const modelFilters = {
    filter: {
      where: {
        type: PRODUCT_TYPE.INSURANCE,
        // highlight: PRODUCT_HIGHLIGHT.TRUE,
      },
    },
  };
  const renderData = useMemo(() => {
    if (
      !checkShouldDisplayData ||
      !(Array.isArray(insuranceList) && insuranceList.length > 0)
    ) {
      return null;
    }
    return (
      <>
        {insuranceList.map((insuranceData, index) => (
          <LinkItemInsuranceProduct
            key={`home-mobile-insurance-item-${insuranceData.id}-${index}`}
            data={insuranceData}
          />
        ))}
      </>
    );
  }, [insuranceList, checkShouldDisplayData]);
  return (
    <HFeature
      {...{
        featureId: 'productInsurance',
        nodeName: 'products/public',
        documentRelations: ['org', 'category'],
      }}
    >
      <HSearchForm
        className="product-menu-content-insurance-h-search-form"
        hiddenValues={modelFilters}
        withRelations={['org', 'category']}
      />
      <MobileDetailDrawer>
        <MobileInsuranceDetail />
      </MobileDetailDrawer>
      <div>
        <ProductsMenuContentInsuranceHeader
          {...{
            seeAllUrl: `/admin/m-products?${RouteUtils.getQueryUri(
              { type: PRODUCT_TYPE.INSURANCE },
              true,
            )}`,
            title: t('Featured insurance products', {
              en: 'Featured insurance products',
              vn: 'Sản phẩm bảo hiểm nổi bật',
            }),
          }}
        />
        {renderData}
      </div>
    </HFeature>
  );
};

export default ProductsMenuContentInsuranceList;
