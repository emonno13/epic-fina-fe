import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import RenderHtml from '../../recruit/components/jobs/render-html';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import '../credit-offer-letter-compare-product/credit-offer-letter-compare-product.module.scss';

const CreditOfferLetterPolicyAndCondition = () => {
  const taskData = useClientDocumentDetail();

  return (
    <div
      id="policy-and-condition"
      className="credit-offer-letter-policy-and-condition"
    >
      <CreditOfferLetterBodyContainer
        {...{
          title: 'Một số chính sách và điều kiện:',
          preface:
            'Chúng tôi hiểu tầm quan trọng trong việc lựa chọn đơn vị cho vay phù hợp với bạn, dưới đây là một số điều kiện cho vay của các ngân hàng tiêu biểu mà chúng tôi chuẩn bị cho quý khách.',
        }}
      >
        <RenderHtml
          className="credit-offer-letter-policy-and-condition__table"
          html={taskData?.contentLetter?.policiesAndConditions}
        />
      </CreditOfferLetterBodyContainer>
    </div>
  );
};

export default CreditOfferLetterPolicyAndCondition;
