import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { getProductTypeOptions } from '../../../../../types/organization';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';
import { CategoryDetailSchemaForm } from '../../../finance/categories/detail-schema-form';

export const QuestionGroupsProductInformationSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');

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
      componentProps: {
        placeholder: t('Select'),
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
        placeholder: t('select'),
        hiddenValues: {
          categoryId: productCategorySelected,
        },
        searchWhenHidenValueChange: true,
        mode: 'multiple',
      },
    }),
  ];
};
