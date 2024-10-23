import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { Col, Row } from 'antd';
import { useRequest } from '@umijs/hooks';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import { RootStateOrAny, useSelector } from 'react-redux';
import LoanCalcResult from './LoanCalcResult';
import CalcRangePickers from './components/CalcRangePickers';
import CalcPreferentialRate from './components/CalcPreferentialRate';
import CalcPayments from './components/CalcPayments';
import CalcPrepayments from './components/CalcPrepayments';
import CalcGracePeriod from './components/CalcGracePeriod';
import CalcInterestSupport from './components/CalcInterestSupport';

import {
  BILLION_SUFFIX,
  CALCULATE_LOAN_OPTION_LOAN_VALUE,
  CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE,
  MONTH_SUFFIX,
} from './constants';
import { changeHistory, fetchBrands } from './utils';

import './loan-calculator.module.scss';
import './displayValue.module.scss';

interface LoanCalcProps {
  data?: any,
  isEmbeded?: boolean
}

const LoanCalc = ({ data = {}, isEmbeded = false }: LoanCalcProps) => {
  const [handleData, setHandleData] = useState<any>({});
  const calcObj = useSelector((state: RootStateOrAny) => state.loanCalcObj);
  const [banks, setBanks] = useState<any[]>([]);

  const router = useRouter();

  // Handle values
  const getCalcProperty = useCallback(
    property => {
      return calcObj[property];
    },
    [calcObj],
  );

  const handleChangeValue = useCallback(
    (property, value) => {
      const newQuery = {
        [property]: value,
      };
      changeHistory(router, newQuery);
    },
    [router],
  );

  //AsyncApi
  const asyncFetchBrands = useRequest(fetchBrands, {
    manual: true,
    onSuccess: res => {
      setBanks(res?.data);
    },
  });

  //lifeCycle
  useEffect(() => {
    asyncFetchBrands.run();
  }, []);

  useEffect(() => {
    if (data?.id) {
      const { maxValue, maxTime } = data;
      changeHistory(router, {
        ratio: Number(maxValue) / 100,
        months: Number(maxTime) * 12,
        monthsSuffix: MONTH_SUFFIX,
        calculateLoanOption: CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE,
      });
    }
  }, [data?.id]);

  //handleCheckboxChange
  const onPrePaymentChange = useCallback(
    e => {
      const submitValue = e?.target?.checked ? 1 : 0;

      handleChangeValue('isPrePaymentCheck', submitValue);
    },
    [handleChangeValue],
  );

  const onGracePeriodChange = useCallback(
    e => {
      const submitValue = e?.target?.checked ? 1 : 0;
      handleChangeValue('isGracePeriodCheck', submitValue);
    },
    [handleChangeValue],
  );

  const onInterestRateSupportPeriodChange = useCallback(
    e => {
      const submitValue = e?.target?.checked ? 1 : 0;

      handleChangeValue('isInterestRateSupportPeriodCheck', submitValue);
    },
    [handleChangeValue],
  );

  const onPreferentialRateOptionChange = useCallback(
    e => {
      handleChangeValue('preferentialRateOption', e?.target?.value);
    },
    [handleChangeValue],
  );

  const onPaymentsOptionChange = useCallback(
    e => {
      handleChangeValue('paymentMethod', e?.target?.value);
    },
    [handleChangeValue],
  );

  const onCalculateLoanOptionChange = useCallback(
    e => {
      const value = e?.target?.value;
      const defaultQuery = {
        propertyPriceSuffix: BILLION_SUFFIX,
        calculateLoanOption: value,
      };

      if (value === CALCULATE_LOAN_OPTION_LOAN_VALUE) {
        const newQuery = {
          ...defaultQuery,
          propertyPrice: 2 * 1000 * 1000 * 1000,
          ratio: 1,
        };

        return changeHistory(router, newQuery);
      }
      if (value === CALCULATE_LOAN_OPTION_REAL_ESTATE_VALUE) {
        const newQuery = {
          ...defaultQuery,
          propertyPrice: 3 * 1000 * 1000 * 1000,
          ratio: 0.7,
        };

        return changeHistory(router, newQuery);
      }
    },
    [changeHistory, router],
  );

  const redirectToLoanEstimate = useCallback(() => {
    const { pathname, query } = router;

    router.push({
      pathname: isEmbeded ? '/embeded/uoc-tinh-khoan-vay' : '/uoc-tinh-khoan-vay',
      query: {
        ...query,
        redirect: JSON.stringify({
          pathname,
          query,
        }),
      },
    }, undefined, { shallow: true });
  }, [router]);

  const prepaymentPenalty = useMemo(() => {
    if (handleData && Object.keys(handleData).length > 0) {
      const { prepaymentPenalty } = handleData;

      return `${numeral(prepaymentPenalty).format('0,0,0,0')} đ`;
    }
    return '0 đ';
  }, [handleData]);

  const fetchCalcResultCallback = useCallback(res => {
    setHandleData(res || {});
  }, []);

  return (
    <div className="w1100">
      <div className={'Fn_LoanCalc_Wrapper'}>
        <div className={'Fn_LoanCalc_Calc'}>
          <Row className="Fn_LoanCalc_Calc_Row">
            <Col sm={24} md={14}>
              <CalcRangePickers
                getCalcProperty={getCalcProperty}
                handleChangeValue={handleChangeValue}
                onCalculateLoanOptionChange={onCalculateLoanOptionChange}
                isEmbeded={isEmbeded}
              />
              <CalcPreferentialRate
                getCalcProperty={getCalcProperty}
                handleChangeValue={handleChangeValue}
                onPreferentialRateOptionChange={onPreferentialRateOptionChange}
                banks={banks}
                data = {data}
              />
              <CalcPayments
                onPaymentsOptionChange={onPaymentsOptionChange}
                getCalcProperty={getCalcProperty}
              />
              <CalcPrepayments
                getCalcProperty={getCalcProperty}
                handleChangeValue={handleChangeValue}
                onPrePaymentChange={onPrePaymentChange}
                prepaymentPenalty={prepaymentPenalty}
              />
              <CalcGracePeriod
                getCalcProperty={getCalcProperty}
                handleChangeValue={handleChangeValue}
                onGracePeriodChange={onGracePeriodChange}
              />
              <CalcInterestSupport
                getCalcProperty={getCalcProperty}
                handleChangeValue={handleChangeValue}
                onInterestRateSupportPeriodChange={onInterestRateSupportPeriodChange}
              />
            </Col>
            <Col sm={24} md={{ span: 9, offset: 1 }}>
              <div className={'Fn_LoanCalc_Calc_Right'}>
                <LoanCalcResult data={calcObj} fetchDataCallback={fetchCalcResultCallback} />
              </div>
            </Col>
          </Row>
        </div>
        <div className={'Fn_LoanCalc_Bottom'}>
          <a
            style={{ cursor: 'pointer' }}
            onClick={redirectToLoanEstimate}
            className={'Fn_LoanCalc_Bottom_Wrapper'}
          >
            <h3 style={{ marginRight: 8 }}>Xem thanh toán theo từng tháng</h3>
            <div className={'Fn_LoanCalc_Bottom_Svg'}>
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={9} cy={9} r={9} transform="rotate(-90 9 9)" fill="#0A3ECA" />
                <g clipPath="url(#clip0)">
                  <path
                    d="M7.15346 6.07294L10.0805 8.99999L7.15346 11.927C7.02926 12.0556 6.96054 12.2279 6.96209 12.4066C6.96365 12.5854 7.03535 12.7564 7.16177 12.8828C7.28818 13.0092 7.45919 13.0809 7.63796 13.0825C7.81673 13.084 7.98896 13.0153 8.11755 12.8911L11.5266 9.48203C11.6545 9.35417 11.7263 9.18078 11.7263 8.99999C11.7263 8.81919 11.6545 8.6458 11.5266 8.51794L8.11755 5.10885C8.05466 5.04373 7.97942 4.99179 7.89624 4.95606C7.81305 4.92032 7.72359 4.90151 7.63306 4.90073C7.54252 4.89994 7.45274 4.91719 7.36895 4.95147C7.28516 4.98576 7.20903 5.03638 7.14501 5.1004C7.08099 5.16442 7.03037 5.24055 6.99608 5.32434C6.9618 5.40813 6.94455 5.49791 6.94534 5.58844C6.94612 5.67898 6.96493 5.76844 7.00067 5.85163C7.0364 5.93481 7.08834 6.01005 7.15346 6.07294Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="8.18182"
                      height="8.18182"
                      fill="white"
                      transform="translate(4.9082 13.0908) rotate(-90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>
        <div className={'Fn_LoanCalc_Mobile_Quote'}>
          <span>
            Bảng tính chỉ có giá trị tham khảo. Vui lòng liên hệ tư <br /> vấn trực tiếp để nhận
            được thông tin chính xác nhất.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanCalc;
