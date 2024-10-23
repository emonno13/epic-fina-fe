import React, { PropsWithChildren, ReactNode } from 'react';
import * as S from './FormItem.styles';

interface FormControlProps {
  isError?: boolean;
  label?: string | ReactNode;
  required?: boolean;
  labelProps?: FormLabelProps;
}

export interface FormLabelProps {
  required?: boolean;
  strong?: boolean;
}

interface FormBodyProps {
  suffix?: string;
  noSpacing?: boolean;
}

interface FormErrorMessageProps {
  message?: string;
}

interface CompoundedComponent {
  Body: React.FC<FormBodyProps & PropsWithChildren>;
  ErrorMessage: React.FC<FormErrorMessageProps>;
}

export const FormLabel: React.FC<FormLabelProps & PropsWithChildren> = ({
  required = false,
  strong = false,
  ...props
}) => {
  return <S.StyledFormLabel $required={required} $strong={strong} {...props} />;
};

export const FormItem: React.FC<FormControlProps & PropsWithChildren> & CompoundedComponent = ({
  isError,
  label,
  required,
  labelProps,
  ...props
}) => {
  return (
    <S.StyledFormControl $isError={isError} {...props}>
      {label && (
        <FormLabel required={required} {...labelProps}>
          {label}
        </FormLabel>
      )}
      {props.children}
    </S.StyledFormControl>
  );
};

const FormBody: React.FC<FormBodyProps & PropsWithChildren> = ({ noSpacing = false, suffix, ...props }) => (
  <S.StyledFormBody $noSpacing={noSpacing} {...props}>
    <S.StyledFormInner>{props.children}</S.StyledFormInner>
    {suffix && <S.StyledSuffix>{suffix}</S.StyledSuffix>}
  </S.StyledFormBody>
);

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => (
  <S.StyledFormErrorMessage>{message}</S.StyledFormErrorMessage>
);

FormItem.Body = FormBody;
FormItem.ErrorMessage = FormErrorMessage;
