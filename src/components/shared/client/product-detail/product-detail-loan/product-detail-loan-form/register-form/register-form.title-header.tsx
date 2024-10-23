const ProductDetailLoanRegisterFormTitleHeader = ({ order, label }) => {
  return (
    <div className="product-detail-loann-register-form-title-header">
      <div className="product-detail-loann-register-form-title-header__icon">{order}</div>
      <div className="product-detail-loann-register-form-title-header__label">{label}</div>
    </div>
  );
};

export default ProductDetailLoanRegisterFormTitleHeader;