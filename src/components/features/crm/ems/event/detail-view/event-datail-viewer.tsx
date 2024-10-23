import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';

import { EventDetailSchemaForm } from './event-detail-schema-form';

export const EventDetailView = () => {
  return (
    <HDocumentModalPanel width={850}>
      <HFeatureForm
        {...{
          schema: EventDetailSchemaForm,
        }}
      />
    </HDocumentModalPanel>
  );
};
