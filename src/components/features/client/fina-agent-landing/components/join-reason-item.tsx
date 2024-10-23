import React from 'react';

import '../css/join-reason.scss';

interface Props{
  icon: any
  title: string,
  content: string
}
const JoinReasonItem = React.memo(({ icon,title, content }: Props)=> {
  return (
    <div className="join-reason-item">
      <div className="join-reason-item__icon">{icon}</div>
      <span className="join-reason-item__title">{title}</span>
      <span className="join-reason-item__content">{content}</span>
    </div>
  );
});
export default JoinReasonItem;
