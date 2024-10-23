import { TFunction } from 'next-i18next';

export const TYPE_OF_PROFIT = {
  PERIODIC: 'periodic',
  END_TERM: 'end_term',
};

export const TypeOfProfit = (t: TFunction) => {
  return Object.keys(TYPE_OF_PROFIT).map(item => {
    return {
      label: t(TYPE_OF_PROFIT[item]),
      value: TYPE_OF_PROFIT[item],
    };
  });
};

export const getSortingResultOptions = t => [
  {
    label: t('Highest interest rate', { vn: 'Ngày phát hành lâu nhất' }),
    value: 'releaseDate-low',
  },
  {
    label: t('Lowest interest rate', { vn: 'Ngày phát hành gần nhất' }),
    value: 'releaseDate-high',
  },
  {
    label: t('Highest loan rate', { vn: 'Mệnh giá cao nhất' }),
    value: 'parValueShares-high',
  },
  {
    label: t('Lowest loan rate', { vn: 'Mệnh giá thấp nhất' }),
    value: 'parValueShares-low',
  },
];

export const getSortingResultSubmitData = values => {
  const { sort } = values;
  if (!sort) {
    return {};
  }
  const splitSort = sort.split('-');
  const field = `info.${splitSort[0]}`;
  let sortDirect;
  if (splitSort[1] === 'high') {
    sortDirect = 'DESC';
  }
  if (splitSort[1] === 'low') {
    sortDirect = 'ASC';
  }
  return {
    order: `${field} ${sortDirect}`,
  };
};

export const TYPE_ACTIONS = {
  REQUEST: 'REQUEST',
  BUY: 'BUY',
};
