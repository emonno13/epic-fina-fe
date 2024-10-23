import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-policy.module.scss';
export const CreditOfferLetterPolicy = () => {
  return (
    <div id="policy">
      <CreditOfferLetterBodyContainer {...{
        title: 'Điều khoản và thi hành',
        className: 'small',
      }}>
        <p >
      Trong báo cáo này, chúng tôi đã đưa ra các đề xuất của mình về phương án tài trợ đối với trường hợp cụ thể của quý khách.<br/>
Chú ng tôi sẵn sàng thảo luận về bất kỳ điều gì bạn mong muốn thực hiện trong phương án của mình hoặc trao đỏi về cách chúng tôi có thể thực hiện các phương án theo nhu cầu của quý khách.
Rất vui được làm việc với quý khách.
        </p>
        <p className="note"><span>*</span> Mọi thông tin được cung cấp trên cơ sở phục vụ cho chính phương án cụ thể theo bảng đề nghị này và trên cơ sở thông tin quý khách cung cấp là chính xác, FINA không tuyên bố hoặc bảo đảm cho bất kỳ trường hợp nào khác hoặc sự liên quan của nó đối với việc quý khách sử dụng báo cáo này cho mục đích khác.<br/>
Quý khách có thể xác minh thông tin độc lập để đảm bảo tính chính xác dành riêng cho quý khách để đi đến quyết định lựa chọn sử dụng đề nghị tư vấn của chúng tôi.<br/>
Chúng tôi tư vấn và lựa chọn là ở quý khách, quý khách đồng ý miễn trừ bất kỳ trách nhiệm pháp lý hoặc khiếu nại cho chúng tôi.</p>
        {/* <div style={{overflow: 'hidden'}}><img style={{maxWidth: '100%'}} src="/assets/images/letter-template-banner-footer.jpeg" alt="" /></div> */}
      </CreditOfferLetterBodyContainer>
    </div>
  );
};
