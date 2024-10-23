import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';
import { HSelect } from '../../../shared/common-form-elements/select';
import { NEWS_CATEGORY_TYPES } from './constrant';

export const NewsCategoryDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const schema: any[] = [];
  if (!props.hiddenValues?.type) {
    schema.push(
      createSchemaItem({
        Component: HSelect,
        label: 'Type of category',
        colProps: { span: 24 },
        name: 'type',
        rules: [
          {
            message: 'Type is required',
          },
        ],
        componentProps: {
          placeholder: 'Type a category',
          options: [
            { label: t('News'), value: NEWS_CATEGORY_TYPES.NEWS },
            { label: t('News module'), value: NEWS_CATEGORY_TYPES.NEWS_MODULE },
          ],
        },
      }),
    );
  }
  return [
    ...schema,
    createSchemaItem({
      Component: Input,
      name: 'code',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 6 },
      label: 'Code',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Position name'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Position name',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 18 },
      label: 'Category name',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Position name'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Position name',
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: 'Description',
      componentProps: {
        rows: 6,
        placeholder: 'Enter the description',
      },
    }),
  ];
};
