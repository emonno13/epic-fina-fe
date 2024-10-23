import { ButtonProps as AntButtonProps, Button as AntdButton } from 'antd';
import React from 'react';
import * as S from './BaseButton.styles';

export const { Group: ButtonGroup } = AntdButton;

export interface BaseButtonProps extends AntButtonProps {
  noStyle?: boolean;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(function BaseButton(
  { children, ...props },
  ref,
) {
  return (
    <S.StyledButton ref={ref} htmlType='button' {...props}>
      {children}
    </S.StyledButton>
  );
});
