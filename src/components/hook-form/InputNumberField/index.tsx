import { BaseInputNumber, BaseInputNumberProps } from '@components/base/baseInputNumber/BaseInputNumber';
import { FormItem, FormLabelProps } from '@components/hook-form/formItem';
import { IFormControl } from '@interfaces/interfaces';
import React, { ReactNode } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

interface InputNumberFieldBaseProps extends BaseInputNumberProps {
  handleChange?: (val: any) => void;
  fieldError?: FieldError;
  label?: string | ReactNode;
  labelProps?: FormLabelProps;
}

const InputNumberField: React.FC<InputNumberFieldBaseProps> = (props) => {
  const {
    label,
    placeholder,
    fieldError,
    disabled,
    maxLength,
    required,
    labelProps,
    onChange,
    handleChange,
    ...remainingProps
  } = props;
  const isError = !!fieldError;

  const renderField = () => {
    return (
      <BaseInputNumber
        {...(remainingProps as BaseInputNumberProps)}
        style={{ width: '100%' }}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(val) => {
          onChange && onChange(val);
          handleChange && handleChange(val);
        }}
        maxLength={maxLength}
      />
    );
  };
  return (
    <FormItem isError={isError} label={label} required={required}>
      <FormItem.Body>{renderField()}</FormItem.Body>
      {isError && <FormItem.ErrorMessage message={fieldError?.message} />}
    </FormItem>
  );
};

export const InputNumberFieldControl: React.FC<InputNumberFieldBaseProps & IFormControl> = (props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <InputNumberField {...props} onChange={onChange} onBlur={onBlur} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default InputNumberField;
