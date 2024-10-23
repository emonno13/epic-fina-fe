import { InputNumberProps } from 'antd';
import React from 'react';
import * as S from './BaseInputNumber.styles';

export type BaseInputNumberRef = HTMLInputElement;

export type BaseInputNumberProps = InputNumberProps;

interface BaseInputNumberInterface
  extends React.ForwardRefExoticComponent<BaseInputNumberProps & React.RefAttributes<BaseInputNumberRef>> {}

const InternalInputNumber = React.forwardRef<BaseInputNumberRef, BaseInputNumberProps>(function InternalInputNumber(
  { ...props },
  ref,
) {
  return <S.InputNumber ref={ref} {...props} />;
});

export const BaseInputNumber = InternalInputNumber as BaseInputNumberInterface;
