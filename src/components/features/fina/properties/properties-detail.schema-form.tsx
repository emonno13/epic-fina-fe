import { Input, Radio } from 'antd';
import { useHTranslation } from '@lib/i18n';
import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { getOptionStatus } from './contansr';
import { useIsNewDocument } from '../../../../schema-form/features/hooks/document-detail-hooks';
import { createSchemaLabelItem } from '../../../shared/common/h-label/h-label-title';
import { HSelect } from '../../../shared/common-form-elements/select';
import { ValidationMessages } from '../../../../lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import { PRODUCT_TYPES } from '../../../../types/organization';

export const PropertiesSchemaFormShort = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const isNewDocument = props.transport?.isNewDocument || useIsNewDocument();
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('PRODUCT INFORMATION Real Estate', {
          vn: 'THÔNG TIN SẢN PHẨM BẤT ĐỘNG SẢN',
        }),
        titleTooltip: t('PRODUCT INFORMATION Real Estate', {
          vn: 'THÔNG TIN SẢN PHẨM BẤT ĐỘNG SẢN',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'apartmentCode',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      label: t('Apartment Code', { vn: 'Mã căn hộ/sản phâm' }),
      rules: [
        {
          required: true,
          message: t('Apartment Code is required', {
            vn: 'Mã căn hộ/sản phâm là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Apartment Code', { vn: 'Mã căn hộ/sản phâm' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'apartmentCodeInvestor',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      label: t('Apartment Code Investor', { vn: 'Mã sản phẩm theo CDT' }),
      componentProps: {
        placeholder: t('Apartment Code Investor', {
          vn: 'Mã sản phẩm theo CDT',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      rowProps: isNewDocument ? { gutter: { xs: 16, md: 24 } } : undefined,
      colProps: { span: isNewDocument ? 24 : 12 },
      label: t('Real Estate product name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Insurances name'),
        },
      ],
      componentProps: {
        placeholder: t('Real Estate product name'),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Mô tả sản phẩm bất động sản'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            'Mô tả sản phẩm bất động sản',
          ),
        },
      ],
      componentProps: {
        placeholder: 'Mô tả sản phẩm bất động sản',
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Slug') },
      ],
      componentProps: {
        placeholder: t('Enter slug'),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Status'),
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'status',
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: getOptionStatus(t),
      },
    }),
  ];
};

export const PropertiesInvolveSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: '',
        titleTooltip: '',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category'),
      colProps: { xs: 24, sm: 24, md: 24 },
      name: 'categoryId',
      rules: [
        {
          required: true,
          message: t('Loan type is required', {
            vn: 'Danh mục sản phẩm là bắt buộc',
          }),
        },
      ],
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.real_estate },
        placeholder: t('Enter the product category', {
          vn: 'Nhập vào danh mục sản phẩm',
        }),
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Project'),
      name: 'projectId',
      rowProps: { gutter: { xs: 8, md: 24 } },
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Project'),
        endpoint: 'projects/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Public', { vn: 'Công khai' }),
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'publish',
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          { label: t('Not public', { vn: 'Không công khai' }), value: false },
          { label: t('Public', { vn: 'Công khai' }), value: true },
        ],
      },
    }),
  ];
};
