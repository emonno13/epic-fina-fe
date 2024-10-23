import React from 'react';

import  './job-opportunities-item.scss';


interface JobOpportunitiesProps {
  Icon: React.SVGAttributes<SVGElement> | any;
  title: string;
  onClick(): void
}

const JobOpportunitiesItem = ({ Icon, title, onClick }: JobOpportunitiesProps) => {
  return (
    <div
      {...{
        onClick,
        className: 'job-opportunities-item__item',
      }}
    >
      <div className="job-opportunities-item__item__icon">
        <Icon />
      </div>
      <div className="job-opportunities-item__item__title">{title}</div>
    </div>
  );
};

export default JobOpportunitiesItem;
