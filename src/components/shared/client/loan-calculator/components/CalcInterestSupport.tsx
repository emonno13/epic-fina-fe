import React, { useMemo } from 'react';

import { Checkbox } from 'antd';
import cls from 'classnames';
import { useRouter } from 'next/router';
import CalcRange from '../../loan-calculator-range';

import { TIME_SUFFIX_OBJ } from '../constants';
import { getExistObj, onSuffixChange } from '../utils';

const CalcInterestSupport = ({
  getCalcProperty,
  handleChangeValue,
  onInterestRateSupportPeriodChange,
}) => {
  const existInterestRateSupportPeriodSuffixObj = useMemo(() => {
    return getExistObj(TIME_SUFFIX_OBJ, getCalcProperty('interestRateSupportPeriodSuffix'));
  }, [getCalcProperty]);
  const router = useRouter();
  return (
    <div className={'Fn_LoanCalc_Calc_prepayments'}>
      <div className={'Fn_LoanCalc_Calc_prepayments_Wrapper'}>
        <div className={'Fn_LoanCalc_Calc_prepayments_Checkbox'}>
          <Checkbox
            onChange={onInterestRateSupportPeriodChange}
            checked={getCalcProperty('isInterestRateSupportPeriodCheck')}
            className={'customCheckbox'}
          >
            <span className={'Fn_LoanCalc_Calc_prepayments_Quote'}>Hỗ trợ lãi suất</span>
          </Checkbox>
        </div>
        {getCalcProperty('isInterestRateSupportPeriodCheck') && (
          <div
            className={cls('Fn_LoanCalc_Calc_prepayments_RangePicker', {
              ['block']: !getCalcProperty('isInterestRateSupportPeriodCheck'),
            })}
          >
            <CalcRange
              value={getCalcProperty('interestRateSupportPeriod')}
              onChange={val => handleChangeValue('interestRateSupportPeriod', val)}
              max={existInterestRateSupportPeriodSuffixObj.max}
              step={existInterestRateSupportPeriodSuffixObj.step}
              suffix={getCalcProperty('interestRateSupportPeriodSuffix')}
              multiplier={existInterestRateSupportPeriodSuffixObj.multiplier}
              altSuffix={existInterestRateSupportPeriodSuffixObj.altSuffix}
              onSuffixChange={val =>
                onSuffixChange({
                  property: 'interestRateSupportPeriodSuffix',
                  val,
                  router,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalcInterestSupport;
