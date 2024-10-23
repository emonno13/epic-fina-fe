import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'rc-tabs';
import { useTranslation } from 'next-i18next';

import { ScenarioIvrTreeDetailSchemaForm } from './detail-schema-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import ScenarioIvrTreeNodeManagement from '../../scenario-ivr-node';
import { FooterControls } from '../../../../../schema-form/features/panels/popover-footer-controls';

const IVR_TREE_TABS = [{
  label: 'IVR info',
  value: 'ivr_info',
}, {
  label: 'IVR node',
  value: 'ivr_node',
}];

const ScenarioIvrTreeDetail = (props) => {
  const { t } = useTranslation('admin-common');
  const scenarioIvrTree = useDocumentDetail();
  const defaultTabKey = IVR_TREE_TABS[0];
  const [currentTab, setCurrentTab] = useState(defaultTabKey.value);

  return (
    <HDocumentDrawerPanel {...{
      title: t(!scenarioIvrTree?.id ? 'Thêm mới' : 'Chỉnh sửa'),
      footer: currentTab === defaultTabKey.value ? <FooterControls {...props}/> : null,
    }}>
      <Tabs onChange={setCurrentTab}>
        <TabPane tab={t(IVR_TREE_TABS[0].label)} key={IVR_TREE_TABS[0].value}>
          <HFeatureForm {...{
            schema: ScenarioIvrTreeDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}/>
        </TabPane>

        <TabPane tab={t(IVR_TREE_TABS[1].label)} key={IVR_TREE_TABS[1].value} disabled={!scenarioIvrTree?.id}>
          <ScenarioIvrTreeNodeManagement {...{ scenarioIvrTreeId: scenarioIvrTree?.id }}/>
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

export default ScenarioIvrTreeDetail;
