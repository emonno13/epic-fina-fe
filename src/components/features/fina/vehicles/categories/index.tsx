import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { VehicleCategoryDetailSchemaForm } from './detail-schema-form';
import { PositionTableSchema } from './search-result-table-schema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'vehicles-categories',
        nodeName: 'vehicles-categories',
      }}
    >
      <HSearchFormWithCreateButton />
      <HDocumentModalPanel width={'30%'}>
        <HFeatureForm
          {...{
            schema: VehicleCategoryDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={PositionTableSchema} />
    </HFeature>
  );
};
