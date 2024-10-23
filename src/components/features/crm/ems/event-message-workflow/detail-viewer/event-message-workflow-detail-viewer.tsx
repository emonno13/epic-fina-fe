import { useState } from 'react';

import { endpoints } from '@lib/networks/endpoints';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { EventMessageWorkflowDetailSchema } from './event-message-workflow-detail-schema-form';

export const EventMessageWorkflowViewer = () => {
  const event = useDocumentDetail();
  const [messageWorkflowData, setMessageWorkflowData] = useState({});

  return (
    <HDocumentDrawerPanel>
      <HFeatureForm
        {...{
          onDataReadyToSubmit: (dataSubmit: any) => {
            return {
              ...dataSubmit,
              ...messageWorkflowData,
              eventId: dataSubmit.id,
            };
          },
          endpoint: endpoints.endpointWithApiDomain(
            `/event-message-workflows${event ? `/${event.id}` : ''}`,
          ),
          schema: EventMessageWorkflowDetailSchema,
          transport: {
            onMessageWorkflowDataChange: setMessageWorkflowData,
            messageWorkflowData,
          },
        }}
      />
    </HDocumentDrawerPanel>
  );
};
