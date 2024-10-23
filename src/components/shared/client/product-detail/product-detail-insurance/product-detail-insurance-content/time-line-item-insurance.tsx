import React from 'react';

import './product-detail-insurance-content.module.scss';

export const TimelineItemInsurance = (props: {
  title?: string,
  content?: React.ReactChildren,
}) => {
  const { title = '', content = <></> } = props;

  return (
    <div className="insurance-detail__content-timeline-item">
      <p className="insurance-detail__content-timeline-item__title">
        {title}
      </p>
      <p className="insurance-detail__content-timeline-item__content">
        {content}
      </p>
    </div>
  );
};
