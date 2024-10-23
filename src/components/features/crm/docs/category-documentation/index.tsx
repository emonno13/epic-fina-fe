import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';

import { HTable } from '../../../../../schema-form/features';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { CategoryDocumentationDetailSchemaForm } from './category-documentation.detail-schema-form';
import { CategoryDocumentationTableSchema } from './category-documentation.table-schema';

const CateForyDocumentation = () => {
  return (
    <HFeature
      {...{
        featureId: 'category-documentation',
      }}
    >
      <HSearchFormWithCreateButton withRelations={['createdBy', 'updatedBy']} />
      <HDocumentModalPanel width={850}>
        <HFeatureForm
          {...{
            schema: CategoryDocumentationDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={CategoryDocumentationTableSchema} />
    </HFeature>
  );
};

export default CateForyDocumentation;
