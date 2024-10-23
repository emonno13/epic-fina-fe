import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { ClientReviewDetailSchema } from './client-reviews.detail-schema-form';
import { ClientReviewsTableSchema } from './client-reviews.table-schema';

const ClientReviewManagement = () => {
  return (
    <HFeature
      {...{
        nodeName: 'client-reviews',
        featureId: 'clientReviews',
      }}
    >
      <HSearchFormWithCreateButton />
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: ClientReviewDetailSchema,
            nodeName: 'client-reviews',
          }}
        />
      </HDocumentDrawerPanel>
      <HTable
        scroll={{ y: 200 }}
        size={'small'}
        schema={ClientReviewsTableSchema()}
      />
    </HFeature>
  );
};

export default ClientReviewManagement;
