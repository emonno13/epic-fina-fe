import { Input } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { HUpload } from '../../../../shared/common-form-elements/h-upload';

export const GreetingFileDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HUpload,
      name: 'file',
      colProps: { span: 24 },
      label: t('Greeting file', { vn: 'File lời chào' }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            t('Greeting file', { vn: 'File lời chào' }),
          ),
        },
      ],
      componentProps: {
        accept: 'audio/*',
        multiple: false,
        onChange: (data) => {
          console.log('File: ', data);
        },
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 3,
        placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
      },
    }),
  ];
};
