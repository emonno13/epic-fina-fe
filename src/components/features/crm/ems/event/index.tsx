import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';

import { EventDetailView } from './detail-view/event-datail-viewer';
import { EventTableSchema } from './event-table-schema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'event',
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['createdBy', 'updatedBy', 'eventMessageWorkflows']}
      />

      <EventDetailView />

      <HTable schema={EventTableSchema} />
    </HFeature>
  );
};
