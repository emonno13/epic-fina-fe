export const TRANSACTIONS_PARTNER_LOGS_STATUS = {
  ERROR: 'ERROR',
  ORDER_RECONCILED: 'ORDER_RECONCILED', //Đã khớp lệnh
  ORDER_ACCEPT: 'ORDER_ACCEPT', //Chờ khớp lệnh
  ORDER_PENDING: 'ORDER_PENDING', //Chờ khớp lệnh dùng cho lệnh hoán đổi mua
  ORDER_CANCEL: 'ORDER_CANCEL', //Lệnh đã huỷ
  ORDER_REJECT: 'ORDER_REJECT', //Không khớp lệnh
};

export const TRANSACTIONS_PARTNER_LOGS_OPTIONS = [
  { label: 'Đã khớp lệnh', value: TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_RECONCILED, color: 'green' },
  { label: 'Chờ khớp lệnh', value: TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_ACCEPT, color: 'magenta' },
  { label: 'Lệnh đã huỷ' , value: TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_CANCEL, color: 'volcano' },
  { label: 'Không khớp lệnh' , value: TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_REJECT, color: 'red' },
];

export const MAPPING_TRANSACTIONS_PARTNER_LOGS_STATUS = {
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ERROR]: {
    label: 'Lỗi',
    color: 'yellow',
  },
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_RECONCILED]: {
    label: 'Đã khớp lệnh',
    color: 'green',
  },
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_ACCEPT]: {
    label: 'Chờ khớp lệnh',
    color: 'magenta',
  },
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_PENDING]: {
    label: 'Chờ khớp lệnh dùng cho lệnh hoán đổi mua',
    color: 'volcano',
  },
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_CANCEL]: {
    label: 'Lệnh đã huỷ',
    color: 'red',
  },
  [TRANSACTIONS_PARTNER_LOGS_STATUS.ORDER_REJECT]: {
    label: 'Không khớp lệnh',
    color: 'red',
  },
};

export const TRANSACTIONS_PARTNER_LOGS_ACTION = {
  AUTHORIZE_VERIFY: 'authorizeVerify',
  BUY: 'BUY',
  SELL: 'SELL',
  ACCOUNT_SYNC: 'account_sync',
};

export const TRANSACTIONS_PARTNER_LOGS_TYPE = {
  VINA_CAPITAL: 'vinaCapital',
};
