import { FC, useCallback } from 'react';

import { HSubForm } from '@schema-form/h-form';
import { useSeoDetailSchemaForm } from './h-seo-schema-detail';

interface HSeoProps {
  SEOFieldName?: string;
}

export const HSeo: FC<HSeoProps> = (props) => {
  const { SEOFieldName } = props;
  const seoDetailSchemaForm = useSeoDetailSchemaForm();

  const schema = useCallback(
    (formProps) => {
      return seoDetailSchemaForm({
        ...formProps,
        transport: {
          SEOFieldName,
        },
      });
    },
    [SEOFieldName, seoDetailSchemaForm],
  );

  return <HSubForm schema={schema} />;
};
