import {
  mappingTypeOfFund,
  TYPE_OF_FUND,
} from '@components/features/fina/products/fund/constants';
import { Doughnut } from 'react-chartjs-2';

const ChartPie = ({ dataChart }) => {
  const options = {
    options: true,
    easing: 'easeOutQuart',
    cutoutPercentage: 80,
    responsive: true,
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
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
        backgroundColor: ['#76FFFF', '#FF8536', '#FBE947', '#FF4FB8'],
        borderWidth: 1,
        redraw: true,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={options}
      // @ts-ignore
      width={'20%'}
    />
  );
};

export default ChartPie;
