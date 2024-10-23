import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import { ValidationMessages } from '../../../../../lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { getProductTypeOptions } from '../../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';
import { CategoryDetailSchemaForm } from '../../../finance/categories/detail-schema-form';

export const ProductInformationSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  const [productTypeSelected, setProductTypeSelected] = useState(
    props.initialValues?.productType || '',
  );
  const [productCategorySelected, setProductCategorySelected] = useState(
    props.initialValues?.categoryId || '',
  );

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Product type'),
      name: 'productType',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [
        {
          required: true,
          message: t('Product type is require', {
            vn: 'Loại sản phẩm là bắt buọc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Select product', { vn: 'Chọn sản phẩm' }),
        optionValues: getProductTypeOptions(t),
        onChangeSelected: (option) => {
          setProductTypeSelected(option.value);
        },
      },
    }),
    SelectUtils.createCategorySuggestionElement({
      label: t('Product category'),
      name: 'categoryId',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Product category'),
        },
      ],
      componentProps: {
        hiddenValues: {
          type: productTypeSelected,
        },
        searchWhenHidenValueChange: true,
        onChangeSelected: (option) => {
          setProductCategorySelected(option.id);
        },
        newItemOption: {
          formProps: {
            schema: CategoryDetailSchemaForm,
            nodeName: 'categories',
            hiddenValues: { type: productTypeSelected },
          },
          label: t('Create a category'),
        },
      },
    }),
    SelectUtils.createProductSuggestionElement({
      label: t('Product'),
      name: 'productIds',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Select product', { vn: 'Chọn sản phẩm' }),
        hiddenValues: {
          categoryId: productCategorySelected,
        },
        searchWhenHidenValueChange: true,
        mode: 'multiple',
      },
    }),
    createOrganizationSuggestionElement({
      label: t('Partner'),
      name: 'orgId',
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Select partner', { vn: 'Chọn đối tác' }),
      },
    }),
  ];
};
