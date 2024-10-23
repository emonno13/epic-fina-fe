import { TFunction } from 'next-i18next';

export const AGENT_TYPE_CALL = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export const getAgentTypeCallOptions = (t: TFunction) => [
  { label: t('Active', { vn: 'Hoạt động' }), value: 'active' },
  { label: t('Inactive', { vn: 'Không hoạt động' }), value: 'inactive' },
];

export const mappingLabelAgentTypeCall = (type, t: TFunction) => {
  return getAgentTypeCallOptions(t).find(item => item.value === type)?.label || '_';
};