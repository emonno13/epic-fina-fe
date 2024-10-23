export const EVENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const EVENT_STATUS_OPTIONS = [
  { value: EVENT_STATUS.ACTIVE, label: 'Active' },
  { value: EVENT_STATUS.INACTIVE, label: 'Inactive' },
];

export const EVENT_TYPES_LABEL_MAPPING = {
  [EVENT_STATUS.ACTIVE]: 'Active',
  [EVENT_STATUS.INACTIVE]: 'Inactive',
};

export const EVENT_TYPES_COLOR_MAPPING = {
  [EVENT_STATUS.ACTIVE]: 'green',
  [EVENT_STATUS.INACTIVE]: 'red',
};