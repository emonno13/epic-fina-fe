import { ValidationMessages } from '@lib/validation-message';
import {
  useDetailForm,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useState } from 'react';
import {
  getOrganizationTypeOptions,
  getProductTypeOptions,
  PRODUCT_TYPES,
} from 'types/organization';
import { useHTranslation } from '../../../../lib/i18n';
import { HSelect } from '../../../shared/common-form-elements/select';
import { getOptionsSubCategoryProduct } from './utils';

export const ProgressTemplateDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const detailForm = useDetailForm();
  const [productCategory, setProductCategory] = useState(PRODUCT_TYPES.loan);
  const optionsSubProductCate = getOptionsSubCategoryProduct(productCategory);
  const isNewDocument = props.transport?.isNewDocument || useIsNewDocument();

  return [
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 12 },
      rendering: !isNewDocument,
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Product progress code', {
        en: 'Product progress code',
        vn: 'Mã tiến trình sản phẩm',
      }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Product progress code'),
        },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Product progress code', {
          en: 'Enter the Product progress code',
          vn: 'Nhập mã tiến trình sản phẩm',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      rowProps: isNewDocument ? { gutter: { xs: 16, md: 24 } } : undefined,
      colProps: { span: isNewDocument ? 24 : 12 },
      label: t('Product progress name', {
        en: 'Product progress name',
        vn: 'Tên tiến trình sản phẩm',
      }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Product progress name'),
        },
      ],
      componentProps: {
        placeholder: t('', {
          en: 'Enter the Product progress name',
          vn: 'Nhập tên tiến trình sản phẩm',
        }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category', {
        en: 'Product category',
        vn: 'Danh mục sản phẩm',
      }),
      name: 'productCategory',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        placeholder: t('Product category', {
          en: 'Product category',
          vn: 'Danh mục sản phẩm',
        }),
        options: getProductTypeOptions(t),
        onChange: (document) => {
          detailForm?.setFieldsValue({ subProductCategory: undefined });
          setProductCategory(document);
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Sub product category', {
        en: 'Sub product category',
        vn: 'Danh mục sản phẩm phụ',
      }),
      name: 'subProductCategory',
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Sub product category', {
          en: 'Sub product category',
          vn: 'Danh mục sản phẩm phụ',
        }),
        options: optionsSubProductCate,
      },
    }),
    // createSchemaItem({
    //   Component: HSelect,
    //   label: t('Product'),
    //   name: "productId",
    //   colProps: {span: 12},
    //   componentProps: {
    //     placeholder: "Product",
    //     endpoint: "products/suggestion",
    //     optionsConverter: (document) => {
    //       document.label = `${document?.name} - ${document.code}`;
    //       return document
    //     },
    //   }
    // }),
    createSchemaItem({
      Component: HSelect,
      name: 'useForOrgType',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Use for organization type', {
        en: 'Use for organization type',
        vn: 'Loại tổ chức sử dụng',
      }),
      componentProps: {
        placeholder: t('Use for organization type', {
          en: 'Use for organization type',
          vn: 'Loại tổ chức sử dụng',
        }),
        options: getOrganizationTypeOptions(t),
      },
    }),
  ];
};
