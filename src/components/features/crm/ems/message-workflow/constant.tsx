import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { HSelect } from '../../../../shared/common-form-elements/select';
import { HRadioGroup } from '../../../../shared/common/h-radio-group';
import { USER_TYPE_OPTIONS } from '../../../../shared/user/constants';

export enum TRIGGER_SENDING_DAY {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export const TRIGGER_SENDING_DAY_OPTIONS = [
  { value: TRIGGER_SENDING_DAY.MONDAY, label: 'Mon' },
  { value: TRIGGER_SENDING_DAY.TUESDAY, label: 'Tue' },
  { value: TRIGGER_SENDING_DAY.WEDNESDAY, label: 'Wed' },
  { value: TRIGGER_SENDING_DAY.THURSDAY, label: 'Thu' },
  { value: TRIGGER_SENDING_DAY.FRIDAY, label: 'Fri' },
  { value: TRIGGER_SENDING_DAY.SATURDAY, label: 'Sat' },
  { value: TRIGGER_SENDING_DAY.SUNDAY, label: 'Sun' },
];

export enum MESSAGE_WORKFLOW_STATUS {
  ACTIVE ='active',
  INACTIVE = 'inactive',
}

export const MESSAGE_WORKFLOW_STATUS_OPTIONS = [
  { value: MESSAGE_WORKFLOW_STATUS.ACTIVE, label: 'Active' },
  { value: MESSAGE_WORKFLOW_STATUS.INACTIVE, label: 'Inactive' },
];

export enum MESSAGE_WORKFLOW_TYPE {
  MESSAGE = 'message',
  CAMPAIGN = 'campaign',
  NOTIFICATION = 'notification'
}

export const MESSAGE_WORKFLOW_TYPE_OPTIONS = [
  { value: MESSAGE_WORKFLOW_TYPE.MESSAGE, label: 'Tin nhắn' },
  { value: MESSAGE_WORKFLOW_TYPE.CAMPAIGN, label: 'Chiến dịch' },
  { value: MESSAGE_WORKFLOW_TYPE.NOTIFICATION, label: 'Thông báo' },
];

export const MESSAGE_WORKFLOW_STATUS_DATA_MAPPING = {
  [MESSAGE_WORKFLOW_STATUS.ACTIVE]: {
    label: 'Active',
    color: 'green',
  },
  [MESSAGE_WORKFLOW_STATUS.INACTIVE]: {
    label: 'Inactive',
    color: 'magenta',
  },
};

export enum TRIGGER_BASED_ON {
  BEFORE = 'before',
  AFTER = 'after',
}

export const TRIGGER_BASED_ON_OPTIONS = [
  { value: TRIGGER_BASED_ON.BEFORE, label: 'Before' },
  { value: TRIGGER_BASED_ON.AFTER, label: 'After' },
];

export enum TRIGGER_INTERVAL_UNIT {
  DAY = 'day',
  WEEKS = 'weeks',
}

export const TRIGGER_INTERVAL_UNIT_OPTIONS = [{
  label: 'Day',
  value: TRIGGER_INTERVAL_UNIT.DAY,
},{
  label: 'Weeks',
  value: TRIGGER_INTERVAL_UNIT.WEEKS,
}];

export enum TRIGGER_DEADLINE_TYPE {
  EVENT_START_TIME = 'event_start_time',
  EVENT_END_TIME = 'event_end_time',
}

export const TRIGGER_DEADLINE_TYPE_OPTIONS = [{
  label: 'Event Start Time',
  value: TRIGGER_DEADLINE_TYPE.EVENT_START_TIME,
}, {
  label: 'Event End Time',
  value: TRIGGER_DEADLINE_TYPE.EVENT_END_TIME,
}];

export enum USER_PROPERTY_RULE {
  TYPE = 'type',
  ROLE_IDS = 'roleIds',
  HAS_ACCOUNT = 'hasAccount',
  HAS_COLLABORATOR_CONTRACT = 'hasCollaboratorContract'
}

export const USER_PROPERTY_RULE_OPTIONS = [{
  label: 'has type',
  value: USER_PROPERTY_RULE.TYPE,
}, {
  label: 'has roles',
  value: USER_PROPERTY_RULE.ROLE_IDS,
}, {
  label: 'has account',
  value: USER_PROPERTY_RULE.HAS_ACCOUNT,
}, {
  label: 'has collaborator contract',
  value: USER_PROPERTY_RULE.HAS_COLLABORATOR_CONTRACT,
}];

export const USER_PROPERTY_RULES_LABEL_MAPPING = {
  [USER_PROPERTY_RULE.TYPE]: 'has type',
  [USER_PROPERTY_RULE.ROLE_IDS]: 'has roles',
  [USER_PROPERTY_RULE.HAS_ACCOUNT]: 'has account',
  [USER_PROPERTY_RULE.HAS_COLLABORATOR_CONTRACT]: 'has collaborator contract',
};

export enum TARGET_GROUP {
  USER_PROPERTY = 'userProperty',
  COMPANY_PROPERTY = 'companyProperty',
}

export const TARGET_GROUP_RULE_COMPARE_CONDITIONS = [{
  label: 'equal',
  value: 'eq',
}, {
  label: 'not equal',
  value: 'neq',
}];

export const TARGET_GROUP_RULE_COMPARE_CONDITIONS_LABEL_MAPPING = {
  ['eq']: 'equal',
  ['neq']: 'not equal',
};

export const TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_OPTIONS = [{
  label: 'TRUE',
  value: 'true',
}, {
  label: 'FALSE',
  value: 'false',
}];

export const TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_LABEL_MAPPING = {
  ['true']: 'TRUE',
  ['false']: 'FALSE',
};

export const TARGET_GROUP_OPTIONS = [{
  id: TARGET_GROUP.USER_PROPERTY,
  name: 'User property',
  icon: <UserOutlined	/>,
}, {
  id: TARGET_GROUP.COMPANY_PROPERTY,
  name: 'Company property',
  icon: <HomeOutlined	/>,
}];

export const TARGET_GROUP_RULES = {
  [TARGET_GROUP.USER_PROPERTY]: {
    [USER_PROPERTY_RULE.TYPE]: [{
      Component: HRadioGroup,
      label: 'Compare condition',
      name: 'compareCondition',
      colProps: { span: 8 },
      componentProps: {
        buttonStyle: 'solid',
        options: TARGET_GROUP_RULE_COMPARE_CONDITIONS,
      },
    },{
      Component: HSelect,
      label: 'Compare value',
      name: 'compareValue',
      colProps: { span: 8 },
      componentProps: {
        optionValues: USER_TYPE_OPTIONS,
      },
    }],
    [USER_PROPERTY_RULE.ROLE_IDS]: [{
      Component: HRadioGroup,
      label: 'Compare condition',
      name: 'compareCondition',
      colProps: { span: 8 },
      componentProps: {
        buttonStyle: 'solid',
        options: TARGET_GROUP_RULE_COMPARE_CONDITIONS,
      },
    },{
      Component: HSelect,
      label: 'Compare value',
      name: 'compareValue',
      colProps: { span: 8 },
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: '/roles/suggestion',
        optionsConverter: (document) => {
          return {
            ...document,
            label: `${document?.name || ''}`,
          };
        },
      },
    }],
    [USER_PROPERTY_RULE.HAS_ACCOUNT]: [{
      Component: HRadioGroup,
      label: 'Compare condition',
      name: 'compareCondition',
      colProps: { span: 8 },
      componentProps: {
        buttonStyle: 'solid',
        options: TARGET_GROUP_RULE_COMPARE_CONDITIONS,
      },
    },{
      Component: HSelect,
      label: 'Compare value',
      name: 'compareValue',
      colProps: { span: 8 },
      componentProps: {
        optionValues: TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_OPTIONS,
      },
    }],
    [USER_PROPERTY_RULE.HAS_COLLABORATOR_CONTRACT]: [{
      Component: HRadioGroup,
      label: 'Compare condition',
      name: 'compareCondition',
      colProps: { span: 8 },
      componentProps: {
        buttonStyle: 'solid',
        options: TARGET_GROUP_RULE_COMPARE_CONDITIONS,
      },
    },{
      Component: HSelect,
      label: 'Compare value',
      name: 'compareValue',
      colProps: { span: 8 },
      componentProps: {
        optionValues: TARGET_GROUP_RULE_COMPARE_VALUE_BOOLEAN_OPTIONS,
      },
    }],
  },
};
