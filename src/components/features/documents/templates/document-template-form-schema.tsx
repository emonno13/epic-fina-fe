import { Input } from 'antd';
import { useTranslation } from 'next-i18next';

import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useIsNewDocument } from '../../../../schema-form/features/hooks/document-detail-hooks';
import { HSubForm } from '../../../../schema-form/h-form';
import { createSchemaLabelItem } from '../../../shared/common/h-label/h-label-title';
import { HRadioGroup } from '../../../shared/common/h-radio-group';
import { ProductInformationSchema } from '../../fina/products/common/product-information-group-controls';
import { DOCUMENT_TEMPLATE_STATUSES_OPTIONS } from './constants';

export const DocumentTemplateFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const { initialValues } = props;
  const isNewDocument = useIsNewDocument();
  const appendItems: any[] = [];

  if (initialValues) {
    appendItems.push(
      createSchemaItem({
        Component: 'div',
        label: t('Cloned from:'),
        colProps: { span: 4 },
        componentProps: {
          children: <strong>{initialValues?.clonedFrom?.name}</strong>,
        },
      }),
    );
  }

  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 4 },
      rendering: !isNewDocument,
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Template code'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template code'),
        },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Enter the Template code'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      rowProps: isNewDocument ? { gutter: { xs: 8, md: 16 } } : undefined,
      colProps: { span: isNewDocument ? 16 : 12 },
      label: t('Template name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template name'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Template name'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'version',
      colProps: { span: 4 },
      label: t('Version'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template version'),
        },
      ],
      initialValue: '1.0.0',
      componentProps: {
        placeholder: '1.0.0',
      },
    }),
    ...appendItems,
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Status'),
      name: 'status',
      colProps: { span: 16 },
      componentProps: {
        optionType: 'button',
        options: DOCUMENT_TEMPLATE_STATUSES_OPTIONS(t),
        style: { marginRight: 5 },
        size: 'large',
        buttonStyle: 'solid',
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Product information'),
        titleTooltip: t('Product information'),
      },
    }),
    createSchemaItem({
      Component: HSubForm,
      componentProps: {
        ...props,
        schema: ProductInformationSchema,
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      label: t('Description'),
      name: 'description',
      colProps: { span: 24 },
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description'),
      },
    }),
  ];
};
