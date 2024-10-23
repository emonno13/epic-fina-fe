import { FormItem } from '@components/hook-form/formItem';
import { IFormControl } from '@interfaces/interfaces';
import { Checkbox, CheckboxProps } from 'antd';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

interface AcceptTermsCheckboxProps extends CheckboxProps {
  handleChange?: (val: string) => void;
  onChange?: (e: any) => void;
  fieldError?: FieldError;
  label?: string | ReactNode;
  noSpacing?: boolean;
}

export const AcceptTermsCheckboxControl: React.FC<
  AcceptTermsCheckboxProps & IFormControl
> = (props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => {
        console.log('fieldState.error', Boolean(fieldState.error));
        return (
          <FormItem
            isError={Boolean(fieldState.error)}
            required={props.required}
          >
            <FormItem.Body noSpacing={props.noSpacing}>
              <Checkbox
                id="checkbox-accept-term"
                {...props}
                ref={ref}
                onChange={onChange}
                value={value}
                className={`hidden`}
              ></Checkbox>
              <label
                className="flex flex-row items-center gap-x-1"
                htmlFor="checkbox-accept-term"
              >
                <Image
                  className="hover:cursor-pointer"
                  width={17}
                  height={17}
                  alt=""
                  src={
                    value
                      ? '/icon/check-accept-terms.svg'
                      : '/icon/uncheck-accept-terms.svg'
                  }
                />
                <span
                  className={`${
                    fieldState.error
                      ? '!text-[#ff4d4f]/[0.8]'
                      : '!text-[#586379]'
                  } text-[16px] font-normal leading-[20px] text-[#000000B2]`}
                >
                  {props.label}
                </span>
              </label>
            </FormItem.Body>
            {Boolean(fieldState.error) && <div className="mb-[20px]" />}
          </FormItem>
        );
      }}
    />
  );
};

export default AcceptTermsCheckboxControl;
