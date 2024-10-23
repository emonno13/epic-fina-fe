import { FormItem } from '@components/hook-form/formItem';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { TagsInput, TagsInputProps } from 'react-tag-input-component';

type BaseInputTagProps = TagsInputProps & {
  label?: string;
  required?: boolean;
};

interface InputTagBaseProps extends Omit<BaseInputTagProps, 'onChange'> {
  handleChange?: (selected: string[]) => void;
  onChange?: (selected: string[]) => void;
  fieldError?: FieldError;
  label?: string;
  hideError?: boolean;
}

const InputTagField: React.FC<Partial<InputTagBaseProps>> = (props) => {
  const { required, name, label, fieldError, onChange, handleChange, value, placeHolder, ...remainingProps } = props;
  const isError = !!fieldError;

  const renderField = () => {
    return (
      <TagsInput
        {...remainingProps}
        value={value}
        classNames={{
          tag: 'tag-container',
          input: 'input-container',
        }}
        onChange={(tags) => {
          onChange && onChange?.(tags);
          handleChange && handleChange?.(tags);
        }}
        name={name}
        placeHolder={placeHolder}
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

export const InputTagFieldControl = (props: InputTagBaseProps & { name: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const internalProps = {
    ...props,
    errors,
  };
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <InputTagField
          {...internalProps}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default InputTagField;
