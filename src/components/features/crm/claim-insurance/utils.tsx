import { Tag } from 'antd';
import { AppraisalProgressIcon, LendApprovalIcon, ProcessIcon, WaitProcessIcon } from 'icons';
import { TASK_CLAIM_INSURANCE_STATUS } from './contants';

export const mappingLabelClaimInsurance = (status) => {
  let label = '';
  let color = '';

  switch (status) {
    case TASK_CLAIM_INSURANCE_STATUS.CREATED: {
      label = 'Khởi tạo';
      color = '#1890ff';
      break;
    }
    case TASK_CLAIM_INSURANCE_STATUS.ASSIGNED: {
      label = 'Thu thập thông tin';
      color = '#ffc53d';
      break;
    }
    case TASK_CLAIM_INSURANCE_STATUS.DONE: {
      label = 'Hoàn thành';
      color = '#73d13d';
      break;
    }
    case TASK_CLAIM_INSURANCE_STATUS.CANCEL: {
      label = 'Huỷ bỏ';
      color = '#ff4d4f';
      break;
    }
    case TASK_CLAIM_INSURANCE_STATUS.CONSULTED: {
      label = 'Tạo hồ sơ yêu cầu bồi thường';
      color = '#2db7f5';
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

export const CLAIM_INSURANCE_STEP = [
  TASK_CLAIM_INSURANCE_STATUS.CREATED, // Đang xử lý hồ sơ
  TASK_CLAIM_INSURANCE_STATUS.ASSIGNED, // chỉ dịnh người nhận yêu cầu bồi thường bảo hiểm
  TASK_CLAIM_INSURANCE_STATUS.CONSULTED, // Tạo yêu cầu bồi thường bảo hiểm 
  TASK_CLAIM_INSURANCE_STATUS.DONE, // Hoàn thành
];

export const mappingLabelClaimInsuranceStep = [	{
  icon:  <WaitProcessIcon />,
  name : 'Khởi tạo',
  color: '#1890ff',
  value: TASK_CLAIM_INSURANCE_STATUS.CREATED,
},
{
  icon: <ProcessIcon />,
  name : 'Thu Thập thông tin',
  color: '#ffc53d',
  value: TASK_CLAIM_INSURANCE_STATUS.ASSIGNED,
},
{
  icon: <LendApprovalIcon />,
  name : 'tạo yêu cầu bồi thường',
  color: '#73d13d',
  value: TASK_CLAIM_INSURANCE_STATUS.CONSULTED,
},
{
  icon: <AppraisalProgressIcon />,
  name: 'Hoàn thành',
  color: '#ff4d4f',
  value: TASK_CLAIM_INSURANCE_STATUS.DONE,
}];