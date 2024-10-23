import { useHTranslation } from '@lib/i18n';
import { REAL_ESTATE_MENU_DATA } from '../../../constants';
import ProductsMenuContentLinks from '../products-menu-content-links';

const ProductsMenuContentRealEstate = () => {
  const { t } = useHTranslation('mobile-home');

  return <ProductsMenuContentLinks data={REAL_ESTATE_MENU_DATA(t)} />;
};

export default ProductsMenuContentRealEstate;
