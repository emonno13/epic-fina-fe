import { generatePermission } from '@components/shared/accessibility/constant';
import { TFunction } from 'next-i18next';
import { COMMISSION_STATUSES } from '../commission/settings/loan-product/constant';

export const DEAL_TYPE = {
  LOAN: 'loan',
  INVESTMENT: 'investment',
  REAL_ESTATE: 'real_estate',
  INSURANCES: 'insurances',
  CLAIM_INSURANCE: 'claim_insurance',
};

export const NAMESPACES = {
  dataSource: 'dataSource',
  dealDetails: 'dealDetails',
  documentDetail: 'documentDetail',
};

export const DEAL_STATUSES = {
  WAIT_PROCESSING: 'wait_processing',
  PROCESSING: 'processing',
  MOVED_TO_FINANCIAL_ORGANIZATION: 'moved_to_financial_organization',
  LEND_APPROVAL: 'lend_approval',
  DISBURSING: 'disbursing',
  TRIPARTITE_BLOCKADE: 'tripartite_blockade',
  DISBURSED: 'disbursed',
  CANCELLED: 'cancelled',
  DELETED: 'deleted',
};

export const DEAL_DETAIL_STATUSES = {
  WAIT_PROCESSING: 'wait_processing',
  PROCESSING: 'processing',
  RECEIVED: 'received',
  APPRAISAL_PROGRESS: 'appraisal_progress',
  LEND_APPROVAL: 'lend_approval',
  DISBURSING: 'disbursing',
  TRIPARTITE_BLOCKADE: 'tripartite_blockade',
  DISBURSED: 'disbursed',
  CANCELLED: 'cancelled',
};

export const DEAL_BANK_STATUS = {
  [DEAL_DETAIL_STATUSES.WAIT_PROCESSING]: {
    name: 'Wait processing',
    disable: false,
    color: 'lime',
    value: DEAL_DETAIL_STATUSES.WAIT_PROCESSING,
  },
  [DEAL_DETAIL_STATUSES.RECEIVED]: {
    name: 'Receive',
    disable: false,
    color: 'red',
    value: DEAL_DETAIL_STATUSES.RECEIVED,
  },
  [DEAL_DETAIL_STATUSES.APPRAISAL_PROGRESS]: {
    name: 'Appraisal in progress',
    disable: false,
    color: 'volcano',
    value: DEAL_DETAIL_STATUSES.APPRAISAL_PROGRESS,
  },
  [DEAL_DETAIL_STATUSES.LEND_APPROVAL]: {
    name: 'Lend approval',
    disable: false,
    color: 'orange',
    value: DEAL_DETAIL_STATUSES.LEND_APPROVAL,
  },
  [DEAL_STATUSES.TRIPARTITE_BLOCKADE]: {
    name: 'Tripartite blockade',
    disable: false,
    color: 'purple',
    value: DEAL_DETAIL_STATUSES.TRIPARTITE_BLOCKADE,
  },
  [DEAL_DETAIL_STATUSES.DISBURSING]: {
    name: 'Disbursing',
    disable: false,
    color: 'geekblue',
    value: DEAL_DETAIL_STATUSES.DISBURSING,
  },
  [DEAL_DETAIL_STATUSES.DISBURSED]: {
    name: 'Disbursed',
    disable: false,
    color: 'green',
    value: DEAL_DETAIL_STATUSES.DISBURSED,
  },
};

export const DEAL_STATUS = {
  [DEAL_STATUSES.WAIT_PROCESSING]: {
    name: 'Wait processing',
    disable: false,
    color: 'lime',
    value: DEAL_STATUSES.WAIT_PROCESSING,
  },
  [DEAL_STATUSES.PROCESSING]: {
    name: 'Processing',
    disable: false,
    color: 'green',
    value: DEAL_STATUSES.PROCESSING,
  },
  [DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION]: {
    name: 'Moved to financial organization',
    disable: true,
    color: 'cyan',
    value: DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION,
  },
  [DEAL_STATUSES.LEND_APPROVAL]: {
    name: 'Lend approval',
    disable: true,
    color: 'green',
    value: DEAL_STATUSES.LEND_APPROVAL,
  },
  [DEAL_STATUSES.TRIPARTITE_BLOCKADE]: {
    name: 'Tripartite blockade',
    disable: false,
    color: 'purple',
    value: DEAL_STATUSES.TRIPARTITE_BLOCKADE,
  },
  [DEAL_STATUSES.DISBURSING]: {
    name: 'Disbursing',
    disable: false,
    color: 'geekblue',
    value: DEAL_STATUSES.DISBURSING,
  },
  [DEAL_STATUSES.DISBURSED]: {
    name: 'Disbursed',
    disable: true,
    color: 'blue',
    value: DEAL_STATUSES.DISBURSED,
  },
  [DEAL_STATUSES.CANCELLED]: {
    name: 'Cancel',
    disable: true,
    color: 'red',
    value: DEAL_STATUSES.CANCELLED,
  },
};

export const TYPE_SOURCE = {
  request_counselling: 'request_counselling',
  collaborators: 'collaborators',
  myself: 'myself',
  other: 'other',
};

export const getOptionsTypeSource = (t: TFunction) => {
  return [
    { label: t('Request counselling'), value: TYPE_SOURCE.request_counselling },
    // {label: t('Collaborators'), value: TYPE_SOURCE.collaborators},
    // {label: t('Myself'), value: TYPE_SOURCE.myself},
    // {label: t('Other'), value: TYPE_SOURCE.other},
  ];
};

export const PERMISSION_DEAL = generatePermission('Deal');
export const PERMISSION_BANK = generatePermission('DealDetail');

export const mergeArrayObjects = (arr1: any[], arr2: any[]) => {
  const result: any[] = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push({
      ...arr1[i],
      updatedAt: arr2?.find((itmInner) => itmInner?.status === arr1[i].value)
        ?.updatedAt,
    });
  }
  return result;
};

export const calculationUnreconciledAmount = (value = []) => {
  return value?.reduce((previousValue, currentValue: any) => {
    if (currentValue?.status === COMMISSION_STATUSES.NOT_FOR_CONTROL) {
      const amount = currentValue?.amount || 0;
      return previousValue + amount;
    }
    return previousValue + 0;
  }, 0);
};
