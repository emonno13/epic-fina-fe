import { Input } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';

export const ScenarioIvrTreeDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Name'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Name') },
      ],
      componentProps: {
        placeholder: t('Enter the name', { vn: 'Nhập vào tên' }),
      },
    }),
  ];
};
