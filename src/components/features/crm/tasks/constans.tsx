import {
  AppraisalProgressIcon,
  BankIcon,
  DisbursedIcon,
  LendApprovalIcon,
  ProcessIcon,
  ReceivedIcon,
  TripartiteBlockadeIcon,
  WaitProcessIcon,
} from '@icons';
import {
  TASK_RESPONSE_STATUS,
  TASK_STATUSES,
  TASK_STATUSES_ASSIGNED,
  TASK_TYPES,
} from 'constants/crm/task';
import { TASK_PRODUCT_TYPES } from './utils';

export const USER_TYPES = {
  staff: 'staff',
  customer: 'customer',
  car_company_staff: 'car_company_staff',
  seller: 'seller',
  insurance_agent: 'insurance_agent',
  collaborator: 'collaborator',
  teller: 'teller',
};

export const USER_TYPES_MAPPING = {
  [USER_TYPES.staff]: 'Nhân viên',
  [USER_TYPES.customer]: 'Khách hàng',
  [USER_TYPES.car_company_staff]: 'Nhân viên công ty xe',
  [USER_TYPES.seller]: 'Nhân viên bất động sản',
  [USER_TYPES.insurance_agent]: 'Nhân viên bảo hiểm',
  [USER_TYPES.collaborator]: 'Cộng tác viên',
  [USER_TYPES.teller]: 'Nhân viên ngân hàng',
};

export const documentTemplateBaseCode = 'LEGAL_PROFILE';

export const fontSizes =
  '8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 24px 30px 36px 48px 60px 72px 96px';

export const TASK_STEPS = (t) => [
  {
    name: t('Receive', { vn: 'Ghi nhận' }),
    value: TASK_STATUSES.CREATED,
    icon: <WaitProcessIcon />,
  },
  {
    name: t('Collect information', { vn: 'Thu thập thông tin' }),
    value: TASK_STATUSES.ASSIGNED,
    icon: <ProcessIcon />,
  },
  {
    name: t('Consulted', { vn: 'Đã gửi thư chào tín dụng' }),
    value: TASK_STATUSES_ASSIGNED.NOT_PROCESSING,
    icon: <AppraisalProgressIcon />,
  },
  {
    name: t('Waiting for bank approval', { vn: 'Chờ đối tác phản hồi' }),
    value: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
    icon: <ReceivedIcon />,
  },
  {
    name: t('Overdue for bank response', { vn: 'Quá thời hạn phản hồi' }),
    value: TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
    icon: <DisbursedIcon />,
  },
  {
    name: t('Waiting for bank process', { vn: 'Có đối tác phản hồi' }),
    value: TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
    icon: <LendApprovalIcon />,
  },
  {
    name: t('Create profile', { vn: 'Tạo hồ sơ vay' }),
    value: TASK_STATUSES_ASSIGNED.CREATE_PROFILE,
    icon: <BankIcon />,
  },
  {
    name: t('Close consultation request', { vn: 'Đóng yêu cầu tư vấn' }),
    value: TASK_STATUSES.DONE,
    icon: <TripartiteBlockadeIcon />,
  },
];

export const PRODUCT_TYPES = (t) => [
  { label: t('Loan', { vn: 'Vay vốn' }), value: TASK_PRODUCT_TYPES.loan },
  {
    label: t('Insurance', { vn: 'Bảo hiểm' }),
    value: TASK_PRODUCT_TYPES.insurances,
  },
  {
    label: t('Investment', { vn: 'Đầu tư' }),
    value: TASK_PRODUCT_TYPES.investment,
  },
  {
    label: t('Real Estate', { vn: 'Bất động sản' }),
    value: TASK_PRODUCT_TYPES.real_estate,
  },
  {
    label: t('Financial planning', { vn: 'Hoạch định tài chính' }),
    value: TASK_PRODUCT_TYPES.financial_planning,
  },
  { label: t('Other', { vn: 'Khác' }), value: TASK_PRODUCT_TYPES.other },
];

export const MAPPING_PRODUCT_TYPES_TO_TYPE_TASK = {
  [TASK_PRODUCT_TYPES.loan]: TASK_TYPES.COUNSELLING,
  [TASK_PRODUCT_TYPES.insurances]: TASK_TYPES.INSURANCE,
  [TASK_PRODUCT_TYPES.investment]: TASK_TYPES.BOND,
  [TASK_PRODUCT_TYPES.real_estate]: TASK_TYPES.REAL_ESTATE,
  [TASK_PRODUCT_TYPES.financial_planning]: TASK_TYPES.FINANCIAL_PLANNING,
  [TASK_PRODUCT_TYPES.other]: TASK_TYPES.OTHER,
};

export const dataTabForStaff = [
  'All',
  TASK_STATUSES.CREATED,
  TASK_STATUSES.ASSIGNED,
  TASK_STATUSES.CONSULTED,
  TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
  TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
  TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
  TASK_STATUSES_ASSIGNED.CREATE_PROFILE,
  TASK_STATUSES.DONE,
];

export const dataTabForStaffRevert = [
  // 'All',
  // TASK_STATUSES.CREATED,
  TASK_STATUSES.ASSIGNED,
];

export const dataTabForTeller = [
  TASK_TYPES.DEAL_PROCESSING_TASK,
  TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE,
  TASK_RESPONSE_STATUS.RECEIVED,
  TASK_RESPONSE_STATUS.REJECT,
];
