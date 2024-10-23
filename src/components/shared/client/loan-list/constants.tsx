import { LOAN_STATUS } from '@components/features/fina/products/utils';

export const getSortingResultOptions = (t) => [
  {
    label: t('Highest interest rate', { vn: 'Lãi suất cao nhất' }),
    value: 'preferentialRate-high',
  },
  {
    label: t('Lowest interest rate', { vn: 'Lãi suất thấp nhất' }),
    value: 'preferentialRate-low',
  },
  {
    label: t('Highest loan rate', { vn: 'Tỉ lệ vay cao nhất' }),
    value: 'maxRate-high',
  },
  {
    label: t('Lowest loan rate', { vn: 'Tỉ lệ vay thấp nhất' }),
    value: 'maxRate-low',
  },
  {
    label: t('Best offer period', { vn: 'Thời gian ưu đãi cao nhất' }),
    value: 'preferentialTime-high',
  },
  {
    label: t('Lowest offer period', { vn: 'Thời gian ưu đãi thấp nhất' }),
    value: 'preferentialTime-low',
  },
];

export const getLoanPeriodOptions = (t) =>
  Array.from(Array(6)).map((_, index) => {
    const value = 5 * (index + 2);
    return {
      label: `${value} ${t('Year', { vn: 'Năm' })}`,
      value,
    };
  });

export const oneMilion = 1000 * 1000;
export const oneBillion = 1000 * 1000 * 1000;

const getMoneyLabel = (money, t) => {
  const numberLength = money.toString().length;
  const billionText = t('billion', { vn: 'tỷ' });
  const millionText = t('million', { vn: 'triệu' });
  if (numberLength >= 10) {
    return `${money / oneBillion} ${billionText}`;
  }
  if (numberLength < 10 && numberLength >= 7) {
    return `${money / oneMilion} ${millionText}`;
  }
};

export const momeyOptions = [
  50000000, 100000000, 200000000, 300000000, 400000000, 500000000, 600000000,
  700000000, 800000000, 900000000, 1000000000, 1200000000, 1500000000,
  1800000000, 2000000000, 2200000000, 2500000000, 2800000000, 3000000000,
  3500000000, 4000000000, 4500000000, 5000000000, 7000000000, 8000000000,
  9000000000, 10000000000,
];

export const getMoneyOptions = (t) =>
  momeyOptions.map((money) => ({
    label: getMoneyLabel(money, t),
    value: money,
  }));

export const loanLimitOptions = Array.from(Array(8)).map((_, index) => {
  const value = (index + 1) * 10;
  return {
    label: `${value} %`,
    value,
  };
});

export const getPreferentialTimeOptions = (t) =>
  [3, 6, 12, 18, 24, 36, 48, 60].map((value) => ({
    label: `${value} ${t('month', { vn: 'tháng' })}`,
    value,
  }));

export const getAmountSubmitData = (values) => {
  const { amount } = values;
  if (!amount) {
    return {};
  }
  return {
    'info.minMoney': {
      $lte: amount,
    },
    'info.maxMoney': {
      $gte: amount,
    },
    amount: undefined,
  };
};

export const getLoanPeriodSubmitData = (values) => {
  const { loanPeriod } = values;
  if (!loanPeriod) {
    return {};
  }
  return {
    'info.maxTime': {
      $gte: loanPeriod,
    },
    'info.minTime': {
      $lte: loanPeriod * 12,
    },
    loanPeriod: undefined,
  };
};

export const getPreferentialTimeSubmitData = (values) => {
  const { preferentialTime } = values;
  if (!preferentialTime) {
    return {};
  }
  return {
    'info.preferentialTime': {
      $gte: preferentialTime,
    },
    preferentialTime: undefined,
  };
};

export const getLoanLimitSubmitData = (values) => {
  const { loanLimit } = values;
  if (!loanLimit) {
    return {};
  }
  return {
    'info.maxRate': {
      $gte: loanLimit,
    },
    loanLimit: undefined,
  };
};

export const getSortingResultSubmitData = (values) => {
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

export const getLoanFormSubmitData = (values) => {
  return {
    ...values,
    ...getAmountSubmitData(values),
    ...getLoanPeriodSubmitData(values),
    ...getPreferentialTimeSubmitData(values),
    ...getLoanLimitSubmitData(values),
    ...getSortingResultSubmitData(values),
    status: LOAN_STATUS.APPROVED,
  };
};
