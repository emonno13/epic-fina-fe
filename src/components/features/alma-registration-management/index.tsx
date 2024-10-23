import { HFeature, HTable } from '../../../schema-form/features';
import { HFeatureForm } from '../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../schema-form/features/search-form';
import { AlmaRegistrationDetailSchemaForm } from './alma-registration.detail-schema-form';
import { AlmaRegistrationTableSchema } from './alma-registration.table-schema';

const AlmaRegistrationManagement = () => {
  return (
    <HFeature
      {...{
        featureId: 'almaRegistrations',
        nodeName: 'alma-registrations',
      }}
    >
      <HSearchFormWithCreateButton />
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: AlmaRegistrationDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentDrawerPanel>
      <HTable
        {...{
          schema: AlmaRegistrationTableSchema,
        }}
      />
    </HFeature>
  );
};

export default AlmaRegistrationManagement;
