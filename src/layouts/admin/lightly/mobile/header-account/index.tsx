import { useMobile } from '@components/features/mobile-app/hooks/login-drawer-hooks';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useIsAuthenticated } from '@lib/providers/auth';

const HeaderAccount = () => {
  const isAuthenticated = useIsAuthenticated();
  const { setLoginDrawerVisible } = useMobile();
  const onClick = async () => {
    if (isAuthenticated) {
      await RouteUtils.redirect('/admin/m-profile');
      return;
    }
    setLoginDrawerVisible(true);
  };

  return (
    <img onClick={onClick} src="/assets/images/icons/ic_account-header.svg" />
  );
};

export default HeaderAccount;
