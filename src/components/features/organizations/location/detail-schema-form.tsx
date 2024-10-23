import { Input } from 'antd';

import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../../lib/i18n';
import { HSelect } from '../../../shared/common-form-elements/select';

export const LocationDetailSchemaForm = (props): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'parentId',
      colProps: { span: 16 },
      label: t('Parent', { vn: 'Trực thuộc' }),
      componentProps: {
        placeholder: '',
        endpoint: 'locations/suggestion',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is require', { vn: 'Tên là bắt buộc' }),
        },
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

export const LocationDetailSchemaFormShort = (
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
        placeholder: 'Enter the name',
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
