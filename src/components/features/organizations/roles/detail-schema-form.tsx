import { createPermissionsSelectionElement } from '@components/shared/common-form-elements/select';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import React from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { PermissionViewer } from './permissions';

export const DetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      componentProps: {
        placeholder: t('Enter the role code', { vn: 'Nhập vào mã' }),
        uppercase: true,
        deleteWhiteSpace: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Role name', { vn: 'Tên nhóm quyền' }),
      rules: [
        {
          required: true,
          message: t('Role name is require', {
            vn: 'Tên nhóm quyền là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter the role name', {
          vn: 'Nhập vào tên nhóm quyền',
        }),
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      componentProps: {
        children: <HSubForm schema={() => [...PermissionViewer(props)]} />,
      },
    }),
    createPermissionsSelectionElement(),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 2,
        placeholder: t('Enter the description'),
      },
    }),
  ];
};
