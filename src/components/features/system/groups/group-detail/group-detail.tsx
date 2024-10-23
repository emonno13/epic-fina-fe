import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'rc-tabs';
import { useTranslation } from 'next-i18next';

import { GroupDetailSchemaForm } from './detail-schema-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import GroupUserManagement from '../group-user';
import { FooterControls } from '../../../../../schema-form/features/panels/popover-footer-controls';

const GROUP_TABS = [{
  label: 'Group',
  value: 'group_info',
}, {
  label: 'Agent',
  value: 'agent_info',
}];

const GroupDetail = (props) => {
  const { t } = useTranslation('admin-common');
  const groupDetail = useDocumentDetail();
  const defaultTabKey = GROUP_TABS[0];
  const [currentTab, setCurrentTab] = useState(defaultTabKey.value);

  return (
    <HDocumentDrawerPanel {...{
      title: t(!groupDetail?.id ? 'Thêm mới' : 'Chỉnh sửa'),
      footer: currentTab === defaultTabKey.value ? <FooterControls {...props}/> : null,
    }}>
      <Tabs onChange={setCurrentTab}>
        <TabPane tab={t(GROUP_TABS[0].label)} key={GROUP_TABS[0].value}>
          <HFeatureForm {...{
            schema: GroupDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}/>
        </TabPane>

        <TabPane tab={t(GROUP_TABS[1].label)} key={GROUP_TABS[1].value} disabled={!groupDetail?.id}>
          <GroupUserManagement {...{ groupId: groupDetail?.id }}/>
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

export default GroupDetail;
