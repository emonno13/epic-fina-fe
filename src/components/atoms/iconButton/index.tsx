import { ButtonProps as AntButtonProps } from 'antd';
import React from 'react';
import * as S from './IconButton.styles';
export interface BaseButtonProps extends AntButtonProps {
  noStyle?: boolean;
  hasBg?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(function IconButton(
  { children, hasBg, ...props },
  ref,
) {
  return (
    <S.StyledIconButton ref={ref} $hasBg={hasBg} type='text' size='small' {...props}>
      {children}
    </S.StyledIconButton>
  );
});
