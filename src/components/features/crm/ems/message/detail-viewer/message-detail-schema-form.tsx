import { useEffect } from 'react';

import {
  HInput,
  HTextArea,
} from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';
import { HRadioGroup } from '../../../../../shared/common/h-radio-group';
import {
  MESSAGE_SENDER_OPTIONS,
  MESSAGE_STATUS,
  MESSAGE_STATUS_OPTIONS,
  MESSAGE_TYPE,
  MESSAGE_TYPES_OPTIONS,
} from '../constants';
import { FetchTemplateButton } from './fetch-template-button';

export const MessageDetailSchemaForm = (props: HFormProps) => {
  const emailMessageTypes = [
    MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL,
    MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL,
  ];
  const { t } = useHTranslation('admin-common');
  const { setVisible, messageType, currentMessageType, setCurrentMessageType } =
    props?.transport;

  useEffect(() => {
    setCurrentMessageType(messageType || MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL);
  }, []);

  const buttons: any = [
    createSchemaItem({
      Component: HButton,
      colProps: { span: 6 },
      componentProps: {
        children: t('Send test message'),
        onClick: () => setVisible(true),
        size: 'middle',
        type: 'primary',
      },
    }),
  ];

  if (currentMessageType === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL) {
    buttons.unshift(
      createSchemaItem({
        Component: FetchTemplateButton,
        colProps: { span: 6 },
      }),
    );
  }

  return [
    createSchemaItem({
      Component: HInput,
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Name'),
      },
      name: 'name',
    }),
    createSchemaItem({
      Component: HSelect,
      colProps: { span: 12 },
      label: t('Type'),
      rules: [
        {
          required: true,
          message: t('Message type is required', {
            vn: 'Loại tin nhắn là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Type'),
        optionValues: MESSAGE_TYPES_OPTIONS,
        onChangeSelected: (option: any) => {
          setCurrentMessageType(option.value);
        },
      },
      name: 'type',
    }),
    createSchemaItem({
      Component: HSelect,
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Sender'),
      rules: [
        {
          required: true,
          message: t('Sender is required', { vn: 'Người gửi là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Select sender'),
        optionValues: MESSAGE_SENDER_OPTIONS,
      },
      name: 'sender',
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 12 },
      label: t('Status'),
      initialValue: MESSAGE_STATUS.ACTIVE,
      componentProps: {
        placeholder: t('Status'),
        optionType: 'button',
        buttonStyle: 'solid',
        options: MESSAGE_STATUS_OPTIONS,
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: HTextArea,
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Description'),
      name: 'description',
      componentProps: {
        rows: 6,
        placeholder: t('Description'),
      },
    }),
    createSchemaItem(
      emailMessageTypes.includes(currentMessageType)
        ? {
            Component: HSelect,
            rowProps: { gutter: { xs: 24, md: 24 }, align: 'bottom' },
            colProps: { span: 12 },
            label: t('Template'),
            rules: [
              {
                required: true,
                message: t('Template is required', {
                  vn: 'Mẫu tin nhắn là bắt buộc',
                }),
              },
            ],
            componentProps: {
              endpoint: `${currentMessageType === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL ? 'external-email-templates' : 'templates'}/suggestion`,
              placeholder:
                currentMessageType === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL
                  ? t('External template')
                  : t('Internal template'),
              hiddenValues: {
                active: {
                  nin: ['false'],
                },
              },
              optionsConverter: (document) => {
                document.label =
                  currentMessageType === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL
                    ? document?.name
                    : document?.title;
                return document;
              },
              showSearch: true,
            },
            name:
              currentMessageType === MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL
                ? 'externalTemplateId'
                : 'internalTemplateId',
          }
        : {
            Component: HTextArea,
            colProps: { span: 12 },
            rowProps: { gutter: { xs: 24, md: 24 }, align: 'bottom' },
            rules: [
              {
                required: true,
                message: t('Message content is required', {
                  vn: 'Nội dung tin nhắn là bắt buộc',
                }),
              },
            ],
            label: t('Content'),
            name: 'content',
            componentProps: {
              rows: 6,
              placeholder: t('Content'),
            },
          },
    ),
    ...buttons,
    createSchemaItem({
      Component: HSelect,
      colProps: { span: 12 },
      componentProps: {
        endpoint: 'reference-set-templates/suggestion',
        placeholder: 'Select reference set template',
      },
      label: t('Reference set template'),
      name: 'referenceSetTemplateId',
    }),
  ];
};
