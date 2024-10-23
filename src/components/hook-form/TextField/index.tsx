'use client';
import {
  BaseInput,
  BaseInputProps,
} from '@components/base/baseInput/BaseInput';
import { FloatInput, FloatInputRef } from '@components/base/FloatInput';
import { FormItem } from '@components/hook-form/formItem';
import { IFormControl } from '@interfaces/interfaces';
import cn from '@utils';
import { Image } from 'antd';
import React, { ChangeEvent, ReactNode, forwardRef } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseInputFieldProps = BaseInputProps;

interface TextFieldBaseProps extends BaseInputFieldProps {
  handleChange?: (val: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldError?: FieldError;
  label?: string | ReactNode;
  noSpacing?: boolean;
  isFloatInput?: boolean;
}
export const TextField = forwardRef<FloatInputRef, TextFieldBaseProps>(
  function TextField(props, ref) {
    const {
      label,
      required,
      placeholder,
      fieldError,
      disabled,
      maxLength,
      onChange,
      handleChange,
      noSpacing,
      className,
      type,
      isFloatInput,
      ...remainingProps
    } = props;
    const isError = !!fieldError;

    const renderField = () => {
      if (isFloatInput) {
        return (
          <FloatInput
            {...(remainingProps as BaseInputFieldProps)}
            ref={ref}
            disabled={disabled}
            required={required}
            label={label}
            placeholder={placeholder}
            onChange={(e) => {
              onChange && onChange(e);
              handleChange && handleChange(e.target.value);
            }}
            className={cn(`${className}`, { '!border-[#E87070]': isError })}
            maxLength={maxLength}
          />
        );
      }

      if (type === 'password') {
        return (
          <BaseInput.Password
            {...(remainingProps as BaseInputFieldProps)}
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => {
              onChange && onChange(e);
              handleChange && handleChange(e.target.value);
            }}
            className={cn(`${className}`, { '!border-[#E87070]': isError })}
            maxLength={maxLength}
          />
        );
      }

      return (
        <BaseInput
          {...(remainingProps as BaseInputFieldProps)}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            onChange && onChange(e);
            handleChange && handleChange(e.target.value);
          }}
          className={cn(`${className}`, { '!border-[#E87070]': isError })}
          maxLength={maxLength}
        />
      );
    };
    return (
      <FormItem
        isError={isError}
        label={isFloatInput ? '' : label}
        required={required}
      >
        <FormItem.Body noSpacing={noSpacing}>{renderField()}</FormItem.Body>
        {isError && (
          <div className="flex items-center gap-x-[6px]">
            <Image
              alt="img-error"
              width={16}
              preview={false}
              src="/icon/error-icon.svg"
            />
            <FormItem.ErrorMessage message={fieldError?.message} />
          </div>
        )}
      </FormItem>
    );
  },
);

export const TextFieldControl: React.FC<TextFieldBaseProps & IFormControl> = (
  props,
) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
        <TextField
          {...props}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default TextField;
