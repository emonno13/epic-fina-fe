import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { Checkbox, Input } from 'antd';

export const ReasonCloseTaskDetailSchema = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input.TextArea,
      label: t('Content'),
      name: 'content',
      rules: [
        {
          required: true,
          message: t('Content is required', { vn: 'Nội dung là bắt buộc' }),
        },
      ],
      componentProps: {
        rows: 2,
      },
    }),
    createSchemaItem({
      Component: Checkbox,
      name: 'isRequiredNote',
      label: t('Is required note', { vn: 'Bắt buộc có ghi chú' }),
      valuePropName: 'checked',
    }),
  ];
};
