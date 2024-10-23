import { PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useState } from 'react';

import { useHTranslation } from '@lib/i18n';
import { HButton } from '../../../../../../shared/common-form-elements/h-confirmation-button';
import {
  TARGET_GROUP_RULE_COMPARE_CONDITIONS,
  USER_PROPERTY_RULE,
} from '../../constant';
import { EditModal } from './target-group-rule/edit-modal/edit-modal';
import { TargetGroupRule } from './target-group-rule/target-group-rule';
import { TestTargetGroupModal } from './test-target-group-modal/test-target-group-modal';

import './target-group.module.scss';

export interface ITargetGroup {
  targetGroups: any[];
  onChange(targetGroups: any[]): void;
}

export const TargetGroup = (props: ITargetGroup) => {
  const { t } = useHTranslation('admin-common');
  const defaultValues = {
    property: USER_PROPERTY_RULE.TYPE,
    compareCondition: TARGET_GROUP_RULE_COMPARE_CONDITIONS[0].value,
  };
  const [initialRule, setInitialRule] = useState(defaultValues);
  const [initialShowModal, setInitialShowModal] = useState(false);
  const targetGroups: any = props?.targetGroups || [];

  const handleGotRule = (rule: any) => {
    setInitialShowModal(false);

    if (!rule) {
      return;
    }

    props?.onChange &&
      props.onChange([
        ...targetGroups,
        { id: targetGroups.length + 1, rules: [rule] },
      ]);
  };

  const handleChangeTargetGroupRule = (targetGroupRule: any) => {
    const currentTargetGroup = targetGroups.find(
      (item: any) => item.id === targetGroupRule.id,
    );

    currentTargetGroup.rules = targetGroupRule.rules;

    props?.onChange &&
      props.onChange([
        ...targetGroups.filter(
          (item: any) =>
            item.rules.length > 0 ||
            (item.id === 1 && targetGroups.length === 1),
        ),
      ]);
  };

  return (
    <Card type="inner" title={t('Target Group')} className={'target-group'}>
      <div className={'target-group__header'}>
        <h4>Add rules</h4>
        <div>
          <TestTargetGroupModal targetGroups={targetGroups} />
        </div>
      </div>

      {targetGroups?.map((targetGroup: any, index: number) => {
        return (
          <div key={`target-group-${index}`}>
            {index > 0 ? (
              <div className={'target-group__or'}>
                {'----------OR----------'}
              </div>
            ) : (
              ''
            )}

            <TargetGroupRule
              targetGroupRule={targetGroup}
              onChange={handleChangeTargetGroupRule}
            />
          </div>
        );
      })}

      <HButton
        {...{
          className: 'm-t-10',
          type: 'primary',
          icon: <PlusOutlined />,
          children: 'OR',
          onClick: () => {
            setInitialRule(defaultValues);
            setInitialShowModal(true);
          },
        }}
      />

      <EditModal
        onGotRule={handleGotRule}
        initialValues={initialRule as any}
        initialShowModal={initialShowModal}
      />
    </Card>
  );
};
