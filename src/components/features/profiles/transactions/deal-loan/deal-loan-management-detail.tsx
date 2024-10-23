import HTabs from '@components/shared/common/h-tabs';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { Empty, Tabs } from 'antd';
import { memo } from 'react';
import { isEmpty } from 'underscore';
import { DEAL_LOAN_DETAIL_TABS } from '../constants';
import { useFetchDealByTaskId } from '../hooks';
import { DealLoanDetailHandlingHistory } from './deal-loan-detail/deal-loan-detail-handling-history';
import { DealLoanDetailInformation } from './deal-loan-detail/deal-loan-detail-information';
import { DealLoanDetailResponse } from './deal-loan-detail/deal-loan-detail-response';
import { DealLoanDetailResult } from './deal-loan-detail/deal-loan-detail-result';

import './deal-loan-management-detail.module.scss';

const { TabPane } = Tabs;

export const DealLoanManagementDetail = memo(() => {
  const taskData = useDocumentDetail();
  const dealData = useFetchDealByTaskId(taskData?.id);

  if (!taskData || isEmpty(taskData)) {
    return <Empty />;
  }

  return (
    <HTabs className="deal-loan-management-detail">
      <TabPane
        key={DEAL_LOAN_DETAIL_TABS.INFORMATION.key}
        tab={DEAL_LOAN_DETAIL_TABS.INFORMATION.tab}
      >
        <DealLoanDetailInformation taskData={taskData} dealData={dealData} />
      </TabPane>

      <TabPane
        key={DEAL_LOAN_DETAIL_TABS.HANDLING_HISTORY.key}
        tab={DEAL_LOAN_DETAIL_TABS.HANDLING_HISTORY.tab}
      >
        <DealLoanDetailHandlingHistory taskData={taskData} />
      </TabPane>

      {isEmpty(dealData) && (
        <TabPane
          key={DEAL_LOAN_DETAIL_TABS.RESPONSE.key}
          tab={DEAL_LOAN_DETAIL_TABS.RESPONSE.tab}
        >
          <DealLoanDetailResponse taskData={taskData} />
        </TabPane>
      )}

      {!isEmpty(dealData) && (
        <TabPane
          key={DEAL_LOAN_DETAIL_TABS.RESULT.key}
          tab={DEAL_LOAN_DETAIL_TABS.RESULT.tab}
        >
          <DealLoanDetailResult dealData={dealData} />
        </TabPane>
      )}
    </HTabs>
  );
});
