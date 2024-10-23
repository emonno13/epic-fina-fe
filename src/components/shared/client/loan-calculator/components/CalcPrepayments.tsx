import React, { useMemo } from 'react';

import { Checkbox } from 'antd';
import cls from 'classnames';
import { useRouter } from 'next/router';
import DisplayLoanCalcValue from './DisplayValue';
import CalcRange from '../../loan-calculator-range';

import { TIME_SUFFIX_OBJ, TIME_SUFFIX_OBJ_ENDOW } from '../constants';
import { getExistObj, onSuffixChange } from '../utils';

const CalcPrepayments = ({
  getCalcProperty,
  handleChangeValue,
  onPrePaymentChange,
  prepaymentPenalty,
}) => {
  const existPrePaymentMonthsSuffixObj = useMemo(() => {
    return getExistObj(TIME_SUFFIX_OBJ, getCalcProperty('prePaymentMonthsSuffix'));
  }, [getCalcProperty]);
  const router = useRouter();

  return (
    <div className={'Fn_LoanCalc_Calc_prepayments'}>
      <div className={'Fn_LoanCalc_Calc_prepayments_Wrapper'}>
        <div className={'Fn_LoanCalc_Calc_prepayments_Checkbox'}>
          <Checkbox
            onChange={onPrePaymentChange}
            checked={getCalcProperty('isPrePaymentCheck')}
            className={'customCheckbox'}
          >
            <span className={'Fn_LoanCalc_Calc_prepayments_Quote'}>Thanh toán trước hạn</span>
          </Checkbox>
        </div>
        {getCalcProperty('isPrePaymentCheck') && (
          <div
            className={cls('Fn_LoanCalc_Calc_prepayments_RangePicker', {
              ['block']: !getCalcProperty('isPrePaymentCheck'),
            })}
          >
            <DisplayLoanCalcValue title="Phí trả nợ trước hạn" value={prepaymentPenalty} />
            <CalcRange
              value={getCalcProperty('prePaymentMonths')}
              onChange={val => handleChangeValue('prePaymentMonths', val)}
              max={existPrePaymentMonthsSuffixObj.max}
              step={existPrePaymentMonthsSuffixObj.step}
              title="Thời gian dự tính thanh toán"
              suffix={getCalcProperty('prePaymentMonthsSuffix')}
              multiplier={existPrePaymentMonthsSuffixObj.multiplier}
              altSuffix={existPrePaymentMonthsSuffixObj.altSuffix}
              onSuffixChange={val =>
                onSuffixChange({
                  property: 'prePaymentMonthsSuffix',
                  val,
                  router,
                })
              }
              disable={!getCalcProperty('isPrePaymentCheck')}
              suffixOptions={Object.keys(TIME_SUFFIX_OBJ_ENDOW).map(label => ({ label, value: label }))}
            />
            <CalcRange
              value={getCalcProperty('prePaymentRate')}
              onChange={val => handleChangeValue('prePaymentRate', val)}
              max={40}
              step={0.1}
              title="Phí thanh toán trước hạn"
              suffix="%"
              multiplier={1 / 100}
              disable={!getCalcProperty('isPrePaymentCheck')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalcPrepayments;
