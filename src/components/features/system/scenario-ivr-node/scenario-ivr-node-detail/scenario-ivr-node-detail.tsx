import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'rc-tabs';

import { ScenarioIvrNodeDetailSchemaForm } from './detail-schema-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import ScenarioIvrKeypressManagement from '../../scenario-ivr-keypress';
import { useHTranslation } from '../../../../../lib/i18n';
import { FooterControls } from '../../../../../schema-form/features/panels/popover-footer-controls';

const IVR_NODE_TABS = [{
  label: 'IVR node info',
  value: 'ivr_node_info',
}, {
  label: 'IVR keypress',
  value: 'ivr_keypress',
}];

const ScenarioIvrNodeDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const scenarioIvrNode = useDocumentDetail();
  const { scenarioIvrTreeId } = props;
  const defaultTabKey = IVR_NODE_TABS[0];
  const [currentTab, setCurrentTab] = useState(defaultTabKey.value);

  return (
    <HDocumentModalPanel {...{
      width: '70%',
      footer: currentTab === defaultTabKey.value ? <FooterControls {...props}/> : null,
    }}>
      <Tabs onChange={setCurrentTab}>
        <TabPane tab={t(IVR_NODE_TABS[0].label)} key={IVR_NODE_TABS[0].value}>
          <HFeatureForm {...{
            onDataReadyToSubmit: (data) => {
              console.log('onDataReadyToSubmit: ', data);
              if (data?.action?.playMode === 'play') {
                data.action.greetingFile = data.playContent;
                // delete data.playContent;
              }

              return {
                ...data,
                scenarioIvrTreeId,
              };
            },
            schema: ScenarioIvrNodeDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}/>
        </TabPane>

        <TabPane tab={t(IVR_NODE_TABS[1].label)} key={IVR_NODE_TABS[1].value} disabled={!scenarioIvrNode?.id}>
          <ScenarioIvrKeypressManagement {...{ scenarioIvrNodeId: scenarioIvrNode?.id }}/>
        </TabPane>
      </Tabs>
    </HDocumentModalPanel>
  );
};

export default ScenarioIvrNodeDetail;
