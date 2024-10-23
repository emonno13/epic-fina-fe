export const DEAL_INSURANCE_STATUSES = {
  WAIT_PROCESSING: 'wait_processing', // chờ xử lý
  PENDING: 'pending', //
  LEND_APPROVAL: 'expertise', // thẩm định
  CERTIFICATED: 'certificated', // cấp giấy chứng nhận
  CANCELLED: 'cancelled', // đóng - do không đạt yêu cầu
};

export const dealInsuranceSteps = [
  DEAL_INSURANCE_STATUSES.WAIT_PROCESSING, 
  DEAL_INSURANCE_STATUSES.PENDING, 
  DEAL_INSURANCE_STATUSES.LEND_APPROVAL, 
  DEAL_INSURANCE_STATUSES.CERTIFICATED, 
  DEAL_INSURANCE_STATUSES.CANCELLED,
];

export const TABS_DEAL_INSURANCE = [
  { name: 'Tất cả', status: undefined },
  { name: 'Chờ xử lý', status: DEAL_INSURANCE_STATUSES.WAIT_PROCESSING },
  { name: 'Chờ xác nhận thanh toán', status: DEAL_INSURANCE_STATUSES.PENDING },
  { name: 'Thẩm định', status: DEAL_INSURANCE_STATUSES.LEND_APPROVAL },
  { name: 'Cấp giấy chứng nhận', status: DEAL_INSURANCE_STATUSES.CERTIFICATED },
  { name: 'Đóng - do không đạt yêu cầu', status: DEAL_INSURANCE_STATUSES.CANCELLED },
];
