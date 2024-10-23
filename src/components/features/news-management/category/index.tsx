import { CategoryManagement } from '@components/features/finance/categories';
import { PRODUCT_TYPES } from 'types/organization';

const NewsManagementCategory = () => {
  return (
    <CategoryManagement
      {...{
        type: PRODUCT_TYPES.news,
        featureId: 'newsCategory',
      }}
    />
  );
};

export default NewsManagementCategory;
