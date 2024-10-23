import { useIsMobile } from '@lib/hooks/use-media';
import ProductDetailLoanGroupBtns from './group-btns';
import ProductDetailLoanRegisterForm from './register-form';

const ProductDetailLoanForm = ({ loanData }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <ProductDetailLoanGroupBtns />;
  }
  return <ProductDetailLoanRegisterForm {...{ loanData }} />;
};

export default ProductDetailLoanForm;
