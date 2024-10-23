import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';

const ProductDetailLoanGroupBtns = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="product-detail-loan-group-btn">
      <Button className="product-detail-loan-group-btn__register-loan">
        {t('Register this loan', { vn: 'Đăng ký gói vay này' })}
      </Button>
      <Button className="product-detail-loan-group-btn__calculate-loan">
        {t('Calculate loan', { vn: 'Tính lãi khoản vay' })}
      </Button>
    </div>
  );
};

export default ProductDetailLoanGroupBtns;
