import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { useSeoLandingPageDetailSchema } from './seo-landing-page-detail-schema';
import { useSeoLandingPageTableSchema } from './seo-landing-page-table-schema';

const SeoLandingPage = () => {
  const seoLandingPageTableSchema = useSeoLandingPageTableSchema();
  const seoLandingPageDetailSchema = useSeoLandingPageDetailSchema();

  const userRelationFieldsLimit = ['id', 'firstName', 'lastName', 'fullName'];

  return (
    <HFeature nodeName="seo-landing-pages" featureId="seo-landing-pages">
      <HSearchFormWithCreateButton
        hiddenValues={{
          filter: {
            include: [
              {
                relation: 'createdBy',
                scope: { fields: userRelationFieldsLimit },
              },
              {
                relation: 'updatedBy',
                scope: { fields: userRelationFieldsLimit },
              },
            ],
          },
        }}
      />
      <HDocumentDrawerPanel>
        <HFeatureForm schema={seoLandingPageDetailSchema} />
      </HDocumentDrawerPanel>
      <HTable schema={seoLandingPageTableSchema} />
    </HFeature>
  );
};

export default SeoLandingPage;
export { useSeoLandingPageDetailSchema, useSeoLandingPageTableSchema };
