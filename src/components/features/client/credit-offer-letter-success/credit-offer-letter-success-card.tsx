
const CreditOfferLetterSuccessCard = ({ title, children }) => {
  return (
    <div className="credit-offer-letter-success-card">
      <p className="credit-offer-letter-success-card__title">
        {title}
      </p>
      <div className="credit-offer-letter-success-card__children">
        {children}
      </div>
    </div>
  );
};

export default CreditOfferLetterSuccessCard;
