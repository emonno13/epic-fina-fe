import camelCase from 'camelcase';
import { TFunction } from 'next-i18next';

export const USER_MARITAL_STATUS = {
  SINGLE: 'single',
  MARRIED: 'married',
  OTHER: 'other',
};

export const TITLE_OF_STAFF = {
  FINANCIAL_EXPERT: 'financial_expert',
  ADMIN: 'admin',
  BUSINESS_MANAGER: 'business_manager',
  MARKETING_EXPERT: 'marketing_expert',
  PARTNER_DEVELOPMENT_EXPERT: 'partner_development_expert',
  INSURANCE_EXPERT: 'insurance_expert',
};

export function getListTitleOfStaff(t) {
  const options: {label: string, value: string}[] = [];
  const list = TITLE_OF_STAFF;
  for (const property in list) {
    options.push({
      label: t(camelCase(list[property])),
      value: list[property],
    });
  }
  return options;
}

export const getUserMaritalStatusOptions = (t: TFunction) => [
  {
    label: t(USER_MARITAL_STATUS.SINGLE, { vn: 'Độc thân' }),
    value: USER_MARITAL_STATUS.SINGLE,
  },
  {
    label: t(USER_MARITAL_STATUS.MARRIED, { vn: 'Đã kết hôn' }),
    value: USER_MARITAL_STATUS.MARRIED,
  },
  {
    label: t(USER_MARITAL_STATUS.OTHER, { vn: 'Khác' }),
    value: USER_MARITAL_STATUS.OTHER,
  },
];
