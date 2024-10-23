import HTabs from '@components/shared/common/h-tabs';
import { Tabs } from 'antd';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } ffrom '@libproviders/auth';
import { useEffect } from from '@lib
import HFeature from '@schema-form/features/feature';
import {
  useDocumentDetail,
  useSetDocumentDetail,
  useTableSourceData,
} from '@schema-form/features/hooks';
import HSearchForm from '@schema-form/features/search-form';
import TableWithGridMode from '../common/table-with-grid-mode';
import { DEAL_LOAN_MANAGEMENT_TABS } from '../constants';
import ShortTableSchema from './short-table-schema';
import ViewDealInsuranceSchema from './view-deal-insurance-schema';

const { TabPane } = Tabs;

const DealInsuranceDetailManagement = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <HTabs type="button">
        <TabPane
          key={DEAL_LOAN_MANAGEMENT_TABS.SELF.key}
          tab={DEAL_LOAN_MANAGEMENT_TABS.SELF.tab}
        >
          <DealInsuranceDetail
            {...{
              featureId: `deal-insurance-aplication-transaction-information-by-${DEAL_LOAN_MANAGEMENT_TABS.SELF.key}`,
              userId: currentUser?.id,
            }}
          />
        </TabPane>
        <TabPane
          key={DEAL_LOAN_MANAGEMENT_TABS.RELATED.key}
          tab={DEAL_LOAN_MANAGEMENT_TABS.RELATED.tab}
        >
          <DealInsuranceDetail
            {...{
              featureId: `deal-insurance-aplication-transaction-information-by-${DEAL_LOAN_MANAGEMENT_TABS.RELATED.tab}`,
              sourceId: currentUser?.id,
            }}
          />
        </TabPane>
      </HTabs>
    </>
  );
};

export default DealInsuranceDetailManagement;
interface Props {
  userId?: string;
  sourceId?: string;
  featureId?: string;
}

const DealInsuranceDetail = (props: Props) => {
  const { userId, sourceId, featureId } = props;
  const { t } = useHTranslation('common');
  return (
    <div className="deal-insurance-aplication-transaction-information">
      <HFeature
        {...{
          featureId: featureId || 'deal-insurance',
          nodeName: 'deals',
        }}
      >
        <HSearchForm
          {...{
            hiddenValues: {
              filter: {
                where: {
                  type: 'insurances',
                  userId,
                  sourceId,
                },
              },
            },
            withRelations: ['user', 'org', 'product'],
            placeholder: t(
              'Enter information about: code,Contract owner, Source',
              { vn: 'Nhập thông tin về: mã, Chủ hợp đồng, Khách hàng' },
            ),
          }}
        />
        <DealInsurance />
      </HFeature>
    </div>
  );
};

const DealInsurance = () => {
  const dataSource = useTableSourceData();
  const setDocumentDetail = useSetDocumentDetail();
  const DealInsuranceDetail = useDocumentDetail();

  const checkViewDetail = !!DealInsuranceDetail?.id;

  useEffect(() => {
    if (dataSource) {
      setDocumentDetail(dataSource[0]);
    }
  }, [dataSource]);
  return (
    <>
      <TableWithGridMode
        {...{
          tableSchemaDetail: ShortTableSchema,
          children: checkViewDetail ? <ViewDealInsuranceSchema /> : <></>,
        }}
      />
    </>
  );
};
