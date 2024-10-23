import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { TargetGroupRuleHelper } from '../../../../helper';

import './rule.module.scss';

export const Rule = ({ rule = {}, onRemove = (f => f), onEdit = (f => f) }) => {
  return (
    <div className={'rule m-b-10'}>
      <div className={'rule__name'}>{TargetGroupRuleHelper.buildRuleDisplay(rule)}</div>
      <div className={'rule__action'}>
        <EditOutlined className={'m-r-10'} onClick={() => onEdit(rule)}/>
        <MinusCircleOutlined onClick={() => onRemove(rule)}/>
      </div>
    </div>
  );
};
