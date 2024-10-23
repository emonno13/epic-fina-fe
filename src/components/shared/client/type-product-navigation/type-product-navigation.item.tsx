import cls from 'classnames';

const TypeProductNavigationItem = ({ Icon, title, description, isSelected, onClick }) => {
  return (
    <div
      {...{
        onClick,
        className: cls('type-product-navigation__item', {
          'type-product-navigation__item-selected': isSelected,
        }),
      }}
    >
      <div className="type-product-navigation__item__icon">
        <Icon />
      </div>
      <div className="type-product-navigation__item__content">
        <div className="type-product-navigation__item__content__title">{title}</div>
        <div className="type-product-navigation__item__content__desc">{description}</div>
      </div>
    </div>
  );
};

export default TypeProductNavigationItem;
