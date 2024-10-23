import { Input, InputNumber, InputNumberProps } from 'antd';
import { InputProps, PasswordProps, TextAreaProps } from 'antd/lib/input';
import { FC, ReactNode } from 'react';
import { isEmpty } from 'underscore';

import { useHTranslation } from '@lib/i18n';
import { useFetchReferralUserDebounce } from '@components/features/organizations/users/hooks';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { ConverterUtils } from '@lib/converter';
import { handleChangeInput } from './comment';
import { removeUnnecessaryProps } from '../../../../schema-form/h-types';

import './h-input.module.scss';

export interface HInputProps extends InputProps {
  uppercase?: boolean;
  lowercase?: boolean;
  deleteWhiteSpace?: boolean;
  valueConverter?: any;
  label?: string;
  value?: any;
  required?: boolean;
  modernLabel?: boolean;
}

const removeUnnecessaryInputProps = (props) => {
  return removeUnnecessaryProps({ ...props }, [
    'uppercase',
    'lowercase',
    'deleteWhiteSpace',
    'valueConverter',
    'label',
    'modernLabel',
  ]);
};

export const getPropertiesOfFloatLabel = (required) => {
  const requiredMark = required ? <span className="text-danger">*</span> : null;
  return { labelClass: 'label as-label', requiredMark };
};

export const ModernLabel = ({ labelClass, label, requiredMark }) => (
  <label className={labelClass}>
    {requiredMark} {label}
  </label>
);

export const HInput = (props: HInputProps) => {
  const { label, required, modernLabel } = props;

  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);
  const inputProps = removeUnnecessaryInputProps(props);

  const Component = () => (
    <Input
      {...{
        ...inputProps,
        onChange: (event) => handleChangeInput(event, props),
      }}
    />
  );

  if (!modernLabel) return Component();

  return (
    <div className="h-input__float-label">
      {Component()}
      <ModernLabel
        label={label}
        labelClass={labelClass}
        requiredMark={requiredMark}
      />
    </div>
  );
};

export interface HTextAreaProps extends TextAreaProps {
  uppercase?: boolean;
  lowercase?: boolean;
  deleteWhiteSpace?: boolean;
  valueConverter?: any;
  modernLabel?: boolean;
  label?: string;
}

export const HTextArea = (props: HTextAreaProps) => {
  const { required, modernLabel, label } = props;
  const inputProps = removeUnnecessaryInputProps(props);
  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);

  const Component = () => (
    <Input.TextArea
      {...{
        ...inputProps,
        onChange: (event) => handleChangeInput(event, props),
      }}
    />
  );

  if (!modernLabel) return Component();

  return (
    <div className="h-input__float-label">
      <Input.TextArea
        {...{
          ...inputProps,
          onChange: (event) => handleChangeInput(event, props),
        }}
      />
      <ModernLabel
        label={label}
        labelClass={labelClass}
        requiredMark={requiredMark}
      />
    </div>
  );
};

export const HSearch = (props: HInputProps) => {
  const inputProps = removeUnnecessaryInputProps(props);
  return (
    <Input.Search
      {...{
        ...inputProps,
        onChange: (event) => handleChangeInput(event, props),
      }}
    />
  );
};

export interface HInputNumberProps extends InputNumberProps {
  typeInput?: 'interger' | 'float';
  decimalNumber?: number;
  suffix?: ReactNode;
  modernLabel?: string;
  required?: boolean;
  label?: string;
}

export const HInputNumber = (props: HInputNumberProps) => {
  const {
    onChange,
    typeInput = 'float',
    decimalNumber = 2,
    suffix,
    modernLabel,
    required,
    label,
    ...subProps
  } = props;
  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);
  const onChangeInput = (number) => {
    let value = number;
    switch (typeInput) {
      case 'float':
        value = parseFloat(Number(number).toFixed(decimalNumber));
        break;
      case 'interger':
        value = parseInt(number);
        break;

      default:
        break;
    }
    onChange && onChange(value);
  };

  return (
    <div className="h-input-number-container">
      <InputNumber
        {...{
          ...subProps,
          onChange: onChangeInput,
        }}
      />
      {suffix && <div className="h-input-number-suffix">{suffix}</div>}
      {modernLabel && (
        <ModernLabel
          label={label}
          labelClass={labelClass}
          requiredMark={requiredMark}
        />
      )}
    </div>
  );
};

export interface HPasswordProps extends PasswordProps {
  label?: string;
  value?: any;
  required?: boolean;
  modernLabel?: boolean;
}
const Password: FC<HPasswordProps> = (props) => {
  const { label, required, modernLabel } = props;

  const { labelClass, requiredMark } = getPropertiesOfFloatLabel(required);
  const inputProps = removeUnnecessaryInputProps(props);

  const Component = () => (
    <Input.Password
      {...{
        ...inputProps,
        onChange: (event) => handleChangeInput(event, props),
      }}
    />
  );

  if (!modernLabel) return Component();

  return (
    <div className="h-input-password">
      {Component()}
      <ModernLabel
        label={label}
        labelClass={labelClass}
        requiredMark={requiredMark}
      />
    </div>
  );
};
HInput.Password = Password;

export const ReferralUserView: FC<{ referralCode?: string }> = ({
  referralCode,
}) => {
  const { t } = useHTranslation('common');
  const user = useFetchReferralUserDebounce(referralCode, 300);

  if (!referralCode) return <></>;

  if (isEmpty(user)) {
    return (
      <ItemViewer
        label={t('Người giới thiệu:', {
          vn: 'Người giới thiệu:',
          en: 'Referral user:',
        })}
        value={t('Không xác định', { vn: 'Không xác định', en: 'Unknown' })}
      />
    );
  }

  return (
    <ItemViewer
      label={t('Người giới thiệu:', {
        vn: 'Người giới thiệu:',
        en: 'Referral user:',
      })}
      value={ConverterUtils.getFullNameUser(user)}
    />
  );
};

interface HInputReferralProps extends HInputProps {
  value?: string;
  defaultValue?: string;
}
export const HInputReferral: FC<HInputReferralProps> = (props) => {
  const { value, ...hInputProps } = props;
  const { t } = useHTranslation('common');

  return (
    <div>
      <HInput
        modernLabel
        deleteWhiteSpace
        placeholder={t('Referral code', { vn: 'Mã giới thiệu' })}
        className="fina-form__input-control"
        {...hInputProps}
      />
      <ReferralUserView referralCode={value} />
    </div>
  );
};
