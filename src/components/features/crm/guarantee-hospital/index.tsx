import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import HSearchForm from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { ORGANIZATION_TYPES } from '@types/organization';
import { SCREEN_ADD_GUARANTEE_HOSPITAL } from './constants';
import { GuaranteeHospitalDetailSchemaTable } from './detail-schema/guarantee-hospital.detail-schema-table';
import OrganizationProductViewer from './organization-product-viewer';

export const GuaranteeHospital = () => {
  const relations = [
    'products',
    {
      relation: 'organizationProducts',
      scope: {
        include: [{ relation: 'product' }],
      },
    },
  ];
  return (
    <HFeature
      {...{
        featureId: 'organization-products',
        nodeName: 'organizations',
        documentRelations: relations,
      }}
    >
      <HSearchForm
        {...{
          withRelations: relations,
          hiddenValues: {
            ...FormUtils.createSearchHiddenValues({
              type: ORGANIZATION_TYPES.HOSPITAL,
            }),
          },
        }}
      />

      <HDocumentDrawerPanel
        {...{
          hideSubmitAndContinueButton: true,
        }}
      >
        <OrganizationProductViewer
          type={SCREEN_ADD_GUARANTEE_HOSPITAL.ORGANIZATION}
        />
      </HDocumentDrawerPanel>

      <HTable
        {...{
          schema: GuaranteeHospitalDetailSchemaTable,
        }}
      />
    </HFeature>
  );
};

export default GuaranteeHospital;
