import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Timeline } from 'antd';
import moment from 'moment';

import { ModalHelper } from '@components/shared/utils/modal.helper';
import { HFormProps } from '@schema-form/h-types';
import { ConverterUtils } from '../../../../../../lib/converter';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';
import { MESSAGE_WORKFLOW_TYPE } from '../../message-workflow/constant';
import { resolveSendingTime } from '../../utils/resolve-sending-time';
import {
  EVENT_MESSAGE_WORKFLOW_STATUS,
  EVENT_MESSAGE_WORKFLOW_STATUS_LABEL_MAPPING,
} from '../constant';

import './event-message-workflow-timeline.component.module.scss';

export const EventMessageWorkflowTimeLine = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const {
    event = {},
    eventMessageWorkflows = [],
    onRemoveEventMessageWorkflow = (f) => f,
    onChangeStatusEventMessageWorkflow = (f) => f,
  } = transport;
  const handleShowDeleteModalConfirm = (eventMessageWorkflow: any) => {
    ModalHelper.confirm('Confirm', 'Do you want to remove this item?').then(
      (res: boolean) => {
        if (!res) {
          return;
        }

        onRemoveEventMessageWorkflow(eventMessageWorkflow);
      },
    );
  };

  const onChange = (eventMessageWorkflow: any) => {
    onChangeStatusEventMessageWorkflow(eventMessageWorkflow);
  };

  if (eventMessageWorkflows.length === 0) {
    return <span />;
  }

  return (
    <>
      {eventMessageWorkflows.length !== 0 && (
        <Timeline mode="alternate" className={'event-message-workflow'}>
          {eventMessageWorkflows &&
            eventMessageWorkflows.map(
              (eventMessageWorkflow: any, index: number) => {
                const messageWorkflow =
                  eventMessageWorkflow?.messageWorkflowClone || {};
                const triggerPrototype =
                  messageWorkflow?.triggerPrototype || {};
                const sendingTime = moment(
                  resolveSendingTime(triggerPrototype, event),
                );
                const sendingTimeDisplay =
                  sendingTime.format('DD/MM/YYYY HH:mm');

                return (
                  <Timeline.Item
                    label={sendingTimeDisplay}
                    key={`timeline-${index}`}
                    className="timeline"
                    dot={<ClockCircleOutlined />}
                  >
                    <ul
                      className={`message-workflow-timeline ${eventMessageWorkflow?.status ? eventMessageWorkflow.status : 'active'}`}
                    >
                      <li className={'message-workflow-timeline__item'}>
                        {t('Message Workflow')}:{' '}
                        <strong>{messageWorkflow?.name}</strong>
                      </li>
                      <li className={'message-workflow-timeline__item'}>
                        {t('Description')}:{' '}
                        <strong>{messageWorkflow?.description}</strong>
                      </li>
                      <li className={'message-workflow-timeline__item'}>
                        {t('Type')}: <strong>{messageWorkflow?.type}</strong>
                      </li>
                      <li className={'message-workflow-timeline__item'}>
                        {t('Status')}:{' '}
                        <strong>
                          {
                            EVENT_MESSAGE_WORKFLOW_STATUS_LABEL_MAPPING[
                              eventMessageWorkflow?.status
                            ]
                          }
                        </strong>
                      </li>

                      {eventMessageWorkflow?.status ===
                        EVENT_MESSAGE_WORKFLOW_STATUS.DONE &&
                        messageWorkflow?.type ===
                          MESSAGE_WORKFLOW_TYPE.MESSAGE && (
                          <>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageCount || 0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message sent')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageSentCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message sent success')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageStatusSentSuccessCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message opened')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageOpenedCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message spam')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageSpamCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message hard bounce')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageStatusHardBounceCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message soft bounce')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageStatusSoftBounceCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message delay')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageDelayCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message reject')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageRejectedCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message invalid')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageInvalidCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message has not email')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageHasNotEmailCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message queued')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageQueuedCount ||
                                  0}
                              </strong>
                            </li>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total message scheduled')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageScheduledCount ||
                                  0}
                              </strong>
                            </li>
                          </>
                        )}

                      {eventMessageWorkflow?.status ===
                        EVENT_MESSAGE_WORKFLOW_STATUS.DONE &&
                        messageWorkflow?.type ===
                          MESSAGE_WORKFLOW_TYPE.NOTIFICATION && (
                          <>
                            <li className={'message-workflow-timeline__item'}>
                              {t('Total notification')}:{' '}
                              <strong>
                                {eventMessageWorkflow?.totalMessageCount || 0}
                              </strong>
                            </li>
                          </>
                        )}
                    </ul>

                    {(eventMessageWorkflow?.status ===
                      EVENT_MESSAGE_WORKFLOW_STATUS.ACTIVE ||
                      eventMessageWorkflow?.status ===
                        EVENT_MESSAGE_WORKFLOW_STATUS.INACTIVE) && (
                      <div>
                        <HButton
                          {...{
                            icon: <CloseOutlined />,
                            onClick: () =>
                              handleShowDeleteModalConfirm(
                                eventMessageWorkflow,
                              ),
                            type: 'text',
                            className: 'message-workflow_buttonDelete',
                          }}
                        />

                        <Switch
                          defaultChecked={
                            eventMessageWorkflow?.status ===
                            EVENT_MESSAGE_WORKFLOW_STATUS.ACTIVE
                          }
                          onChange={() => onChange(eventMessageWorkflow)}
                          className={'message-workflow-timeline__item_switch'}
                        />
                      </div>
                    )}
                  </Timeline.Item>
                );
              },
            )}
        </Timeline>
      )}
      <p style={{ textAlign: 'center' }}>
        {' '}
        {event?.name} -{' '}
        {ConverterUtils.fullDatetimeConverter(`${event.startTime}`)}{' '}
      </p>
    </>
  );
};
