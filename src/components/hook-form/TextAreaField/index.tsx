import { BaseInput } from '@components/base/baseInput/BaseInput';
import { FormItem, FormLabelProps } from '@components/hook-form/formItem';
import { IFormControl } from '@interfaces/interfaces';
import { TextAreaProps } from 'antd/es/input/TextArea';
import React, { ChangeEvent, ReactNode } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseTextAreaFieldProps = TextAreaProps;

interface TextAreaBaseProps extends BaseTextAreaFieldProps {
  handleChange?: (val: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldError?: FieldError;
  label?: string | ReactNode;
  labelProps?: FormLabelProps;
}

const TextAreaField: React.FC<TextAreaBaseProps> = (props) => {
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
      <BaseInput.TextArea
        {...(remainingProps as BaseTextAreaFieldProps)}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e);
          handleChange && handleChange(e.target.value);
        }}
        maxLength={maxLength}
      />
    );
  };
  return (
    <FormItem isError={isError} required={required} label={label} labelProps={labelProps}>
      <FormItem.Body>{renderField()}</FormItem.Body>
      {isError && <FormItem.ErrorMessage message={fieldError?.message} />}
    </FormItem>
  );
};

export const TextAreaFieldControl: React.FC<TextAreaBaseProps & IFormControl> = (props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextAreaField {...props} onChange={onChange} onBlur={onBlur} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default TextAreaField;
