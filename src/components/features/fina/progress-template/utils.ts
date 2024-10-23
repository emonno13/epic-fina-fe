import { TFunction, useTranslation } from 'next-i18next';
import { getSubCategoryProductLoan, PRODUCT_TYPES } from '../../../../types/organization';

export const PROGRESS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

export const getStatusProgress = (t: TFunction) => [
  { label: t('Active'), value: PROGRESS_STATUS.ACTIVE },
  { label: t('In-Active'), value: PROGRESS_STATUS.INACTIVE },
  { label: t('Pending'), value: PROGRESS_STATUS.PENDING },
];

export const PROGRESS_STATUSES_LABEL_MAPPING = {
  [PROGRESS_STATUS.ACTIVE]: 'Active',
  [PROGRESS_STATUS.INACTIVE]: 'In-Active',
  [PROGRESS_STATUS.PENDING]: 'Pending',
};

export const PROGRESS_STATUSES_COLOR_MAPPING = {
  [PROGRESS_STATUS.PENDING]: 'yellow',
  [PROGRESS_STATUS.ACTIVE]: 'blue',
  [PROGRESS_STATUS.INACTIVE]: 'red',
};

export const getOptionsSubCategoryProduct = (productCategory) => {
  const { t } = useTranslation('admin-common');
  switch (productCategory) {
    case PRODUCT_TYPES.loan:
      return getSubCategoryProductLoan(t);
    case PRODUCT_TYPES.insurance:
      break;
    case PRODUCT_TYPES.investment:
      break;
    case PRODUCT_TYPES.real_estate:
      break;
    default:
      return getSubCategoryProductLoan(t);
  }
};

export const ACTION_CODES = {
  ACTION_NOT_START: 'NOT_START',
  ACTION_STARTED: 'STARTED',
  ACTION_PROGRESS_50_PERCENT: '50_PERCENT',
  ACTION_DONE: 'DONE',
};

export const getActionStatusWithoutDone = () => {
  return Object.values(ACTION_CODES).filter(item => item !== ACTION_CODES.ACTION_DONE);
};

export const PROGRESS_ITEMS_ACTIONS = [
  {
    name: 'Done with in 1 step',
    code: 'ACTION_1_STEPS',
    actions: [
      { name: 'Not start', code: ACTION_CODES.ACTION_NOT_START, percent: 0 },
      { name: 'Done', code: ACTION_CODES.ACTION_DONE, percent: 100 },
    ],
  },
  {
    name: 'Done with in 2 steps',
    code: 'ACTION_2_STEPS',
    actions: [
      { name: 'Not start', code: ACTION_CODES.ACTION_NOT_START, percent: 0 },
      { name: 'Start to progress', code: ACTION_CODES.ACTION_STARTED, percent: 10 },
      { name: 'Done', code: ACTION_CODES.ACTION_DONE, percent: 100 },
    ],
  },
  {
    name: 'Done with in 3 steps',
    code: 'ACTION_3_STEPS',
    actions: [
      { name: 'Not start', code: ACTION_CODES.ACTION_NOT_START, percent: 0 },
      { name: 'Start to progress', code: ACTION_CODES.ACTION_STARTED, percent: 10 },
      { name: 'Processing', code: ACTION_CODES.ACTION_PROGRESS_50_PERCENT, percent: 50 },
      { name: 'Done', code: ACTION_CODES.ACTION_DONE, percent: 100 },
    ],
  },
];

export const getGroupAction = (t: TFunction) => {
  return PROGRESS_ITEMS_ACTIONS.map((el) => {
    return { label: `${el?.code} - ${el?.name}`, value: el?.code, actions: el.actions };
  });
};

export const getItemActionsByCode = (code) => {
  return PROGRESS_ITEMS_ACTIONS.filter(el => {
    return el?.code === code;
  });
};
