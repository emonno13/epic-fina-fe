import React from 'react';
import OriginCreditOfferLetter from './origin-credit-offer-letter';
import CreditOfferLetterContainer from '../credit-offer-letter-container';
import CreditOfferLetterPersonalInfo from '../credit-offer-letter-personal-info';

import './credit-offer-letter-header.module.scss';

const CreditOfferLetterHeader = () => {
  return (
    <div>	
      <OriginCreditOfferLetter />
      <div id="welcome" className="offer-letter-welcome">
        <CreditOfferLetterContainer className="small">
          <div className="credit-offer-letter-header">
            <p className="credit-offer-letter-header__customer-name">
						Quý khách thân mến,
            </p>
            <p>
						Cảm ơn quý khách đã dành thời gian để trao đổi với chúng tôi về các kế hoạch tài chính cá nhân.
            </p>
            <p>
						Quý khách vui lòng dành chút thời gian để xem lại các nội dung tóm lược về những thông tin đã trao đổi để đảm bảo chúng tôi hiểu đúng và chính xác những gì quý khách mong muốn.
            </p>
            <p>
						Chúng tôi sẽ đề xuất những nội dung phù hợp nhất nhằm đạt được mục tiêu của quý khách đối với kế hoạch vay vốn lần này.
            </p>
            <p>
						Kế tiếp chúng tôi cần một khoảng thời gian nhất định để xem xét, đánh giá để đảm bảo rằng những đề xuất của chúng tôi dành cho quý khách là có hiệu quả và phù hợp nhất với những gì quý khách mong đợi.
            </p>
            <p>
						Nếu quý khách có bất kỳ câu hỏi nào đối với nội dung trong đề nghị này, hãy gọi ngay cho chuyên gia tư vấn của chúng tôi. Chúng tôi sẵn sàng thảo luận với quý khách các phương án để đạt kết quả tốt nhất.
            </p>
            <CreditOfferLetterPersonalInfo />
            <div style={{ overflow: 'hidden' }}>
              <img src="/assets/images/letter-template-banner-footer.jpeg" alt="" />
            </div>
          </div>
        </CreditOfferLetterContainer>
      </div>
    </div>
		
  );
};

export default CreditOfferLetterHeader;
