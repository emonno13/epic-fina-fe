import React, { useState } from 'react';

import { Input, notification } from 'antd';
import Form from 'antd/lib/form';

import { useHTranslation } from '@lib/i18n';
import { HSelect } from '@components/shared/common-form-elements/select';
import { HModal } from '@components/shared/common/h-modal';
import { HForm } from '../../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../../schema-form/h-types';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { useDetailForm } from '../../../../../../schema-form/features/hooks';
import { MESSAGE_TYPE } from '../constants';

import './select-email.module.scss';

export const SendMessageModal = ({
  visible,
  setVisible,
  currentMessageType,
}) => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const detailForm = useDetailForm();
  const [to, setTo] = useState({ emails: [{ email: 'test@fina.com.vn' }] });

  const handleCancelModal = () => {
    setVisible(false);
  };

  const handleSendSuccess = (res: any) => {
    setVisible(false);
    notification.success({
      message: t('Send message successfully', {
        vn: 'Gửi tin nhắn thành công!',
      }),
    });
  };

  const handleSendError = () => {
    setVisible(false);
    notification.error({
      message: t('Send message error!', { vn: 'Gửi tin nhắn thất bại!' }),
    });
  };

  const formSentTest =
    currentMessageType === MESSAGE_TYPE.NOTIFICATION
      ? [
          createSchemaItem({
            Component: HSelect,
            name: 'to',
            label: 'User',
            className: 'w-full',
            rules: [
              {
                required: true,
                message: 'User is required.',
              },
            ],
            componentProps: {
              endpoint: '/users/suggestion',
              showSearch: true,
              searchWhenHidenValueChange: true,
              className: 'w-full',
              optionsConverter: (user) => {
                return {
                  ...user,
                  label: `${user?.fullName || (user?.firstName || '') + ' ' + (user?.lastName || '')} - ${user?.code || ''}`,
                };
              },
              onChangeSelected: setTo,
            },
          }),
        ]
      : [
          createSchemaItem({
            Component: Input,
            name: 'from',
            label: 'From (only accept the domain @fina.com.vn)',
            className: 'w-full',
            componentProps: {
              placeholder: 'your-email@fina.com.vn',
            },
          }),
          createSchemaItem({
            Component: HSelect,
            name: 'to',
            label: 'User',
            className: 'w-full',
            rules: [
              {
                required: true,
                message: 'User is required.',
              },
            ],
            componentProps: {
              endpoint: '/users/suggestion',
              showSearch: true,
              searchWhenHidenValueChange: true,
              className: 'w-full',
              optionsConverter: (user) => {
                return {
                  ...user,
                  label: `${user?.fullName || (user?.firstName || '') + ' ' + (user?.lastName || '')} - ${user?.code || ''}`,
                };
              },
              onChangeSelected: setTo,
            },
          }),
          createSchemaItem({
            Component: Input,
            name: 'recipient',
            rules: [
              {
                required: true,
                message: 'Recipient is required.',
              },
            ],
            label: 'Recipient',
            className: 'w-full',
            componentProps: {
              placeholder: 'your-email@domain',
            },
          }),
        ];

  return (
    <HModal
      {...{
        centered: true,
        visible: visible,
        onCancel: handleCancelModal,
        onOk: () => form?.submit(),
        okText: t('Send'),
        destroyOnClose: true,
      }}
    >
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            '/messages/send-test-email',
          ),
          method: 'post',
          form,
          hideControlButton: true,
          onGotSuccess: handleSendSuccess,
          onGotError: handleSendError,
          onDataReadyToSubmit: (formValues) => {
            const { emails } = to;

            return {
              ...formValues,
              to: emails?.[0]?.email || '',
            };
          },
          hiddenValues: {
            message: detailForm?.getFieldsValue(),
          },
          schema: () => [...formSentTest],
        }}
      />
    </HModal>
  );
};
