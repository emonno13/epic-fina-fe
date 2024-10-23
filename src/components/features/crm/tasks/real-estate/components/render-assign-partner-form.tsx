import { HSubForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { memo } from 'react';
import useAssignPartnerSchemaForm from '../schemas/assign-partner-schema-form';

export const RenderAssignPartnerForm = memo((props: HFormProps) => {
  const assignPartnerSchemaForm = useAssignPartnerSchemaForm();

  return <HSubForm schema={() => assignPartnerSchemaForm(props)} />;
});
