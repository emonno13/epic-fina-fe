import { Menu } from 'antd';
import Layout from 'antd/lib/layout/layout';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Sticky from 'react-sticky-el';
import { useRouter } from 'next/router';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Link } from '../../../../../components/shared/link';
import { PROFILE_MENUS } from '../constants';
import ClientFooter from '../footer';
import ClientHeader from '../header';
import ClientToppedHeader from '../topped-header';

import './profile-client.module.scss';

const ProfileView = ({ children }) => {
  const { t } = useHTranslation('admin-common');
  const isMobile = useIsMobile();
  const menusConfig = PROFILE_MENUS(t);
  const menuSelected = menusConfig.find(
    (menu) =>
      menu.children && RouteUtils.getCurrentAdminPath().includes(menu.href),
  );
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState<any>(
    menuSelected ? [menuSelected?.href] : [],
  );
  const layoutProfile: any = useRef(null);
  const { query } = useRouter();

  const onToggleMobileMenuVisible = () =>
    setMenuMobileVisible(!menuMobileVisible);

  const getDefaultSelectedKeys = () => {
    return RouteUtils.getCurrentAdminPath() === '/profile'
      ? '/profile/dashboard'
      : RouteUtils.getCurrentAdminPath();
  };

  const rootSubmenuKeys = menusConfig
    ?.filter((menu) => menu?.children)
    ?.map((el) => el?.href);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSelectedItem = (e) => {
    if (isMobile && e.keyPath.length === 1) {
      setOpenKeys([]);
    }
  };

  useEffect(() => {
    layoutProfile?.current?.scrollIntoView();
  }, [query]);

  return (
    <Layout className={'layout-profile'}>
      <ClientToppedHeader />

      <Sticky stickyStyle={{ zIndex: 10 }} scrollElement=".height100percent">
        <ClientHeader
          {...{
            visible: menuMobileVisible,
            onVisible: onToggleMobileMenuVisible,
          }}
        />
      </Sticky>

      <div
        className={'max-w-1200 layout-profile-wrapper m-auto'}
        ref={layoutProfile}
      >
        <Menu
          className={`layout-profile-menu
            ${isMobile ? 'layout-profile-menu-mobile' : ''}`}
          mode="inline"
          openKeys={openKeys}
          // defaultOpenKeys={getDefaultOpenKeys()}
          defaultSelectedKeys={[getDefaultSelectedKeys()]}
          onOpenChange={onOpenChange}
          onSelect={handleSelectedItem}
        >
          {menusConfig.map((menuItem) => {
            const { href, name, key, icon, children } = menuItem;

            if (isEmpty(children)) {
              return (
                <Menu.Item
                  key={href}
                  icon={
                    <span
                      className={`layout-profile-menu-item-icon layout-profile-menu-item-icon-${key} ${isMobile ? 'hidden' : ''}`}
                    >
                      {icon}
                    </span>
                  }
                >
                  <Link href={href}>
                    {isMobile ? (
                      <span
                        className={`layout-profile-menu-item-icon layout-profile-menu-item-icon-${key}`}
                      >
                        {icon}
                      </span>
                    ) : (
                      ''
                    )}
                    {isMobile ? '' : name}
                  </Link>
                </Menu.Item>
              );
            }

            return (
              <Menu.SubMenu
                key={href}
                title={isMobile ? '' : name}
                icon={
                  <span
                    className={`layout-profile-menu-item-icon layout-profile-menu-item-icon-${key}`}
                  >
                    {icon}
                  </span>
                }
              >
                {children?.map((item) => {
                  const { href: submenu, name } = item;

                  return (
                    <Menu.Item
                      key={submenu}
                      icon={<span className="circle-icon"></span>}
                    >
                      <Link href={submenu}>{name}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          })}
        </Menu>
        <div className={'layout-profile-content'}>{children}</div>
      </div>
      <ClientFooter />
    </Layout>
  );
};

export default ProfileView;
