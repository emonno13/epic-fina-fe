import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { HSubForm } from '../../../../../schema-form/h-form';
import { HTinyEditor } from '../../../../shared/common-form-elements/h-tiny-editor';
import { HUploadImage } from '../../../../shared/common-form-elements/h-upload';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';
import { NEWS_CATEGORY_TYPES } from '../../categories/constrant';

export const NewsDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: React.Fragment,
      colProps: { span: 20 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        children: (
          <HSubForm
            schema={() => [
              createSchemaItem({
                Component: Input,
                name: 'title',
                colProps: { span: 24 },
                label: 'Title',
                rules: [{ required: true, message: 'Title is required' }],
                componentProps: {
                  placeholder: 'Enter the title',
                },
              }),
              createSchemaItem({
                Component: Input,
                label: 'Short Content',
                colProps: { span: 24 },
                name: 'shortContent',
                rules: [
                  { required: true, message: 'Short content is required' },
                ],
                componentProps: {
                  placeholder: 'Enter the short content',
                },
              }),
            ]}
          />
        ),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: 'image',
      colProps: { span: 4 },
      label: 'Image',
      rules: [{ required: true, message: 'Image is required' }],
    }),
    SelectUtils.createNewsCategorySelection(
      {},
      NEWS_CATEGORY_TYPES.NEWS_MODULE,
    ),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      label: 'Content',
      rules: [{ required: true, message: 'Content is required!' }],
      colProps: { span: 24 },
    }),
  ];
};
