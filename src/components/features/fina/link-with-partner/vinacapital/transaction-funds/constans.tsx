export const TRANSACTION_FUNDS_STATUS = {
  FOR_CONTROL: 'for_control',
  NOT_FOR_CONTROL: 'not_for_control',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
  REJECT: 'reject',
};

export const TRANSACTION_FUNDS_STATUS_MAPPING = {
  [TRANSACTION_FUNDS_STATUS.PENDING]: { label: 'Chờ', value: TRANSACTION_FUNDS_STATUS.PENDING, color: 'yellow' },
  [TRANSACTION_FUNDS_STATUS.NOT_FOR_CONTROL]: { label: 'Chưa đối soát', value: TRANSACTION_FUNDS_STATUS.NOT_FOR_CONTROL, color: 'green' },
  [TRANSACTION_FUNDS_STATUS.FOR_CONTROL]: { label: 'Đã đối soát', value: TRANSACTION_FUNDS_STATUS.FOR_CONTROL, color: 'magenta' },
  [TRANSACTION_FUNDS_STATUS.CANCELLED]: { label:  'Hủy' , value: TRANSACTION_FUNDS_STATUS.CANCELLED, color: 'volcano' },
  [TRANSACTION_FUNDS_STATUS.REJECT]: { label: 'Đối tác từ chối khớp lệnh' , value: TRANSACTION_FUNDS_STATUS.REJECT, color: 'red' },
};

export const TRANSATION_FUNDS_STATUS_OPTIONS = [
  { label: 'Chưa đối soát', value: TRANSACTION_FUNDS_STATUS.NOT_FOR_CONTROL, color: 'green' },
  { label: 'Đã đối soát', value: TRANSACTION_FUNDS_STATUS.FOR_CONTROL, color: 'magenta' },
  { label:  'Hủy' , value: TRANSACTION_FUNDS_STATUS.CANCELLED, color: 'volcano' },
  { label: 'Đối tác từ chối khớp lệnh' , value: TRANSACTION_FUNDS_STATUS.REJECT, color: 'red' },
];

export const TRANSACTION_FUNDS_ACTION = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export const TRANSACTION_FUNDS_ACTION_MAPPING = {
  [TRANSACTION_FUNDS_ACTION.BUY]: { label: 'Mua', value: TRANSACTION_FUNDS_ACTION.BUY, color: 'green' },
  [TRANSACTION_FUNDS_ACTION.SELL]: { label: 'Bán', value: TRANSACTION_FUNDS_ACTION.SELL, color: 'yellow' },
};
