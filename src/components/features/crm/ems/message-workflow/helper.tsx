import {
  TARGET_GROUP_RULE_COMPARE_CONDITIONS_LABEL_MAPPING,
  TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_LABEL_MAPPING,
  USER_PROPERTY_RULES_LABEL_MAPPING,
  USER_PROPERTY_RULE,
} from './constant';
import { USER_TYPES_LABEL_MAPPING } from '../../../../shared/user/constants';
import { useRoleById } from '../../../../../dynamic-configuration/hooks';

export class TargetGroupRuleHelper {
  public static buildRuleDisplay(rule: any): string {
    if (rule?.property) {
      const conditionName = `User ${USER_PROPERTY_RULES_LABEL_MAPPING[rule?.property]} ${TARGET_GROUP_RULE_COMPARE_CONDITIONS_LABEL_MAPPING[rule.compareCondition]}`;

      switch (rule?.property) {
        case USER_PROPERTY_RULE.TYPE:
          return conditionName + ` ${USER_TYPES_LABEL_MAPPING[rule.compareValue]}`;
        case USER_PROPERTY_RULE.ROLE_IDS:
          const role = useRoleById(rule.compareValue);
          return conditionName + ` ${role?.name}`;
        case USER_PROPERTY_RULE.HAS_ACCOUNT:
          return conditionName + ` ${TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_LABEL_MAPPING[rule.compareValue]}`;
        case USER_PROPERTY_RULE.HAS_COLLABORATOR_CONTRACT:
          return conditionName + ` ${TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_LABEL_MAPPING[rule.compareValue]}`;
        default:
          return 'Rule is invalid!';
      }
    }

    return 'In coming...';
  }
}

