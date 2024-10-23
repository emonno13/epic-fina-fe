import { TFunction } from 'next-i18next';

export const GROUP_TYPE = {
  ORGANIZATION: 'organization',
  USER: 'user',
};

export const getGroupTypeOptions = (t: TFunction) => [
  { label: t('Organization'), value: GROUP_TYPE.ORGANIZATION },
  { label: t('User'), value: GROUP_TYPE.USER },
];
