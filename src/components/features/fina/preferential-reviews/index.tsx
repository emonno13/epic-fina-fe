import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import PreferentialDetail from './detail';
import { PreferentialReviewsTableSchema } from './preferential-reviews.table-schema';

import './preferential-modal-custom.scss';

const PreferentialReviewManagement = () => {
  return (
    <HFeature
      {...{
        nodeName: 'preferential',
        featureId: 'preferentialReviews',
      }}
    >
      <HSearchFormWithCreateButton />
      <PreferentialDetail />
      <HTable
        scroll={{ y: 200 }}
        size={'small'}
        schema={PreferentialReviewsTableSchema()}
      />
    </HFeature>
  );
};

export default PreferentialReviewManagement;
