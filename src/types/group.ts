import { TFunction } from 'next-i18next';

export const GROUP_TYPES = {
  STAFF: 'staff',
  CUSTOMER: 'customer',
  CAR_COMPANY_STAFF: 'car_company_staff',
  SELLER: 'seller',
  INSURANCE_AGENT: 'insurance_agent',
  COLLABORATOR: 'collaborator',
  TELLER: 'teller',
  ALL: 'all',
};

export const getGroupTypeOptions = (t: TFunction) => [
  { label: t(GROUP_TYPES.ALL, { vn: 'Tất cả' }), value: GROUP_TYPES.ALL },
  { label: t(GROUP_TYPES.STAFF, { vn: 'Nhân viên' }), value: GROUP_TYPES.STAFF },
  { label: t(GROUP_TYPES.CUSTOMER, { vn: 'Khách hàng' }), value: GROUP_TYPES.CUSTOMER },
  { label: t(GROUP_TYPES.SELLER, { vn: 'Nhân viên bất động sản' }), value: GROUP_TYPES.SELLER },
  { label: t(GROUP_TYPES.INSURANCE_AGENT, { vn: 'Nhân viên bảo hiểm' }), value: GROUP_TYPES.INSURANCE_AGENT },
  { label: t(GROUP_TYPES.COLLABORATOR, { vn: 'Cộng tác viên' }), value: GROUP_TYPES.COLLABORATOR },
  { label: t(GROUP_TYPES.TELLER, { vn: 'Nhân viên ngân hàng' }), value: GROUP_TYPES.TELLER },
  { label: t(GROUP_TYPES.CAR_COMPANY_STAFF, { vn: 'Nhân viên công ty xe' }), value: GROUP_TYPES.CAR_COMPANY_STAFF },
];

export const mappingLabelGroupType = (type, t: TFunction) => {
  return getGroupTypeOptions(t).find(item => item.value === type)?.label || '_';
};