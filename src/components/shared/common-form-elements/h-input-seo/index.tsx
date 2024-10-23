import React from 'react';
import 'antd/lib/slider/style';
import { HSeoSchemaForm } from './h-seo-schema-form';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';

import './h-input-seo.module.scss';

export const HInputSeoForm = () => {
  const documentDetail = useDocumentDetail();
  const initialValues = documentDetail?.seoMetadata || {
    title: documentDetail?.title || documentDetail?.name,
    keywords: documentDetail?.title || documentDetail?.name,
    description: documentDetail?.title || documentDetail?.name,
  };
  return (
    <HFeatureForm
      initialValues={initialValues}
      schema={HSeoSchemaForm}
    />
  );
};