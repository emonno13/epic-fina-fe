import { useIsMobile } from '@lib/hooks/use-media';
import { Header } from 'antd/lib/layout/layout';
import ClientHeaderMenu from './header-menu';
import ClientLogo from './header.logo';
import ClientHeaderMenuMobileButton from './header.menu-mobile-button';
import RightContent from './header.right-content';

const ClientHeader = ({ visible, onVisible }) => {
  const isMobile = useIsMobile();
  return (
    <Header className="ui-lightly-client-header-wrapper">
      <div className="ui-lightly-client-header max-w-1200 m-auto">
        <div className="ui-lightly-client-header__left-content">
          {isMobile && (
            <ClientHeaderMenuMobileButton
              {...{
                visible,
                onClick: onVisible,
              }}
            />
          )}
          <ClientLogo />
        </div>
        <RightContent />
        {isMobile && visible && <ClientHeaderMenu {...{ onVisible }} />}
      </div>
    </Header>
  );
};

export default ClientHeader;
