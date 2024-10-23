import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { ContactTableSchema } from './contact-table-schema';
import { ContactDetailView } from './detail-view/contact-detail-viewer';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'contact',
      }}
    >
      <HSearchFormWithCreateButton />

      <ContactDetailView />

      <HTable schema={ContactTableSchema} />
    </HFeature>
  );
};
