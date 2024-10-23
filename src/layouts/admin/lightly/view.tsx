import NotificationsDrawer from '@components/features/fina/notifications/notifications-drawer';
import { useDispatchCollapseLeftMenuState, useLayout } from '@layouts/hooks';
import { MobileUtils } from '@lib/utils/mobile';
import Layout, { Content } from 'antd/lib/layout/layout';
import {
  DialDrawer as DialDrawerSDK,
  PhoneCallContent as PhoneCallContentSDK,
} from 'fccs-sdk/dist';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneCallContent from '../../../components/features/business/dial/dial-content';
import DialDrawer from '../../../components/features/business/dial/dial-drawer';
import { ScreenWithTrackingScrolling } from '../../../components/shared/common/screen-with-tracking-scrolling';
import { MAIN_ADMIN_SCREEN_ID } from '../_default/view';
import { getLeftMenu } from '../common/tools/building-left-menu';
import { LightLyHeader } from './header/view';
import {
  AdminLeftMenu,
  LEFT_MENU_MAX_WIDTH,
  LEFT_MENU_MIN_WIDTH,
} from './left-menu';
import MobileView from './mobile';

import './lightly-admin.module.scss';

export const LAYOUT_LIGHTLY = 'LIGHTLY';

const view = ({ children, ...props }) => {
  const { t } = useTranslation('admin-menu');
  const useSDK = process.env.NEXT_PUBLIC_USED_FCCS_SDK;
  const { collapseLeftMenu } = useLayout(LAYOUT_LIGHTLY);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const dispatchCollapseLeftMenuState = useDispatchCollapseLeftMenuState();
  const marginLeft = useMemo(() => {
    return collapseLeftMenu ? LEFT_MENU_MIN_WIDTH : LEFT_MENU_MAX_WIDTH;
  }, [collapseLeftMenu]);
  const isWebView = MobileUtils.checkIsWebView();
  const menus = getLeftMenu(t);

  const onToggleNofication = () => {
    setNotificationVisible(!notificationVisible);
  };

  return isWebView ? (
    <MobileView>{children}</MobileView>
  ) : (
    <>
      <Layout className="ui-lightly-admin-layout">
        <LightLyHeader
          {...{
            switchLeftMenuCollapsed: () =>
              dispatchCollapseLeftMenuState(!collapseLeftMenu),
            onToggleNofication,
          }}
        />

        <Layout className={'ui-lightly-admin'}>
          <AdminLeftMenu collapsed={collapseLeftMenu} />
          <Content
            className="ui-lightly-site-layout"
            style={{ marginLeft: menus?.length !== 0 ? marginLeft : 0 }}
          >
            <ScreenWithTrackingScrolling
              scrollClassName="ui-lightly-site-layout"
              className="ui-lightly-content"
              screenId={MAIN_ADMIN_SCREEN_ID}
            >
              <div className="ui-lightly-pcontent">
                {children}
                <div className="notification-wrapper">
                  <NotificationsDrawer
                    {...{
                      visible: notificationVisible,
                      onClose: () => setNotificationVisible(false),
                    }}
                  />
                  {useSDK ? <DialDrawerSDK /> : <DialDrawer />}
                </div>
              </div>
            </ScreenWithTrackingScrolling>
          </Content>
        </Layout>
      </Layout>
      {useSDK ? <PhoneCallContentSDK /> : <PhoneCallContent />}
    </>
  );
};

export default view;
