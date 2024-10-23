
const CreditOfferLetterLinkItem = ({ url, icon }) => {
  return (
    <a {...{
      className: 'credit-offer-letter-success__link-item',
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
    }}>
      {icon}
    </a>
  );
};

export default CreditOfferLetterLinkItem;
