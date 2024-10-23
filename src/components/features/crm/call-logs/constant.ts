import { CALL_DIRECTION } from '../../../shared/stringee/constant';

export const DIRECTION_OPTIONS = [{
  label: 'Cuộc gọi đến',
  value: CALL_DIRECTION.CALL_IN,
}, {
  label: 'Cuộc gọi đi',
  value: CALL_DIRECTION.CALL_OUT,
}];

export const STATUS_CALL_LOG_SELECT = {
  MISS: 'miss',
  DONE: 'done',
  USER_BUSY: 'user_busy',
  OTHER: 'other',
};

export const STATUS_CALL_LOG_SELECT_OPTIONS = [
  {
    label: 'Cuộc gọi nhỡ',
    value: STATUS_CALL_LOG_SELECT.MISS,
  },
  {
    label: 'Kết nối thành công',
  	value: STATUS_CALL_LOG_SELECT.DONE,
  },
  {
    label: 'Người dùng bận',
  	value: STATUS_CALL_LOG_SELECT.USER_BUSY,
  },
  {
    label: 'Khác',
  	value: STATUS_CALL_LOG_SELECT.OTHER,
  },
];



