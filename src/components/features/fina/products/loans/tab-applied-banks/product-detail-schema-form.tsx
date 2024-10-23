import React from 'react';
import { ProductDetailInfoLoan } from './product-detail-infomation-general';
import { ProductDetailInformationLoan } from './product-detail-infomation-loan';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../schema-form/h-types';
import { HSubForm } from '../../../../../../schema-form/h-form';
import { DocumentTemplateSchemaForm } from '../product-document-template/document-template-schema-form';
import { NAMESPACE_DOCUMENT } from '../../utils';


export const ProductDetailSchemaForm = (props: HFormProps): HFormItemProps[] =>{
  return ([
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        children: <HSubForm schema={() => [...ProductDetailInfoLoan(props)]}/>,
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        children: <HSubForm schema={() => [...ProductDetailInformationLoan(props)]}/>,
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { span: 24 },
      isNewRow: true,
      componentProps: {
        children: <HSubForm schema={() => [...DocumentTemplateSchemaForm(props, NAMESPACE_DOCUMENT.loan)]}/>,
      },
    }),
  ]);
};



