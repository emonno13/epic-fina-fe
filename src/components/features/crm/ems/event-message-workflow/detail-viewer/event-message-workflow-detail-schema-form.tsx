import { useEffect, useRef, useState } from 'react';

import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { EVENT_STATUS } from '../../event/constant';
import { MESSAGE_WORKFLOW_STATUS } from '../../message-workflow/constant';
import { EVENT_MESSAGE_WORKFLOW_STATUS } from '../constant';
import { EventMessageWorkflowTimeLine } from './event-message-workflow-timeline';

import './event-message-workflow-timeline.component.module.scss';

export const EventMessageWorkflowDetailSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const event = useDocumentDetail();
  const { transport } = props;
  const { messageWorkflowData = {}, onMessageWorkflowDataChange = (f) => f } =
    transport;
  const [eventMessageWorkflows, setEventMessageWorkflows] = useState([]);
  const [attackMessageWorkflowIds, setAttackMessageWorkflowIds] = useState([]);
  const removedMessageWorkflowIds = useRef<string[]>([]);
  const changeStatusMessageWorkflows = useRef<any[]>([]);

  useEffect(() => {
    const currentEventMessageWorkflows = event?.eventMessageWorkflows || [];
    setEventMessageWorkflows(currentEventMessageWorkflows);
  }, [event.eventMessageWorkflows]);

  const handleRemoveEventMessageWorkflow = (eventMessageWorkflow: any) => {
    const eventMessageWorkflowsAfterRemove = eventMessageWorkflows.filter(
      (item: any) =>
        item.messageWorkflowId !== eventMessageWorkflow.messageWorkflowId,
    );

    setEventMessageWorkflows(eventMessageWorkflowsAfterRemove);
    removedMessageWorkflowIds.current.push(
      eventMessageWorkflow.messageWorkflowId,
    );

    onMessageWorkflowDataChange({
      attachedMessageWorkflowIds: eventMessageWorkflowsAfterRemove.map(
        (item: any) => item.messageWorkflowId,
      ),
      removedMessageWorkflowIds: eventMessageWorkflow.id
        ? removedMessageWorkflowIds.current
        : [],
      changeStatusMessageWorkflows: changeStatusMessageWorkflows.current || [],
    });
  };

  const handleChangeStatusEventMessageWorkflow = (
    eventMessageWorkflow: any,
  ) => {
    const eventMessageWorkflowsAfterChangeStatus: any = eventMessageWorkflows;
    const indexEventMessageWorkflowChangeStatus = eventMessageWorkflows
      .map((item: any) => item?.messageWorkflowId)
      .indexOf(eventMessageWorkflow.messageWorkflowId);

    if (indexEventMessageWorkflowChangeStatus !== -1) {
      eventMessageWorkflowsAfterChangeStatus[
        indexEventMessageWorkflowChangeStatus
      ].status =
        eventMessageWorkflowsAfterChangeStatus[
          indexEventMessageWorkflowChangeStatus
        ]?.status === EVENT_MESSAGE_WORKFLOW_STATUS.ACTIVE
          ? EVENT_MESSAGE_WORKFLOW_STATUS.INACTIVE
          : EVENT_MESSAGE_WORKFLOW_STATUS.ACTIVE;

      setEventMessageWorkflows(eventMessageWorkflowsAfterChangeStatus);

      changeStatusMessageWorkflows.current.push({
        messageWorkflowId:
          eventMessageWorkflowsAfterChangeStatus[
            indexEventMessageWorkflowChangeStatus
          ].messageWorkflowId,
        status:
          eventMessageWorkflowsAfterChangeStatus[
            indexEventMessageWorkflowChangeStatus
          ].status,
      });

      onMessageWorkflowDataChange({
        attachedMessageWorkflowIds: attackMessageWorkflowIds || [],
        removedMessageWorkflowIds: removedMessageWorkflowIds.current || [],
        changeStatusMessageWorkflows:
          changeStatusMessageWorkflows.current || [],
      });
    }
  };

  const handleMessageWorkflowSelected = (messageWorkflow: any) => {
    const eventMessageWorkflowExisted = eventMessageWorkflows.find(
      (eventMessageWorkflow: any) =>
        eventMessageWorkflow.messageWorkflowId === messageWorkflow.id,
    );
    if (eventMessageWorkflowExisted) {
      return;
    }

    const newEventMessageWorkflows: any = [
      ...eventMessageWorkflows,
      {
        eventId: event.id,
        status: EVENT_MESSAGE_WORKFLOW_STATUS.ACTIVE,
        messageWorkflowId: messageWorkflow.id,
        messageWorkflowClone: messageWorkflow,
      },
    ];

    setEventMessageWorkflows(newEventMessageWorkflows);
    setAttackMessageWorkflowIds(
      newEventMessageWorkflows
        .filter((item) => !item.id)
        .map((mapItem: any) => mapItem.messageWorkflowId),
    );

    onMessageWorkflowDataChange({
      attachedMessageWorkflowIds: newEventMessageWorkflows
        .filter((item) => !item.id)
        .map((mapItem: any) => mapItem.messageWorkflowId),
      removedMessageWorkflowIds:
        messageWorkflowData?.removedMessageWorkflowIds || [],
      changeStatusMessageWorkflows: changeStatusMessageWorkflows.current || [],
    });
  };

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Event'),
      rules: [
        {
          required: true,
          message: t('Event is required'),
        },
      ],
      name: 'id',
      componentProps: {
        disabled: true,
        placeholder: 'Enter event',
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: '/events/suggestion',
        hiddenValues: {
          status: EVENT_STATUS.ACTIVE,
        },
        optionsConverter: (document) => ({
          ...document,
          label: document?.name || '',
        }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Message workflow'),
      name: 'messageWorkflowId',
      componentProps: {
        placeholder: 'Enter message workflow',
        showSearch: true,
        mode: 'single',
        className: 'hiddenTag',
        dropdownClassName: 'hiddenOptionsAfterSelected',
        searchWhenHiddenValueChange: true,
        endpoint: '/message-workflows/suggestion',
        hiddenValues: {
          status: MESSAGE_WORKFLOW_STATUS.ACTIVE,
        },
        onChangeSelected: handleMessageWorkflowSelected,
        optionsConverter: (document) => ({
          ...document,
          label: document?.name || '',
        }),
      },
    }),
    createSchemaItem({
      Component: EventMessageWorkflowTimeLine,
      componentProps: {
        transport: {
          event,
          eventMessageWorkflows,
          onRemoveEventMessageWorkflow: handleRemoveEventMessageWorkflow,
          onChangeStatusEventMessageWorkflow:
            handleChangeStatusEventMessageWorkflow,
        },
      },
    }),
  ];
};
