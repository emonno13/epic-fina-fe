import { useCallback, useEffect, useState } from 'react';

import { HInputNumber } from '@components/shared/common-form-elements/h-input';
import { useRequest } from '@umijs/hooks';
import { InputProps } from 'antd';
import BigNumber from 'bignumber.js';

import './loan-calculator-input.module.scss';

interface CalcInputProps extends InputProps {
  label: string;
  multiplier?: number;
}

const CalcInput = ({
  label,
  value,
  onChange,
  multiplier = 1,
  ...rest
}: CalcInputProps) => {
  const [inputValue, setInputValue] = useState<any>('');

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

  const onInputChange = useCallback(
    (val) => {
      setInputValue(val);
      onSubmit.run(submitValue(val));
    },
    [onSubmit, submitValue],
  );

  useEffect(() => {
    if (value === 0 && inputValue === '') {
      setInputValue('');
    } else {
      setInputValue(normalizedValue(value, multiplier));
    }
  }, [multiplier, value]);

  return (
    <div className={'loan-calculator-input-wrapper'}>
      <h3>{label}</h3>
      <HInputNumber
        {...(rest as any)}
        className={'loan-calculator-input-wrapper__input'}
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default CalcInput;
