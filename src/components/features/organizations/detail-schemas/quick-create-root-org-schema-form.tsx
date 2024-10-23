import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const QuickCreateRootOrgSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 24 },
      label: 'Organization code',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Organization code'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Organization code',
        uppercase: true,
        deleteWhiteSpace: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: 'Organization name',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Organization name'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Organization name',
      },
    }),
  ];
};
