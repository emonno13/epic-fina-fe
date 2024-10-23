import { TFunction } from 'next-i18next';

export const BONDS_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
};

export const TYPE_OF_PROFIT = {
  PERIODIC: 'periodic',
  END_TERM: 'end_term',
};

export const OFFICE = {
  HN: 'Hà Nội',
  HCM: 'Thành phố Hồ Chí Minh',
};

export const  CONDITION_PURCHASES = {
  NOT_REQUIRED: 'not_required',
  PROFESSIONAL_INVESTOR: 'professional_investor',
};

export const INTEREST_RATE_TIME = {
  ONE_YEAR: 1,
  THREE_YEAR: 3,
};

export const AllowedPreSale = [
  { value: true, label: 'Có' },
  { value: false, label: 'Không' },
];

export const AllowedStatus = (t: TFunction) => {
  return Object.keys(BONDS_STATUS).map(status => {
    return {
      label: t(BONDS_STATUS[status]),
      value: BONDS_STATUS[status],
    };
  });
};

export const TypeOfProfit = (t: TFunction) => {
  return Object.keys(TYPE_OF_PROFIT).map(item => {
    return {
      label: t(TYPE_OF_PROFIT[item]),
      value: TYPE_OF_PROFIT[item],
    };
  });
};
export const Office = (t: TFunction) => {
  return Object.keys(OFFICE).map(item => {
    return {
      label: t(OFFICE[item]),
      value: OFFICE[item],
    };
  });
};

export const InterestRateTime = (t: TFunction) => {
  return Object.keys(INTEREST_RATE_TIME).map(item => {
    return {
      label: `${t(INTEREST_RATE_TIME[item])} năm`,
      value: INTEREST_RATE_TIME[item],
    };
  });
};

export const ConditionsOfPurchase = (t: TFunction) => {
  return [
    {
      label: t('Không yêu cầu', { en: 'not required' }),
      value: CONDITION_PURCHASES.NOT_REQUIRED,
    },
    {
      label: t('Nhà đầu tư chuyên nghiệp', { en: 'Professional investor' }),
      value: CONDITION_PURCHASES.PROFESSIONAL_INVESTOR,
    },
  ];
};

