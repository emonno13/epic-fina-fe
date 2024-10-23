import { USER_TYPES } from '../../../../../shared/user/constants';

export enum GENDER {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other'
}

export const GENDER_OPTIONS = [{
  label: 'Nữ',
  value: GENDER.FEMALE,
}, {
  label: 'Nam',
  value: GENDER.MALE,
},{
  label: 'Khác',
  value: GENDER.OTHER,
}];

export enum TYPES {
  UNDEFINED = 'undefined',
  CUSTOMER = 'customer',

}

export const TYPES_OPTIONS = [{
  label: 'Chưa xác định',
  value: TYPES.UNDEFINED,
}, {
  label: 'Khách hàng',
  value: TYPES.CUSTOMER,
}, {
  label: 'Cộng tác viên',
  value: USER_TYPES.COLLABORATOR,
}, {
  label: 'Nhân viên FINA',
  value: USER_TYPES.STAFF,
}, {
  label: 'Nhân viên ngân hàng',
  value: USER_TYPES.TELLER,
}, {
  label: 'Nhân viên BĐS',
  value: USER_TYPES.SELLER,
}];
