import cls from 'classnames';
import React, { FC, ReactNode } from 'react';

import './bond-information-item.module.scss';

interface BondInformationItemProps {
  type?: 'space-between' | 'down-line' | 'default';
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  label: string;
  content: ReactNode;
  isPrice?: boolean
}

export const BondInformationItem: FC<BondInformationItemProps> = ({
  type = 'default',
  className,
  labelClassName,
  contentClassName,
  label,
  content,
  isPrice,
}) => {
  return (
    <div className={cls('bond-information-wrapper', className, {
      'space-between': type === 'space-between',
      'down-line': type === 'down-line',
      'default': type === 'default',
    })}>
      <p className={cls('bond-information-wrapper__label', labelClassName)}>
        {label}
      </p>

      <p className={cls('bond-information-wrapper__content', contentClassName)}>
        {content} {isPrice && <sup>đ</sup> }
      </p>
    </div>
  );
};
