import { Input } from 'antd';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { getPositionGroupOptions } from '../../../../types/organization';
import { HSelect } from '../../../shared/common-form-elements/select';

export const PositionDetailSchemaFormShort = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      rules: [
        {
          required: true,
          message: t('Position code is require', { vn: 'Mã là bắt buộc' }),
        },
        {
          whitespace: true,
          message: t('Position code is require', { vn: 'Mã là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Position code', { vn: 'Nhập vào mã' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Position name', { vn: 'Tên vị trí' }),
      rules: [
        {
          required: true,
          message: t('Position name is require', { vn: 'Tên vị trí bắt buộc' }),
        },
        {
          whitespace: true,
          message: t('Position name is require', { vn: 'Tên vị trí bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Position name', {
          vn: 'Nhập vào tên vị trị',
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
        placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
      },
    }),
  ];
};

export const PositionDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Group'),
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 24 },
      name: 'group',
      rules: [
        {
          message: t('Group is required', { vn: 'Tổ chức là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Select a group', { vn: 'Lựa chọn một tổ chức' }),
        options: getPositionGroupOptions(t),
      },
    }),
    ...PositionDetailSchemaFormShort(props),
  ];
};
