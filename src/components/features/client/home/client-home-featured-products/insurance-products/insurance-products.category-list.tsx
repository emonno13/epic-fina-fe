import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import InsuranceProductsListByCategory from './insurance-products.list-by-category';

const InsuranceProductsCategoryList = () => {
  const categoryList = useTableSourceData() || [];
  if (!Array.isArray(categoryList) || categoryList.length < 1) {
    return null;
  }
  return (
    <div>
      {categoryList.map((categoryData) => (
        <HFeature
          key={`homeInsuranceListByCategory-${categoryData.id}`}
          {...{
            featureId: `homeInsuranceListByCategory-${categoryData.id}`,
            nodeName: 'products/public',
          }}
        >
          <HSearchFormHiddenAble
            {...{
              withRelations: ['category'],
              hiddenValues: {
                filter: {
                  where: {
                    categoryId: categoryData.id,
                    isActive: true,
                  },
                },
              },
            }}
          />
          <InsuranceProductsListByCategory {...{ categoryData }} />
        </HFeature>
      ))}
    </div>
  );
};

export default InsuranceProductsCategoryList;
