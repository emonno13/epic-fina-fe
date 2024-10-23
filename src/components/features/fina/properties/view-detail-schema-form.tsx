import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import React from 'react';
import { HSubForm } from '../../../../schema-form/h-form';
import {
  PropertiesInvolveSchemaForm,
  PropertiesSchemaFormShort,
} from './properties-detail.schema-form';
import { PropertiesInformationDetailSchema } from './properties-information-detail.schema-form';

export const RealEstateDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        children: (
          <HSubForm schema={() => [...PropertiesSchemaFormShort(props)]} />
        ),
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        children: (
          <HSubForm schema={() => [...PropertiesInvolveSchemaForm(props)]} />
        ),
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 24 },
      componentProps: {
        children: (
          <HSubForm
            schema={() => [...PropertiesInformationDetailSchema(props)]}
          />
        ),
      },
    }),
  ];
};
