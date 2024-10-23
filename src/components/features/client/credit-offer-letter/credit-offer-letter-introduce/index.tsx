import { valueBrought } from './constants';
import { ValueBrought } from './value-brought';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import CreditOfferLetterContainer from '../credit-offer-letter-container';

import './credit-offer-letter-introduce.module.scss';

const CreditOfferLetterIntroduce = () => {
  return (
    <div id="introduce-fina">
      <CreditOfferLetterContainer className="small">
        <CreditOfferLetterBodyContainer {...{
          preface: <img src="/assets/images/credit-letter-logo.png" />,
          classNamePreface: 'credit-offer-letter-introduce__logo',
          title: 'GIỚI THIỆU FINA', 
        }}>
          <div className="credit-offer-letter-introduce__content">
            <p>
						FINA là một nền tảng công nghệ cho phép người dùng có thể tìm kiếm, so sánh và lựa chọn chính xác các giải pháp tài chính phù hợp với nhu cầu của mình bao gồm các khoản vay, các gói bảo hiểm hoặc các sản phẩm đầu tư. Chúng tôi giúp người dùng kết nối dễ dàng tới những chuyên gia trong mạng lưới của FINA. Họ là những cố vấn tài chính chuyên nghiệp, giúp đưa ra những tư vấn phù hợp nhất với nhu cầu tài chính của bạn.<br />
						Sứ mệnh của FINA là cung cấp các dịch vụ tài chính toàn diện nhằm giúp tất cả người dân Việt Nam được tiếp cận với những những nguồn tài chính đa dạng nhất, giải quyết được nhu cầu riêng biệt của từng cá nhân và từng bước nâng cao chất lượng cuộc sống, tạo dựng mái ấm vững bền, hạnh phúc.
            </p>
            <p className="credit-offer-letter-introduce__content__value">
						Giá trị <a href="fina.com.vn" target="_blank">FINA</a> mang lại cho bạn:
            </p>
            <div className="credit-offer-letter-introduce__content__endow">
              {valueBrought.map((el, index) => <ValueBrought key={`value-brought-${index}`} {...{
                icon: el?.icon,
                title: el?.title,
                content: el?.content,
              }} />)}
            </div>
          </div>
        </CreditOfferLetterBodyContainer>
      </CreditOfferLetterContainer>
    </div>
  );
};

export default CreditOfferLetterIntroduce;
