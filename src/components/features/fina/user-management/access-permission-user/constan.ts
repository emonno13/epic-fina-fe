import { TFunction } from 'next-i18next';

export const REQUEST_ACCESS_USER_STATUSES = {
  ACTIVE: 'active',
  APPROVE: 'approve',
  REJECT: 'reject',
  WAIT_PROCESSING: 'wait_processing',
  RESEND: 'resend',
  CANCELED: 'canceled',
};

export const REQUEST_ACCESS_USER_COLOR_MAPPING = {
  [REQUEST_ACCESS_USER_STATUSES.ACTIVE]: 'lime',
  [REQUEST_ACCESS_USER_STATUSES.RESEND]: 'blue',
  [REQUEST_ACCESS_USER_STATUSES.WAIT_PROCESSING]: 'gold',
  [REQUEST_ACCESS_USER_STATUSES.APPROVE]: 'green',
  [REQUEST_ACCESS_USER_STATUSES.REJECT]: 'red',
  [REQUEST_ACCESS_USER_STATUSES.CANCELED]: 'orange',
};

export const REQUEST_ACCESS_MAPPING_STATUS = {
  [REQUEST_ACCESS_USER_STATUSES.WAIT_PROCESSING]: 'Chờ xử lý',
  [REQUEST_ACCESS_USER_STATUSES.RESEND]: 'Đã gửi lại',
  [REQUEST_ACCESS_USER_STATUSES.APPROVE]: 'Đã cấp quyền',
  [REQUEST_ACCESS_USER_STATUSES.REJECT]: 'Từ chối',
  [REQUEST_ACCESS_USER_STATUSES.CANCELED]: 'Đã hủy bỏ',
};

export const getOptionsStatusRequestAccessUser = (t: TFunction) => {
  return [
    { label: t('Chờ xử lý'), value: REQUEST_ACCESS_USER_STATUSES.WAIT_PROCESSING },
    { label: t('Gửi lại'), value: REQUEST_ACCESS_USER_STATUSES.RESEND },
    { label: t('Đã cấp quyền'), value: REQUEST_ACCESS_USER_STATUSES.APPROVE },
    { label: t('Từ chối'), value: REQUEST_ACCESS_USER_STATUSES.REJECT },
    { label: t('Đã hủy bỏ'), value: REQUEST_ACCESS_USER_STATUSES.CANCELED },
  ];
};