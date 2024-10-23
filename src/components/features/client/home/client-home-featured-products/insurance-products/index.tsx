import HomeInsuranceListWithCategory from '@components/shared/client/home-insurance-list-with-category';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { PRODUCT_TYPES } from '@types/organization';
import InsuranceProductsCategoryList from './insurance-products.category-list';

import './insurance-products.module.scss';

const ClientHomeFeaturedProductsInsurance = ({ insuranceData }) => {
  if (!insuranceData?.length) {
    return null;
  }
  return (
    <div>
      {insuranceData.map(({ categoryData, productList }, index) => (
        <HomeInsuranceListWithCategory
          key={`client-home-featured-products-insurance-${index}`}
          {...{ category: categoryData, productList }}
        />
      ))}
    </div>
  );
};

export const ClientHomeFeaturedProductsInsuranceWithFetching = () => {
  return (
    <HFeature
      {...{
        featureId: 'homeInsuranceCategory',
        nodeName: 'categories/public',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenValues: {
            filter: {
              where: {
                type: PRODUCT_TYPES.insurance,
              },
            },
            fields: { id: true, name: true, description: true },
          },
        }}
      />
      <InsuranceProductsCategoryList />
    </HFeature>
  );
};

export default ClientHomeFeaturedProductsInsurance;
