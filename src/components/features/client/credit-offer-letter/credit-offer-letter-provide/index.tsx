import { getCreditOfferLetterProvideGenerateArray } from '../constants';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-provide.module.scss';

const CreditOfferLetterProvide = () => {
  const generateArray = getCreditOfferLetterProvideGenerateArray();
  return (
    <CreditOfferLetterBodyContainer title="Chúng tôi cung cấp cho bạn">
      <ul className="credit-offer-letter-provide-list">
        {generateArray.map((text, index) => (
          <li key={`credit-offer-letter-provide-${index}`}>
            {text}
          </li>
        ))}
      </ul>
    </CreditOfferLetterBodyContainer>
  );
};

export default CreditOfferLetterProvide;
