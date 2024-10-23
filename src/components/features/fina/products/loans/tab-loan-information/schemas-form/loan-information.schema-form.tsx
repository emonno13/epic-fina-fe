import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { NAMESPACE_DOCUMENT } from '../../../utils';
import { DocumentTemplateSchemaForm } from '../../product-document-template/document-template-schema-form';
import { ProductCategoryDetail } from './product-category-detail.schema-form';
import { ProductInfoGeneralSchemaForm } from './product-infomation-general.schema-form';

export const ProductSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { initialValues } = props;
  const [typeCategory, setTypeCategory] = useState(
    initialValues?.category?.productCategory,
  );
  const { t } = useTranslation('admin-crm');
  useEffect(() => {
    setTypeCategory(initialValues?.category?.productCategory);
  }, [initialValues?.category?.productCategory]);

  const handleTypeCate = (option) => {
    setTypeCategory(option.productCategory);
  };

  return [
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        children: (
          <HSubForm
            schema={() => [
              ...ProductInfoGeneralSchemaForm(props, handleTypeCate),
            ]}
          />
        ),
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        children: (
          <HSubForm
            schema={() => [...ProductCategoryDetail(props, typeCategory)]}
          />
        ),
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { span: 24 },
      componentProps: {
        children: (
          <HSubForm
            schema={() => [
              ...DocumentTemplateSchemaForm(props, NAMESPACE_DOCUMENT.product),
            ]}
          />
        ),
      },
    }),
  ];
};
