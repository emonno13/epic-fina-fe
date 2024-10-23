import React, { useMemo } from 'react';

import { Checkbox } from 'antd';
import cls from 'classnames';
import { useRouter } from 'next/router';
import CalcRange from '../../loan-calculator-range';

import { TIME_SUFFIX_OBJ, TIME_SUFFIX_OBJ_ENDOW } from '../constants';
import { getExistObj, onSuffixChange } from '../utils';

const CalcGracePeriod = ({ getCalcProperty, handleChangeValue, onGracePeriodChange }) => {
  const existGracePeriodSuffixObj = useMemo(() => {
    return getExistObj(TIME_SUFFIX_OBJ, getCalcProperty('gracePeriodSuffix'));
  }, [getCalcProperty]);
  const router = useRouter();

  return (
    <div className={'Fn_LoanCalc_Calc_grace_period'}>
      <div className={'Fn_LoanCalc_Calc_grace_period_Wrapper'}>
        <div className={'Fn_LoanCalc_Calc_grace_period_Checkbox'}>
          <Checkbox
            onChange={onGracePeriodChange}
            checked={getCalcProperty('isGracePeriodCheck')}
            className={'customCheckbox'}
          >
            <span className={'Fn_LoanCalc_Calc_grace_period_Quote'}>Ân hạn nợ gốc</span>
          </Checkbox>
        </div>
        {getCalcProperty('isGracePeriodCheck') && (
          <div
            className={cls('Fn_LoanCalc_Calc_grace_period_RangePicker', {
              ['block']: !getCalcProperty('isGracePeriodCheck'),
            })}
          >
            <CalcRange
              value={getCalcProperty('gracePeriod')}
              onChange={val => handleChangeValue('gracePeriod', val)}
              max={existGracePeriodSuffixObj.max}
              step={existGracePeriodSuffixObj.step}
              suffix={getCalcProperty('gracePeriodSuffix')}
              multiplier={existGracePeriodSuffixObj.multiplier}
              altSuffix={existGracePeriodSuffixObj.altSuffix}
              suffixOptions={Object.keys(TIME_SUFFIX_OBJ_ENDOW).map(label => ({ label, value: label }))}
              onSuffixChange={val =>
                onSuffixChange({
                  property: 'gracePeriodSuffix',
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

export default CalcGracePeriod;
