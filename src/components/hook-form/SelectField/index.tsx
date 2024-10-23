import {
  BaseSelect,
  BaseSelectProps,
} from '@components/base/baseSelect/BaseSelect';
import { FloatSelect } from '@components/base/FloatSelect';
import { FormItem } from '@components/hook-form/formItem';
import { SelectProps } from 'antd';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

interface SelectBaseProps extends SelectProps {
  handleChange?: (val: string) => void;
  fieldError?: FieldError;
  label?: string;
  required?: boolean;
  noSpacing?: boolean;
  name: string;
  isFloatComponent?: boolean;
}

interface SelectFieldControlProps extends SelectBaseProps {
  name: string;
  isFloatComponent?: boolean;
}

const SelectField: React.FC<SelectBaseProps> = (props) => {
  const {
    label,
    noSpacing,
    required,
    placeholder,
    disabled,
    handleChange,
    fieldError,
    onChange,
    isFloatComponent,
    ...remainingProps
  } = props;
  const isError = !!fieldError;
  const onSelectChange = (selected: any) => {
    onChange && onChange(selected, []);
    if (typeof handleChange === 'function') {
      handleChange(selected);
    }
  };

  return (
    <FormItem
      isError={isError}
      label={isFloatComponent ? '' : label}
      required={required}
    >
      <FormItem.Body noSpacing={noSpacing}>
        {isFloatComponent ? (
          <FloatSelect
            {...(remainingProps as BaseSelectProps)}
            style={{ width: '100%' }}
            disabled={disabled}
            label={label}
            required={required}
            placeholder={placeholder}
            onChange={onSelectChange}
          />
        ) : (
          <BaseSelect
            {...(remainingProps as BaseSelectProps)}
            style={{ width: '100%' }}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onSelectChange}
          />
        )}
      </FormItem.Body>
      {isError && <FormItem.ErrorMessage message={fieldError?.message} />}
    </FormItem>
  );
};

export const SelectFieldControl: React.FC<SelectFieldControlProps> = (
  props,
) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <SelectField
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default SelectField;
