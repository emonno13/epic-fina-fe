import React, { useState, useEffect, useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import { Spin } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import numeral from 'numeral';
import { fmoney, getCalcResult } from './utils';


const LoanCalcResult = ({ data, fetchDataCallback }) => {
  const [handleData, setHandleData] = useState<any>({});
  const asyncGetCalcResult = useRequest(getCalcResult, {
    manual: true,
    onSuccess: res => {
      setHandleData(res);
      if (fetchDataCallback) fetchDataCallback(res);
    },
    debounceInterval: 300,
  });

  useEffect(() => {
    if (data) {
      asyncGetCalcResult.run(data);
    }
  }, [data]);

  const ChartData = useMemo(() => {
    if (handleData) {
      const deposit = handleData && handleData?.deposit ? handleData.deposit : 0;
      const principlePayment =
        handleData && handleData?.principlePayment ? handleData.principlePayment : 0;
      const totalInterestPayment =
        handleData && handleData?.totalInterestPayment ? handleData.totalInterestPayment : 0;
      return {
        labels: ['Cần trả trước', 'Gốc cần trả', 'Lãi cần trả'],
        datasets: [
          {
            data: [deposit, principlePayment, totalInterestPayment],
            backgroundColor: ['#002D71', '#0A3ECA', '#FC7513'],
            borderWidth: 3,
          },
        ],
      };
    }
    return {};
  }, [handleData]);

  const options = {
    cutoutPercentage: 90,
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <Spin spinning={asyncGetCalcResult?.loading}>
        <div className="Loan_Calc_Result_Wrapper">
          {handleData &&
			Array.isArray(handleData?.monthlyPayment) &&
			handleData?.monthlyPayment?.length > 1 && (
            <div className={'Fn_LoanCalc_Result'}>
              <div className={'Fn_LoanCalc_Result_Wrapper'}>
                <div className={'Fn_LoanCalc_Result_Quote'}>
                  <h3>Thanh toán tháng đầu</h3>
                </div>
                <div className={'Fn_LoanCalc_Result_Price'}>
                  <h2>
                    {numeral(handleData.monthlyPayment[0]?.totalPaymentPerMonth).format('0,0,0,0')}{' '}
						VND
                  </h2>
                </div>
                <div className={'Fn_LoanCalc_Result_SubQuote'}>
                  <span>
						Tỉ lệ vay {numeral(data?.ratio * 100).format('0,0,0,0.[0]')}% -{' '}
                    {Math.round(data?.months / 12)} năm -{' '}
                    {numeral(data?.rate * 100).format('0,0,0,0.[0]')}%/năm
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className={'Fn_LoanCalc_Chart'}>
            <div className={'Fn_LoanCalc_Chart_Wrapper'}>
              <div className={'Fn_LoanCalc_Chart_Legends'}>
                <div className={'Fn_LoanCalc_Chart_Legend'}>
                  <div className={'Fn_LoanCalc_Chart_icon_1'} />
                  <div className={'Fn_LoanCalc_Chart_Labels'}>
                    <div className={'Fn_LoanCalc_Chart_Label'}>
                      <span>Cần trả trước</span>
                    </div>
                    <div className={'Fn_LoanCalc_Chart_Price'}>
                      <span>
                        {handleData && handleData?.deposit ? fmoney(handleData.deposit) : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={'Fn_LoanCalc_Chart_Legend'}>
                  <div className={'Fn_LoanCalc_Chart_icon_2'} />
                  <div className={'Fn_LoanCalc_Chart_Labels'}>
                    <div className={'Fn_LoanCalc_Chart_Label'}>
                      <span>Gốc cần trả</span>
                    </div>
                    <div className={'Fn_LoanCalc_Chart_Price'}>
                      <span>
                        {handleData && handleData?.principlePayment
                          ? fmoney(handleData.principlePayment)
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={'Fn_LoanCalc_Chart_Legend'}>
                  <div className={'Fn_LoanCalc_Chart_icon_3'} />
                  <div className={'Fn_LoanCalc_Chart_Labels'}>
                    <div className={'Fn_LoanCalc_Chart_Label'}>
                      <span>Lãi cần trả</span>
                    </div>
                    <div className={'Fn_LoanCalc_Chart_Price'}>
                      <span>
                        {handleData && handleData?.totalInterestPayment
                          ? fmoney(handleData.totalInterestPayment)
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'Fn_LoanCalc_Chart_Doughnut'}>
                <Doughnut data={ChartData} options={options} />
                {handleData && handleData?.totalPayment && handleData?.totalPayment !== '0' ? (
                  <div className={'Fn_LoanCalc_TotalPayment'}>
                    <span>{fmoney(handleData.totalPayment)}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default LoanCalcResult;
