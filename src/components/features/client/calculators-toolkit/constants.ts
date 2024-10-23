import { ConverterUtils } from '@lib/converter';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';

export const TYPE_TIME = { MONTH: 'MONTH', YEAR: 'YEAR' };
export const TYPE_GENERAL = { INCOME: 'income', OUTCOME: 'outcome' };
export const TYPE_MODAL = {
  INFO: 'info',
  CREATE_INFO: 'create_info',
  SHOW_DETAIL: 'show_detail',
};

export const legendConfig = {
  position: 'bottom',
  textAlign: 'left',
  labels: {
    font: { size: 10 },
    boxWidth: 15,
    boxHeight: 10,
  },
};

export const TYPE_CALCULATOR = {
  PAID_MONTHLY: 'paid_monthly',
  DEBT_BALANCE_IS_DECREASING: 'debt_balance_is_decreasing',
};

export interface VisibleModal {
  visible: boolean;
  type: string;
}

export const options = (t) => {
  return {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return ConverterUtils.formatNumber(Math.floor(value));
            },
          },
          id: 'y',
          display: true,
          scaleLabel: {
            display: true,
            labelString: t('debt'),
            fontColor: '#064DD6',
            fontStyle: 'bold',
            fontSize: 12,
          },
        },
      ],
      xAxes: [
        {
          id: 'x',
          display: true,
          scaleLabel: {
            display: true,
            labelString: t('year'),
            fontColor: '#064DD6',
            fontStyle: 'bold',
            fontSize: 12,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: (items, data) => {
          return `${t('year')}: ${items[0]?.label}`;
        },

        label: (item, data) => {
          return ` ${data?.datasets[item?.datasetIndex]?.label}: ${ConverterUtils.formatNumber(Math.floor(item?.value))}`;
        },
      },
    },
  };
};

export const dataChartBankLoan = (
  labels,
  dataLoanBalance,
  dataTotalPayment,
  t,
) => {
  return {
    labels: labels,
    datasets: [
      {
        label: t('outstandingLoans'),
        data: dataLoanBalance,
        fill: true,
        borderColor: '#064DD6',
        pointBackgroundColor: '#064DD6',
        pointBorderColor: '#064DD6',
        backgroundColor: 'rgba(6, 77, 214, 0.6)',
      },
      {
        label: t('totalPayment'),
        data: dataTotalPayment,
        fill: true,
        borderColor: '#2FA92C',
        pointBackgroundColor: '#2FA92C',
        pointBorderColor: 'rgba(47, 169, 44, 0.6)',
      },
    ],
  };
};

export const contentInfo =
  'Công cụ tính toán lãi vay ngân hàng của FINA giúp bạn dự tính được số tiền lãi phải trả định kỳ, tổng gốc và lãi trong từng thời điểm.';

export const postLocation = async (router) => {
  return await httpRequester.postToApi({
    url: `${endpoints.endpointWithApiDomain('/request-campaign/public')}`,
    params: {
      uui: window?.navigator?.userAgent,
      link: router?.pathname || '',
    },
  });
};
