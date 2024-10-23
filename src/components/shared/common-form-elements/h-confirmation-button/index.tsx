import { ButtonProps } from 'antd/lib/button';
import React, { ReactElement } from 'react';
import { Button, Popconfirm } from 'antd';

export interface HButtonProps extends ButtonProps {
  confirmMessage?: string,
  onClick?: any | Function
}

export const HButton = ({ confirmMessage, onClick, children, ...props }: HButtonProps): ReactElement => {

  if (!confirmMessage) {
    return (<Button {...props} onClick={onClick}>{children}</Button>);
  }

  return (
    <Popconfirm onConfirm={onClick} title={confirmMessage}>
      <Button {...props}>{children}</Button>
    </Popconfirm>
  );
};
