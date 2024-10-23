import { PlusOutlined } from '@ant-design/icons';
import { ADMIN_PERMISSIONS } from '@constants/crm/task';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser, usePermissions } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { USER_TYPES } from '@types/organization';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { PERMISSION_DEAL } from '../../../utils';
import { CreateBankWithLoan } from './create-bank-loan';
import { ManagerLoanWithFina } from './edit-fina-loan';
import { generateTabPanelByBank } from './loan-detail-generate-tab-pane';

import '../deal-loan-detail.module.scss';
import './edit-deal-loan.module.scss';

const { TabPane } = Tabs;

export const EditLoanWithTabPanel = () => {
  const permissions = [
    ADMIN_PERMISSIONS.SITE_OWNER,
    ADMIN_PERMISSIONS.SUPPER_ADMIN,
    ADMIN_PERMISSIONS.ADMIN,
    PERMISSION_DEAL.CREATE,
  ];
  const KEY_OF_TAB_PANE_TO_ADD = 'tab-pane-to-add';
  const [showPartners, setShowPartners] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('');
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const document = useDocumentDetail();
  const allowed = usePermissions(permissions);
  const isBankStaff = currentUser.type === USER_TYPES.teller;

  const addTabPanel = () => {
    setShowPartners(true);
  };

  const onCancelModal = () => {
    setShowPartners(false);
  };

  const onActiveKey = (doc) => {
    setActiveKey(doc?.id);
  };

  const handleActiveKeyChange = (activeKey: string) => {
    if (activeKey === KEY_OF_TAB_PANE_TO_ADD) {
      if (allowed) {
        addTabPanel();
      }
      return;
    }
    setActiveKey(activeKey);
  };

  useEffect(() => {
    if (document?.id !== activeKey) {
      return;
    }
    if (isBankStaff) {
      setActiveKey(document?.dealDetails?.[0]?.id);
      return;
    }

    setActiveKey(document?.id);
  }, [document]);

  useEffect(() => {
    setActiveKey(document?.id);
  }, [document?.id]);

  return (
    <div className="ui-edit-loan-detail">
      <div className={'ui-loan-detail-content'}>
        <Tabs
          {...{
            onChange: handleActiveKeyChange,
            activeKey,
          }}
        >
          <TabPane
            key={document?.id}
            tab={
              <span>
                <img height={19} src="/assets/images/fina_logo.png" />
              </span>
            }
          >
            <ManagerLoanWithFina />
            <CreateBankWithLoan
              {...{
                visible: showPartners,
                onCancelModal: onCancelModal,
                dealLoan: document,
                activeKey: onActiveKey,
              }}
            />
          </TabPane>
          {generateTabPanelByBank({ t, currentUser, document })}
          <TabPane
            key={KEY_OF_TAB_PANE_TO_ADD}
            tab={
              <span>
                <PlusOutlined />
              </span>
            }
          />
        </Tabs>
      </div>
    </div>
  );
};
