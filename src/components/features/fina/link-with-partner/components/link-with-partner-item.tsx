/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler } from 'react';

export const LinkWithPartnerItem = ({
  urlLogo, 
  name, 
  description = '',
  onClick,
}: {
  urlLogo: string,
  name: string,
  description?: string,
  onClick: MouseEventHandler<HTMLAnchorElement>
}) => {
  return (
    <a href="#" onClick={onClick}>
      <div className="link-with-partner__item">
        <div className="link-with-partner__item__img">
          <span>
            <img src={urlLogo} />
          </span>
        </div>
        <div className="link-with-partner__item__name">
          <h3>{name}</h3>
          <span>{description}</span>
        </div>
      </div>
    </a>
  );
};
