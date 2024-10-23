export enum SIGNALING_STATE {
  CALL_ANSWER_CODE = 3,
  CALL_BUSY_CODE = 5,
  CALL_ENDED_CODE = 6
}

export enum CALL_DIRECTION {
  CALL_IN = 'callIn',
  CALL_OUT = 'callOut'
}

export enum CALL_STATE_SKIP_REASON {
  BYE = -1,
  TEMPORARILY_UNAVAILABLE = 480,
}

export enum CALL_STATUS {
  BUSY = 'busy',
  AVAILABLE = 'available',
  AWAY = 'away',
  OFFLINE = 'offline'
}

export enum CALL_END_CAUSE {
  NO_ANSWER = 'NO_ANSWER', // for call out
  NO_USER_RESPONSE = 'NO_USER_RESPONSE', // no answer for call in
  USER_BUSY = 'USER_BUSY', // for both: call in vs call out
  USER_END_CALL = 'USER_END_CALL',
  TEMPORARILY_UNAVAILABLE = '480 Temporarily Unavailable',
  AGENT_BUSY_HERE = '486 Busy Here',
}

export const CALL_LOG_DIRECTION_DATA_MAPPING = {
  [CALL_DIRECTION.CALL_IN]: {
    label: 'Cuộc gọi đến',
    color: 'gold',
  },
  [CALL_DIRECTION.CALL_OUT]: {
    label: 'Cuộc gọi đi',
    color: 'green',
  },
};

export const CALL_END_CAUSE_LABEL_MAPPING = {
  [CALL_END_CAUSE.NO_ANSWER]: {
    label: 'Gọi nhỡ',
    className: 'call-state call-state--missing',
  },
  [CALL_END_CAUSE.NO_USER_RESPONSE]: {
    label: 'Gọi nhỡ',
    className: 'call-state call-state--missing',
  },
  [CALL_END_CAUSE.USER_END_CALL]: {
    label: 'Gọi nhỡ',
    className: 'call-state call-state--missing',
  },
  [CALL_END_CAUSE.TEMPORARILY_UNAVAILABLE]: {
    label: 'Gọi nhỡ',
    className: 'call-state call-state--missing',
  },
  [CALL_END_CAUSE.USER_BUSY]: {
    label: 'Người dùng bận',
    className: 'call-state call-state--busy',
  },
  [CALL_END_CAUSE.AGENT_BUSY_HERE]: {
    label: 'Agent bận',
    className: 'call-state call-state--busy',
  },
};

// define answer call state from Stringee
export enum ANSWER_CALL_STATE {
  SUCCESS = 0, // answer call successfully
  CALL_IS_NOT_EXIST = 1, // answer call failed. The call is not exist
  CALL_WAS_CONTROLLED_FROM_OTHER_DEVICE = 2, // answer call failed. The call is not exist
  CALL_DATA_IS_NOT_EXIST = 3, // answer call failed. Call data is not exist
}

export const CALL_STATUS_LIST = [
  {
    code: 'FROM_NUMBER_NOT_FOUND',
    numberCode: 4,
    label: 'Số điện thoại không tìm thấy',
  },
  {
    code: 'FROM_NUMBER_OR_TO_NUMBER_INVALID_FORMAT',
    numberCode: 10,
    label: 'Số điện thoại không đúng',
  },
  {
    code: 'CALL_NOT_ALLOWED_BY_YOUR_SERVER',
    numberCode: 11,
    label: 'Tổng đài không cho phép cuộc gọi',
  },
  {
    code: 'TO_NUMBER_INVALID',
    numberCode: 14,
    label: 'Số điện thoại gọi đi không đúng',
  },
  {
    code: 'FROM_NUMBER_NOT_BELONG_YOUR_PROJECT',
    numberCode: 15,
    label: 'Số tổng đài cấu hình không đúng',
  },
  {
    code: 'NOT_ALLOW_CHAT_USER',
    numberCode: 16,
    label: 'Không cho phép trò chuyện',
  },
  {
    code: 'NOT_ALLOW_CALLOUT',
    numberCode: 17,
    label: 'Không cho phép thực hiện cuộc gọi ra ngoài',
  },
  {
    code: 'ACCOUNT_LOCKED',
    numberCode: 19,
    label: 'Tài khoản bị khóa',
  },
  {
    code: 'GET_USER_MEDIA_ERROR',
    numberCode: 1000,
    label: 'Không có quyền truy cập Máy ảnh / Micrô',
  },
];

export const getCallStatusLabel = (value, to: 'toLowerCase'| 'toUpperCase' | 'normal' = 'toLowerCase') => {
  const label = CALL_STATUS_LIST.find(status => value === status.code || value === status.numberCode)?.label;
  if (to === 'toLowerCase') {
    return `${label || value}`.toLowerCase();
  }
  if (to === 'toUpperCase') {
    return `${label || value}`.toUpperCase();
  }
  return label || value;
};