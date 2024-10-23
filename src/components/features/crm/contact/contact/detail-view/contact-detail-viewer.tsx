import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { ContactDetailSchemaForm } from './contact-detail-schema-form';

export const ContactDetailView = () => {
  return (
    <HDocumentModalPanel>
      <HFeatureForm
        {...{
          schema: ContactDetailSchemaForm,
        }}
      />
    </HDocumentModalPanel>
  );
};
