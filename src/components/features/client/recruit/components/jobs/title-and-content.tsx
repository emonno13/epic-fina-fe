import React from 'react';

import './title-and-content.module.scss';

interface TitleAndContentProps{
  label: string
  content: string | any
}

const TitleAndContent = React.memo(({ label, content }: TitleAndContentProps)=> {
  return (
    <div className="title-and-content__row">
      <div className="title-and-content__label-container">
        <p className="title-and-content__label">{label}</p>
      </div>
      <div className="title-and-content__content-container">
        <p className="title-and-content__content">{content}</p>
      </div>
    </div>
  );
});

export default TitleAndContent;
