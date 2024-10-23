import { Doughnut } from 'react-chartjs-2';
import {
  mappingTypeOfFund,
  TYPE_OF_FUND,
} from '@components/features/fina/products/fund/constants';
import { ConverterUtils } from '@lib/converter';

const ChartPie = ({ dataChart }) => {
  const options = {
    options: true,
    easing: 'easeOutQuart',
    cutoutPercentage: 60,
    responsive: true,
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (item, data) => {
          if (!item || !data) return '';

          return `${data?.labels[item?.index]}: ${ConverterUtils.formatNumber(Math.floor(data?.datasets[0].data[item?.index]))}`;
        },
      },
    },
  };
  const data = {
    labels: [
      mappingTypeOfFund[TYPE_OF_FUND.BOND],
      mappingTypeOfFund[TYPE_OF_FUND.BALANCED],
      mappingTypeOfFund[TYPE_OF_FUND.STOCK],
      mappingTypeOfFund[TYPE_OF_FUND.IPO],
    ],
    datasets: [
      {
        data: dataChart,
        backgroundColor: ['#F382C0', '#FF8536', '#716FFF', '#007AFF'],
        borderWidth: 0,
        redraw: true,
      },
    ],
  };

  return <Doughnut data={data} options={options} width={125} height={125} />;
};

export default ChartPie;
