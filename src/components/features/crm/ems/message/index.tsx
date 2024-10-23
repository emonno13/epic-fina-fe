import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { MessageDetailViewer } from './detail-viewer/message-detail-viewer';
import { MessageTableSchema } from './message-table-schema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'messagesList',
        nodeName: 'messages',
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={[
          'internalTemplate',
          'externalTemplate',
          'referenceSetTemplate',
        ]}
      />

      <MessageDetailViewer />

      <HTable schema={MessageTableSchema} />
    </HFeature>
  );
};
