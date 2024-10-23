import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import Input from 'antd/lib/input';
import { useTranslation } from 'next-i18next';
import { ValidationMessages } from '../../../../lib/validation-message';

export const HSeoSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'url',
      colProps: { span: 24 },
      label: 'Url',
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Url') },
      ],
      componentProps: {
        placeholder: 'Enter the Url',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'title',
      colProps: { span: 24 },
      label: 'Meta Title',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Meta Title'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Meta Title',
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: 'Meta Description',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Description'),
        },
      ],
      componentProps: {
        rows: 2,
        placeholder: 'Enter the Description',
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'keywords',
      colProps: { span: 24 },
      label: 'Meta keywords',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Meta keywords'),
        },
      ],
      componentProps: {
        rows: 2,
        placeholder: 'Enter the Meta keywords',
      },
    }),
  ];
};
