import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { getGroupTypeOptions } from './common';

export const GroupDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Type'),
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 8 },
      name: 'type',
      rules: [
        {
          message: t('Type is required', { vn: 'Loại là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Select a type', { vn: 'Lựa chọn loại' }),
        options: getGroupTypeOptions(t),
      },
    }),
    ...GroupDetailSchemaFormShort(props),
  ];
};

export const GroupDetailSchemaFormShort = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Name'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Name') },
      ],
      componentProps: {
        placeholder: t('Enter the name', { vn: 'Nhập vào tên' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
      },
    }),
  ];
};
