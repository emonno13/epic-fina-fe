import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { useEffect, useState } from 'react';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HRadioGroup } from '../../../../../../shared/common/h-radio-group';
import { MESSAGE_STATUS } from '../../../message/constants';
import {
  MESSAGE_WORKFLOW_TYPE,
  MESSAGE_WORKFLOW_TYPE_OPTIONS,
} from '../../constant';

export const MessageSchema = () => {
  const { t } = useHTranslation('admin-common');
  const messageWorkflow = useDocumentDetail();
  const [type, setType] = useState(MESSAGE_WORKFLOW_TYPE.MESSAGE);

  useEffect(() => {
    setType(messageWorkflow?.type || MESSAGE_WORKFLOW_TYPE.MESSAGE);
  }, [messageWorkflow?.type]);

  return [
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Type'),
      rules: [{ required: true, message: 'Message is required' }],
      initialValue: MESSAGE_WORKFLOW_TYPE.MESSAGE,
      componentProps: {
        placeholder: t('Type'),
        optionType: 'button',
        buttonStyle: 'solid',
        onChange: ({ target: { value } }) => {
          setType(value);
        },
        options: MESSAGE_WORKFLOW_TYPE_OPTIONS,
      },
      name: 'type',
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'messageId',
      label: t('Message', { en: 'Message', vn: 'Tin nhắn' }),
      colProps: { span: 24 },
      rules: [{ required: true, message: 'Message is required' }],
      componentProps: {
        placeholder: t('Select the Message', {
          en: 'Select the Message',
          vn: 'Chọn Message',
        }),
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: '/messages/get-message-by-type-message-workflow',
        hiddenValues: {
          status: MESSAGE_STATUS.ACTIVE,
          type,
        },
        optionsConverter: (document) => ({
          ...document,
          label: `${document?.name || ''}`,
        }),
      },
    }),
  ];
};
