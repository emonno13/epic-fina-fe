import { HInput } from '@components/shared/common-form-elements/h-input';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';

export const DetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const fieldCode = 'coce';
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HInput,
      name: fieldCode,
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      componentProps: {
        disabled: true,
        uppercase: true,
        deleteWhiteSpace: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Permission name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Permission name'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Permission name', {
          vn: 'Nhập vào tên quyền',
        }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description'),
      },
    }),
  ];
};
