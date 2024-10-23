import { Checkbox, Input } from 'antd';
import { useState } from 'react';

import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { useHTranslation } from '../../../../../lib/i18n';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { DocumentCategoryEditFormSchema } from '../../category/edit-form/document-category-edit-form-schema';

export const DocumentEditFormSchema = (props: HFormProps) => {
  const [documentCategoryCode, setDocumentCategoryCode] = useState('');
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Document category', { vn: 'Danh mục tài liệu' }),
      colProps: { span: 24 },
      rowProps: { gutter: { md: 24 } },
      name: 'documentCategoryId',
      rules: [
        {
          required: true,
          message: t('Document category is required', {
            vn: 'Danh mục tài liệu là bắt buộc',
          }),
        },
      ],
      componentProps: {
        showSearch: true,
        allowClear: true,
        endpoint: 'document-categories/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name}`;

          return document;
        },
        onChangeSelected: (option) => {
          setDocumentCategoryCode(option?.code);
        },
        newItemOption: {
          formProps: {
            schema: DocumentCategoryEditFormSchema,
            nodeName: 'document-categories',
          },
          label: 'Create a category',
        },
      },
    }),

    createSchemaItem({
      Component: Input,
      label: t('Code'),
      colProps: { span: 6 },
      rowProps: { gutter: { md: 24 } },
      name: 'subCode',
      rules: [
        {
          required: true,
          message: t('Code is required'),
        },
      ],
      componentProps: {
        addonBefore: documentCategoryCode,
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Name'),
      colProps: { span: 18 },
      name: 'name',
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
    }),
    createSchemaItem({
      Component: Checkbox,
      name: 'isRequired',
      valuePropName: 'checked',
      className: 'm-b-0',
      componentProps: {
        children: t('Is required', { vn: 'Bắt buộc' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      label: t('Description'),
      colProps: { span: 24 },
      name: 'description',
    }),
  ];
};
