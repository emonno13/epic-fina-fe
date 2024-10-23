import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';
import { createOrganizationSuggestionElement } from '../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';

export const DocumentTemplateDetailSchemaFormShort = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 4 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Template code',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template code'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Template code',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 12 },
      label: 'Template name',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template name'),
        },
      ],
      componentProps: {
        placeholder: 'Enter the Template name',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'version',
      colProps: { span: 4 },
      label: 'Template version',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Template version'),
        },
      ],
      componentProps: {
        placeholder: '1.0.0',
      },
    }),
    createOrganizationSuggestionElement({
      name: 'orgId',
      label: 'Organization',
      colProps: { span: 16 },
      componentProps: {
        orientation: 'left',
        placeholder: 'Please select a organization',
      },
    }),
    SelectUtils.createDocumentTemplateSuggestionElement({
      name: 'clonedFromId',
      label: 'Make a Clone from Template',
      colProps: { span: 6 },
      componentProps: {
        orientation: 'left',
        placeholder: 'Select a Template',
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
