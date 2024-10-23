import { Input, InputProps, InputRef } from 'antd';
import {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FloattingLabelBox } from '../FloattingLabelBox';

export type FloatInputRef = InputRef;

interface FloatInputProps extends InputProps {
  label?: React.ReactNode;
}

export const InternalInput = forwardRef<FloatInputRef, FloatInputProps>(
  function InternalInput(
    {
      label,
      placeholder,
      onFocus,
      onBlur,
      value,
      defaultValue,
      style,
      size,
      required,
      ...restProps
    },
    ref,
  ) {
    const initFlag = useRef(false);
    const [isFocus, setIsFocus] = useState(false);
    const [inputValue, setInputValue] = useState<
      InputHTMLAttributes<HTMLInputElement>['value'] | bigint
    >(defaultValue ?? value);

    const handleFocus = useCallback<
      Exclude<React.FocusEventHandler<HTMLInputElement>, undefined>
    >(
      (e) => {
        setIsFocus(true);
        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus],
    );

    const handleBlur = useCallback<
      Exclude<React.FocusEventHandler<HTMLInputElement>, undefined>
    >(
      (e) => {
        setIsFocus(false);
        setInputValue(e.target.value);
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur],
    );

    useEffect(() => {
      if (initFlag.current) {
        setInputValue(value);
      }
      initFlag.current = true;
      return () => {
        initFlag.current = false;
      };
    }, [value]);

    return (
      <FloattingLabelBox
        label={label}
        placeholder={placeholder}
        focused={isFocus}
        haveValue={!!inputValue}
        width={style?.width}
        height={style?.height}
        required={required}
        status={
          restProps.status || (restProps['aria-invalid'] ? 'error' : undefined)
        }
      >
        <Input
          style={{
            ...style,
            width: '100%',
          }}
          ref={ref}
          variant="borderless"
          {...restProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          defaultValue={defaultValue}
          size={size}
        />
      </FloattingLabelBox>
    );
  },
);

export const FloatInput = InternalInput;
