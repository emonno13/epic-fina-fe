import React from 'react';

import './recruitment-process-item.scss';

interface RecruitmentProcessProps {
  Icon: React.SVGAttributes<SVGElement> | any
  position: '01' | '02' | '03' | '04'
  title: string;
  content: string
}

const RecruitmentProcessItem = React.memo(({ Icon, position, title, content }: RecruitmentProcessProps)=> {
  return (
    <div className="recruitment-process-item__container">
      <Icon />
      <div className="recruitment-process-item__position">{position}</div>
      <div className="recruitment-process-item__title">{title}</div>
      <div className="recruitment-process-item__content">{content}</div>
    </div>
  );
});

export default RecruitmentProcessItem;
