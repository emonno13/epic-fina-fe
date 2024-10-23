import HomeInsuranceListWithCategory from '@components/shared/client/home-insurance-list-with-category';
import HViewMoreButton from '@components/shared/common/h-view-more-button';
import { useTableSourceData } from '@schema-form/features/hooks';

const InsuranceProductsListByCategory = ({ categoryData }) => {
  const insuranceList = useTableSourceData();

  if (!Array.isArray(insuranceList) || insuranceList.length < 1) {
    return null;
  }
  return (
    <div className="insurance-products-list-by-cagegory">
      <HomeInsuranceListWithCategory
        {...{
          category: categoryData,
          productList: insuranceList,
        }}
      />
      <HViewMoreButton />
    </div>
  );
};

export default InsuranceProductsListByCategory;
