import { useHTranslation } from '@lib/i18n';
import ProductDetailLoanRegisterFormTitleHeader from './register-form.title-header';

const ProductDetailLoanRegisterFormInfo = ({ loanData }) => {
  const { t } = useHTranslation('common');
  const { name } = loanData;
  return (
    <div className="product-detail-loan-register-form-info">
      <ProductDetailLoanRegisterFormTitleHeader
        {...{
          order: 1,
          label: t('Loan info', { vn: 'Thông tin gói vay' }),
        }}
      />
      <div className="product-detail-loan-register-form-info__content">
        <div className="product-detail-loan-register-form-info__content__label">
          {t('Loan package', { vn: 'Gói vay' })}
        </div>
        <div className="product-detail-loan-register-form-info__content__name">
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoanRegisterFormInfo;
