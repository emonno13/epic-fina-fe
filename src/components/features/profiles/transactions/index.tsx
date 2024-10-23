import { Tabs } from 'antd';
import { memo } from 'react';
import { TRANSACTION_TABS } from './constants';
import DealInsuranceDetailManagement from './deal-insurance';
import DealLoanManagement from './deal-loan';

const { TabPane } = Tabs; 

const Transactions = memo(() => {
  return (
    <Tabs>
      <TabPane key={TRANSACTION_TABS.DEAL_LOAN.key} tab={TRANSACTION_TABS.DEAL_LOAN.tab}>
        <DealLoanManagement />
      </TabPane>
      <TabPane key={TRANSACTION_TABS.DEAL_INSURANCE.key} tab={TRANSACTION_TABS.DEAL_INSURANCE.tab}>
        <DealInsuranceDetailManagement/>
      </TabPane>
      <TabPane key={TRANSACTION_TABS.DEAL_REAL_ESTATE.key} tab={TRANSACTION_TABS.DEAL_REAL_ESTATE.tab}>
      </TabPane>
    </Tabs>
  );
});

export default Transactions;
