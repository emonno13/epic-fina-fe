import NotificationsButton from '@components/features/fina/notifications/notifications-button';
import NotificationsDrawer from '@components/features/fina/notifications/notifications-drawer';
import { MobileProvider } from '@components/features/mobile-app/providers/mobile-provider';
import MobileSupportIcon from '@components/shared/mobile-app/support-icon';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { MessageUtils } from '@lib/utils/message';
import { setDataSource } from '@schema-form/features/actions';
import { useTableSourceData } from '@schema-form/features/hooks';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sticky from 'react-sticky-el';
import FooterMenu from './footer-menu';
import HeaderAccount from './header-account';

import './mobile.scss';

const MobileView = ({ children }) => {
  const { t } = useHTranslation('mobile');
  const useAuthObject = useAuth();
  const { isAuthenticated } = useAuthObject;
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const onToggleNofication = () => {
    setNotificationVisible(!notificationVisible);
  };
  const notifications = useTableSourceData('notifications') || [];
  const onFirebaseMessage = useCallback(
    (newNotification) => {
      dispatch(
        setDataSource({
          featureId: 'notifications',
          dataSource: [newNotification, ...notifications],
        }),
      );
    },
    [notifications],
  );

  useEffect(() => {
    const onMessage = (e) => {
      MessageUtils.handleWebViewMessage(e, {
        useAuthObject,
        onFirebaseMessage,
      });
    };
    document.addEventListener('message', onMessage); // For android
    window.addEventListener('message', onMessage); // For ios
    return () => {
      document.removeEventListener('message', onMessage);
      window.removeEventListener('message', onMessage);
    };
  }, [onFirebaseMessage]);

  return (
    <MobileProvider>
      <Layout className={'fina-mobile'}>
        <Header className={'fina-mobile__header'}>
          <div className={'fina-mobile__header-icon'}>
            <img src={'/assets/images/icons/ic_fina.svg'} />
          </div>
          <div className={'fina-mobile__header-right-content'}>
            <MobileSupportIcon />
            <HeaderAccount />
            {isAuthenticated && (
              <div className="notification-button">
                <NotificationsButton onVisible={onToggleNofication} iconFill />
              </div>
            )}
          </div>
        </Header>

        <Content className={'fina-mobile__content'}>
          <div>
            {children}
            <div className="notification-wrapper">
              <NotificationsDrawer
                {...{
                  visible: notificationVisible,
                  onClose: () => setNotificationVisible(false),
                }}
              />
            </div>
          </div>
        </Content>

        <Sticky stickyStyle={{ zIndex: 10 }} mode="bottom">
          <Footer className={'fina-mobile__footer'}>
            <FooterMenu />
          </Footer>
        </Sticky>
      </Layout>
    </MobileProvider>
  );
};

export default MobileView;
