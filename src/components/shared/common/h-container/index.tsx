import classNames from 'classnames';
import { ReactNode } from 'react';

import './h-container.module.scss';

type IContainer = {
  children: ReactNode,
  className?: string,
};

const HContainer = ({ children, className }: IContainer) => {
  return (
    <div className={classNames('container', className)}>
      {children}
    </div>
  );
};

const HSmallContainer = ({ children, className }: IContainer) => {
  return (
    <div className={classNames('smallContainer', className)}>
      {children}
    </div>
  );
};

const HHalfContainer = ({ children, className }: IContainer) => {
  return (
    <div className={classNames('halfContainer', className)}>
      {children}
    </div>
  );
};

const HBigContainer = ({ children, className }: IContainer) => {
  return (
    <div className={classNames('bigContainer', className)}>
      {children}
    </div>
  );
};

export {
  HContainer,
  HSmallContainer,
  HHalfContainer,
  HBigContainer,
};
export default HContainer;
