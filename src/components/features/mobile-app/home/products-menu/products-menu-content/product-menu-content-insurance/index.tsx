import PersonalInsuranceList from './personal-insurance-list';
import ProductsMenuContentInsuranceList from './product-menu-content-insurance-list';

import './index.scss';

const ProductsMenuContentInsurance = () => {
  return (
    <div className="menu-content-insurance">
      <PersonalInsuranceList />
      <ProductsMenuContentInsuranceList />
    </div>
  );
};

export default ProductsMenuContentInsurance;
