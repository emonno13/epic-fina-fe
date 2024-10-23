import { TFunction } from 'next-i18next';

export const TEMPLATE_CODE = {
  NOTIFICATION_TO_CUSTOMER: 'NOTIFICATION_TO_CUSTOMER',
  NOTIFICATION_TO_STAFF: 'NOTIFICATION_TO_STAFF',
  NOTIFICATION_TO_BANK: 'NOTIFICATION_TO_BANK',
};

export const TYPE_TEMPLATE = {
  browser: 'browser',
  email: 'email',
  sms: 'sms',
};

export const ACTION = {
  create: 'create',
  update: 'update',
  delete: 'delete',
  share: 'share',
  change_status: 'change_status',
};

export const getTypeTemplate = (t: TFunction) => [
  { label: t('Browser'), value: TYPE_TEMPLATE.browser },
  { label: t('Email'), value: TYPE_TEMPLATE.email },
  { label: t('Sms'), value: TYPE_TEMPLATE.sms },
];
