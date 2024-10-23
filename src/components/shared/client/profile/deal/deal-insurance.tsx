import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { DealsInsuranceTableSchema } from './deals-insurance.table-schema';

const ProfileAccountDealInsurance = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');

  return (
    <HFeature
      {...{
        featureId: 'deals',
        nodeName: 'deals',
        documentRelations: [
          'user',
          {
            relation: 'dealDetails',
            scope: {
              include: [
                { relation: 'partnerStaff' },
                { relation: 'executePartner' },
              ],
            },
          },
          {
            relation: 'product',
            scope: {
              fields: { id: true, name: true, orgId: true },
              include: [{ relation: 'org' }],
            },
          },
        ],
      }}
    >
      <div className="layout-profile-search">
        <HSearchForm
          endpoint={endpoints.endpointWithApiDomain('/deals')}
          withRelations={[
            RelationUtils.entity('user', RelationUtils.fieldsInUserRelation()),
            {
              relation: 'dealDetails',
              scope: { include: [{ relation: 'partnerStaff' }] },
            },
            {
              relation: 'product',
              scope: {
                fields: { id: true, name: true, orgId: true },
                include: [{ relation: 'org' }],
              },
            },
          ]}
          hiddenValues={{
            filter: {
              where: {
                type: 'insurances',
              },
            },
          }}
          resetIfSuccess={false}
          className="h-search-portal-custom"
        />
      </div>
      <HTable schema={() => DealsInsuranceTableSchema()} />
    </HFeature>
  );
};

export default ProfileAccountDealInsurance;
