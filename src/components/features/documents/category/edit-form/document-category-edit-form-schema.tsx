import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { useIsNewDocument } from '../../../../../schema-form/features/hooks/document-detail-hooks';

export const DocumentCategoryEditFormSchema = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const isNewDocument = useIsNewDocument();
  return [
    createSchemaItem({
      Component: Input,
      label: t('Code'),
      rendering: !isNewDocument,
      rowProps: { gutter: { md: 24 } },
      colProps: { span: 6 },
      name: 'code',
      rules: [
        {
          required: true,
          message: t('Code is required', { vn: 'Mã là bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Name'),
      colProps: { span: isNewDocument ? 24 : 18 },
      name: 'name',
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
    }),
    createSchemaItem({
      Component: TextArea,
      label: t('Description'),
      name: 'description',
      colProps: { span: 24 },
    }),
  ];
};
