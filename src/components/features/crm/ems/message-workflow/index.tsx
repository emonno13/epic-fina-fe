import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { MessagesWorkflowDetailView } from './detail-view';
import { MessageWorkflowTableSchema } from './message-workflow-table-shema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'message-workflow',
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['message', 'createdBy', 'updatedBy']}
      />

      <MessagesWorkflowDetailView />

      <HTable schema={MessageWorkflowTableSchema} />
    </HFeature>
  );
};
