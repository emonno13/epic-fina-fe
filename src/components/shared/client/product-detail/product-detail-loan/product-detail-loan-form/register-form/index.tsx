import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import ProductDetailLoanRegisterFormInfo from './register-form.info';
import ProductDetailLoanRegisterFormMain from './register-form.main';

const ProductDetailLoanRegisterForm = ({
  loanData,
  setVisible = (value: boolean) => {},
}) => {
  const { t } = useHTranslation('common');
  const { product = {} } = loanData;
  const { type } = product;

  return (
    <div className="product-detail-loan-register-form">
      <h3 className="product-detail-loan-register-form__title">
        {t('product_detail_loan_register_title', {
          vn: 'Đăng ký gói vay này ngay',
          en: 'Register this loan now',
        })}
      </h3>
      <ProductDetailLoanRegisterFormInfo {...{ loanData }} />
      <ProductDetailLoanRegisterFormMain
        setVisible={setVisible}
        productType={type}
      />
    </div>
  );
};

export default ProductDetailLoanRegisterForm;

export const CounsellingRequestDealLoan = (props: {
  visible: boolean;
  loanData: any;
  setVisible: (value: boolean) => void;
}) => {
  const { visible, loanData, setVisible } = props;
  return (
    <HModal
      {...{
        visible,
        width: 500,
        footer: null,
        onCancel: () => setVisible(false),
      }}
    >
      <ProductDetailLoanRegisterForm
        setVisible={setVisible}
        loanData={loanData}
      />
    </HModal>
  );
};
