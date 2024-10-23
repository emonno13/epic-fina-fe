import { HCommentManagementByFeature } from '@components/shared/common-form-elements/h-comment/contexts/h-comment-feature-context';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormHiddenAble } from '../../../../../schema-form/features/search-form';
import { DEAL_DOCUMENT_ID_NAME } from '../../../fina/deals/loans';
import { DealsTableSchema } from '../../../fina/deals/loans/deals.table-schema';

import './dashboard-deal-tracking.scss';

export const DashboardDealTracking = ({ type, featureId = '', ...props }) => {
  const currentUser: any = useCurrentUser();

  return (
    <HFeature
      {...{
        featureId: featureId || 'dealsTracking',
        nodeName: 'deals',
        documentIdName: DEAL_DOCUMENT_ID_NAME,
      }}
    >
      <HSearchFormHiddenAble
        withRelations={[
          'category',
          'org',
          'user',
          'assignee',
          'source',
          'product',
          {
            relation: 'dealDetails',
            scope: {
              include: [{ relation: 'partnerStaff' }, { relation: 'partner' }],
            },
            filter: {
              where: { partnerStaffId: currentUser.id },
            },
          },
        ]}
        resetIfSuccess={false}
        layout="horizontal"
        className="deals-custom"
        hiddenFields={{ type }}
      />
      <HCommentManagementByFeature>
        <div className="deals-loans-wrapper dashboard-deal-tracking">
          <div className="deals-loans-content">
            <HTable
              scroll={{ x: 'max-content' }}
              schema={() => DealsTableSchema(props)}
              pagination={{ filter: { limit: 5 } }}
              className="deals-loans-table"
            />
          </div>
        </div>
      </HCommentManagementByFeature>
    </HFeature>
  );
};
