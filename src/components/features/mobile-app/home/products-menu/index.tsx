import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import { PRODUCTS_MENU_DATA } from '../constants';
import ProductsMenuItem from './products-menu.item';

import './products-menu.scss';

const ProductsMenu = ({ selectedMenu, onMenuItemClick }) => {
  const { t } = useHTranslation('mobile');
  const menuData = PRODUCTS_MENU_DATA(t);

  const MenuContent =
    selectedMenu.Content ||
    function () {
      return null;
    };

  return (
    <div className="products-menu">
      <p className="products-menu__title">
        {t('Products menu title', {
          en: 'Products / services featured FINA',
          vn: 'Sản phẩm/dịch vụ nổi bật của FINA',
        })}
      </p>
      <Row gutter={10}>
        {menuData.map((menuData, index) => (
          <Col key={`product-menu-item-${index}`} span={8}>
            <ProductsMenuItem
              {...menuData}
              isSelected={index === selectedMenu?.id}
              onClick={() => onMenuItemClick(menuData)}
            />
          </Col>
        ))}
      </Row>
      <MenuContent />
    </div>
  );
};

export default ProductsMenu;
