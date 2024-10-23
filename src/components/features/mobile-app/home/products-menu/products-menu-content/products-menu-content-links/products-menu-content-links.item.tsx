import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { useIsAuthenticated } from '@lib/providers/auth';

import './products-menu-content-links.item.scss';

const ProductsMenuContentLinksItem = ({
  icon,
  label,
  needAuthenticate,
  ...rest
}) => {
  const { onClick } = rest;
  const isAuthenticated = useIsAuthenticated();
  const { setLoginDrawerVisible } = useMobile();
  const onItemClick = () => {
    if (needAuthenticate && !isAuthenticated) {
      setLoginDrawerVisible(true);
      return;
    }
    if (onClick) onClick();
  };
  return (
    <div {...rest} className="links-item" onClick={onItemClick}>
      <div className="links-item__left">
        <img width="24px" height="24px" src={icon} />
        <span>{label}</span>
      </div>
      <img
        width="10px"
        height="10px"
        src="/assets/images/icons/ic_product-menu-content-right-arrow.svg"
      />
    </div>
  );
};

export default ProductsMenuContentLinksItem;
