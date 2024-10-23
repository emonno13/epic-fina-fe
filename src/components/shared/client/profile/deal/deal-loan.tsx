// import { useState } from 'react';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { AdvanceSearchSchema } from './deal-loan-search';
import { DealsTableSchema } from './deals-loan.table-schema';
import { ViewLoanInformationDetail } from './detail/deal-loan-detail';

const ProfileAccountDealLoan = (props) => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');
  // const [openDetail, setOpenDetail] = useState(false);
  const { openDetail, setOpenDetail } = props;
  return (
    <>
      <HFeature
        {...{
          featureId: 'deals',
          nodeName: 'deals',
          documentRelations: [
            'user',
            'assignee',
            {
              relation: 'dealDetails',
              scope: {
                include: [
                  { relation: 'partnerStaff' },
                  { relation: 'executePartner' },
                  { relation: 'partner' },
                ],
              },
            },
            {
              relation: 'product',
              scope: {
                fields: { id: true, name: true },
              },
            },
          ],
        }}
      >
        <div
          className="layout-profile-search deal-loan-profile-search"
          style={openDetail ? { display: 'none' } : {}}
        >
          <HSearchForm
            endpoint={endpoints.endpointWithApiDomain('/deals')}
            withRelations={[
              RelationUtils.entity(
                'user',
                RelationUtils.fieldsInUserRelation(['address']),
              ),
              RelationUtils.entity(
                'assignee',
                RelationUtils.fieldsInUserRelation(['address']),
              ),
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
                  fields: { id: true, name: true },
                },
              },
            ]}
            hiddenValues={{
              filter: {
                where: {
                  type: 'loan',
                },
              },
            }}
            advancedSchema={() => AdvanceSearchSchema()}
            resetIfSuccess={false}
            className="h-search-portal-custom"
            classNameAdvancedTabSchema="deal-loan-profile-advanced-search"
          />
        </div>

        {openDetail ? (
          <ViewLoanInformationDetail {...{ setOpenDetail }} />
        ) : (
          <HTable
            schema={() =>
              DealsTableSchema({
                setOpenDetail: () => {
                  setOpenDetail(true);
                },
              })
            }
          />
        )}
      </HFeature>
    </>
  );
};

export default ProfileAccountDealLoan;
