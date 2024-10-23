import { endpoints } from '@lib/networks/endpoints';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { memo, useState } from 'react';
import { GuaranteeHospitalDetailSchemaForm } from './detail-schema/guarantee-hospital.detail-schema-form';

const OrganizationProductViewer = (props: { type: string }) => {
  const { type } = props;
  const hospital = useDocumentDetail();
  const [attachedOrganizationProducts, setAttacheOrganizationProducts] =
    useState<any[]>([]);
  const [removedOrganizationProducts, setRemovedOrganizationProducts] =
    useState<any[]>([]);

  return (
    <HFeatureForm
      {...{
        schema: GuaranteeHospitalDetailSchemaForm,
        endpoint: endpoints.generateNodeEndpoint(
          `/organization-products${hospital ? `/${hospital.id}` : ''}`,
        ),
        onDataReadyToSubmit: (dataSubmit) => {
          return {
            ...dataSubmit,
            organizationId: dataSubmit.id,
            attachedOrganizationProducts,
            removedOrganizationProducts,
          };
        },
        transport: {
          setAttacheOrganizationProducts,
          setRemovedOrganizationProducts,
          type,
        },
      }}
    />
  );
};

export default memo(OrganizationProductViewer);
