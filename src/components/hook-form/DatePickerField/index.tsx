import { DatePicker as AntDatePicker, DatePickerProps } from 'antd';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { FormItem } from '../formItem';

interface DatepickerBaseProps extends DatePickerProps {
  fieldError?: FieldError;
  label?: string;
  required?: boolean;
  noSpacing?: boolean;
}

const DatePickerField: React.FC<DatepickerBaseProps> = (props) => {
  const { label, noSpacing, required, placeholder, disabled, fieldError, onChange, ...remainingProps } = props;
  const isError = !!fieldError;

  return (
    <FormItem isError={isError} label={label} required={required}>
      <FormItem.Body noSpacing={noSpacing}>
        <AntDatePicker
          {...remainingProps}
          style={{ width: '100%' }}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          // suffixIcon={<CustomIcon iconName='calendar' />}
        />
      </FormItem.Body>
      {isError && <FormItem.ErrorMessage message={fieldError?.message} />}
    </FormItem>
  );
};

export const DatePickerFieldControl: React.FC<DatepickerBaseProps & { name: string }> = (props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
        <DatePickerField
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default DatePickerField;
