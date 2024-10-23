import { Radio } from 'antd';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';

export const QueueGroupDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'groupId',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Group', { vn: 'Nhóm' }),
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: 'groups/suggestion',
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'status',
      colProps: { span: 6 },
      label: t('Status'),
      initialValue: 'active',
      componentProps: {
        defaultValue: 'active',
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          { label: t('Active'), value: 'active' },
          { label: t('Inactive'), value: 'inactive' },
        ],
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'isMain',
      colProps: { span: 6 },
      label: t('Main/Sub group', { vn: 'Nhóm chính / nhóm phụ' }),
      componentProps: {
        defaultValue: false,
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          { label: t('Main', { vn: 'Nhóm chính' }), value: true },
          { label: t('Sub', { vn: 'Nhóm phụ' }), value: false },
        ],
      },
    }),
  ];
};
