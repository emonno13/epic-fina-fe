import { Tag } from 'antd';
import { AppraisalProgressIcon, LendApprovalIcon, ProcessIcon, WaitProcessIcon } from 'icons';

export const DEAL_CLAIM_INSURANCE_STATUSES = {
  WAIT_PROCESSING: 'wait_processing', // Đang xử lý hồ sơ
  MOVE_TO_PARTNER: 'move_to_partner', // Chờ đối tác phê duyệt
  PARTNER_CONFIRM: 'partner_confirm', // doi tac xac nhan thong tin
  DOCUMENT_CONFIRM: 'document_confirm', // xác nhận hồ sơ bản cứng
  MOVE_DOCUMENT_TO_PARTNER: 'move_document_to_partner', // chuyển giấy tờ bản cứng cho đối tác
  CANCELLED_BY_PARTNER: 'cancelled_by_partner', // đối tác từ chối
  DISBURSING: 'disbursing', // đang giải ngân
  DISBURSED: 'disbursed', // đã giải ngân
};

export const mappingLabelClaimInsurance = (status) => {
  let label = '';
  let color = '';

  switch (status) {
    case DEAL_CLAIM_INSURANCE_STATUSES.WAIT_PROCESSING: {
      label = 'Khởi tạo';
      color = '#1890ff';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER: {
      label = 'Xử lý hồ sơ';
      color = '#ffc53d';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.PARTNER_CONFIRM: {
      label = 'Chờ đối tác phê duyệt';
      color = '#73d13d';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.DOCUMENT_CONFIRM: {
      label = 'Nhận bản cứng khách hàng';
      color = '#ff4d4f';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER: {
      label = 'Gửi bản cứng hồ sơ cho đối tác';
      color = '#ff4d4f';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER: {
      label = 'Đối tác từ chối';
      color = 'red';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING: {
      label = 'Đang giải ngân';
      color = '#ff4d4f';
      break;
    }
    case DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED: {
      label = 'Đã giải ngân';
      color = '#ff4d4f';
      break;
    }
    default: {
      label = '_';
      color = '#fff';
      break;
    }
  }
		
  return <Tag {...{
    color,
  }}>{label}</Tag>;
};


export const DEAL_CLAIM_INSURANCE_STEP = [
  DEAL_CLAIM_INSURANCE_STATUSES.WAIT_PROCESSING, // Đang xử lý hồ sơ
  DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER, // Chờ đối tác phê duyệt
  DEAL_CLAIM_INSURANCE_STATUSES.PARTNER_CONFIRM, // doi tac xac nhan thong tin
  DEAL_CLAIM_INSURANCE_STATUSES.DOCUMENT_CONFIRM, // xác nhận hồ sơ bản cứng
  DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER, // chuyển giấy tờ bản cứng cho đối tác
  DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER, // đối tác từ chối
  DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING, // đang giải ngân
  DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED, // đã giải ngân
];

export const mappingLabelDealClaimInsurance = [	{
  icon:  <WaitProcessIcon />,
  name : 'Khởi tạo',
  color: '#1890ff',
  value: DEAL_CLAIM_INSURANCE_STATUSES.WAIT_PROCESSING,
},
{
  icon: <ProcessIcon />,
  name : 'xử lý hồ sơ',
  color: '#ffc53d',
  value: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER,
},
{
  icon: <LendApprovalIcon />,
  name : 'Chờ đối tác phê duyệt',
  color: '#73d13d',
  value: DEAL_CLAIM_INSURANCE_STATUSES.PARTNER_CONFIRM,
},
{
  icon: <ProcessIcon />,
  name : 'Nhận bản cứng khách hàng',
  color: '#ff4d4f',
  value: DEAL_CLAIM_INSURANCE_STATUSES.DOCUMENT_CONFIRM,
},
{
  icon: <LendApprovalIcon />,
  name : 'Gửi bản cứng hồ sơ cho đối tác',
  color: '#ff4d4f',
  value: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER,
},
{
  icon: <ProcessIcon />,
  name : 'Đang giải ngân',
  color: '#ff4d4f',
  value: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING,
},
{
  icon: <AppraisalProgressIcon />,
  name: 'Đã giải ngân',
  color: '#ff4d4f',
  value: DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED,
}];
