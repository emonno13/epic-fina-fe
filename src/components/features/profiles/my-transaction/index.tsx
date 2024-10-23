import TransactionDealInsurancesManagement from '@components/features/fina/deals/insurances';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { Tabs } from 'antd';
import { useHTranslation } from 'lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm from '../../../../schema-form/features/search-form';
import { SEARCH_MODES } from '../../../../schema-form/features/search-form/schema';
import { USER_TYPES } from '../../../../types/organization';
import { DEAL_DOCUMENT_ID_NAME } from '../../fina/deals/loans';
import { DealsTableSchema } from '../../fina/deals/loans/deals.table-schema';
import { AdvanceSearch } from '../../fina/deals/loans/search.schema-form';

import './my-transaction.module.scss';

const { TabPane } = Tabs;

export const MyTransaction = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  return (
    <Tabs className="my-transaction-proifile">
      <TabPane tab={t('Deal', { vn: 'Hồ sơ vay' })} key={'deal'}>
        <HFeature
          {...{
            featureId: 'deals',
            nodeName: 'deals',
            documentIdName: DEAL_DOCUMENT_ID_NAME,
            documentRelations: [
              'user',
              'category',
              'assignee',
              'source',
              'dealProgress',
              'product',
              {
                relation: 'dealDetails',
                scope: {
                  include: [
                    { relation: 'partnerStaff' },
                    { relation: 'executePartner' },
                  ],
                },
              },
            ],
          }}
        >
          <HSearchForm
            endpoint={
              currentUser.type === USER_TYPES.teller
                ? endpoints.endpointWithApiDomain('/deals/bank')
                : endpoints.endpointWithApiDomain('/deals')
            }
            withRelations={[
              RelationUtils.entity(
                'user',
                RelationUtils.fieldsInUserRelation(),
              ),
              RelationUtils.entity(
                'assignee',
                RelationUtils.fieldsInUserRelation(),
              ),
              'category',
              'product',
              {
                relation: 'dealDetails',
                scope: { include: [{ relation: 'partnerStaff' }] },
              },
            ]}
            initialValues={{ searchingRule: SEARCH_MODES.SINGLE }}
            advancedSchema={() => AdvanceSearch({ isProfile: true })}
            resetIfSuccess={false}
            layout="horizontal"
            className="deals-custom"
          />
          <HTable schema={() => DealsTableSchema()} />
        </HFeature>
      </TabPane>
      <TabPane tab={t('Insurance', { vn: 'Hồ sơ bảo hiểm' })} key={'insurance'}>
        <TransactionDealInsurancesManagement />
      </TabPane>
    </Tabs>
  );
};

export default MyTransaction;
