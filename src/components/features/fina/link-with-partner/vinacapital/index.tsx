import { Tabs } from 'antd';
import React, { useContext } from 'react';
import { useHTranslation } from '@lib/i18n';
import TransactionManagement from '@components/features/profiles/transaction-management';
import Investment from '@components/features/profiles/investment';
import AccountAsyncWithVinaCapital from './account-async';
import {
  EkycDoneWithVinaCapitalInAccountSyncScreen,
  EkycDoneWithVinaCapitalInEkycScreen,
  EkycWithVinaCapital,
} from './ekyc';
import NotificationNeedSyncOrEkycLayout from './notification-need-sync-or-ekyc';
import { LinkWithPartnerProvider } from './context/provider';
import { VinaCapitalManagementContext } from './context/context';
import { vinaCapitalTabPaneKeys } from '../constants';

const { TabPane } = Tabs;

export const VinaCapitalManagement = () => {
  return (
    <LinkWithPartnerProvider>
      <VinaCapitalManagementMain />
    </LinkWithPartnerProvider>
  );
};

export default VinaCapitalManagement;

const VinaCapitalManagementMain = () => {
  const { t } = useHTranslation('admin');
  const { tabActive, setTabActive } = useContext(VinaCapitalManagementContext);
  return (
    <div>
      <Tabs
        activeKey={tabActive}
        defaultActiveKey={tabActive}
        onChange={(tabActive) => setTabActive(tabActive)}
      >
        <TabPane
          key={vinaCapitalTabPaneKeys.ASSET}
          tab={t('Asset', { vn: 'Tài sản' })}
        >
          {tabActive === vinaCapitalTabPaneKeys.ASSET && (
            <NotificationNeedSyncOrEkycLayout>
              <Investment />
            </NotificationNeedSyncOrEkycLayout>
          )}
        </TabPane>
        <TabPane
          key={vinaCapitalTabPaneKeys.TRANSACTION}
          tab={t('Transaction', { vn: 'Giao dịch' })}
        >
          {tabActive === vinaCapitalTabPaneKeys.TRANSACTION && (
            <NotificationNeedSyncOrEkycLayout>
              <TransactionManagement />
            </NotificationNeedSyncOrEkycLayout>
          )}
        </TabPane>
        <TabPane
          key={vinaCapitalTabPaneKeys.EKYC}
          tab={t('E-KYC', { vn: 'E-KYC' })}
        >
          {tabActive === vinaCapitalTabPaneKeys.EKYC && (
            <NotificationNeedSyncOrEkycLayout
              noEkycContent={<EkycWithVinaCapital />}
            >
              <EkycDoneWithVinaCapitalInEkycScreen />
            </NotificationNeedSyncOrEkycLayout>
          )}
        </TabPane>
        <TabPane
          key={vinaCapitalTabPaneKeys.ACCOUNT_SYNC}
          tab={t('Account async', { vn: 'Đồng bộ tài khoản' })}
        >
          {tabActive === vinaCapitalTabPaneKeys.ACCOUNT_SYNC && (
            <NotificationNeedSyncOrEkycLayout
              noEkycContent={<AccountAsyncWithVinaCapital />}
            >
              <EkycDoneWithVinaCapitalInAccountSyncScreen />
            </NotificationNeedSyncOrEkycLayout>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};
