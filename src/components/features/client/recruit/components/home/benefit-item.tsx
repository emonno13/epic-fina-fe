import React from 'react';

import  './benefit-item.scss';


interface BenefitProps {
  Icon: React.SVGAttributes<SVGElement> | any;
  title: string;
  onClick(): void
}

const BenefitItem = ({ Icon, title, onClick }: BenefitProps) => {
  return (
    <div
      {...{
        onClick,
        className: 'benefit-item__item',
      }}
    >
      <div className="benefit-item__item__icon">
        <Icon />
      </div>
      <div className="benefit-item__item__title">{title}</div>
    </div>
  );
};

export default BenefitItem;
