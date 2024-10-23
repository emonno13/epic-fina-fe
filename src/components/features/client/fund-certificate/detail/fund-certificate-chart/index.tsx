import HTabs from '@components/shared/common/h-tabs';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import './fund-certificate-chart.module.scss';

export const getDateInPast = ({ year = 0, month = 0, date = 0 }) => {
  const currentDate = new Date();

  if (year) currentDate.setFullYear(currentDate.getFullYear() - year);
  if (month) currentDate.setMonth(currentDate.getMonth() - month);
  if (date) currentDate.setDate(currentDate.getDate() - date);

  return currentDate;
};

const FundCertificateChart = ({ priceUpdateHistories }) => {
  const isMobile = useIsMobile();
  const tabKey = {
    YTD: 'YTD',
    sixMonths: '6',
    oneYear: '12',
    threeYears: '36',
    all: 'all',
  };
  const tabsConfig = [
    {
      label: 'YTD',
      key: tabKey.YTD,
    },
    {
      label: '6 tháng',
      key: tabKey.sixMonths,
    },
    {
      label: '1 năm',
      key: tabKey.oneYear,
    },
    {
      label: '3 năm',
      key: tabKey.threeYears,
    },
    {
      label: 'Tất cả',
      key: tabKey.all,
    },
  ];
  const [activeTabKey, setActiveTabKey] = useState<string>(tabKey.YTD);
  const [dataChart, setDataChart] = useState<any[]>([]);
  const getPriceUpdateHistoriesByTime = (
    priceUpdateHistories: { nav: number; navDate: Date }[],
    timeLine: Date,
  ) => {
    return priceUpdateHistories.filter((item) => {
      const updatedAt = new Date(item.navDate);
      return timeLine <= updatedAt && updatedAt <= new Date();
    });
  };
  const sortNavHistoryByNavDate = (navHistory: any[]) => {
    return [...navHistory].sort(
      (a, b) =>
        new Date(a?.navDate)?.getTime() - new Date(b?.navDate)?.getTime(),
    );
  };
  useEffect(() => {
    switch (activeTabKey) {
      case tabKey.YTD:
        const firstDay = new Date('1/1/2000');
        firstDay.setFullYear(new Date().getFullYear());
        const priceUpdateHistoriesForTheFirstDay =
          getPriceUpdateHistoriesByTime(priceUpdateHistories, firstDay);
        setDataChart(
          sortNavHistoryByNavDate(priceUpdateHistoriesForTheFirstDay),
        );
        break;
      case tabKey.sixMonths:
        const priceUpdateHistoriesForTheLastSixMonths =
          getPriceUpdateHistoriesByTime(
            priceUpdateHistories,
            getDateInPast({ month: 6 }),
          );
        setDataChart(
          sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastSixMonths),
        );
        break;
      case tabKey.oneYear:
        const priceUpdateHistoriesForTheLastOneYear =
          getPriceUpdateHistoriesByTime(
            priceUpdateHistories,
            getDateInPast({ year: 1 }),
          );
        setDataChart(
          sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastOneYear),
        );
        break;
      case tabKey.threeYears:
        const priceUpdateHistoriesForTheLastThreeYear =
          getPriceUpdateHistoriesByTime(
            priceUpdateHistories,
            getDateInPast({ year: 3 }),
          );
        setDataChart(
          sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastThreeYear),
        );
        break;
      case tabKey.all:
        setDataChart(sortNavHistoryByNavDate(priceUpdateHistories));
        break;
    }
  }, [activeTabKey, priceUpdateHistories]);

  const getPrices = (dataChart) => {
    const labels = dataChart.map((item) =>
      ConverterUtils.dateConverterToString(item.navDate),
    );
    const prices = dataChart.map((item) => +item.nav);
    return {
      labels,
      datasets: [
        {
          fill: false,
          label: 'NAV/Unit (VND)',
          data: prices,
          borderColor: '#064DD6',
          backgroundColor: '#A3C6F8',
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="fund-certificate-chart">
      <HTabs
        defaultActiveKey={activeTabKey}
        onChange={setActiveTabKey}
        type="button"
      >
        {tabsConfig.map((tab) => (
          <Tabs.TabPane key={tab.key} tab={tab.label} />
        ))}
      </HTabs>
      <Line
        data={getPrices(dataChart)}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem, data) {
                tooltipItem.value = ConverterUtils.formatIntNumber(
                  tooltipItem.value,
                );
                tooltipItem.yLabel = ConverterUtils.formatIntNumber(
                  tooltipItem.yLabel,
                );
                return tooltipItem.yLabel;
              },
            },
          },
          hover: {
            mode: 'nearest',
            intersect: true,
          },
          legend: {
            display: !isMobile,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: !isMobile,
                  drawTicks: !isMobile,
                },
                ticks: {
                  padding: 8,
                  display: true,
                  autoSkip: true,
                  fontSize: !isMobile ? 12 : 10,
                  ...(isMobile
                    ? {
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: 1,
                      }
                    : {
                        maxTicksLimit: 20,
                        maxRotation: 90,
                        minRotation: 90,
                      }),
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: true,
                  drawTicks: true,
                },
                ticks: {
                  padding: 8,
                  fontSize: !isMobile ? 12 : 10,
                  ...(isMobile
                    ? {
                        autoSkip: true,
                        maxTicksLimit: 6,
                      }
                    : {}),
                },
                position: isMobile ? 'right' : 'left',
              },
            ],
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        }}
        plugins={[
          {
            afterDraw: function (chart) {
              if (chart.tooltip._active && chart.tooltip._active.length) {
                const activePoint = chart.controller.tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.tooltipPosition().x;
                const topY = chart.scales['y-axis-0'].top;
                const bottomY = chart.scales['y-axis-0'].bottom;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.borderDash = [6, 8];
                ctx.strokeStyle = 'gray';
                ctx.stroke();
                ctx.restore();
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default FundCertificateChart;
