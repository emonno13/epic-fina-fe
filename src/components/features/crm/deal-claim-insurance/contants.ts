import { DEAL_CLAIM_INSURANCE_STATUSES } from './utils';


export const TYPE_ACTION_CLAIM_MONEY =  {
  BUTTON_ACTION : 'button_action',
  REQUIRED_ACTION : 'required_action',
};

export const checkStatust =  (documentDetail) => {
  const  insuranceStatus =  documentDetail?.status;
  const checkStatus =  insuranceStatus === DEAL_CLAIM_INSURANCE_STATUSES.MOVE_DOCUMENT_TO_PARTNER || insuranceStatus === DEAL_CLAIM_INSURANCE_STATUSES.DISBURSING || insuranceStatus ===  DEAL_CLAIM_INSURANCE_STATUSES.DISBURSED;
  return checkStatus;
};