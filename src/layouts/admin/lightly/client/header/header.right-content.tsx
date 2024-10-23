import UserHeaderAvatar from '@components/shared/user-header-avatar';
import { useIsMobile } from '@lib/hooks/use-media';
import { useIsAuthenticated } from '@lib/providers/auth';
import ClientHeaderMenu from './header-menu';
import RightContentButtonsNotAuthen from './header.buttons-not-authen';

const RightContent = () => {
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  return (
    <div className="ui-lightly-client-header__right-content">
      {!isMobile && <ClientHeaderMenu />}
      {!isAuthenticated && <RightContentButtonsNotAuthen />}
      <UserHeaderAvatar />
    </div>
  );
};

export default RightContent;
