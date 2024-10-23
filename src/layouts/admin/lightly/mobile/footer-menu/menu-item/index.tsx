import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useIsAuthenticated } from '@lib/providers/auth';

import './menu-item.scss';

type MenuItemProps = {
  iconPath: string;
  iconPathActive: string;
  label: string;
  redirectPath?: string;
  isAuthenticateMenu?: boolean;
  customIcon?: any;
};

const MenuItem = (props: MenuItemProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { setLoginDrawerVisible } = useMobile();
  const {
    iconPath,
    iconPathActive,
    label,
    redirectPath,
    isAuthenticateMenu = false,
    customIcon,
  } = props;
  const onClick = async () => {
    if (!isAuthenticated && isAuthenticateMenu) {
      setLoginDrawerVisible(true);
      return;
    }
    if (redirectPath) await RouteUtils.redirect(redirectPath);
  };
  const isActive = redirectPath && location.pathname.includes(redirectPath);
  return (
    <div className={'menu-item'} onClick={onClick}>
      <div className={'menu-item__icon'}>
        {customIcon ? (
          customIcon
        ) : (
          <img src={isActive ? iconPathActive : iconPath} />
        )}
      </div>
      <div className={'menu-item__label'}>{label}</div>
    </div>
  );
};

export default MenuItem;
