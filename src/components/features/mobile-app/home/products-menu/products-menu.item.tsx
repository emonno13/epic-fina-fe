import cls from 'classnames';

import './products-menu.item.scss';

const ProductsMenuItem = ({
  iconActive,
  iconDisable,
  label,
  isSelected = false,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls('products-menu-item', {
        'products-menu-item-selected': isSelected,
      })}
    >
      <img
        width="28px"
        height="28px"
        src={isSelected ? iconActive : iconDisable}
      />
      <div className="products-menu-item__label">{label}</div>
      {isSelected && <div className="products-menu-item__content" />}
    </div>
  );
};

export default ProductsMenuItem;
