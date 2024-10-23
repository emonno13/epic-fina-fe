import { Button, ButtonProps } from 'antd';
import cls from 'classnames';
import { ReactNode } from 'react';

import './invest-btn.module.scss';

interface IInvestButton extends ButtonProps {
  children: ReactNode | string;
}
export const InvestButton = (props: IInvestButton) => {
  const { className, children, ...resProps } = props;
  return <Button className={cls('invest-btn', className)} {...resProps}>
    {children}
  </Button>;
};
