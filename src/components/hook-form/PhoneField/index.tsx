import { BasePhoneInputProps, InputPhoneNumber } from '@components/base/inputPhoneNumber';
import { FormItem } from '@components/hook-form/formItem';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

interface PhoneFieldBaseProps extends Omit<BasePhoneInputProps, 'onChange'> {
  onChange?: (phone: string) => void;
  handleChange?: (phone: string) => void;
  fieldError?: FieldError;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  hideError?: boolean;
  name: string;
  noSpacing?: boolean;
}

const PhoneField: React.FC<Partial<PhoneFieldBaseProps>> = (props) => {
  const { required, fieldError, noSpacing, label, onChange, ...remainingProps } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <InputPhoneNumber
        {...remainingProps}
        error={isError}
        onChange={(phone: string, { country, inputValue }) => {
          let formatedValue = '';
          if (inputValue && country) {
            formatedValue = phone;
          }
          if (typeof onChange === 'function') {
            if (formatedValue) {
              onChange(formatedValue);
            } else {
              onChange('');
            }
          }
          if (formatedValue) {
            onChange && onChange(formatedValue);
          } else {
            onChange && onChange('');
          }
        }}
      />
    );
  };

  return (
    <FormItem isError={isError} label={label} required={required}>
      <FormItem.Body noSpacing={noSpacing}>{renderField()}</FormItem.Body>
      {isError && <FormItem.ErrorMessage message={fieldError?.message} />}
    </FormItem>
  );
};

export const PhoneFieldControl = (props: PhoneFieldBaseProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      {...props}
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <PhoneField {...props} onChange={onChange} onBlur={onBlur} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default PhoneField;
