import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { createSchemaItem } from '../../../../../../schema-form/h-types';
import { GeneralInfo } from './general-info/general-info';
import { Message } from './message/message';
import { TargetGroup } from './target-group/target-group';
import { TriggerPrototype } from './trigger-prototype/trigger-prototype';

export const MessagesWorkflowDetailView = () => {
  const { t } = useHTranslation('admin-common');
  const messageWorkflow = useDocumentDetail();
  const [targetGroups, setTargetGroups] = useState([{ id: 1, rules: [] }]);

  useEffect(() => {
    const expectedTargetGroups = messageWorkflow?.targetGroups;

    expectedTargetGroups?.forEach((targetGroup: any) => {
      targetGroup?.rules?.forEach((rule: any, index: number) => {
        rule.id = index + 1;
      });
    });

    setTargetGroups(expectedTargetGroups || [{ id: 1, rules: [] }]);
  }, [messageWorkflow]);

  const handleChange = (targetGroups: any[]) => {
    const formatTargetGroups = targetGroups.map((item: any, index: number) => ({
      id: index + 1,
      rules: item.rules,
    }));
    setTargetGroups([...formatTargetGroups]);
  };

  return (
    <HDocumentDrawerPanel
      title={messageWorkflow?.id ? t('Edit') : t('Create new')}
      className="drawer-no-padding-top"
    >
      <HFeatureForm
        {...{
          onDataReadyToSubmit: (formData) => {
            return {
              ...formData,
              targetGroups,
            };
          },
          schema: () => [
            createSchemaItem({
              Component: () => (
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <GeneralInfo />
                  </Col>

                  <Col span={24}>
                    <TriggerPrototype />
                  </Col>

                  <Col span={24}>
                    <Message />
                  </Col>
                  <Col span={24}>
                    <TargetGroup
                      {...{
                        targetGroups,
                        onChange: handleChange,
                      }}
                    />
                  </Col>
                </Row>
              ),
            }),
          ],
        }}
      />
    </HDocumentDrawerPanel>
  );
};
