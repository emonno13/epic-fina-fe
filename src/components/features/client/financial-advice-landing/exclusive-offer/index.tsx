import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useRouter } from 'next/router';

import './exclusive-offer.module.scss';

const FinancialAdviceExclusiveOffer = () => {
  const { locale } = useRouter();
  return (
    <div id="exclusive-offer" className="financial-advice-exclusive-offer">
      <div className="financial-advice-container">
        <div className="financial-advice-exclusive-offer-wrapper">
          <h2 className="financial-advice-exclusive-offer-wrapper-header">
            Ưu đãi độc quyền
          </h2>
          <h2 className="financial-advice-exclusive-offer-wrapper-title">
            Miễn phí tư vấn Tài chính Bất động sản cho khách hàng FINA
          </h2>
          <p className="financial-advice-exclusive-offer-wrapper-desc">
            Dành cho 100 khách hàng đăng ký sớm nhất trong tháng
          </p>
          <HButton
            className="financial-advice-button"
            type="link"
            href={`/${locale}/financial-advice#register`}
          >
            Đăng ký ngay
          </HButton>
        </div>
      </div>
    </div>
  );
};

export default FinancialAdviceExclusiveOffer;
