'use client';
import { Input, InputProps, InputRef } from 'antd';
import React from 'react';
import * as S from './BaseInput.styles';

export type BaseInputRef = InputRef;

export type BaseInputProps = InputProps;

interface BaseInputInterface extends React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<InputRef>> {
  Group: typeof Input.Group;
  Search: typeof Input.Search;
  TextArea: typeof Input.TextArea;
  Password: typeof Input.Password;
}

const InternalInput = React.forwardRef<BaseInputRef, BaseInputProps>(function InternalInput(
  { children, ...props },
  ref,
) {
  return (
    <S.Input ref={ref} maxLength={1000} {...props}>
      {children}
    </S.Input>
  );
});

export const BaseInput = InternalInput as BaseInputInterface;

BaseInput.Group = Input.Group;
BaseInput.Search = Input.Search;
BaseInput.TextArea = Input.TextArea;
BaseInput.Password = Input.Password;
