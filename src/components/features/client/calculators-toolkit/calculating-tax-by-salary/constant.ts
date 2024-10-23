import { ConverterUtils } from '@lib/converter';

export const TYPE_RADIO = {
  NET_TO_GROSS: 'net_to_gross',
  GROSS_TO_NET: 'gross_to_net',
};

export const getDataViewDetail = (data, t, keyConvert) => {
  return [
    {
      label: t(
        `${keyConvert === TYPE_RADIO.NET_TO_GROSS ? 'netSalary' : 'grossSalary'}`,
      ),
      value: ConverterUtils.formatNumber(
        Math.floor(
          keyConvert === TYPE_RADIO.NET_TO_GROSS
            ? data.netSalary
            : data?.grossSalary,
        ),
      ),
      className: '',
    },
    {
      label: t('BHXH (8%)'),
      value: ConverterUtils.formatNumber(Math.floor(data.BHXH)),
      className: '',
    },
    {
      label: t('BHYT (1.5%)'),
      value: ConverterUtils.formatNumber(Math.floor(data.BHYT)),
      className: '',
    },
    {
      label: t('BHTN (1%)'),
      value: ConverterUtils.formatNumber(Math.floor(data.BHTN)),
      className: '',
    },
    {
      label: t('netTaxableIncome'),
      value: ConverterUtils.formatNumber(Math.floor(data.netTaxableIncome)),
      className: '',
    },
    {
      label: t('reduceYourself'),
      value: ConverterUtils.formatNumber(
        Math.floor(DEFAULT_VALUE.REDUCE_YOUR_SELF),
      ),
      className: '',
    },
    {
      label: t('reducingNPTFamilySituation'),
      value: ConverterUtils.formatNumber(
        Math.floor(data.reducingNPTFamilySituation),
      ),
      className: '',
    },
    {
      label: t('incomeTaxes'),
      value: ConverterUtils.formatNumber(Math.floor(data.incomeTaxes)),
      className: '',
    },
    {
      label: t('TNCNTax'),
      value: ConverterUtils.formatNumber(Math.floor(data.TNCNTax)),
      className: 'title-view-show-detail',
    },
    {
      label: t(
        `${keyConvert !== TYPE_RADIO.NET_TO_GROSS ? 'netSalary' : 'grossSalary'}`,
      ),
      value: ConverterUtils.formatNumber(
        Math.floor(
          keyConvert !== TYPE_RADIO.NET_TO_GROSS
            ? data?.netSalary
            : data?.grossSalary,
        ),
      ),
      className: 'title-view-show-detail',
    },
  ];
};

export const LABEL_INPUT = {
  INCOME: 'income',
  Salary_PAID_FOR_INSURANCE: 'salaryPaidForInsurance',
  NUMBER_OF_DEPENDENTS: 'numberOfDependents',
};

export const dataDescription = [
  {
    label: 'Đến 5 Triệu',
    value: 0,
    personal: 0.05,
    condition: 5000000,
    tax: '5%',
  },
  {
    label: 'Trên 5 Triệu đến 10 Triệu',
    value: 5000000,
    personal: 0.1,
    condition: 10000000,
    tax: '10%',
  },
  {
    label: 'Trên 10 Triệu đến 18 Triệu',
    value: 10000000,
    personal: 0.15,
    condition: 18000000,
    tax: '15%',
  },
  {
    label: 'Trên 18 Triệu đến 32 Triệu',
    value: 18000000,
    personal: 0.2,
    condition: 32000000,
    tax: '20%',
  },
  {
    label: 'Trên 32 Triệu đến 52 Triệu',
    value: 32000000,
    personal: 0.25,
    condition: 52000000,
    tax: '25%',
  },
  {
    label: 'Trên 52 Triệu đến 80 Triệu',
    value: 52000000,
    personal: 0.3,
    condition: 80000000,
    tax: '30%',
  },
  {
    label: 'Trên 80 Triệu',
    value: 80000000,
    personal: 0.35,
    condition: 'other',
    tax: '35%',
  },
];

export const getPersonalIncomeTax = (incomeTaxes) => {
  if (incomeTaxes < 0 || incomeTaxes === 0) {
    return 0;
  }

  let incomeTaxNew = 0;

  const dataDescriptionByIncomeTaxes = dataDescription.filter(
    (element) => element.value < incomeTaxes,
  );

  dataDescriptionByIncomeTaxes.forEach((dataDescriptionElement) => {
    if (typeof dataDescriptionElement.condition === 'number') {
      if (incomeTaxes > dataDescriptionElement.condition) {
        incomeTaxNew =
          incomeTaxNew +
          (dataDescriptionElement.condition - dataDescriptionElement.value) *
            dataDescriptionElement.personal;
      } else {
        incomeTaxNew =
          incomeTaxNew +
          (incomeTaxes - dataDescriptionElement.value) *
            dataDescriptionElement.personal;
      }
    } else {
      incomeTaxNew =
        incomeTaxNew +
        (incomeTaxes - dataDescriptionElement.value) *
          dataDescriptionElement.personal;
    }
  });

  return incomeTaxNew;
};

export const DEFAULT_VALUE = {
  REDUCING_NPT: 4400000,
  REDUCE_YOUR_SELF: 11000000,
};

export const MAX_SALARY = {
  BHTN: 884000000,
  BHXH: 29800000,
  BHYT: 29800000,
};
