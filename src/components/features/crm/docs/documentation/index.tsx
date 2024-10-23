import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';

import { HTable } from '../../../../../schema-form/features';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { DocumentationDetailSchemaForm } from './documentation.detail-schema-form';
import { DocumentationTableSchema } from './documentation.table-schema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'documentation',
      }}
    >
      <HSearchFormWithCreateButton withRelations={['createdBy', 'updatedBy']} />
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: DocumentationDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentDrawerPanel>
      <HTable schema={DocumentationTableSchema} />
    </HFeature>
  );
};
