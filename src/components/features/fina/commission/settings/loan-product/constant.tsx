export const METHODS = {
  PERCENT: 'percent',
  FIXED: 'fixed',
};

export const METHOD_OPTIONS = [{
  value: METHODS.PERCENT,
  label: 'Phần trăm',
}, {
  value: METHODS.FIXED,
  label: 'Cố định',
}];

export const COMMISSION_METHOD_INFO_MAPPING = {
  [METHODS.PERCENT]: {
    label: 'Phần trăm',
  },
  [METHODS.FIXED]: {
    label: 'Cố định',
  },
};

export const COMMISSION_SETTING_STATUSES = {
  APPLY: 'apply',
  WAITING_FOR_APPROVAL: 'waiting_for_approval',
  NOT_APPLY: 'not_apply',
};

export const COMMISSION_SETTING_STATUS_OPTIONS = [{
  label: 'Chờ phê duyệt',
  value: COMMISSION_SETTING_STATUSES.WAITING_FOR_APPROVAL,
}, {
  label: 'Đang áp dụng',
  value: COMMISSION_SETTING_STATUSES.APPLY,
}, {
  label: 'Không áp dụng',
  value: COMMISSION_SETTING_STATUSES.NOT_APPLY,
}];

export const COMMISSION_SETTING_STATUS_INFO_MAPPING = {
  [COMMISSION_SETTING_STATUSES.WAITING_FOR_APPROVAL]: {
    label: 'Chờ phê duyệt',
    color: 'blue',
  },
  [COMMISSION_SETTING_STATUSES.APPLY]: {
    label: 'Đang áp dụng',
    color: 'green',
  },
  [COMMISSION_SETTING_STATUSES.NOT_APPLY]: {
    label: 'Không áp dụng',
    color: 'magenta',
  },
};

export const COMMISSION_SETTING_TYPES = {
  RECEIVE: 'receive',
  SPEND: 'spend',
  INSURANCES: 'insurances',
};

export const COMMISSION_TYPES = {
  LOAN: 'loan',
  INSURANCES: 'insurances',
};

export const COMMISSION_ROLE_SPECIFY = {
  PERSONAL: 'personal',
  AGENT: 'agent',
};

export const COMMISSION_STATUSES = {
  NOT_FOR_CONTROL: 'not_for_control',
  FOR_CONTROL: 'for_control',
  CANCELLED: 'cancelled',
  PAID: 'paid',
};

export const COMMISSION_STATUS_OPTIONS = [{
  label: 'Chưa đối soát',
  value: COMMISSION_STATUSES.NOT_FOR_CONTROL,
}, {
  label: 'Đã đối soát',
  value: COMMISSION_STATUSES.FOR_CONTROL,
}, {
  label: 'Đã huỷ',
  value: COMMISSION_STATUSES.CANCELLED,
}, {
  label: 'Đã thanh toán',
  value: COMMISSION_STATUSES.PAID,
}];

export const COMMISSION_STATUS_LABEL_MAPPING = {
  [COMMISSION_STATUSES.NOT_FOR_CONTROL]: 'Chưa đối soát',
  [COMMISSION_STATUSES.FOR_CONTROL]: 'Đã đối soát',
  [COMMISSION_STATUSES.CANCELLED]: 'Đã huỷ',
  [COMMISSION_STATUSES.PAID]: 'Đã thanh toán',
};

export const COMMISSION_STATUS_COLOR_MAPPING = {
  [COMMISSION_STATUSES.NOT_FOR_CONTROL]: 'magenta',
  [COMMISSION_STATUSES.FOR_CONTROL]: 'green',
  [COMMISSION_STATUSES.CANCELLED]: 'red',
  [COMMISSION_STATUSES.PAID]: 'purple',
};

export const COMMISSION_REASON_SPEND_MAPPING = {
  [COMMISSION_TYPES.LOAN]: 'Hồ sơ vay',
  [COMMISSION_TYPES.INSURANCES]: 'Bảo hiểm',
};

export const COMMISSION_REASON_SPEND_OPTIONS = [{
  label: COMMISSION_REASON_SPEND_MAPPING[COMMISSION_TYPES.LOAN],
  value: COMMISSION_TYPES.LOAN,
}, {
  label: COMMISSION_REASON_SPEND_MAPPING[COMMISSION_TYPES.INSURANCES],
  value: COMMISSION_TYPES.INSURANCES,
}];

export const COMMISSION_ROLE_SPECIFY_LABEL_MAPPING = {
  [COMMISSION_ROLE_SPECIFY.PERSONAL]: 'Cá nhân',
  [COMMISSION_ROLE_SPECIFY.AGENT]: 'Đại lý',
};

