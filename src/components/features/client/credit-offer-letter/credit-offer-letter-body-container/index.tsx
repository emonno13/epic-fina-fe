import cls from 'classnames';
import React from 'react';

import './credit-offer-letter-body-container.module.scss';

export interface CreditOfferLetterBodyContainerType {
  children: React.ReactNode;
  subTitle?: string;
  preface?: string | React.ReactNode;
  className?: string;
  classNamePreface?: string;
  title?: string;
}

const CreditOfferLetterBodyContainer = (props: CreditOfferLetterBodyContainerType) => {
  const { children, subTitle = '', preface = null, className = '', classNamePreface = '', title = '', ...rest } = props;
  return (
    <div {...{
      ...rest,
      className: cls('credit-offer-letter-body-container', className),
    }}>
      <h2>
        {title}
        <span>{subTitle}</span>
      </h2>
      <p className={classNamePreface}>{preface}</p>
      {children}
    </div>
  );
};

export default CreditOfferLetterBodyContainer;
