import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';
import { HSelect } from '../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';
import { NEWS_CATEGORY_TYPES } from '../categories/constrant';

export const NewsModuleDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return [
    SelectUtils.createNewsCategorySelection(
      {},
      NEWS_CATEGORY_TYPES.NEWS_MODULE,
    ),
    createSchemaItem({
      Component: HSelect,
      label: 'Type',
      colProps: { span: 24 },
      name: 'type',
      rules: [
        {
          message: 'Type is required',
        },
      ],
      componentProps: {
        placeholder: 'Type a group',
        options: [
          { label: t('Loan'), value: 'loan' },
          { label: t('Insurance'), value: 'insurance' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
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
      name: 'Description',
      colProps: { span: 24 },
      label: 'description',
      componentProps: {
        rows: 6,
        placeholder: 'Enter the description',
      },
    }),
  ];
};
