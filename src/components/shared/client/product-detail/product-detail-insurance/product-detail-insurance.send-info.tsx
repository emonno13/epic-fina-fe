import { ClientInsuranceDetailPhoneIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import CounsellingRequestSingleInput from '../../counselling-request-single-input';

const ProductDetailInsuraceSendInfo = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="product-detail-insurance-send-info-wrapper">
      <div className="product-detail-insurance-send-info">
        <ClientInsuranceDetailPhoneIcon />
        <div className="product-detail-insurance-send-info__title">
          {t('product_detail_insurance_info_title', {
            en: 'Need advice? Leave your contact information, we will call you right away!',
            vn: 'Cần tư vấn? Để lại thông tin liên hệ, chúng tôi sẽ gọi cho bạn ngay!',
          })}
        </div>
        <CounsellingRequestSingleInput />
        <div className="product-detail-insurance-send-info__contact">
          {t('product_detail_insurance_info_contact', {
            en: 'Contact us via Hotline',
            vn: 'Liên hệ với chúng tôi qua Hotline',
          })}
        </div>
        <div className="product-detail-insurance-send-info__phone">
          0911 143 096
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInsuraceSendInfo;
