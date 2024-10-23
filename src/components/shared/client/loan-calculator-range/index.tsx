import { useCallback, useEffect, useMemo, useState } from 'react';

import { Input, Select, Slider } from 'antd';

import { formatNumber } from '@components/shared/common-form-elements/utils';
import { useRequest } from '@umijs/hooks';
import BigNumber from 'bignumber.js';
import { ArrowDownIconSvg } from 'icons';
import { isEmpty } from 'lodash';
import { number } from '../loan-calculator/utils';

import './loan-calculator-range.module.scss';

const { Option } = Select;

interface CalcRangeProps {
  value?: any;
  onChange?: Function;
  max: number;
  step: number;
  title?: string;
  suffix: string;
  altSuffix?: string;
  onSuffixChange?: (value: any) => void;
  multiplier?: number;
  disable?: boolean;
  suffixOptions?: any[];
  placeholder?: string;
}

const CalcRange = (props: CalcRangeProps) => {
  const {
    value,
    onChange,
    max,
    step,
    title,
    suffix,
    altSuffix,
    onSuffixChange,
    multiplier = 1,
    disable = false,
    suffixOptions = [],
    placeholder,
  } = props;

  const [rangeValue, setRangeValue] = useState<number | any>();
  const [changedSuffix, setChangedSuffix] = useState(false);

  const isMultipleSuffix = useMemo(
    () => !!(onSuffixChange && altSuffix),
    [onSuffixChange, altSuffix],
  );

  const normalizedValue = useCallback((val, multi) => {
    const bigVal = new BigNumber(val);

    return bigVal.dividedBy(multi).toNumber();
  }, []);

  const submitValue = useCallback(
    (val) => {
      const bigVal = new BigNumber(val);

      return bigVal.times(multiplier).toNumber();
    },
    [multiplier],
  );

  const onSubmit = useRequest(onChange as any, {
    manual: true,
    debounceInterval: 300,
  });

  const onSliderChange = useCallback(
    (val) => {
      if (!changedSuffix) {
        setRangeValue(val);
        onSubmit.run(submitValue(val));
      }
      setChangedSuffix(false);
    },
    [submitValue, onSubmit, changedSuffix],
  );

  const onInputChange = useCallback(
    (e) => {
      const val = e?.target?.value;

      if (val === '' || val === '0') {
        setRangeValue('');
        onSubmit.run(submitValue(0));
        return;
      }
      const formatVal = val.replace(/,/g, '');
      let newRangeValue = 0;

      if (formatVal.match(number)) {
        newRangeValue = val;
      }
      if (formatVal > max) {
        newRangeValue = max;
      }
      setRangeValue(newRangeValue);
      onSubmit.run(submitValue(newRangeValue));
    },
    [onSubmit, max, submitValue],
  );

  const onSuffixClick = useCallback(() => {
    if (isMultipleSuffix) {
      if (onSuffixChange) onSuffixChange(altSuffix);
      setChangedSuffix(true);
    }
  }, [altSuffix, isMultipleSuffix, onSuffixChange]);

  useEffect(() => {
    if (value === 0 && rangeValue === '') {
      setRangeValue('');
    } else {
      setRangeValue(normalizedValue(value, multiplier));
    }
  }, [multiplier, value]);

  const onFocus = () => {
    if (rangeValue === 0 || rangeValue === '' || rangeValue === '0') {
      setRangeValue('');
    }
  };

  const onBlur = () => {
    if (rangeValue === 0 || rangeValue === '' || rangeValue === '0') {
      setRangeValue('0');
    }
  };

  return (
    <div className={'Fn_LoanCalc_Calc_RangePicker_Wrapper'}>
      {title && <h3>{title}</h3>}
      <div className={'Fn_LoanCalc_Calc_RangePicker'}>
        <Slider
          disabled={disable}
          value={rangeValue}
          onChange={onSliderChange}
          className={'customSlider'}
          min={0}
          max={max}
          step={step}
        />
        <Input.Group compact>
          <Input
            className={'customInput'}
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
            value={formatNumber(rangeValue)}
            onChange={onInputChange}
            disabled={disable}
            addonAfter={
              isMultipleSuffix ? (
                <Select
                  {...{
                    onChange: onSuffixChange,
                    defaultValue: suffix,
                    suffixIcon: <ArrowDownIconSvg />,
                    className: 'Fn_LoanCalc_Calc_RangePicker__suffix',
                  }}
                >
                  {!isEmpty(suffixOptions) &&
                    suffixOptions.map((suffixOption) => {
                      return (
                        <Option
                          className="option-select-loan-calculator"
                          key={suffixOption?.value}
                          value={suffixOption?.value}
                        >
                          {suffixOption?.label}
                        </Option>
                      );
                    })}
                </Select>
              ) : null
            }
            placeholder={placeholder}
            suffix={!isMultipleSuffix ? suffix : null}
          />
        </Input.Group>
      </div>
    </div>
  );
};

export default CalcRange;
