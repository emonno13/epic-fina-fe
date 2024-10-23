import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BondsInformationSchemaForm } from './bonds-information.schema-form';
import { PriceAndDateSchemaForm } from './price-and-date.schema-form';

export const ViewerSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        children: <HSubForm schema={() => BondsInformationSchemaForm(props)} />,
      },
    }),
    createSchemaItem({
      Component: React.Fragment,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        children: <HSubForm schema={() => PriceAndDateSchemaForm(props)} />,
      },
    }),
  ];
};
