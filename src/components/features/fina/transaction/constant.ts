import { TFunction } from 'next-i18next';

export const TRANSACTION_TYPE = {
  LOAN: 'loan',
  INSURANCE: 'insurances',
  INVESTMENT: 'investment',
  BONDS: 'bonds',
  FUNDS: 'funds',
};

export const TRANSACTION_GATEWAY = {
  FINA: 'fina',
  SUB_ORG: 'sub_org',
};

export const TRANSACTION_SUB_TYPE = {
  PVI: 'pvi',
  GLOBAL_CARE: 'global-care',
  GOTRUST: 'go-trust',
};

export enum TRANSACTION_DETAIL_STATUS {
  NOT_FOR_CONTROL = 'not_for_control',
  FOR_CONTROL = 'for_control',
  DISBURSED = 'disbursed', // For histories disbursement
  CANCELLED = 'cancelled',
}

export const TRANSACTION_DETAIL_STATUS_OPTIONS = [{
  label: 'Chưa đối soát',
  value: TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL,
}, {
  label: 'Đã đối soát',
  value: TRANSACTION_DETAIL_STATUS.FOR_CONTROL,
}, {
  label: 'Đã huỷ',
  value: TRANSACTION_DETAIL_STATUS.CANCELLED,
}];

export const TRANSACTION_DETAIL_STATUS_LABEL_MAPPING = {
  [TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL]: 'Chưa đối soát',
  [TRANSACTION_DETAIL_STATUS.FOR_CONTROL]: 'Đã đối soát',
  [TRANSACTION_DETAIL_STATUS.CANCELLED]: 'Đã huỷ',
};

export const TRANSACTION_DETAIL_STATUS_COLOR_MAPPING = {
  [TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL]: 'magenta',
  [TRANSACTION_DETAIL_STATUS.FOR_CONTROL]: 'green',
  [TRANSACTION_DETAIL_STATUS.CANCELLED]: 'red',
};

export const BondsTransactionStatus = (t: TFunction) => [
  {
    label: t('Đã huỷ bỏ'),
    value: TRANSACTION_DETAIL_STATUS.CANCELLED,
  },
  {
    label: t('Disbursed'),
    value: TRANSACTION_DETAIL_STATUS.DISBURSED,
  },
  {
    label: t('not_for_control'),
    value: TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL,
  },
];

export const TransactionGateway = (t: TFunction) => {
  return Object.keys(TRANSACTION_GATEWAY).map(gateway => {
    return {
      label: t(TRANSACTION_GATEWAY[gateway]),
      value: TRANSACTION_GATEWAY[gateway],
    };
  });
};

export enum ERROR_STATUS {
  NOT_FOR_CONTROL = 'ERROR_STATUS_NOT_FOR_CONTROL',
  CHECKED_AMOUNT_IS_NOT_ENOUGH = 'CHECKED_AMOUNT_IS_NOT_ENOUGH'
}
