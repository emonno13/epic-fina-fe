import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Link from 'next/link';
import { RootStateOrAny, useSelector } from 'react-redux';
import Head from 'next/head';
import { AdminHeader } from './header';
import { AdminLeftMenu } from './left-menu';
import { SiteHeaderLogo } from './logo';
import { RouteUtils } from '../../../components/shared/layout/router-contaner/utils';
import { SystemMenu } from '../../../components/shared/menu';
import { MobileDrawer } from '../../../components/shared/layout/mobile-drawer';
import { ScreenWithTrackingScrolling } from '../../../components/shared/common/screen-with-tracking-scrolling';
import { getLeftMenu } from '../common/tools/building-left-menu';

import './default_admin.module.scss';

const { Content } = Layout;
export const MAIN_ADMIN_SCREEN_ID = 'mainAdminScreen';

export default ({ children, ...props }) => {
  const hasDetailFeaturePopupOrDrawer = useSelector((state: RootStateOrAny) => {
    return state?.common?.hasDetailFeaturePopupOrDrawer;
  });
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const adminKeyAndPaths = RouteUtils.getAllAdminKeyAndPathsFromRoute();
  const handleSwitchLeftMenuState = () => setShowLeftMenu(!showLeftMenu);
  return (
    <ScreenWithTrackingScrolling screenId={MAIN_ADMIN_SCREEN_ID}>
      <Head>
        <meta name="description" content="IpSupply ERP system"/>
        <title>IPS ERP system</title>
      </Head>
      <Layout className="admin_default" >
        <AdminHeader onLeftMenuToggle={handleSwitchLeftMenuState} setShowLeftMenu={setShowLeftMenu}/>
        <Layout className={`${hasDetailFeaturePopupOrDrawer ? 'max-height-of-detail-screen' : ''}`}>
          <AdminLeftMenu collapsed={showLeftMenu}/>
          <Layout className="admin-content">
            <div className={'site-drawer-render-in-current-wrapper'}>
              <div className="_content-top">
                <Breadcrumb className="_breadcrumb">
                  <Breadcrumb.Item><Link href={'/'}>Home</Link></Breadcrumb.Item>
                  {
                    Object.keys(adminKeyAndPaths).map((name, index) => (
                      <Breadcrumb.Item key={`${adminKeyAndPaths[name]}.${index}`}><Link href={adminKeyAndPaths[name]}>{name}</Link></Breadcrumb.Item>
                    ))
                  }
                </Breadcrumb>
              </div>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {children}
                <MobileDrawer
                  {...{
                    visible: showLeftMenu,
                    placement: 'left',
                    className: 'p-0i',
                    onClose: () => setShowLeftMenu(false),
                    logo: <SiteHeaderLogo {...{ onLeftMenuToggle: handleSwitchLeftMenuState }}/>,
                  }}>
                  <SystemMenu
                    {...{
                      className: '_left-menu',
                      mode: 'inline',
                      onClick: () => setShowLeftMenu(false),
                      defaultSelectedKeys: [RouteUtils.getCurrentAdminPath()],
                      schema: getLeftMenu(),
                      style: { height: '100%', borderRight: 0 },
                    }}
                  />
                </MobileDrawer>
              </Content>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </ScreenWithTrackingScrolling>
  );
};