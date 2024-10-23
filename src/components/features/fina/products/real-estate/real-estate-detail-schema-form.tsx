import { useTranslation } from 'next-i18next';
import { Input, InputNumber } from 'antd';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';
import { ValidationMessages } from '../../../../../lib/validation-message';
import { createOrganizationSuggestionElement, HSelect } from '../../../../shared/common-form-elements/select';
import { PRODUCT_TYPES } from '../../../../../types/organization';
import { HUploadImage } from '../../../../shared/common-form-elements/h-upload';
import { HDatePicker } from '../../../../shared/common-form-elements/date-picker';
import { HTinyEditor } from '../../../../shared/common-form-elements/h-tiny-editor';

export const RealEstateSchemaFormShort = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      label: t('Real Estate product code'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Insurances product code') },
      ],
      componentProps: {
        placeholder: 'Enter the real estate  product code',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 12 },
      label: t('Real Estate product name'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Insurances name') },
      ],
      componentProps: {
        placeholder: 'Enter the real estate name',
      },
    }),
    createOrganizationSuggestionElement(
      {
        name: 'orgId',
        label: 'Organization',
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 8, md: 24 } },
        rules: [
          { required: true, message: ValidationMessages.requiredMessage('Organization') },
        ],
        componentProps: {
          searchWhenHidenValueChange: true,
        },
      }),
    createSchemaItem({
      Component: HSelect,
      label: t('Insurances category'),
      colProps: { span: 12 },
      name: 'categoryId',
      rules: [{
        required: true,
        message: 'Loan type is required',
      }],
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.real_estate },
        placeholder: 'Select a insurances category',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Project'),
      colProps: { span: 12 },
      name: 'projectId',
      rowProps: { gutter: { xs: 8, md: 24 } },
      componentProps: {
        placeholder: 'Select a project',
        endpoint: 'projects/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'applyFrom',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      label: t('Time application (Start time)'),
      rules: [{
        required: true,
        message: 'Time application is required',
      }],
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY HH:mm:ss',
        placeholder: t('Start time'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'applyTo',
      colProps: { span: 12 },
      label: t('Time application (End time)'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY HH:mm:ss',
        placeholder: t('End time'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      label: 'Description',
      componentProps: {
        rows: 3,
        placeholder: 'Enter the description',
      },
    }),
  ]);
};

export const RealEstateSchemaFormDetail = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const detail = 'detail';
  return (
    [
      createSchemaItem({
        Component: InputNumber,
        name: [detail, 'product_value'],
        colProps: { span: 12 },
        label: t('Product value (VNĐ)'),
        rules: [
          { required: true, message: ValidationMessages.requiredMessage('Preferential interest rate ') },
        ],
        componentProps: {
          style: { width: 280 },
          placeholder: 'Enter the preferential interest rate (VNĐ)',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: [detail, 'contact'],
        colProps: { span: 12 },
        label: t('Contact'),
        rules: [
          { required: true, message: ValidationMessages.requiredMessage('Contact ') },
        ],
        componentProps: {
          placeholder: 'Enter key contact',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: [detail, 'link'],
        colProps: { span: 12 },
        label: t('Link'),
        rules: [
          { required: true, message: ValidationMessages.requiredMessage('Link ') },
        ],
        componentProps: {
          placeholder: 'Enter key link',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: [detail, 'address'],
        colProps: { span: 12 },
        label: t('Address'),
        rules: [
          { required: true, message: ValidationMessages.requiredMessage('Address ') },
        ],
        componentProps: {
          placeholder: 'Enter key address',
        },
      }),
      createSchemaItem({
        Component: HUploadImage,
        name: [detail, 'image'],
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        label: t('Image'),
      }),
      createSchemaItem({
        Component: HTinyEditor,
        name: [detail, 'content'],
        colProps: { span: 24 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        rules: [{
          required: true,
          message: 'Content is required',
        }],
        label: 'Content',
      }),
    ]
  );
};