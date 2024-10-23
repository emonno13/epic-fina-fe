import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Rule } from './rule/rule';
import { EditModal } from './edit-modal/edit-modal';
import { ModalHelper } from '../../../../../../../shared/utils/modal.helper';
import { HButton } from '../../../../../../../shared/common-form-elements/h-confirmation-button';
import { TARGET_GROUP_RULE_COMPARE_CONDITIONS, USER_PROPERTY_RULE } from '../../../constant';

import './target-group-rule.module.scss';

export interface ITargetGroupRuleProps {
  targetGroupRule: {
    id: number;
    rules: any[];
  }
  onChange(targetGroupRule: any): void;
}

export const TargetGroupRule = (props: ITargetGroupRuleProps) => {
  const defaultValues = {
    property: USER_PROPERTY_RULE.TYPE,
    compareCondition: TARGET_GROUP_RULE_COMPARE_CONDITIONS[0].value,
  };
  const [initialRule, setInitialRule] = useState(defaultValues);
  const [initialShowModal, setInitialShowModal] = useState(false);
  const { targetGroupRule } = props;

  const handleGotRule = (rule: any) => {
    setInitialShowModal(false);
    if (!rule) {
      return;
    }

    const currentRules = targetGroupRule?.rules;

    if (rule.id) {
      const updatedRules: any = currentRules.filter((item: any) => item.id !== rule.id);
      updatedRules.push(rule);
      props?.onChange && props.onChange({
        id: props?.targetGroupRule?.id,
        rules: updatedRules,
      });
      return;
    }

    const newRules: any = [...currentRules, rule].map((item: any, index: number) => ({ ...item, id: index + 1 }));

    props?.onChange && props.onChange({
      id: props?.targetGroupRule?.id,
      rules: newRules,
    });
  };

  const handleRemoveRule = (rule: any) => {
    ModalHelper.confirm('Confirm', 'Do you want to remove this item?').then((res: boolean) => {
      if (!res) {
        return;
      }

      const rulesFilter = targetGroupRule?.rules.filter((item: any) => item.id !== rule.id);
      props?.onChange && props.onChange({
        id: props?.targetGroupRule?.id,
        rules: rulesFilter,
      });
    });
  };

  const handleEditRule = (rule: any) => {
    setInitialRule({ ...rule });
    setInitialShowModal(true);
  };

  return (
    <div className={'target-group-rule'}>
      {targetGroupRule?.rules?.length > 0 && targetGroupRule?.rules?.map((rule: any, index: number) => <Rule key={`rule-${index}`} rule={rule} onRemove={handleRemoveRule} onEdit={handleEditRule} />)}

      <HButton {...{
        type: 'primary',
        icon: <PlusOutlined />,
        children: 'AND',
        onClick: () => {
          setInitialRule(defaultValues);
          setInitialShowModal(true);
        },
      }}/>

      <EditModal onGotRule={handleGotRule} initialValues={(initialRule as any)} initialShowModal={initialShowModal}/>
    </div>
  );
};
