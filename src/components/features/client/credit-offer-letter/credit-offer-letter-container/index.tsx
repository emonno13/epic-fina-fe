import cls from 'classnames';

import './credit-offer-letter-container.module.scss';

const CreditOfferLetterContainer = ({ children, className = '', style = {} }) => {
  return (
    <div className={cls('credit-offer-letter-container', className)} style={style}>
      {children}
    </div>
  );
};

export default CreditOfferLetterContainer;
