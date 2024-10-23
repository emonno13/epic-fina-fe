import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import HSearchForm from '@schema-form/features/search-form';
import { EVENT_STATUS } from '../event/constant';
import { EventMessageWorkflowViewer } from './detail-viewer/event-message-workflow-detail-viewer';
import { EventMessageWorkflowTableSchema } from './event-message-workflow-table-schema';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'eventMessageWorkflows',
        nodeName: 'events',
        documentRelations: ['eventMessageWorkflows'],
      }}
    >
      <HSearchForm
        {...{
          withRelations: ['eventMessageWorkflows'],
          hiddenValues: {
            filter: {
              where: {
                status: EVENT_STATUS.ACTIVE,
              },
            },
          },
        }}
      />

      <EventMessageWorkflowViewer />

      <HTable schema={EventMessageWorkflowTableSchema} />
    </HFeature>
  );
};
