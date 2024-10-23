import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import RenderHtml from '../../recruit/components/jobs/render-html';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-compare-product.module.scss';

const CreditOfferLetterCompareProduct = () => {
  const taskData = useClientDocumentDetail();

  return (
    <div id="compare-product" className="credit-offer-letter-compare-product">
      <CreditOfferLetterBodyContainer
        {...{
          title: 'So sánh một số gói LS nổi bật',
        }}
      >
        <RenderHtml html={taskData?.contentLetter?.interestRate} />
      </CreditOfferLetterBodyContainer>
    </div>
  );
};

export default CreditOfferLetterCompareProduct;
