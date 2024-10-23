import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'rc-tabs';

import { QueueDetailSchemaForm } from './detail-schema-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import QueueGroupManagement from '../queue-group';
import { useHTranslation } from '../../../../../lib/i18n';
import { FooterControls } from '../../../../../schema-form/features/panels/popover-footer-controls';

const QUEUE_TABS = [{
  label: 'Queue',
  value: 'queue_info',
}, {
  label: 'Group',
  value: 'group_info',
}];

const QueueDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const queueDetail = useDocumentDetail();
  const defaultTabKey = QUEUE_TABS[0];
  const [currentTab, setCurrentTab] = useState(defaultTabKey.value);

  return (
    <HDocumentDrawerPanel {...{
      title: t(!queueDetail?.id ? 'Thêm mới' : 'Chỉnh sửa'),
      footer: currentTab === defaultTabKey.value ? <FooterControls {...props}/> : null,
    }}>
      <Tabs onChange={setCurrentTab}>
        <TabPane tab={t(QUEUE_TABS[0].label)} key={QUEUE_TABS[0].value}>
          <HFeatureForm {...{
            onDataReadyToSubmit: (data) => {
              if (data.greetingFile) {
                data.greetingFileId = data.greetingFile?.id;
                delete data.greetingFile;
              }

              return {
                ...data,
              };
            },
            schema: QueueDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}/>
        </TabPane>

        <TabPane tab={t(QUEUE_TABS[1].label)} key={QUEUE_TABS[1].value} disabled={!queueDetail?.id}>
          <QueueGroupManagement {...{ queueId: queueDetail?.id }}/>
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

export default QueueDetail;
